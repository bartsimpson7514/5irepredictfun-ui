/* eslint-disable global-require */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: require("../../public/locales/en/common.json"),
  },
  sp: {
    translation: require("../../public/locales/sp/common.json"),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.languages = ["en-UK", "sp"];
export default i18n;
/* eslint-enable global-require */
