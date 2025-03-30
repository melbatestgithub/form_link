import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files manually
import commentEn from "../public/locales/en/comment.json";
import commentFr from "../public/locales/fr/comment.json";
import pictureEn from "../public/locales/en/picture.json"
import pictureFr from "../public/locales/fr/picture.json"
import videoEn from "../public/locales/en/comment.json"
import videoFr from "../public/locales/fr/video.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        comment: commentEn,
        picture:pictureEn,
        video:videoEn
       
      },
      fr: {
        comment: commentFr,
        picture:pictureFr,
        video:videoFr
       
      },
    },
    lng: localStorage.getItem("language") || "en", // Load saved language
    fallbackLng: "fr",
    ns: ["comment,picture,video"], // Define multiple namespaces
    defaultNS: "comment", // Default namespace
    interpolation: {
      escapeValue: false,
    },
  }); 

export default i18n;
