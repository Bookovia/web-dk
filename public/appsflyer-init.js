// AppsFlyer initialization script
!((t, e, n, s, a, c, i, o, p) => {
  ;(t.AppsFlyerSdkObject = a),
    (t.AF =
      t.AF ||
      (() => {
        ;(t.AF.q = t.AF.q || []).push([Date.now()].concat(Array.prototype.slice.call(arguments)))
      })),
    (t.AF.id = t.AF.id || i),
    (t.AF.plugins = {}),
    (o = e.createElement(n)),
    (p = e.getElementsByTagName(n)[0]),
    (o.async = 1),
    (o.src =
      "https://websdk.appsflyer.com?" +
      (c.length > 0 ? "st=" + c.split(",").sort().join(",") + "&" : "") +
      (i.length > 0 ? "af_id=" + i : "")),
    p.parentNode.insertBefore(o, p)
})(window, document, "script", 0, "AF", "banners", { banners: { key: "04be7a84-fb60-4025-8278-af2f45a7e0ef" } })

// Wait for the script to load before showing the banner
window.addEventListener("load", () => {
  // Add a small delay to ensure the AF object is fully initialized
  setTimeout(() => {
    try {
      if (window.AF && typeof window.AF === "function") {
        window.AF("banners", "showBanner")
      } else {
        console.warn("AppsFlyer AF object not available")
      }
    } catch (e) {
      console.error("Error showing AppsFlyer banner:", e)
    }
  }, 1000)
})
