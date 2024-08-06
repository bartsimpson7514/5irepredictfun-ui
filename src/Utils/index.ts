/* eslint-disable import/no-extraneous-dependencies */
import { ODDZ_NETWORK, PREDICT_TOKENS, binanceSourceChainId } from "@Constants";
import { getAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";
import ERC20ABI from "@Contracts/erc-20.json";
import { QuestState } from "@Components/Quests/constants";
import {
    CG_PRICE_API,
    CG_PRICE_ID,
    ChainId,
    SUPPORTED_NETWORKS,
    TransactionSpeed,
} from "../Components/Constants";
import { getGasPrice } from "./common";
import { userWithdrawableBalance } from "./bhavishPool";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const toDecimals = (value, decimal = 4) => {
    return Math.floor(Number(value) * 10 ** decimal) / 10 ** decimal;
    // : 0;
};

export const returnTruncatedPrice = value => {
    if (Number(value) < 10) {
        return toDecimals(Number(value), 6);
    }
    return toDecimals(Number(value), 5);
};

export const priceSource = (chainId, predictableToken) => {
    if (
        chainId === ChainId.TelosMainnet &&
        predictableToken === PREDICT_TOKENS.TLOS
    ) {
        return "Kucoin";
    }
    if (
        (chainId === ChainId.Nautilus &&
            predictableToken === PREDICT_TOKENS.ZBC) ||
        (chainId === ChainId.MantaMainnet &&
            predictableToken === PREDICT_TOKENS.ETH)
    ) {
        return "Okx";
    }
    if (binanceSourceChainId.includes(chainId)) {
        return "BinanceUS";
    }
    return "Chainlink Oracle";
};

export const TokenSupported = chain => {
    switch (chain) {
        case ChainId.MaticMainnet:
            return [
                {
                    label: "MATIC",
                    description: "MATIC",
                    subDescription: "",
                    icon: "matic.png",
                    isNew: false,
                    isComingSoon: false,
                },
                {
                    label: "BGN",
                    description: "BGN",
                    subDescription: "Capital Protected",
                    icon: "bhavish-lossless-chip.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.BSCMainnet:
            return [
                {
                    label: "BNB",
                    description: "BNB",
                    subDescription: "",
                    icon: "bnb.png",
                    isNew: false,
                    isComingSoon: false,
                },
                {
                    label: "BGN",
                    description: "BGN",
                    subDescription: "Capital Protected",
                    icon: "bhavish-lossless-chip.png",
                    isNew: false,
                    isComingSoon: true,
                },
            ];
        case ChainId.BSCTestnet:
            return [
                {
                    label: "BNB",
                    description: "BNB",
                    subDescription: "",
                    icon: "bnb.png",
                    isNew: false,
                    isComingSoon: false,
                },
                {
                    label: "BGN",
                    description: "BGN",
                    subDescription: "Capital Protected",
                    icon: "bhavish-lossless-chip.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.ArbitrumMainnet:
            return [
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.ZkSyncTestnet:
            return [
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.ZkSyncMainet:
            return [
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.MantleTestnet:
            return [
                {
                    label: "MNT",
                    description: "MNT",
                    subDescription: "",
                    icon: "MNT.svg",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.MantleMainnet:
            return [
                {
                    label: "MNT",
                    description: "MNT",
                    subDescription: "",
                    icon: "MNT.svg",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.opBNBTestnet:
            return [
                {
                    label: "tcBNB",
                    description: "tcBNB",
                    subDescription: "",
                    icon: "bnb.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.PolygonZkEVM:
            return [
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.MantaMainnet:
            return [
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.TelosMainnet:
            return [
                {
                    label: "TLOS",
                    description: "TLOS",
                    subDescription: "",
                    icon: "telos.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.RolluxMainnet:
            return [
                {
                    label: "SYS",
                    description: "SYS",
                    subDescription: "",
                    icon: "SYS.svg",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.NautilusTritonTestnet:
            return [
                {
                    label: "tZBC",
                    description: "tZBC",
                    subDescription: "",
                    icon: "tZBC.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        case ChainId.Nautilus:
            return [
                {
                    label: "ZBC",
                    description: "ZBC",
                    subDescription: "",
                    icon: "ZBC.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
        default:
            return [
                {
                    label: "MATIC",
                    description: "MATIC",
                    subDescription: "",
                    icon: "matic.png",
                    isNew: false,
                    isComingSoon: false,
                },
                {
                    label: "BNB",
                    description: "BNB",
                    subDescription: "",
                    icon: "bnb.png",
                    isNew: false,
                    isComingSoon: false,
                },
                {
                    label: "BGN",
                    description: "BGN",
                    subDescription: "Capital Protected",
                    icon: "bhavish-lossless-chip.png",
                    isNew: true,
                    isComingSoon: false,
                },
                {
                    label: "ETH",
                    description: "ETH",
                    subDescription: "",
                    icon: "ethereum.png",
                    isNew: true,
                    isComingSoon: false,
                },
            ];
    }
};

export function isAddress(value: any): string | false {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
}

export const initialPredictableToken = selectedChain => {
    switch (selectedChain) {
        case ChainId.MaticMainnet:
            return PREDICT_TOKENS.MATIC;
        case ChainId.BSCMainnet:
            return PREDICT_TOKENS.BNB;
        case ChainId.BSCTestnet:
            return PREDICT_TOKENS.BNB;
        case ChainId.ArbitrumMainnet:
            return PREDICT_TOKENS.ETH;
        case ChainId.ZkSyncTestnet:
            return PREDICT_TOKENS.ETH;
        case ChainId.ZkSyncMainet:
            return PREDICT_TOKENS.ETH;
        case ChainId.MantleTestnet:
            return PREDICT_TOKENS.MNT;
        case ChainId.opBNBTestnet:
            return PREDICT_TOKENS.tcBNB;
        case ChainId.NautilusTritonTestnet:
            return PREDICT_TOKENS.tZBC;
        case ChainId.Nautilus:
            return PREDICT_TOKENS.ZBC;
        case ChainId.MantleMainnet:
            return PREDICT_TOKENS.MNT;
        case ChainId.TelosMainnet:
            return PREDICT_TOKENS.TLOS;
        case ChainId.PolygonZkEVM:
            return PREDICT_TOKENS.ETH;
        case ChainId.RolluxMainnet:
            return PREDICT_TOKENS.SYS;
        case ChainId.MantaMainnet:
            return PREDICT_TOKENS.ETH;
        default:
            return PREDICT_TOKENS.MATIC;
    }
};

export function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(
            Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
    }, []);
}

export const fetcher = (library: any, abi?: any) => (...args) => {
    const [arg1, arg2, ...params] = args;
    // it's a contract
    if (isAddress(arg1)) {
        const address = arg1;
        const method = arg2;
        const contract = new Contract(address, abi, library.getSigner());
        return contract[method](...params);
    }
    // it's a eth call
    const method = arg1;
    return library[method](arg2, ...params);
};

//  shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 0): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
        42 - chars
    )}`;
}

export function shortenName(address: string, chars = 4): string {
    return `${address.substring(0, chars + 2)}${
        address.length < chars ? "" : "..."
    }`;
}

export function kFormatter(num) {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}G`;
    }
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return num;
}

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
    1: "",
    3: "ropsten.",
    4: "rinkeby.",
    5: "goerli.",
    42: "kovan.",
    97: "testnet.",
    56: "",
    43113: "testnet.",
    137: "polygonscan.",
    42161: "arbiscan.",
    280: "zksync2-testnet.",
    324: "explorer.",
    5001: "explorer.testnet.",
    91002: "triton.",
    22222: "",
    5000: "explorer.",
    5611: "opbnbscan.",
    1101: "zkevm.",
    40: "teloscan.",
    570: "explorer.",
    169: "pacific-explorer.",
};

const ETHERSCAN_POSTFIXES: { [chainId: number]: string } = {
    1: "etherscan.io",
    3: "etherscan.io",
    4: "etherscan.io",
    5: "etherscan.io",
    42: "etherscan.io",
    97: "bscscan.com",
    56: "bscscan.com",
    43113: "snowtrace.io",
    137: "com",
    42161: "io",
    280: "zkscan.io",
    324: "zksync.io",
    5001: "mantle.xyz",
    5000: "mantle.xyz",
    5611: "com",
    1101: "polygonscan.com",
    91002: "nautscan.com",
    22222: "nautscan.com",
    40: "io",
    570: "rollux.com",
    169: "manta.network",
};
export function getEtherscanLink(
    chainId: number,
    data: string,
    type: "transaction" | "token" | "address" | "block"
): string {
    const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ||
        ETHERSCAN_PREFIXES[1]}${ETHERSCAN_POSTFIXES[chainId] ||
        ETHERSCAN_POSTFIXES[1]}`;

    switch (type) {
        case "transaction": {
            return `${prefix}/tx/${data}`;
        }
        case "token": {
            return `${prefix}/token/${data}`;
        }
        case "block": {
            return `${prefix}/block/${data}`;
        }
        case "address":
        default: {
            return `${prefix}/address/${data}`;
        }
    }
}

export const getFiat = async (asset: string) => {
    const res = await fetch(
        `${CG_PRICE_API}?ids=${CG_PRICE_ID[asset]}&vs_currencies=usd`
    );
    const fiat = await res.json();
    return fiat[CG_PRICE_ID[asset]].usd;
};

export const hasParentClass = (element: any, classname: string): boolean => {
    //
    // If we are here we didn't find the searched class in any parents node
    //
    if (!element.parentNode) return false;
    //
    // If the current node has the class return true, otherwise we will search
    // it in the parent node
    //

    const classes = String(element?.className || "").split(" ");
    if (!classes || !classes.length) return false;
    if (classes.indexOf(classname) >= 0) return true;
    return hasParentClass(element.parentNode, classname);
};

// export const fetchGasPriceBackup = async library => {
//     // Need to make it generic
//     let gasdata;
//     await fetch(
//         `https://owlracle.info/poly/gas?apiKey=${process.env.NEXT_PUBLIC_OWLRACLE_API}`
//     )
//         .then(response => response.json())
//         .then(data => {
//             gasdata = {
//                 SafeGasPrice: toDecimals(data.speeds[1].gasPrice, 1),
//                 ProposeGasPrice: toDecimals(data.speeds[2].gasPrice, 1),
//                 FastGasPrice: toDecimals(data.speeds[3].gasPrice, 1),
//             };
//         })
//         .catch(async () => {
//             const gasPriceResult: any = await getGasPrice(library);
//             gasdata = {
//                 SafeGasPrice: toDecimals(gasPriceResult / 1e9, 1),
//                 ProposeGasPrice: toDecimals(
//                     Math.round(gasPriceResult * 1.3) / 1e9,
//                     1
//                 ),
//                 FastGasPrice: toDecimals(
//                     Math.round(gasPriceResult * 1.5) / 1e9,
//                     1
//                 ),
//             };
//         });
//     return gasdata;
// };

export const fetchGasPrice = async (library, selectedChainId) => {
    // Need to make it generic
    let gasdata;
    // eslint-disable-next-line no-underscore-dangle
    if (selectedChainId === ChainId.MaticMainnet) {
        await fetch(
            `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_POLYSCAN_API}`
        )
            .then(response => response.json())
            .then(data => {
                if (!data.result.SafeGasPrice) {
                    throw new Error("No result from gas oracle");
                }
                gasdata = {
                    SafeGasPrice: data.result.SafeGasPrice,
                    ProposeGasPrice: data.result?.ProposeGasPrice,
                    FastGasPrice: data.result?.FastGasPrice,
                };
            })
            .catch(async () => {
                const gasPriceResult: any = await getGasPrice(library);
                gasdata = {
                    SafeGasPrice: toDecimals(gasPriceResult / 1e9, 1),
                    ProposeGasPrice: toDecimals(
                        Math.round(gasPriceResult * 1.5) / 1e9,
                        1
                    ),
                    FastGasPrice: toDecimals(
                        Math.round(gasPriceResult * 1.7) / 1e9,
                        1
                    ),
                };
            });
    } else if (selectedChainId === ODDZ_NETWORK.MANTA_MAINNET) {
        gasdata = {
            SafeGasPrice: "0.0001",
            ProposeGasPrice: "0.0001",
            FastGasPrice: "0.0001",
        };
    } else if (selectedChainId === ODDZ_NETWORK.MANTLE_TESTNET) {
        gasdata = {
            SafeGasPrice: "0.000000001",
            ProposeGasPrice: "0.000000001",
            FastGasPrice: "0.0000000001",
        };
    } else {
        const gasPriceResult: any = await getGasPrice(library);
        gasdata = {
            SafeGasPrice: toDecimals(gasPriceResult / 1e9, 4),
            ProposeGasPrice: toDecimals(
                Math.round(gasPriceResult * 1.5) / 1e9,
                4
            ),
            FastGasPrice: toDecimals(Math.round(gasPriceResult * 1.7) / 1e9, 4),
        };
    }

    return gasdata;
};

export const fetchGas = async (
    library,
    transactionSpeedOption,
    selectedChainId
) => {
    const gasPriceRes = await fetchGasPrice(library, selectedChainId);

    // Need to make it generic
    // await fetch(
    //     `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken`
    // )
    //     .then(response => response.json())
    //     .then(data => {
    //         gasPriceRes = data.result;
    //     });

    switch (transactionSpeedOption) {
        case TransactionSpeed.Standard:
            return gasPriceRes.SafeGasPrice;
        case TransactionSpeed.Fast:
            return gasPriceRes.ProposeGasPrice;
        case TransactionSpeed.Instant:
            return gasPriceRes.FastGasPrice;
        default:
            return gasPriceRes.FastGasPrice;
    }
};

export function validNetwork(chainId: number | undefined) {
    const validChainId = [];
    // eslint-disable-next-line array-callback-return
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
        // eslint-disable-next-line array-callback-return
    ].map(sn => {
        if (chainId === sn.chainId && sn.isActive)
            validChainId.push(sn.chainId);
    });
    return !!validChainId.length;
}

export function isMainnet(chainId: number | undefined) {
    if (!validNetwork(chainId)) return false;
    return chainId === ChainId.BSCMainnet || chainId === ChainId.AvaxMainnet;
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (
    chainId: any,
    callback: (selectedNewtorkId: number) => void
) => {
    const provider = window.ethereum;

    if (provider) {
        if (chainId === 97) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Binance Smart Chain Testnet",
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    rpcUrls: [
                        "https://data-seed-prebsc-1-s2.binance.org:8545/",
                    ],
                    blockExplorerUrls: ["https://testnet.bscscan.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 56) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed1.ninicoin.io/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 43113) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Avalanche Fuji Testnet",
                    nativeCurrency: {
                        name: "Avalanche",
                        symbol: "AVAX",
                        decimals: 18,
                    },
                    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                    blockExplorerUrls: [
                        "https://cchain.explorer.avax-test.network",
                    ],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
                callback(chainId);
                if (validNetwork(chainId)) {
                    // window.location.reload();
                } else {
                    return false;
                }
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 42161) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Arbitrum One",
                    // nativeCurrency: {
                    //     name: "ETH",
                    //     symbol: "ETH",
                    //     decimals: 18,
                    // },
                    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                    blockExplorerUrls: ["https://arbiscan.io"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 1101) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Polygon zkEVM",
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    rpcUrls: ["https://zkevm-rpc.com"],
                    blockExplorerUrls: ["https://zkevm.polygonscan.com"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 5001) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Mantle Testnet",
                    nativeCurrency: {
                        name: "MNT",
                        symbol: "MNT",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc.testnet.mantle.xyz"],
                    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 169) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Manta Pacific",
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    rpcUrls: ["https://pacific-rpc.manta.network/http"],
                    blockExplorerUrls: [
                        "https://pacific-explorer.manta.network",
                    ],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 5000) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Mantle",
                    nativeCurrency: {
                        name: "MNT",
                        symbol: "MNT",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc.mantle.xyz/"],
                    blockExplorerUrls: ["https://explorer.mantle.xyz/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 91002) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Nautilus Triton Testnet",
                    nativeCurrency: {
                        name: "tZBC",
                        symbol: "tZBC",
                        decimals: 18,
                    },
                    rpcUrls: ["https://triton.api.nautchain.xyz"],
                    blockExplorerUrls: ["https://triton.nautscan.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 22222) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Nautilus",
                    nativeCurrency: {
                        name: "ZBC",
                        symbol: "ZBC",
                        decimals: 18,
                    },
                    rpcUrls: ["https://api.nautilus.nautchain.xyz"],
                    blockExplorerUrls: ["https://nautscan.com"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 5611) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "opBNB Testnet",
                    nativeCurrency: {
                        name: "tcBNB",
                        symbol: "tcBNB",
                        decimals: 18,
                    },
                    rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
                    blockExplorerUrls: ["https://opbnbscan.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 570) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Rollux Mainnet",
                    nativeCurrency: {
                        name: "SYS",
                        symbol: "SYS",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc.rollux.com"],
                    blockExplorerUrls: ["https://explorer.rollux.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 280) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "ZkSync Testnet",
                    // nativeCurrency: {
                    //     name: "ETH",
                    //     symbol: "ETH",
                    //     decimals: 18,
                    // },
                    rpcUrls: ["https://testnet.era.zksync.dev"],
                    blockExplorerUrls: ["https://zksync2-testnet.zkscan.io"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 40) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Telos EVM Mainnet",
                    nativeCurrency: {
                        name: "TLOS",
                        symbol: "TLOS",
                        decimals: 18,
                    },
                    rpcUrls: ["https://mainnet.telos.net/evm"],
                    blockExplorerUrls: ["https://teloscan.io"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 324) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "zkSync Era Mainnet",
                    // nativeCurrency: {
                    //     name: "ETH",
                    //     symbol: "ETH",
                    //     decimals: 18,
                    // },
                    rpcUrls: ["https://mainnet.era.zksync.io"],
                    blockExplorerUrls: ["https://explorer.zksync.io"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 80001) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Matic Testnet",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "matic",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
                callback(chainId);
                if (validNetwork(chainId)) {
                    // window.location.reload();
                } else {
                    return false;
                }
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 137) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Polygon Mainnet",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18,
                    },
                    rpcUrls: ["https://polygon.llamarpc.com"],
                    blockExplorerUrls: ["https://polygonscan.com"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        if (chainId === 43114) {
            const params = [
                {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: "Avalanche Mainnet C-Chain",
                    nativeCurrency: {
                        name: "Avalanche",
                        symbol: "AVAX",
                        decimals: 18,
                    },
                    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                    blockExplorerUrls: ["https://snowtrace.io/"],
                },
            ];
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                });
                callback(chainId);

                if (validNetwork(chainId)) {
                    window.location.reload();
                } else {
                    return false;
                }
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params,
                    });
                    callback(chainId);
                }
                return false;
            }
        }
        return true;
    }
    return false;
};

// export const addTokens = async (chainId: any, tokenType: string) => {
//   const provider = window.ethereum;
//   if (provider) {
//     const tokenAddress = USDC_TOKEN[chainId];
//     const tokenSymbol = "USDC";
//     const tokenDecimals = 18;
//     const oddztokenAddress = ODDZ_TOKEN[chainId];
//     const oddztokenSymbol = "ODDZ";
// const ousdtokenAddress = ODDZ_LIQUIDITY_POOL[chainId];
//     const ousdtokenSymbol = "oUSD";

//     try {
//       // wasAdded is a boolean. Like any RPC method, an error may be thrown.
//       try {
//         if (tokenType === "USDC") {
//           await provider.request({
//             method: "wallet_watchAsset",
//             params: {
//               type: "ERC20", // Initially only supports ERC20, but eventually more!
//               options: {
//                 address: tokenAddress, // The address that the token is at.
//                 symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
//                 decimals: tokenDecimals, // The number of decimals in the token
//               },
//             },
//           });
//         }
//         if (tokenType === "ODDZ") {
//           await provider.request({
//             method: "wallet_watchAsset",
//             params: {
//               type: "ERC20", // Initially only supports ERC20, but eventually more!
//               options: {
//                 address: oddztokenAddress, // The address that the token is at.
//                 symbol: oddztokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
//                 decimals: tokenDecimals, // The number of decimals in the token
//               },
//             },
//           });
//         }

//         if (tokenType === "oUSD") {
//           await provider.request({
//             method: "wallet_watchAsset",
//             params: {
//               type: "ERC20", // Initially only supports ERC20, but eventually more!
//               options: {
//                 address: ousdtokenAddress, // The address that the token is at.
//                 symbol: ousdtokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
//                 decimals: tokenDecimals, // The number of decimals in the token
//               },
//             },
//           });
//         }
//       } catch (error) {
//         console.log("Error while adding token!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const convertTimeStamp = (timeStamp: string) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    const date = new Date(parseInt(timeStamp, 10) * 1000);

    const month = months[date.getMonth()];

    const year = date.getFullYear();

    const day = date.getDate();

    return `${month} ${day}, ${year}`;
};

export const validatedSupportedNetwork = (
    supportedChains: any,
    chainId: any
) => {
    return supportedChains.indexOf(chainId) > -1;
};

export const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000);

export const isAssetEligibleForGasless = selectedAssetToPredict => {
    return selectedAssetToPredict !== PREDICT_TOKENS.MATIC;
};

export const convertedAssetValue = (
    selectedAssetToPredict,
    currentPrice,
    predictvalue
) => {
    const convertedValue = isAssetEligibleForGasless(selectedAssetToPredict)
        ? Number(predictvalue)
        : Number(predictvalue) / Number(currentPrice);
    return convertedValue;
};

export const getTokenDecimal = async (token: string, library: any) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const tokenContract = new web3.eth.Contract(ERC20ABI as any, token);

    const decimals = await tokenContract.methods.decimals().call();
    return decimals;
};

export const getFormattedShallowPath = (pathname: string) => {
    return `/${pathname.split("/")[1]}`;
};

export const rewardTokenSymbol = (predictableToken: string) => {
    return predictableToken === PREDICT_TOKENS.MATIC
        ? "MATIC"
        : predictableToken;
};

export const renderQuestStatus = (
    predictionStartTimestamp,
    opensAtTimestamp,
    closesAtTimestamp
) => {
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const statusProp = { text: "", color: "" };
    if (
        Number(predictionStartTimestamp) < currentTimestamp &&
        currentTimestamp < Number(opensAtTimestamp)
    ) {
        statusProp.text = QuestState.LIVE;
        statusProp.color = "text-green-500";
    } else if (currentTimestamp < Number(closesAtTimestamp)) {
        statusProp.text = QuestState.ENDED;
        statusProp.color = "text-primary-warning";
    } else if (currentTimestamp > Number(closesAtTimestamp)) {
        statusProp.text = QuestState.INRESOLUTION;
        statusProp.color = "text-primary-warning";
    }
    return statusProp;
};

export const returnHistoryMarketState = (
    predictionStartTimestamp,
    opensAtTimestamp,
    closesAtTimestamp,
    resolved
) => {
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const state = { text: "", color: "" };
    if (currentTimestamp < predictionStartTimestamp) {
        state.text = QuestState.UPCOMING;
        state.color = "text-primary-100";
    } else if (
        predictionStartTimestamp < currentTimestamp &&
        currentTimestamp < opensAtTimestamp
    ) {
        state.text = QuestState.LIVE;
        state.color = "text-green-500";
    } else if (
        opensAtTimestamp < currentTimestamp &&
        currentTimestamp < closesAtTimestamp
    ) {
        state.text = QuestState.ENDED;
        state.color = "text-primary-100";
    } else if (currentTimestamp > closesAtTimestamp && !resolved) {
        state.text = QuestState.INRESOLUTION;
        state.color = "text-primary-warning";
    } else if (currentTimestamp > closesAtTimestamp && resolved) {
        state.text = QuestState.EXPIRED;
        state.color = "text-primary-error";
    }
    return state;
};

export const getMatic = async (
    val: number,
    withdrawToken: string,
    library,
    account
) => {
    if (Number(val) > 0) {
        const value = await userWithdrawableBalance(
            library,
            withdrawToken,
            account,
            val
        );
        return Number(value);
    }
    return 0;
};

export function shortenAddressWithLessCharacters(
    address: string,
    chars = 4
): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, 2)}..${parsed.substring(42 - chars)}`;
}

export function shortenAddressMweb(address: string): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `..${parsed.substring(42 - 3)}`;
}
