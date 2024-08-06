const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class', also darkMode increases bundle size noticeably
  theme: {
    textIndent: {
      none: "0rem",
      xs: "1rem",
      sm: "2rem",
      md: "3rem",
      lg: "4rem",
    },
    textShadow: {
      default: "0 2px 5px rgba(0, 0, 0, 0.5)",
      lg: "0 2px 10px rgba(0, 0, 0, 0.5)",
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        "16": "repeat(auto-fill, minmax(14rem, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      gridAutoRows: {
        "2fr": "8rem",
      },
      transitionProperty: {
        width: "width",
      },
      backgroundImage: {
        "background-dots-dark":
          "url(/images/background-top-dark.svg), url(/images/background-bottom-dark.svg)",
        "background-dots-light":
          "url(/images/background-top-light.svg), url(/images/background-bottom-light.svg)",
        "terms-condition-background-dark": "",
        "terms-condition-background-light": "",

        sidebar: "linear-gradient(#ccedf8 0%, #ccedf8 100%)",
        "sidebar-selected": "linear-gradient(#00a7dc 0%, #00a7dc 100%)",

        "tabs-dropdown": "linear-gradient( #00a7dc 0%, #00a7dc 100%)",

        "show-chart-enable": "linear-gradient( #00a7dc 0%, #00a7dc 100%)",
        "token-dropdown": "linear-gradient(#ccedf8 0%, #ccedf8 100%)",
        "footer-text": "linear-gradient(#9e62ff 0%, #9e62ff 100%)",

        entered: "linear-gradient(95.73deg, #087EE1 0%, #04C29C 100%)",

        confirm: "linear-gradient(95.73deg, #087EE1 0%, #04C29C 100%)",

        "quest-card": "linear-gradient(95.73deg, #087EE1 0%, #04C29C 100%)",

        "button-hover": "linear-gradient(#7fd3ed 0%, #7fd3ed 100%)",

        "tab-hover":
          "linear-gradient(95.73deg, rgba(8, 126, 225, 0.3) 0%, rgba(4, 194, 156, 0.3) 100%)",

        "dropdown-text-selected": "linear-gradient(#00a7dc 0%, #00a7dc 100%)",

        "alert-background": "linear-gradient( #f5efff 0%, #f5efff 100%)",
        "zee-header-bg":
          " linear-gradient(95.73deg, rgba(8, 126, 225, 0.06) 0%, rgba(4, 194, 156, 0.06) 100%)",

        arbitrum: "linear-gradient(270deg, #2D374B 0%, #5D6C89 100%)",
      },
      screens: {
        xs: "360px",
        xxl: "1920px",
        mdw: { raw: `(min-width: 960px)` },
        xsh: { raw: `(min-height: 360px)` },
        smh: { raw: `(min-height: 600px)` },
        mdh: { raw: `(min-height: 960px)` },
        lgh: { raw: `(min-height: 1280px)` },
        xlh: { raw: `(min-height: 1920px)` },
        mlgh: "1430px",
      },
      fontSizes: {
        "text-xxs": "10px",
      },
      colors: {
        /** PRIMARY */
        wallet: "#e1cfff",
        "primary-white": "#FFFFFF",
        "primary-black": "#000000",
        "primary-background": "#12131A",

        "primary-100": "#11142D",

        "t&c": "#808191",

        "primary-200": "#11142D99",

        "footer-message-text": "#696C80",

        "primary-300": "#626680",
        "primary-400": "#636780",
        "primary-500": "#B6B9CC",
        "primary-blue": "#448AFF",
        "primary-blue-100": "#03B1E3",
        "primary-error": "#ff5252",
        "primary-success": "#0fc679",
        "primary-success-20": "#0FC67933",
        "primary-warning": "#E59840",
        "gray-100": "#1b1e29",
        "gray-200": "#232734",
        "gray-300": "#252833",
        "gray-400": "#404557",
        "gray-500": "#8C93A3",
        up: "#50A76C",
        "up-100": "#69CC8D1A",
        down: "#B7444D",
        "down-100": "#E0476A1A",
        "card-default": "#D0CFD4",
        "card-active": "#69CC8D",
        "card-border": "#232B3B",

        "section-blue": "#232937",
        "primary-white-56": "#FFFFFF8F",
        "gray-opacity-50": "#696C8080",

        "screen-background": "#FFFFFF",
        "sidebar-border": "rgba(76, 175, 80, 0)",

        "sidebar-icon": "#11142D",
        "sidebar-selected-icon": "#FFFFFF",
        "content-background": "#FFFFFF",
        "asset-text": "#11142D",
        "potential-text": "#808191",
        "timer-text": "#11142D99",
        "show-chart": "#666171",
        "show-chart-enable-button": "#FFFFFF",
        "footer-icons": "rgba(17, 20, 45, 0.12)",
        "card-background": "#F6F6F7",
        "cards-border": "rgba(76, 175, 80, 0)",
        "primary-card-200": "#FFFFFFCC",

        "tabs-text": "#FAFAFA",
        "tabs-background": "#ccedf8",

        "vault-card": "#F6F6F7",
        "vault-card-border": "rgba(76, 175, 80, 0)",
        "quest-card-divider": "rgba(76, 175, 80, 0)",

        "quest-card-text": "#FAFAFA",

        "vault-deposit-strip": "#D9D9D9",

        "token-dropdown-border": " #11142D14",

        "wallet-text": "#FFFFFF",
        "token-dropdown-section": "#FFFFFF",
        "token-dropdown-selected": "#F6F6F7",
        "tooltip-background": "#FFFFFF",

        "tooltip-text": "#808191",

        "three-dot-stroke": "#808191",

        "quest-info-header": "#F6F6F7",

        toggle: "#11142D0A",

        "heart-selected": "#696C80",
        "heart-unselected": "#E7F5F3",
        "heart-hover": "#696C80",

        "heart-stroke-selected": "#696C80",
        "heart-stroke-unselected": "#696C80",
        "heart-stroke-hover": "#696C80",

        "history-section": "#F6F6F7",

        "collect-rewards": "#E8F5F3",

        "history-divider": "#F1F3F6",

        "info-text": "#11142D",
        "input-background": "#11142D0A",
        "input-border": "rgba(76, 175, 80, 0)",

        "asset-dropdown": "#F6F6F7",

        timer: "#F6F6F7",

        "card-info": "#F6F6F7",

        "card-section-border": "#CCCDD380",

        "live-card-border": "#80819166",

        "modal-content": "#F6F6F7",

        "quest-contract-section": "#E8F5F3",

        "quest-info": "#808191",

        "vault-card-hover": "#F6F6F7",

        "no-loss-color": "#00ECC2",

        "reward-token-color": "#448AFF",

        "toggle-bg": "#11142D0A",
        "tooltip-bg": "#FFFFFF",

        "asset-switch": "#FFFFFF",
        "cards-live-border": "#C7CAD9",
        "entered-text": "#C7CAD9",

        eth: "#215CAF",
        bsc: "#F0B90B",
        polygon: "#8247e5",
        avax: "#e84142",
        fantom: "#007bff",
        celo: "#35D07F",
        optimism: "#ff0420",
        "coachpoint-button": "#217BF4",
      },
      borderRadius: {
        small: "4px",
        large: "6px",
        timer: "4px",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        manrope: "Manrope",
        gilroy: "Gilroy",
        inter: ["Inter", "Inter"],
        nunitoSans: "NunitoSans",
      },
      boxShadow: {
        content: "0px 8px 160px rgba(17, 20, 45, 0.08)",
      },
    },
    fontSize: {
      xs: ["12px", "20px"],
      sm: ["14px", "22px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["30px", "36px"],
      "3xl": ["36px", "40px"],
    },
    fontWeight: {
      "extra-light": 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      "extra-bold": 800,
      black: 900,
    },
  },
  variants: {
    animation: ["responsive", "motion-safe", "motion-reduce"],
    textIndent: ["responsive"],
    extend: {},
  },
  plugins: [
    require("autoprefixer"),
    require("tailwindcss-typography")({
      // https://www.npmjs.com/package/tailwindcss-typography
      // all these options default to the values specified here
      ellipsis: true, // whether to generate ellipsis utilities
      hyphens: true, // whether to generate hyphenation utilities
      kerning: true, // whether to generate kerning utilities
      textUnset: true, // whether to generate utilities to unset text properties
      // componentPrefix: "c-", // the prefix to use for text style classes
    }),
    require("tailwindcss-rtl"),
    // Add custom plugins as such:
    plugin(({ addUtilities }) => {
      const extendTextTransform = {
        ".uppercase-first": {
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
        ".uppercase-firstOnly": {
          textTransform: "lowercase",
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(extendTextTransform, ["responsive"]);
    }),
  ],
};
