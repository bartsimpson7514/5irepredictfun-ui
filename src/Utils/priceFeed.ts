import Web3 from "web3";
import {
    ODDZ_NETWORK,
    ODDZ_PRICE_MANAGER,
    PREDICT_TOKENS,
    binanceSourceChainId,
} from "@Constants";
import PriceManager from "@Contracts/PriceManager.json";
import { validNetwork } from "@Utils";
import { RPC_URLS } from "@Connectors";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;
export const returnAssetName = (assetName: string) => {
    if (assetName === "XAU") return "GOLD";
    if (assetName === "XAG") return "SILVER";
    return assetName;
};

const fetchTokenPrice = async tokenId => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[tokenId.toLowerCase()].usd;
};

const fetchKucoinPrice = async tokenId => {
    const currentTimestamp = new Date();
    currentTimestamp.setSeconds(0);
    const currentTimeEpoch = Math.floor(currentTimestamp.getTime() / 1000);
    const fiveMinutesBefore = currentTimeEpoch - 300; // 5 minutes in seconds

    const apiUrl = `https://65mvza57h4.execute-api.us-east-2.amazonaws.com/?symbol=${tokenId}&time=1min&begin=${fiveMinutesBefore}&end=${currentTimeEpoch}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const tlosPrice = data?.error ? 0 : Number(data.price);
        return tlosPrice;
    } catch (error) {
        return 0;
    }
};

const fetchPriceAws = async apiUrl => {
    try {
        const response = await fetch(apiUrl);

        const data = await response.json();

        const price = data?.error ? 0 : Number(data.price);

        return price;
    } catch (error) {
        return 0;
    }
};

async function fetchPrice(asset, selectedChain) {
    try {
        if (
            asset === PREDICT_TOKENS.MNT ||
            asset === PREDICT_TOKENS.TLOS ||
            asset === PREDICT_TOKENS.ZBC
        ) {
            let tokenPrice;
            if (asset === PREDICT_TOKENS.MNT) {
                tokenPrice = await fetchTokenPrice("bitdao");
            } else if (asset === PREDICT_TOKENS.tZBC) {
                tokenPrice = await fetchTokenPrice("zebec-protocol");
            } else if (asset === PREDICT_TOKENS.ZBC) {
                tokenPrice = await fetchPriceAws(
                    "https://jz23ptswjlt77avajdiacyq57u0xniis.lambda-url.us-east-2.on.aws"
                );
            } else if (asset === PREDICT_TOKENS.TLOS) {
                tokenPrice = await fetchKucoinPrice("TLOS-USDT");
            }

            return tokenPrice;
        }

        if (
            asset === PREDICT_TOKENS.ETH &&
            selectedChain === ODDZ_NETWORK.MANTA_MAINNET
        ) {
            const tokenPrice = await fetchPriceAws(
                "https://h7pjpvc2cd.execute-api.us-east-2.amazonaws.com/default/fetchEthOkxPrice"
            );
            return tokenPrice;
        }

        let fetchAsset = asset;
        if (asset === PREDICT_TOKENS.tcBNB) {
            fetchAsset = PREDICT_TOKENS.BNB;
        }

        const url = `https://api.binance.us/api/v3/ticker/price?symbol=${fetchAsset}USDT`;

        const response = await fetch(url);
        const data = await response.json();

        const { price } = data;
        return Number(price);
    } catch (error) {
        throw error;
    }
}

export const getLastPrice = async (
    asset: any,
    selectedChain: number,
    library: any
) => {
    try {
        if (binanceSourceChainId.includes(selectedChain)) {
            return fetchPrice(asset, selectedChain);
        }
        if (!NETWORK_URL) return {};
        const web3 = new Web3(
            library?.provider ||
                Web3.givenProvider ||
                new Web3.providers.HttpProvider(NETWORK_URL)
        );
        let lastPrice = 0;
        const currentChain = await web3.eth.getChainId();
        if (!validNetwork(currentChain)) {
            web3.setProvider(RPC_URLS[selectedChain]);
        }

        const priceManager = new web3.eth.Contract(
            PriceManager as any,
            ODDZ_PRICE_MANAGER[selectedChain]
        );

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (asset) {
            const price = await priceManager.methods
                .getPrice(
                    web3.utils.fromAscii(asset),
                    web3.utils.fromAscii("USD"),
                    currentTimestamp
                )
                .call();
            lastPrice = price.price;
        }

        return lastPrice / 1e8;
    } catch (err) {
        throw err;
    }
};
