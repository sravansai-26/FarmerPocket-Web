import { useEffect } from "react";
import { type ConsentPrefs } from "./CookieConsent";

const STORAGE_KEY = "pocketcover.cookie-consent";

export function ScriptLoader() {
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const prefs = JSON.parse(stored) as ConsentPrefs;

      // Analytics Scripts
      if (prefs.analytics) {
        // e.g. Google Analytics or PostHog
        // const script = document.createElement("script");
        // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXX";
        // script.async = true;
        // document.head.appendChild(script);
        console.log("Analytics scripts loaded");
      }

      // Marketing Scripts
      if (prefs.marketing) {
        // e.g. Facebook Pixel or LinkedIn Insight
        console.log("Marketing scripts loaded");
      }
    } catch (e) {
      console.error("Failed to load consent preferences", e);
    }
  }, []);

  return null;
}
