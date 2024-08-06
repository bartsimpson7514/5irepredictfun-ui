import { INTEGRATIONS, ODDZ_NETWORK } from "@Constants";

export enum Direction {
    UP,
    DOWN,
    TIE,
}

export const NetworkContextName = "NETWORK";

export const RealtimePriceTab = "REALTIME";

export const PnLTab = "PNL";

export const WSS_PRICE_FEED = "wss://ws-feed.gdax.com";

export const CG_PRICE_API = "https://api.coingecko.com/api/v3/simple/price";

export const CG_PRICE_ID: { [asset: string]: string } = {
    eth: "ethereum",
    wbtc: "wrapped-bitcoin",
};

export enum MARKET_STATUS {
    LIVE = "LIVE", // Market is live
    ACTIVE = "ACTIVE", // before the market has started but can bet (between 6.15pm to 7.00pm IST)
    PAUSED = "PAUSED", // Market is paused
}

export enum ChainId {
    BSCMainnet = 56,
    BSCTestnet = 97,
    MaticMainnet = 137,
    MaticTestnet = 80001,
    AvaxTestnet = 43113,
    AvaxMainnet = 43114,
    ArbitrumMainnet = 42161,
    ZkSyncTestnet = 280,
    ZkSyncMainet = 324,
    MantleTestnet = 5001,
    MantleMainnet = 5000,
    opBNBTestnet = 5611,
    PolygonZkEVM = 1101,
    NautilusTritonTestnet = 91002,
    Nautilus = 22222,
    TelosMainnet = 40,
    RolluxMainnet = 570,
    MantaMainnet = 169,
}

export type BHAVISH_NETWORK = typeof ODDZ_NETWORK;

export const PREDICTION_SECTIONS = {
    PREDICT: "PREDICT",
    CARD: "CARD",
    CHART: "CHART",
    HISTORY: "HISTORY",
    LEADERBOARD: "LEADERBOARD",
};

export const HISTORY_TYPE = {
    ROUNDS: 0,
    PNL: 1,
};

