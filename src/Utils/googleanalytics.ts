// log the pageview with their URL
export const pageview = url => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    });
};

// log specific events happening.
export const gaEvent = ({ action, params }) => {
    if (window.gtag) window.gtag("event", action, params);
};

export const handleGaEvent = (message, params = {}) => {
    const chainId = window?.ethereum?.networkVersion || 137;
    gaEvent({
        action: message,
        params: { ...params, chainId },
    });
};
