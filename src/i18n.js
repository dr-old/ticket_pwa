import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18next
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    lng: "en", // Default language
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to the translation files
    },
    detection: {
      // Order and from where user language should be detected
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    react: {
      useSuspense: false, // Set to false to avoid Suspense errors
    },
  });

export default i18n;
