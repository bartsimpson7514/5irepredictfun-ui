import { ethers } from "ethers";
import Web3 from "web3";
import ERC20_PERMIT_ABI from "@Contracts/erc20-permit.json";
import MINIMAL_FORWARDER_ABI from "@Contracts/MinimalForwarder.json";
import {
    MINIMAL_FORWARDER,
    AUTOTASK_WEBHOOK,
    ODDZ_SDK,
    USDC_TOKEN,
    DAI_TOKEN,
    USDT_TOKEN,
} from "../Constants/index";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;
export const returnTokenAddress = (token: string, chainId: number) => {
    switch (token) {
        case "DAI":
            return DAI_TOKEN[chainId];
        case "USDT":
            return USDT_TOKEN[chainId];
        default:
            return USDC_TOKEN[chainId];
    }
};
export const getTokenName = (tokenAddress: string, chainId: number) => {
    switch (tokenAddress.toLowerCase()) {
        case DAI_TOKEN[chainId].toLowerCase():
            return "(PoS) Dai Stablecoin";
        case USDT_TOKEN[chainId].toLowerCase():
            return "(PoS) Tether USD";
        default:
            return "USD Coin (PoS)";
    }
};
const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
];
const ApproveEIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
];

const ForwardRequest = [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "gas", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "data", type: "bytes" },
];

const metaTransactionType = [
    { name: "nonce", type: "uint256" },
    { name: "from", type: "address" },
    { name: "functionSignature", type: "bytes" },
];

export const getMetaTxTypeData = (chainId, verifyingContract) => {
    return {
        types: {
            EIP712Domain,
            ForwardRequest,
        },
        domain: {
            name: "MinimalForwarder",
            version: "0.0.1",
            chainId,
            verifyingContract,
        },
        primaryType: "ForwardRequest",
    };
};

export const signTypedData = async (signer, from, data) => {
    // Otherwise, send the signTypedData RPC call
    // Note that hardhatvm and metamask require different EIP712 input
    const [method, argData] = ["eth_signTypedData_v4", JSON.stringify(data)];
    const result = await signer.send(method, [from, argData]);
    return result;
};

export const buildRequest = async (forwarder, input, gasLimit) => {
    const nonceVal = await forwarder.getNonce(input.from);
    return {
        value: input.value,
        gas: Math.round(gasLimit * 1.3),
        nonce: nonceVal.toString(),
        ...input,
    };
};

export const buildTypedData = async (forwarder, request, library) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await forwarder.provider.getNetwork().then(n => n.chainId);
    const typeData = getMetaTxTypeData(
        chainId,
        web3.utils.toChecksumAddress(forwarder.address)
    );
    const value = { ...typeData, message: request };
    return value;
};

export const signMetaTxRequest = async (
    signer,
    forwarder,
    input,
    gasLimit,
    library
) => {
    const request = await buildRequest(forwarder, input, gasLimit);

    const toSign = await buildTypedData(forwarder, request, library);

    const signature = await signTypedData(signer, input.from, toSign);
    return { signature, request };
};

export function createInstance(provider, chainId) {
    return new ethers.Contract(
        MINIMAL_FORWARDER[chainId],
        MINIMAL_FORWARDER_ABI,
        provider
    );
}
export function createTokenInstance(provider, tokenAddress) {
    return new ethers.Contract(tokenAddress, ERC20_PERMIT_ABI, provider);
}

const returnFunctionSignature = (
    library,
    swaoStruct,
    predStruct,
    providerAddress
) => {
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const slippage = 50;
    return web3.eth.abi.encodeFunctionCall(
        {
            name: "swapAndPredictWithGasless",
            type: "function",
            inputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "amountIn",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "deadline",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes32",
                            name: "fromAsset",
                            type: "bytes32",
                        },
                        {
                            internalType: "bytes32",
                            name: "toAsset",
                            type: "bytes32",
                        },
                    ],
                    internalType: "struct OddzSwap.SwapStruct",
                    name: "_swapStruct",
                    type: "tuple",
                },
                {
                    components: [
                        {
                            internalType: "bytes32",
                            name: "underlying",
                            type: "bytes32",
                        },
                        {
                            internalType: "bytes32",
                            name: "strike",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "roundId",
                            type: "uint256",
                        },
                        {
                            internalType: "bool",
                            name: "directionUp",
                            type: "bool",
                        },
                    ],
                    internalType: "struct IOddzSDK.PredictionStruct",
                    name: "_predStruct",
                    type: "tuple",
                },
                {
                    internalType: "uint256",
                    name: "slippage",
                    type: "uint256",
                },
                {
                    internalType: "address",
                    name: "_provider",
                    type: "address",
                },
            ],
        },
        [swaoStruct, predStruct, slippage, providerAddress]
    );
};

