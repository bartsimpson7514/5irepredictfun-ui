/* eslint-disable no-return-assign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3Provider } from "@ethersproject/providers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ODDZ_NETWORK } from "@Constants";
import { MagicConnector } from "./magic";
import { MagicConnectorSocial } from "./magicOAuth";
import { FortmaticConnector } from "./Fortmatic";
import { NetworkConnector } from "./NetworkConnector";
import { InjectedConnector as FrontierConnected } from "./FrontierInjectedConnector";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;
const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY;
const MAGICLINK_KEY = process.env.NEXT_PUBLIC_MAGICLINK_KEY;
const PORTIS_ID = process.env.NEXT_PUBLIC_PORTIS_ID;

export const NETWORK_CHAIN_ID: number = parseInt(
    process.env.NEXT_PUBLIC_CHAIN_ID ?? "1",
    10
);

if (typeof NETWORK_URL === "undefined") {
    throw new Error(`NETWORK_URL must be a defined environment variable`);
}

export const network = new NetworkConnector({
    urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary =
        networkLibrary ?? new Web3Provider(network.provider as any));
}

const chainIds = [1, 3, 4, 5, 42, 56, 97, 137, 80001, 43114];

export const RPC_URLS: { [chainId: number]: string } = {
    [ODDZ_NETWORK.BSC_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_56,
    [ODDZ_NETWORK.BSC_TEST]: process.env.NEXT_PUBLIC_RPC_URL_97,
    [ODDZ_NETWORK.MATIC_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_137,
    [ODDZ_NETWORK.MATIC_TEST]: process.env.NEXT_PUBLIC_RPC_URL_80001,
    [ODDZ_NETWORK.AVAX_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_43114,
    [ODDZ_NETWORK.AVAX_TESTNET]: process.env.NEXT_PUBLIC_RPC_URL_43113,
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_42161,
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: process.env.NEXT_PUBLIC_RPC_URL_280,
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_324,
    [ODDZ_NETWORK.POLYGON_ZKEVM]: process.env.NEXT_PUBLIC_RPC_URL_1101,
    [ODDZ_NETWORK.MANTLE_TESTNET]: process.env.NEXT_PUBLIC_RPC_URL_5001,
    [ODDZ_NETWORK.OPBNB_TESTNET]: process.env.NEXT_PUBLIC_RPC_URL_5611,
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
        process.env.NEXT_PUBLIC_RPC_URL_91002,
    [ODDZ_NETWORK.NAUTILUS]: process.env.NEXT_PUBLIC_RPC_URL_22222,
    [ODDZ_NETWORK.MANTLE_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_5000,
    [ODDZ_NETWORK.TELOS_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_40,
    [ODDZ_NETWORK.ROLLUX_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_570,
    [ODDZ_NETWORK.MANTA_MAINNET]: process.env.NEXT_PUBLIC_RPC_URL_169,
};
export const metamaskinjected = new InjectedConnector({
    supportedChainIds: [
        1,
        3,
        4,
        10,
        42,
        420,
        97,
        56,
        137,
        80001,
        43113,
        42161,
        43114,
        421611,
        42161,
        1285,
        1284,
        250,
        280,
        324,
        5001,
        5000,
        5611,
        1101,
        91002,
        22222,
        40,
        570,
        169,
    ],
});

export const frontierinjected = new FrontierConnected({
    supportedChainIds: [
        1,
        3,
        4,
        10,
        42,
        420,
        97,
        56,
        137,
        80001,
        43113,
        42161,
        43114,
        421611,
        1285,
        1284,
        250,
        280,
        324,
        5001,
        5000,
        5611,
        1101,
        91002,
        22222,
        40,
        570,
        169,
    ],
});

export const walletconnect = new WalletConnectConnector({
    rpc: chainIds.reduce(
        (acc, chainId) => ({ ...acc, [chainId]: RPC_URLS[chainId] }),
        {}
    ),
    supportedChainIds: chainIds,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

// mainnet only
export const fortmatic = new FortmaticConnector({
    apiKey: FORTMATIC_KEY ?? "",
    chainId: 1,
});

export const magicSetter = (
    emailSocial,
    isSocialLogin,
    previousLogin = "",
    cancelCallback = () => {},
    selectedChainId
) => {
    try {
        if (isSocialLogin) {
            return new MagicConnectorSocial({
                apiKey: MAGICLINK_KEY as string,
                chainId: selectedChainId,
                loginSocial: emailSocial,
                previousLogin,
                cancelCallback,
            });
        }

        return new MagicConnector({
            apiKey: MAGICLINK_KEY as string,
            chainId: selectedChainId,
            email: emailSocial,
            cancelCallback,
        });
    } catch (err) {
        throw err;
    }
};

// mainnet only
export const portis = new PortisConnector({
    dAppId: PORTIS_ID ?? "",
    networks: [137],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
    url: NETWORK_URL,
    appName: "Uniswap",
    appLogoUrl:
        "https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg",
});
