/* eslint-disable import/no-extraneous-dependencies */
// import { AbstractConnector } from "@web3-react/abstract-connector";
import {
    frontierinjected,
    // fortmatic,
    metamaskinjected,
    // magicSetter,
    walletconnect,
    walletlink,
} from "../../Connectors";

export const WALLET_VIEWS = {
    OPTIONS: "options",
    OPTIONS_SECONDARY: "options_secondary",
    ACCOUNT: "account",
    PENDING: "pending",
    MAGICEMAIL: "magicemail",
};

export const EthereumWalletsLink = "https://ethereum.org/wallets/";
export const MagicWalletsLink = "https://magic.link/";

export interface WalletInfo {
    connector?: any;
    description: string;
    href: string | null;
    iconName: string | null;
    mobile?: true;
    mobileOnly?: true;
    name: string;
    primary?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
        connector: metamaskinjected,
        name: "Injected",
        iconName: null,
        description: "Injected web3 provider.",
        href: null,
        primary: true,
    },
    METAMASK: {
        connector: metamaskinjected,
        name: "MetaMask",
        iconName: "metamask.svg",
        description: "Easy-to-use browser extension.",
        href: null,
    },
    FRONTIER: {
        connector: frontierinjected,
        name: "Frontier",
        iconName: "frontier.png",
        description: "Easy-to-use browser extension.",
        href: null,
    },
    // FORTMATIC: {
    //     connector: fortmatic,
    //     name: "Fortmatic",
    //     iconName: "fortmaticIcon.png",
    //     description: "Login using Fortmatic hosted wallet",
    //     href: null,
    //     mobile: true,
    // },
    WALLET_CONNECT: {
        connector: walletconnect,
        name: "Wallet Connect",
        iconName: "walletConnectIcon.svg",
        description: "Connect to Trust Wallet, Rainbow Wallet and more...",
        href: null,
        mobile: true,
    },
    // Portis: {
    //     connector: portis,
    //     name: "Portis",
    //     iconName: "portisIcon.svg",
    //     description: "Login using Portis hosted wallet",
    //     href: null,
    //     mobile: true,
    // },
    WALLET_LINK: {
        connector: walletlink,
        name: "Coinbase",
        iconName: "coinbaseWalletIcon.svg",
        description: "Use Coinbase Wallet app on mobile device",
        href: null,
    },
    // COINBASE_LINK: {
    //   name: 'Open in Coinbase Wallet',
    //   iconName: 'coinbaseWalletIcon.svg',
    //   description: 'Open in Coinbase Wallet app.',
    //   href: 'https://go.cb-w.com/mtUDhEZPy1',
    //   color: '#315CF5',
    //   mobile: true,
    //   mobileOnly: true,
    // },

    // MAGICLINK: {
    //     connector: magicSetter,
    //     name: "Magiclink",
    //     iconName: "fortmaticIcon.png",
    //     description: "Login using magiclink hosted wallet",
    //     href: null,
    //     mobile: true,
    // },
};
