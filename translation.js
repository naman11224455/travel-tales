(() => {
  "use strict";

  const LANGUAGE_KEY = "traveltales-language";
  const CACHE_KEY = "traveltales-translation-cache";
  const LANGUAGE_OPTIONS = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी · Hindi" },
    { code: "mr", label: "मराठी · Marathi" },
    { code: "ta", label: "தமிழ் · Tamil" },
    { code: "ur", label: "اردو · Urdu" },
    { code: "fr", label: "Français · French" },
    { code: "es", label: "Español · Spanish" },
    { code: "ru", label: "Русский · Russian" }
  ];
  const languageSelect = document.querySelector("#site-language");
  const languageStatus = document.querySelector("#language-status");
  if (!languageSelect) return;

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const trackedTextNodes = new Set();
  const trackedAttributes = new Set();
  const translationCache = new Map();
  let selectedLanguage = "en";
  let requestVersion = 0;
  let mutationObserver;
  const rtlLanguages = new Set(["ar", "arc", "ary", "arz", "azb", "bal", "bgn", "bqi", "ckb", "dv", "fa", "glk", "he", "khw", "ks", "ku", "lrc", "mzn", "pnb", "ps", "sd", "ug", "ur", "yi"]);
  const translatableAttributes = ["alt", "aria-label", "placeholder", "title"];

  try {
    const savedCache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    Object.entries(savedCache).forEach(([key, value]) => {
      if (typeof value === "string") translationCache.set(key, value);
    });
  } catch {
    // Translation still works when browser storage is unavailable.
  }

  function showStatus(message, isError = false) {
    if (!languageStatus) return;
    languageStatus.textContent = message;
    languageStatus.classList.toggle("is-error", isError);
    languageStatus.closest(".language-control")?.classList.toggle("has-error", isError);
  }

  function cacheKey(language, text) {
    return `${language}\u0000${text}`;
  }

  function saveCache() {
    try {
      while (translationCache.size > 1200) translationCache.delete(translationCache.keys().next().value);
      localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(translationCache)));
    } catch {
      // A full or disabled localStorage must not block the page translation.
    }
  }

  function rememberText(node) {
    if (!originalText.has(node)) {
      originalText.set(node, node.nodeValue);
      trackedTextNodes.add(node);
    }
  }

  function rememberAttribute(element, name) {
    let attributes = originalAttributes.get(element);
    if (!attributes) {
      attributes = new Map();
      originalAttributes.set(element, attributes);
    }
    if (!attributes.has(name)) {
      attributes.set(name, element.getAttribute(name));
      trackedAttributes.add({ element, name });
    }
  }

  function collectNodes(root) {
    const textNodes = [];
    const attributeNodes = [];
    if (root.nodeType === Node.TEXT_NODE) {
      if (root.nodeValue.trim() && !root.parentElement?.closest("script, style, noscript, template, [translate='no'], [data-no-translate]")) {
        rememberText(root);
        textNodes.push(root);
      }
      return { textNodes, attributeNodes };
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, noscript, template, [translate='no'], [data-no-translate]")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      rememberText(walker.currentNode);
      textNodes.push(walker.currentNode);
    }

    const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll("*")] : [];
    elements.forEach((element) => {
      if (element.closest("[translate='no'], [data-no-translate]")) return;
      const attributes = element.matches('meta[name="description"]')
        ? [...translatableAttributes, "content"]
        : translatableAttributes;
      attributes.forEach((name) => {
        if (!element.hasAttribute(name)) return;
        rememberAttribute(element, name);
        attributeNodes.push({ element, name });
      });
    });
    return { textNodes, attributeNodes };
  }

  function restoreEnglish() {
    trackedTextNodes.forEach((node) => {
      if (node.isConnected) node.nodeValue = originalText.get(node);
    });
    trackedAttributes.forEach(({ element, name }) => {
      if (!element.isConnected) return;
      const value = originalAttributes.get(element)?.get(name);
      if (value !== null && value !== undefined) element.setAttribute(name, value);
    });
  }

  async function requestTranslations(language, texts) {
    const response = await fetch("/api/translation/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target: language, texts })
    });
    const result = await response.json();
    if (!response.ok || !Array.isArray(result.translations)) {
      throw new Error(result.error || "Translation request failed.");
    }
    return result.translations;
  }

  function getTranslationUnits(nodes, language) {
    return nodes.map((node) => {
      const original = originalText.get(node);
      const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
      return { node, original, prefix: match[1], text: match[2], suffix: match[3] };
    }).filter((unit) => unit.text && unit.node.isConnected && !translationCache.has(cacheKey(language, unit.text)));
  }

  async function translateTextNodes(nodes, language, version) {
    const units = getTranslationUnits(nodes, language);
    for (let index = 0; index < units.length; index += 30) {
      if (version !== requestVersion) return;
      const batch = units.slice(index, index + 30);
      const translations = await requestTranslations(language, batch.map((unit) => unit.text));
      if (version !== requestVersion) return;
      batch.forEach((unit, offset) => {
        translationCache.set(cacheKey(language, unit.text), translations[offset]);
        if (unit.node.isConnected) unit.node.nodeValue = `${unit.prefix}${translations[offset]}${unit.suffix}`;
      });
      saveCache();
    }
    nodes.forEach((node) => {
      if (!node.isConnected) return;
      const original = originalText.get(node);
      const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const translated = translationCache.get(cacheKey(language, match[2]));
      if (translated !== undefined) node.nodeValue = `${match[1]}${translated}${match[3]}`;
    });
  }

  async function translateAttributes(attributes, language, version) {
    const units = attributes.map((entry) => {
      const original = originalAttributes.get(entry.element)?.get(entry.name) || "";
      return { ...entry, original };
    }).filter((entry) => entry.original.trim() && entry.element.isConnected && !translationCache.has(cacheKey(language, entry.original)));

    for (let index = 0; index < units.length; index += 30) {
      if (version !== requestVersion) return;
      const batch = units.slice(index, index + 30);
      const translations = await requestTranslations(language, batch.map((unit) => unit.original));
      if (version !== requestVersion) return;
      batch.forEach((unit, offset) => translationCache.set(cacheKey(language, unit.original), translations[offset]));
      saveCache();
    }
    attributes.forEach(({ element, name }) => {
      if (!element.isConnected) return;
      const original = originalAttributes.get(element)?.get(name);
      const translated = translationCache.get(cacheKey(language, original));
      if (translated !== undefined) element.setAttribute(name, translated);
    });
  }

  async function translatePage(language, root = document.documentElement) {
    if (language === "en") return;
    const version = requestVersion;
    const { textNodes, attributeNodes } = collectNodes(root);
    await translateTextNodes(textNodes, language, version);
    if (version !== requestVersion) return;
    await translateAttributes(attributeNodes, language, version);
  }

  function setDocumentLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.has(language.split("-")[0]) ? "rtl" : "ltr";
  }

  function startObserving() {
    mutationObserver?.disconnect();
    mutationObserver = new MutationObserver((records) => {
      if (selectedLanguage === "en") return;
      const addedNodes = records.flatMap((record) => [...record.addedNodes])
        .filter((node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
      if (!addedNodes.length) return;
      const version = requestVersion;
      const textNodes = [];
      const attributeNodes = [];
      addedNodes.forEach((node) => {
        const collected = collectNodes(node);
        textNodes.push(...collected.textNodes);
        attributeNodes.push(...collected.attributeNodes);
      });
      translateTextNodes(textNodes, selectedLanguage, version)
        .then(() => translateAttributes(attributeNodes, selectedLanguage, version))
        .catch(() => showStatus("Some new text could not be translated.", true));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  languageSelect.addEventListener("change", async () => {
    const language = languageSelect.value;
    selectedLanguage = language;
    requestVersion += 1;
    restoreEnglish();
    setDocumentLanguage(language);
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // Keep the current language for this page even if storage is unavailable.
    }
    if (language === "en") {
      showStatus("Original language");
      return;
    }
    showStatus("Translating this page…");
    try {
      await translatePage(language);
      if (selectedLanguage === language) showStatus(`Translated to ${languageSelect.selectedOptions[0]?.textContent || language}`);
    } catch {
      if (selectedLanguage === language) showStatus("Translation failed. Check the server setup and try again.", true);
    }
  });

  fetch("/api/translation/languages")
    .then(async (response) => {
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("TravelTales API was not found. Run npm start and open http://localhost:3000.");
      }
      if (response.status === 404) {
        throw new Error("TravelTales API was not found. Run npm start and open http://localhost:3000.");
      }
      if (!response.ok || !Array.isArray(result.languages)) throw new Error(result.error || "Translation service is unavailable.");
      return result.languages;
    })
    .then((languages) => {
      const supportedCodes = new Set(languages.map((item) => item.code));
      const availableLanguages = LANGUAGE_OPTIONS.filter((item) => item.code === "en" || supportedCodes.has(item.code));
      const fragment = document.createDocumentFragment();
      availableLanguages.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.label;
        option.setAttribute("translate", "no");
        fragment.append(option);
      });
      languageSelect.replaceChildren(fragment);
      languageSelect.disabled = false;
      let savedLanguage = "en";
      try {
        savedLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";
      } catch {
        // Translation remains available without persisting the language choice.
      }
      if ([...languageSelect.options].some((option) => option.value === savedLanguage)) {
        languageSelect.value = savedLanguage;
        selectedLanguage = savedLanguage;
        setDocumentLanguage(savedLanguage);
      }
      startObserving();
      if (selectedLanguage !== "en") {
        showStatus("Translating this page…");
        translatePage(selectedLanguage)
          .then(() => showStatus(`Translated to ${languageSelect.selectedOptions[0]?.textContent || selectedLanguage}`))
          .catch(() => showStatus("Translation failed. Check the server setup and try again.", true));
      } else {
        showStatus(`${availableLanguages.length} languages available`);
      }
    })
    .catch((error) => {
      languageSelect.disabled = true;
      const message = error.message?.includes("not configured")
        ? "Set GEMINI_API_KEY in .env or .vscode/.env, then restart the server."
        : (error instanceof TypeError || /failed to fetch|networkerror/i.test(error.message || ""))
          ? "Cannot reach TravelTales API. Run npm start and open http://localhost:3000."
        : (error.message || "Translation is unavailable. Check the server setup.");
      showStatus(message, true);
    });
})();
