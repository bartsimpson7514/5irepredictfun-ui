module.exports = {
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
  },
  defaultNS: "common",
  react: { useSuspense: false }, //TEMP
  reloadOnPrerender: process.env.NODE_ENV !== "production", // DEVELOPMENT-ONLY, IMPORTANT!
};