export const sendPredictMetaTx = async (
    predStruct,
    swaoStruct,
    providerAddress,
    signer,
    chainId,
    gasLimit,
    library,
    predictableToken
) => {
    const url = AUTOTASK_WEBHOOK[chainId];
    if (!url) throw new Error(`Missing relayer url`);

    const forwarder = createInstance(signer, chainId);

    const from = await signer.getAddress();

    if (!NETWORK_URL) return {};

    const data = returnFunctionSignature(
        library,
        swaoStruct,
        predStruct,
        providerAddress
    );

    const to = ODDZ_SDK[predictableToken][chainId];

    const request = await signMetaTxRequest(
        signer.provider,
        forwarder,
        {
            to,
            from,
            data,
            value: 0,
        },
        gasLimit,
        library
    );

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
    });
    const responseJson = await response.json();

    if (responseJson.status === "pending") {
        return [true, ""];
    }
    const result =
        responseJson.status !== "error" ? JSON.parse(responseJson.result) : "";
    if (result && result.hash) {
        return [true, result.hash];
    }
    if (result && result.transactionHash) {
        return [false, result.transactionHash];
    }
    return [false, ""];
};

export const predictWithGasless = async (
    swapStruct,
    predStruct,
    providerAddress,
    gasLimit,
    library,
    predictableToken
) => {
    if (!NETWORK_URL) return {};
    const userProvider = new ethers.providers.Web3Provider(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const userNetwork = await userProvider.getNetwork();
    const signer = await userProvider.getSigner();
    return sendPredictMetaTx(
        predStruct,
        swapStruct,
        providerAddress,
        signer,
        userNetwork.chainId,
        gasLimit,
        library,
        predictableToken
    );
};

const signData = async function(signer, web3, fromAddress, typeData) {
    const [method, argData] = [
        "eth_signTypedData_v4",
        JSON.stringify(typeData),
    ];

    const result = await signer.provider.send(method, [fromAddress, argData]);
    const signDataValue = ethers.utils.splitSignature(result as string);
    const { r, s, v } = signDataValue;
    return { v, r, s };
};

export const getApproveMetaTxTypeData = (
    totalSupply,
    web3,
    chainId,
    verifyingContract,
    from,
    spender,
    nonce
) => {
    const sign = web3.eth.abi.encodeFunctionCall(
        {
            name: "approve",
            type: "function",
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
        },
        [spender, totalSupply]
    );
    const message = {
        from,
        nonce: parseInt(nonce, 10),
        functionSignature: sign,
    };
    const typeData = {
        types: {
            EIP712Domain: ApproveEIP712Domain,
            MetaTransaction: metaTransactionType,
        },
        domain: {
            name: getTokenName(verifyingContract.toString(), chainId),
            version: "1",
            salt: ethers.utils.hexZeroPad(
                ethers.BigNumber.from(chainId).toHexString(),
                32
            ),
            verifyingContract,
        },
        primaryType: "MetaTransaction",

        message,
    };

    return {
        typeData,
        message,
    };
};

export const signTransferPermit = async function(
    totalSupply,
    signer,
    library,
    chainId,
    verifyingContract,
    from,
    spender,
    nonce
) {
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const messageData = getApproveMetaTxTypeData(
        totalSupply,
        web3,
        chainId,
        verifyingContract,
        from,
        spender,
        nonce
    );

    const sig = await signData(signer, web3, from, messageData.typeData);
    return Object.assign({}, sig, messageData.message, {
        verifyingContract,
    });
};

export const sendApproveMetaTx = async (
    totalSupply,
    selectedToken,
    spender,
    signer,
    chainId,
    library
) => {
    const to = returnTokenAddress(selectedToken, chainId);
    const forwarder = createTokenInstance(signer, to);

    const from = await signer.getAddress();
    let nonce;
    if (selectedToken === "USDC") {
        nonce = await forwarder.nonces(from);
    } else {
        nonce = await forwarder.getNonce(from);
    }

    const url = process.env.NEXT_PUBLIC_AUTOTASK_WEBHOOK_APPROVE_MATIC;
    if (!url) throw new Error(`Missing relayer url`);

    if (!NETWORK_URL) return {};

    const request = await signTransferPermit(
        totalSupply,
        signer,
        library,
        chainId,
        to,
        from,
        spender,
        nonce
    );

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
    });
    const responseJson = await response.json();

    if (responseJson.status === "pending") {
        return [true, ""];
    }
    const result =
        responseJson.status !== "error" ? JSON.parse(responseJson.result) : "";
    if (result && result.hash) {
        return [true, result.hash];
    }
    if (result && result.transactionHash) {
        return [false, result.transactionHash];
    }
    return [false, ""];
};

export const approveWithGasless = async (
    totalSupply,
    selectedToken,
    spender,
    library
) => {
    if (!NETWORK_URL) return {};
    const userProvider = new ethers.providers.Web3Provider(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const userNetwork = await userProvider.getNetwork();
    const signer = await userProvider.getSigner();
    return sendApproveMetaTx(
        totalSupply,
        selectedToken,
        spender,
        signer,
        userNetwork.chainId,
        library
    );
};
