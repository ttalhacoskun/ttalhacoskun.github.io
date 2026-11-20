// Neon Pulse — EN/TR language switch.
// English is the default (no stored preference, so store reviewers always land on EN).
// Use ?lang=tr to link directly to the Turkish version.
(function () {
  var supported = ["en", "tr"];
  var params = new URLSearchParams(window.location.search);
  var initial = params.get("lang");
  if (supported.indexOf(initial) === -1) initial = "en";

  function apply(lang, push) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (a) {
      a.setAttribute("aria-current", String(a.getAttribute("data-set-lang") === lang));
    });
    var title = document.querySelector('meta[name="np-title-' + lang + '"]');
    if (title) document.title = title.content;
    if (push) {
      var url = new URL(window.location.href);
      if (lang === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      apply(a.getAttribute("data-set-lang"), true);
      window.scrollTo({ top: 0 });
    });
  });

  apply(initial, false);

  // Sections of the non-default language are hidden at first paint, so the
  // browser can't jump to a #hash inside them on its own — do it after applying.
  function jumpToHash() {
    if (window.location.hash.length < 2) return;
    var target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
  }
  jumpToHash();
  window.addEventListener("load", jumpToHash);

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
