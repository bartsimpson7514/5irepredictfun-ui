/* eslint-disable spaced-comment */
/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "fortmatic";

declare module "react-jazzicon";

declare module "react-alert";

declare module "tailwindcss/resolveConfig";
interface Window {
    ethereum?: {
        [x: string]: number;
        isMetaMask?: true;
        on?: (...args: any[]) => void;
        removeListener?: (...args: any[]) => void;
        request: (...args: any[]) => void;
    };
    web3?: {};
    gtag?: any;
    sdk: any;
    optionManager: any;
}

declare module "*.svg" {
    import React = require("react");

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: ReactComponent;
    export default src;
}

declare module "*.png" {
    const value: any;
    export = value;
}
