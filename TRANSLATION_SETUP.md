# Website translation setup

TravelTales uses the Gemini API to translate all five pages, including text added later by the planner and advice forms. The language selector offers English, Hindi, Marathi, Tamil, Urdu, French, Spanish, and Russian. Machine translation may make mistakes.

## Configure Gemini

1. Create a Gemini API key in Google AI Studio. Restrict the key to the Gemini API and set appropriate quota controls in your Google project.
2. Revoke any key shared in chat, screenshots, source files, or another public place, then create a replacement. Treat exposed keys as compromised.
3. Add the replacement key to the project-root `.env` file:

   ```text
   GEMINI_API_KEY=your-new-key
   ```

   If you are using the existing `.vscode/.env` instead, add the key there. At startup the server loads the project-root `.env` when it exists, otherwise it falls back to `.vscode/.env`.
4. Run `npm start`, then open `http://localhost:3000`. Opening an HTML file directly or using VS Code Live Server does not connect to the TravelTales API.
5. The language selector will offer the eight languages listed above once the server is running with `GEMINI_API_KEY` configured.

Keep `.env` private. Do not put the API key in HTML, browser JavaScript, screenshots, or chat. Without this key, the site stays in English and the selector reports that translation is not configured.

Translation requests go from the server to Gemini, so the key is not sent to visitors' browsers. The browser caches translated text locally to reduce repeat requests. Gemini API usage is subject to Google's current quota and billing terms.