export const SUPPORTED_NETWORKS = {
    [INTEGRATIONS.BHAVISH]: {
        mainnet: [
            {
                id: 0,
                networkName: "BNB chain",
                chainId: 56,
                isActive: false,
            },
            {
                id: 1,
                networkName: "Polygon",
                chainId: 137,
                isActive: true,
            },
            {
                id: 2,
                networkName: "Polygon zkEVM",
                chainId: 1101,
                isActive: true,
            },
            {
                id: 4,
                networkName: "zkSync Era Mainnet",
                chainId: 324,
                isActive: true,
            },
            {
                id: 4,
                networkName: "Arbitrum",
                chainId: 42161,
                isActive: false,
            },
            {
                id: 5,
                networkName: "ZkSyncTestnet",
                chainId: 280,
                isActive: false,
            },
            {
                id: 6,
                networkName: "Mantle",
                chainId: 5000,
                isActive: true,
            },
            {
                id: 7,
                networkName: "Telos EVM Mainnet",
                chainId: 40,
                isActive: true,
            },
            {
                id: 8,
                networkName: "Rollux Mainnet",
                chainId: 570,
                isActive: true,
            },
            {
                id: 9,
                networkName: "Nautilus",
                chainId: 22222,
                isActive: true,
            },
            {
                id: 10,
                networkName: "Manta Pacific",
                chainId: 169,
                isActive: true,
            },
        ],
        testnet: [
            {
                id: 0,
                networkName: "opBNB Testnet",
                chainId: 5611,
                isActive: true,
            },
            {
                id: 1,
                networkName: "Mantle Testnet",
                chainId: 5001,
                isActive: true,
            },
        ],
    },

    [INTEGRATIONS.QUICKSWAP]: {
        mainnet: [
            {
                id: 1,
                networkName: "Polygon",
                chainId: 137,
                isActive: true,
            },
        ],
        testnet: [],
    },
    [INTEGRATIONS.ZEROSWAP]: {
        mainnet: [
            {
                id: 0,
                networkName: "BNB chain",
                chainId: 56,
                isActive: false,
            },
            {
                id: 1,
                networkName: "Polygon",
                chainId: 137,
                isActive: true,
            },
            {
                id: 2,
                networkName: "Polygon zkEVM",
                chainId: 1101,
                isActive: false,
            },
            {
                id: 4,
                networkName: "zkSync Era Mainnet",
                chainId: 324,
                isActive: false,
            },
            {
                id: 4,
                networkName: "Arbitrum",
                chainId: 42161,
                isActive: false,
            },
            {
                id: 5,
                networkName: "ZkSyncTestnet",
                chainId: 280,
                isActive: false,
            },
            {
                id: 6,
                networkName: "Mantle",
                chainId: 5000,
                isActive: false,
            },
            {
                id: 7,
                networkName: "Telos EVM Mainnet",
                chainId: 40,
                isActive: false,
            },
            {
                id: 8,
                networkName: "Rollux Mainnet",
                chainId: 570,
                isActive: false,
            },
            {
                id: 9,
                networkName: "Nautilus",
                chainId: 22222,
                isActive: false,
            },
            {
                id: 10,
                networkName: "Manta Pacific",
                chainId: 169,
                isActive: false,
            },
        ],
        testnet: [],
    },
    [INTEGRATIONS.ONYX]: {
        mainnet: [
            {
                id: 0,
                networkName: "Arbitrum",
                chainId: 42161,
                isActive: true,
            },
        ],
        testnet: [],
    },
    [INTEGRATIONS.ZEBEC]: {
        mainnet: [
            {
                id: 0,
                networkName: "Nautilus",
                chainId: 22222,
                isActive: true,
            },
        ],
        testnet: [
            {
                id: 0,
                networkName: "Nautilus Triton Testnet",
                chainId: 91002,
                isActive: true,
            },
        ],
    },
};
export const chartParams: any = {
    ETH: {
        id: "tradingview_68163",
        symbol: "BINANCEUS:ETHUSDT",
        proName: "BINANCEUS:ETHUSDT",
        title: "Ethereum",
    },
    BTC: {
        id: "tradingview_720e7",
        symbol: "BINANCEUS:BTCUSDT",
        proName: "BINANCEUS:BTCUSDT",
        title: "Bitcoin",
    },
    MATIC: {
        id: "tradingview_2b8b4",
        symbol: "BINANCEUS:MATICUSDT",
        proName: "BINANCEUS:MATICUSDT",
        title: "Matic",
    },
    BNB: {
        id: "tradingview_14d34",
        symbol: "BINANCEUS:BNBUSDT",
        proName: "BINANCEUS:BNBUSDT",
        title: "BNB",
    },
    TLOS: {
        id: "tradingview_14d34",
        symbol: "KUCOIN:TLOSUSDT",
        proName: "KUCOIN:TLOSUSDT",
        title: "TLOS",
    },
    ZBC: {
        id: "tradingview_14d34",
        symbol: "OKX:ZBCUSDT",
        proName: "OKX:ZBCUSDT",
        title: "ZBC",
    },
    TSLA: {
        id: "tradingview_0deb5",
        symbol: "NASDAQ:TSLA",
        proName: "NASDAQ:TSLA",
        title: "Tesla",
    },
    APPL: {
        id: "tradingview_cddfc",
        symbol: "NASDAQ:AAPL",
        proName: "NASDAQ:AAPL",
        title: "Apple",
    },
    AMZN: {
        id: "tradingview_667b0",
        symbol: "NASDAQ:AMZN",
        proName: "NASDAQ:AMZN",
        title: "Amazon",
    },
    XAU: {
        id: "tradingview_4c9f2",
        symbol: "TVC:GOLD",
        proName: "TVC:GOLD",
        title: "Gold",
    },
    XAG: {
        id: "tradingview_3e00f",
        symbol: "TVC:SILVER",
        proName: "TVC:SILVER",
        title: "Silver",
    },
    ARB: {
        id: "tradingview_3e00f",
        symbol: "COINBASE:ARBUSD",
        proName: "COINBASE:ARBUSD",
        title: "Arbitrum",
    },
};

export const BHAVISH_TOKENS = ["BG", "BR"];

export enum TransactionSpeed {
    Standard = "STANDARD",
    Fast = "FAST",
    Instant = "INSTANT",
}

export const SWITCHNETWORK_MESSAGE = {
    [INTEGRATIONS.BHAVISH]: [
        {
            id: 1,
            switchNetworkId: 56,
            isActive: true,
            message: "Switch to start exploring Nexter",
        },
    ],
    [INTEGRATIONS.QUICKSWAP]: [
        {
            id: 2,
            switchNetworkId: 137,
            isActive: true,
            message: "Switch to Polygon start exploring Nexter",
        },
    ],
    [INTEGRATIONS.ZEROSWAP]: [
        {
            id: 2,
            switchNetworkId: 137,
            isActive: true,
            message: "Switch to Polygon start exploring Nexter",
        },
    ],
    [INTEGRATIONS.ONYX]: [
        {
            id: 1,
            switchNetworkId: 42161,
            isActive: true,
            message: "Switch to Arbitrum start exploring Nexter",
        },
    ],
    [INTEGRATIONS.ZEBEC]: [
        {
            id: 1,
            switchNetworkId: 22222,
            isActive: true,
            message: "Switch to Nautilus start exploring Bayes",
        },
    ],
};
