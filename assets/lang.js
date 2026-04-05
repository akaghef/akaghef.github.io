(function () {
  var storageKey = "akaghef-lang";
  var supported = ["en", "ja"];

  function getInitialLanguage() {
    try {
      var saved = localStorage.getItem(storageKey);
      if (saved === "en" || saved === "ja") {
        return saved;
      }
    } catch (error) {
    }

    var htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.indexOf("ja") === 0) {
      return "ja";
    }

    var browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.indexOf("ja") === 0) {
      return "ja";
    }

    return "en";
  }

  function setLanguage(lang) {
    if (supported.indexOf(lang) === -1) {
      lang = "en";
    }

    document.documentElement.setAttribute("data-lang-active", lang);
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-lang]");
    nodes.forEach(function (node) {
      var nodeLang = node.getAttribute("data-lang");
      node.hidden = nodeLang !== lang;
    });

    var buttons = document.querySelectorAll("[data-lang-toggle]");
    buttons.forEach(function (button) {
      button.textContent = lang === "en" ? "JA" : "EN";
      button.setAttribute("aria-label", lang === "en" ? "Switch language to Japanese" : "Switch language to English");
    });

    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = getInitialLanguage();
    setLanguage(lang);

    var buttons = document.querySelectorAll("[data-lang-toggle]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-lang-active") || "en";
        setLanguage(current === "en" ? "ja" : "en");
      });
    });
  });
})();
