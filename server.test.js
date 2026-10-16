"use strict";

const assert = require("node:assert/strict");
const { mkdtempSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { afterEach, beforeEach, test } = require("node:test");
const Database = require("better-sqlite3");
const { createTravelTalesServer } = require("./server");

let server;
let directory;
let origin;

beforeEach(async () => {
  directory = mkdtempSync(join(tmpdir(), "traveltales-test-"));
  server = createTravelTalesServer({
    adminEmail: "owner@example.com",
    adminPassword: "a-long-admin-passphrase-2026",
    sessionSecret: "test-session-secret-with-at-least-thirty-two-characters",
    databasePath: join(directory, "members.sqlite"),
    nodeEnv: "development"
  });
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  origin = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  if (server && server.listening) {
    await new Promise((resolveClose) => server.close(resolveClose));
  }
  if (directory) rmSync(directory, { recursive: true, force: true });
});

async function request(path, { method = "GET", body, cookie, includeOrigin = true } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (includeOrigin) headers.Origin = origin;
  if (cookie) headers.Cookie = cookie;
  return fetch(`${origin}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
}

test("does not serve removed account pages or publish the server implementation", async () => {
  for (const path of ["/signup.html", "/login.html", "/members.html"]) {
    assert.equal((await request(path)).status, 404);
  }
  const planner = await request("/planner.html");
  assert.equal(planner.status, 200);
  assert.match(await planner.text(), /YOUR ITINERARY/);
  const clientScript = await request("/app.js");
  assert.equal(clientScript.status, 200);
  const serverSource = await request("/server.js");
  assert.equal(serverSource.status, 404);
});

test("stores new accounts and keeps the member list private from non-admin users", async () => {
  const signup = await request("/api/auth/signup", {
    method: "POST",
    body: { name: "A Traveller", email: "traveller@example.com", password: "a-secure-passphrase" }
  });
  assert.equal(signup.status, 201);
  const db = new Database(join(directory, "members.sqlite"));
  const storedHash = db.prepare("SELECT password_hash FROM users WHERE email = ?").get("traveller@example.com").password_hash;
  db.close();
  assert.match(storedHash, /^scrypt\$/);
  assert.notEqual(storedHash, "a-secure-passphrase");

  const duplicate = await request("/api/auth/signup", {
    method: "POST",
    body: { name: "Another Name", email: "TRAVELLER@example.com", password: "another-secure-password" }
  });
  assert.equal(duplicate.status, 202);

  const privateList = await request("/api/admin/members");
  assert.equal(privateList.status, 403);

  const login = await request("/api/auth/login", {
    method: "POST",
    body: { email: "traveller@example.com", password: "a-secure-passphrase" }
  });
  assert.equal(login.status, 200);
  const loginResult = await login.json();
  assert.equal(loginResult.isAdmin, false);
  assert.equal(loginResult.redirect, "/planner.html");
  const setCookie = login.headers.get("set-cookie");
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Lax/);
  const userCookie = setCookie.split(";")[0];
  const ownSession = await request("/api/auth/me", { cookie: userCookie });
  assert.deepEqual(await ownSession.json(), {
    authenticated: true,
    isAdmin: false,
    name: "A Traveller",
    email: "traveller@example.com"
  });
  const stillPrivate = await request("/api/admin/members", { cookie: userCookie });
  assert.equal(stillPrivate.status, 403);
});

test("allows only the configured admin to view member records without password hashes", async () => {
  const signup = await request("/api/auth/signup", {
    method: "POST",
    body: { name: "Private Member", email: "member@example.com", password: "a-member-passphrase" }
  });
  assert.equal(signup.status, 201);

  const blockedAdminSignup = await request("/api/auth/signup", {
    method: "POST",
    body: { name: "Imposter", email: "owner@example.com", password: "a-long-admin-passphrase-2026" }
  });
  assert.equal(blockedAdminSignup.status, 400);

  const wrongPassword = await request("/api/auth/login", {
    method: "POST",
    body: { email: "owner@example.com", password: "wrong-admin-password" }
  });
  assert.equal(wrongPassword.status, 401);

  const login = await request("/api/auth/login", {
    method: "POST",
    body: { email: "OWNER@example.com", password: "a-long-admin-passphrase-2026" }
  });
  assert.equal(login.status, 200);
  assert.equal((await login.json()).isAdmin, true);
  const adminCookie = login.headers.get("set-cookie").split(";")[0];
  const list = await request("/api/admin/members", { cookie: adminCookie });
  assert.equal(list.status, 200);
  const result = await list.json();
  assert.equal(result.members.length, 1);
  assert.deepEqual(
    { name: result.members[0].name, email: result.members[0].email },
    { name: "Private Member", email: "member@example.com" }
  );
  assert.equal(Object.hasOwn(result.members[0], "password_hash"), false);
  assert.equal(Object.hasOwn(result.members[0], "passwordHash"), false);
});

test("rejects state-changing requests without a same-origin browser request", async () => {
  const response = await request("/api/auth/signup", {
    method: "POST",
    includeOrigin: false,
    body: { name: "A Traveller", email: "traveller@example.com", password: "a-secure-passphrase" }
  });
  assert.equal(response.status, 403);
});
