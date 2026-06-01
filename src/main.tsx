import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer AdSense script until after first paint to improve LCP/INP scores.
// The AdSense account meta tag stays in <head> for verification; loading the
// JS lazily removes its render-blocking impact on Core Web Vitals.
if (typeof window !== "undefined") {
  const loadAdsense = () => {
    if (document.querySelector("script[data-adsense-loaded]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3929937587842220";
    s.setAttribute("data-adsense-loaded", "true");
    document.head.appendChild(s);
  };
  if (document.readyState === "complete") {
    setTimeout(loadAdsense, 1500);
  } else {
    window.addEventListener(
      "load",
      () => setTimeout(loadAdsense, 1500),
      { once: true }
    );
  }
}
