export const ODDZ_NETWORK = {
    ETHEREUM_MAINNET: 1,
    BSC_TEST: 97,
    MATIC_TEST: 80001,
    BSC_MAINNET: 56,
    AVAX_TESTNET: 43113,
    MATIC_MAINNET: 137,
    AVAX_MAINNET: 43114,
    ARBITRUM_MAINNET: 42161,
    ZKSYNC_TESTNET: 280,
    ZKSYNC_MAINNET: 324,
    MANTLE_TESTNET: 5001,
    MANTLE_MAINNET: 5000,
    OPBNB_TESTNET: 5611,
    POLYGON_ZKEVM: 1101,
    NAUTILUS_TRITON_TESTNET: 91002,
    NAUTILUS: 22222,
    TELOS_MAINNET: 40,
    ROLLUX_MAINNET: 570,
    MANTA_MAINNET: 169,
};

export const FAUCET_URL = {
    [ODDZ_NETWORK.MANTLE_TESTNET]: "https://faucet.testnet.mantle.xyz/",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "https://opbnb-testnet-bridge.bnbchain.org/",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "https://faucet.nautchain.xyz/",
};

export const SUBGRAPH_HISTORY_NOT_SUPPORTED = [
    ODDZ_NETWORK.MANTLE_TESTNET,
    ODDZ_NETWORK.OPBNB_TESTNET,
    ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET,
    ODDZ_NETWORK.NAUTILUS,
    ODDZ_NETWORK.MANTLE_MAINNET,
    ODDZ_NETWORK.ROLLUX_MAINNET,
    ODDZ_NETWORK.MANTA_MAINNET,
];

export const NETWORK_NAME: { [chainId: number]: string } = {
    [ODDZ_NETWORK.BSC_TEST]: "BSC Testnet",
    [ODDZ_NETWORK.MATIC_TEST]: "Matic Testnet",
    [ODDZ_NETWORK.BSC_MAINNET]: "BNB chain",
    [ODDZ_NETWORK.ETHEREUM_MAINNET]: "Mainnet",
    [ODDZ_NETWORK.MATIC_MAINNET]: "Polygon",
    [ODDZ_NETWORK.AVAX_TESTNET]: "Avax Testnet",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "Arbitrum",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "ZkSync Testnet",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "zkSync Era",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "Polygon zkEVM",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "opBNB Testnet",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "Mantle Testnet",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "Nautilus Triton Testnet",
    [ODDZ_NETWORK.NAUTILUS]: "Nautilus",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "Mantle",
    [ODDZ_NETWORK.TELOS_MAINNET]: "Telos EVM Mainnet",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "Rollux Mainnet",
    [ODDZ_NETWORK.MANTA_MAINNET]: "Manta Pacific",
};

export const USDC_DECIMAL = 1e18;
export const ONEE_EIGHT = 1e8;

export const ASSETS = {
    ETH: "ETH",
    BTC: "BTC",
    MATIC: "MATIC",
    BNB: "BNB",
    APPL: "APPL",
    TSLA: "TSLA",
    AMZN: "AMZN",
    ARB: "ARB",
    XAU: "XAU", // GOLD
    XAG: "XAG", // SILVER
    TLOS: "TLOS",
    ZBC: "ZBC",
};
export const BICONOMY_API_KEY = {
    [ODDZ_NETWORK.MATIC_MAINNET]:
        process.env.NEXT_PUBLIC_MATIC_MAINNET_BICONOMY_API_KEY,
};

export const ODDZ_ADMISTRATOR = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0xbC16b05F4E1484876b0C896C67DCB4460Cb8E2B2",
    [ODDZ_NETWORK.BSC_MAINNET]: "0xDaACfB65093f9BDEcd867D36d00249C9a51f5E73",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]:
        "0xFB1983839618D5B7F1E6B4ef158225C7f1eBe304",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "0x075A43551209576BF15E2bA6DD855d67Eeb98b0d",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "0x66C5E58776e69128aafA245060D15bF588AC0B11",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "0xc3c19f191Fa4F8Dc753020967b63A40ED4b99059",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "0x3d1490AbB33f83fec12C6fFF50d51cfD93Af951A",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
        "0x6DF7ce93A7fA5B18F7cE32813a100E8a77E34393",
    [ODDZ_NETWORK.NAUTILUS]: "0x2416b806ceB7daB5852CFB967E095A6ed8AEA670",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "0x2416b806ceB7daB5852CFB967E095A6ed8AEA670",
    [ODDZ_NETWORK.TELOS_MAINNET]: "0xC54F1C84d33421f878c59F00A04Fb833CC8f1ADF",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "0x2416b806ceB7daB5852CFB967E095A6ed8AEA670",
    [ODDZ_NETWORK.MANTA_MAINNET]: "0xC54F1C84d33421f878c59F00A04Fb833CC8f1ADF",
};

export const binanceSourceChainId = [
    ODDZ_NETWORK.ZKSYNC_MAINNET,
    ODDZ_NETWORK.ZKSYNC_TESTNET,
    ODDZ_NETWORK.MANTLE_TESTNET,
    ODDZ_NETWORK.OPBNB_TESTNET,
    ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET,
    ODDZ_NETWORK.NAUTILUS,
    ODDZ_NETWORK.MANTLE_MAINNET,
    ODDZ_NETWORK.POLYGON_ZKEVM,
    ODDZ_NETWORK.TELOS_MAINNET,
    ODDZ_NETWORK.ROLLUX_MAINNET,
    ODDZ_NETWORK.MANTA_MAINNET,
];

export const ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
                "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            ],
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    ETH: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
                "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            ],
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    BNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0xC6f4c158182ce2a8150F5B1558b484E0e1D53Dd9",
            [ASSETS.ETH]: "0x01B3c0c85B8e4FFbBCCBCE05dF49E3D3b4E7E7dD",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x33122754c17B09e93E333352D3Ec45C0b4313AFB",
            [ASSETS.TSLA]: "0x55552f9F5DddD627D8c41203e8cA87dD062d2f27",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xc895A9ebd7355348173E27B5f7FD044f0bd99100",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
                "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            ],
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.BTC]: "0x33Bd3bad14CD6D14584852554246885a5fFe2a35",
            [ASSETS.ETH]: "0x7739003B2B2fCf8296ed46eAc8021B6Da2040C1A",
            [ASSETS.MATIC]: "0xEFEBA58adab8BC7d75b7AB61aAcC75B99813eeA6",
            [ASSETS.XAU]: "0x02D708d651db879a7bdcd75b0Caa1270019B603d",
            [ASSETS.XAG]: "0x6D763d0bc827e26E7F6D5ce28be5a573578A4185",
            [ASSETS.TSLA]: "0xaeFD0000136243543B28a690f4E75aA548240833",
            [ASSETS.APPL]: "0x64e1d4025acFcf5ebb52F0C9aFe0A859E738f899",
            [ASSETS.AMZN]: "0xfd19A5e41cDC3b15e8ed547a9165Fe9620A188CD",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.ETH]: "0x0bf65Aa6B20629210C2Ff21361462f0469b00a96",
            [ASSETS.BTC]: "0x9c3c2B20f2bF08990Da8ecbA6ce29438F8b9eA9a",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x474e9Ccd4186Ba5B86ba4E4287d68E3b085e5a06",
            [ASSETS.TSLA]: "0x97B59A743A1560e695a12EF25e0FAd36F9b82c94",
            [ASSETS.APPL]: "0x19acC9853202ceF1B68309ccc89aF94a7141bA72",
            [ASSETS.AMZN]: "0x93CCfA1f29D69bF4cc3074cadCb49507831BC373",
            [ASSETS.XAU]: "0x72B7C82bc1aE291E9aCD57DDC8076F23683B2313",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
                "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            ],
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    MNT: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tcBNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    ZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    TLOS: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    SYS: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: [
                "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
                "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
            ],
            [ASSETS.BTC]: [
                "0x4111E1192B8bfec4D999366E62c68213A7b34221",
                "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
            ],
            [ASSETS.MATIC]: [
                "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
                "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
                "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            ],
            [ASSETS.APPL]: ["0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93"],
            [ASSETS.TSLA]: ["0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF"],
            [ASSETS.BNB]: [
                "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
                "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
            ],
            [ASSETS.AMZN]: ["0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398"],
            [ASSETS.XAU]: ["0x7533d6741C1297ec8b4Be21fF591D7ae61876891"],
            [ASSETS.XAG]: ["0x0B7C1DE02771438F8130198882af2161f3016123"],
            [ASSETS.ARB]: [""],
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0xDBbFbf5ec4f0364d31974E0204dC0b042D3edF84",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
};

export const OLD_PREDICITION = [
    "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
    "0x7a60DDE652a5a9E7514026Cd7a247BcE785133dC",
    "0x4111E1192B8bfec4D999366E62c68213A7b34221",
    "0x9184f1fcC0CA6FCA00F40A1709932cAf66BDDE5D",
    "0x1a86a7d7CF87D948BB92D87E8Fb8Aa7b88018C5b",
    "0xb98522baa393621fc1befcecffc9cd033e7f0bce",
    "0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93",
    "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
    "0x8f210BBd1E664F28E29E3939cc01cDB34fDacf69",
    "0x0B7C1DE02771438F8130198882af2161f3016123",
    "0x7533d6741C1297ec8b4Be21fF591D7ae61876891",
    "0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398",
    "0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF",
];

// For Gold it is XAU
// For Silver it is XAG
export const ODDZ_PREDICTION = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: "0x186927CEdfD25663B41A45CF47dB2db0F955bF65",
            [ASSETS.BTC]: "0x4111E1192B8bfec4D999366E62c68213A7b34221",
            [ASSETS.MATIC]: "0x2487CB2b0A49A75e61cC75B5f9b30493813A5e7A",
            [ASSETS.APPL]: "0x1476b700d59Acd0E1a1Fcdb76c2b80CD1f0FEe93",
            [ASSETS.TSLA]: "0x87Ea053098E8cEe79A30E770CBC132eeAf52a8bF",
            [ASSETS.BNB]: "0xb731EBF5D9D246aDe7135972A54af505DAD31827",
            [ASSETS.AMZN]: "0xBf0D64c6cF2e5C4d357dd03f89E1d084cc4e7398",
            [ASSETS.XAU]: "0x7533d6741C1297ec8b4Be21fF591D7ae61876891",
            [ASSETS.XAG]: "0x0B7C1DE02771438F8130198882af2161f3016123",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0x82f45b7Ae0791dCD63170CDad109592F90B65b2d",
            [ASSETS.ETH]: "0x57CaE9151230C1E7178Bcb0b85E5449e907930F0",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x1EFA70332b1ffeE1fbE6758572F27B6FB3A024e8",
            [ASSETS.TSLA]: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xf5A3e1a506793d924314C4fa8ec8ebc50D36b214",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.BTC]: "0xC6f4c158182ce2a8150F5B1558b484E0e1D53Dd9",
            [ASSETS.ETH]: "0x01B3c0c85B8e4FFbBCCBCE05dF49E3D3b4E7E7dD",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x33122754c17B09e93E333352D3Ec45C0b4313AFB",
            [ASSETS.TSLA]: "0x55552f9F5DddD627D8c41203e8cA87dD062d2f27",
            [ASSETS.APPL]: "0x85624509eaF44f01E60045612DbE088267eFAADd",
            [ASSETS.AMZN]: "0xD891C93F6cA196db9b0A6Dd2d384695D64535411",
            [ASSETS.XAU]: "0xc895A9ebd7355348173E27B5f7FD044f0bd99100",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
            [ASSETS.ARB]: "",
        },
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
            [ASSETS.BTC]: "0xa4D01721dC6B324450eA1c8389FbD5D0fD2eD9df",
            [ASSETS.ARB]: "0x0c9e979C1774834e4cF31Bb1242fC430d226e336",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0x04e2d1699E010C90681F9d85B0e7C9133F50A6Ae",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x915523c3535394C325Ad35d6089630b1D14cA1E9",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.BTC]: "0x33Bd3bad14CD6D14584852554246885a5fFe2a35",
            [ASSETS.ETH]: "0x7739003B2B2fCf8296ed46eAc8021B6Da2040C1A",
            [ASSETS.MATIC]: "0xEFEBA58adab8BC7d75b7AB61aAcC75B99813eeA6",
            [ASSETS.XAU]: "0x02D708d651db879a7bdcd75b0Caa1270019B603d",
            [ASSETS.XAG]: "0x6D763d0bc827e26E7F6D5ce28be5a573578A4185",
            [ASSETS.TSLA]: "0xaeFD0000136243543B28a690f4E75aA548240833",
            [ASSETS.APPL]: "0x64e1d4025acFcf5ebb52F0C9aFe0A859E738f899",
            [ASSETS.AMZN]: "0xfd19A5e41cDC3b15e8ed547a9165Fe9620A188CD",
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.ETH]: "0x0bf65Aa6B20629210C2Ff21361462f0469b00a96",
            [ASSETS.BTC]: "0x9c3c2B20f2bF08990Da8ecbA6ce29438F8b9eA9a",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x474e9Ccd4186Ba5B86ba4E4287d68E3b085e5a06",
            [ASSETS.TSLA]: "0x97B59A743A1560e695a12EF25e0FAd36F9b82c94",
            [ASSETS.APPL]: "0x19acC9853202ceF1B68309ccc89aF94a7141bA72",
            [ASSETS.AMZN]: "0x93CCfA1f29D69bF4cc3074cadCb49507831BC373",
            [ASSETS.XAU]: "0x72B7C82bc1aE291E9aCD57DDC8076F23683B2313",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xCDb3FAEA249f53A07369B7b5CD7cC7Cf22995272",
            [ASSETS.BTC]: "0xEfF213cb7Ba35f4170100057406aD9f2A7fa8bb2",
            [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
            [ASSETS.TSLA]: "0x544517751651BbeA4B5447738E8F9b4270109fde",
            [ASSETS.APPL]: "0x48036ae70Bf315D67C57aD8Ed004b9F1Af0f0a99",
            [ASSETS.AMZN]: "0x3C90aef442d4D4Ce42D31a89FF56F717B7D2752E",
            [ASSETS.XAU]: "0x52c8e5C988eE476e3cAF18fFD879f17f726Cb2D0",
            [ASSETS.XAG]: "0xBf3b2a5c127Aa00ef0810A6651E178851C5c436e",
        },
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.BTC]: "0x1DC3D2FCfe5B01385776FEa72BDbb1cF26be4414",
            [ASSETS.ETH]: "0x360B34Ff4BA63b54563E7B36F443dC355DFFda62",
            [ASSETS.XAU]: "0x4f34851819cC11E89ec4F365391ca34E6caf83D9",
            [ASSETS.TSLA]: "0xC364D8c23FE27068E2231c768b3E7901ac474063",
        },
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x405ED5ab0C7723ea3f88762ead40C018Ad7d2902",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xca0112597B795728d0aFC33dB2E3eD56D95F624d",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xb4260E0c855Aba18d636734690957C120a49d01C",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xf2f18f771c70169F6f548B5FbC52bcb029f6bE2e",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        },
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDE39856a140351A9fF3aDE27eF4f84a1dC9aF4Bf",
        },
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x5e5ca6185aaAD768077D9B814C87D4A17C6c9bFB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
};

export const ODDZ_PREDICTION_STORAGE = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.ETH]: "0xBf9345F0104c0362245980E1F9e16561f9f0b867",
            [ASSETS.BTC]: "0x18981Bd6fB5307435ba049898584ed2c7c3E2236",
            [ASSETS.MATIC]: "0x304A621A27ce67cEa4e7e993310C150D6cbE3567",
            [ASSETS.BNB]: "0xEAead47699Aa7259966B63Ef9e59B10Ab0dc442c",
            [ASSETS.TSLA]: "0xbC34B1960CCAc05d498198c0032112D6b9728Eb7",
            [ASSETS.APPL]: "0x75C7592c5d2baf6998739582679b33e261717741",
            [ASSETS.AMZN]: "0xF4dD7D4756E273480751bf2b1423D05558116626",
            [ASSETS.XAU]: "0xd3D8C1d867EB855f4c82CCe9CCB6bb4eA4045eEe",
            [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
        },
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.ETH]: "0xF00466870f26Fbb95861A10A801B276284dd40ea",
            [ASSETS.BTC]: "0x0c3a57258D361c05E747E79ad23D5D255d71bD46",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0xefc44654bDa461c26D17A9bB508A9FA5D51294A9",
            [ASSETS.TSLA]: "0x887E36089965eb9396a12eA3bB65Dc573537E804",
            [ASSETS.APPL]: "0x19a7e2E4A7bD05F0E6d78816121Ff9B3bC0C2100",
            [ASSETS.AMZN]: "0x13787e79c0be8990824B48E41367E133D7F95ef4",
            [ASSETS.XAU]: "0x624cbd5957782fAa103dd655F3E48c802E381a00",
            // [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xD71434f2B78c2C5D7705c2106e01E890Fff4eF94",
            [ASSETS.BTC]: "0xd68071A9e3A203f8bff2276E7B19f7B934A8a546",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x59efE0C6565f6Ba7a3d639E9CCfE541e756Ad301",
            [ASSETS.TSLA]: "0xAf91708d6AE35e0bcb3051a06696258a3f1a3fBe",
            [ASSETS.APPL]: "0xa0f990Ab826f4AEB4AA0eDd57Be9A84bbC4263e0",
            [ASSETS.AMZN]: "0x5BbC425636A7c18d9f7c5A3e9849864A9425c38e",
            [ASSETS.XAU]: "0xC58675848f21B23e76e69C99bb8cF2C9CFbda37e",
            [ASSETS.XAG]: "0x277f206e647f0ee36E4e83A3A1bB7AE3DaBC5361",
        },
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
            [ASSETS.ETH]: "0x1eB019E4cE27716e9405c3D8bA5819D23DbbF331",
            [ASSETS.BTC]: "0xfa0D479aF508494dCD4Ad0E960EfB0Fe3Cb1B5Ab",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "0xF4E32312bB4E8C0D418a36148a61031691aD31Ff",
            [ASSETS.XAG]: "",
            [ASSETS.ARB]: "0xd99eAbc8e14fbc628A1c4E48E26Fe66630e351B3",
        },
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
            [ASSETS.ETH]: "0x7296db634a9d9904EF4d1bf5B8086d3068EDe9EC",
            [ASSETS.BTC]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
            [ASSETS.ETH]: "0x2f43FBAA3282Ed177f21758436004Ae458cd2d85",
            [ASSETS.BTC]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ARB]: "",
        },
        [ODDZ_NETWORK.POLYGON_ZKEVM]: {
            [ASSETS.ETH]: "0x48aEEf61673B64848f5E2B65e728DA2b7E76429c",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTA_MAINNET]: {
            [ASSETS.ETH]: "0xF26900af1FeBb1EbD1db34D520CbbF9c59127592",
            [ASSETS.BTC]: "",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.BTC]: "0x68687dC82Fe0E4746939da710f6c2099c3445a10",
            [ASSETS.ETH]: "0x25ce4F9FC7BB0542C779e1D1B35aA2805b4C6c91",
            [ASSETS.MATIC]: "0xE242573fd8A6288e65a0eCDBB26d5BFcD2BF36ee",
            [ASSETS.XAU]: "0xdfE0f598B9ed21cF3a66fF1de3E9f4593f953203",
            [ASSETS.XAG]: "0x7C3eDFb6BdDac4893eCb97EB9A0F7C92a70200e5",
            [ASSETS.TSLA]: "0x895D585B5d5B596dDA4D772d3e10A1ca2e58625b",
            [ASSETS.APPL]: "0x61921581F4034391454E6Ee0122B2aa680FAF4f6",
            [ASSETS.AMZN]: "0xcD712Cd2C7B56993A2b4b482f0d5f0Eb2480dcD3",
        },
        [ODDZ_NETWORK.BSC_MAINNET]: {
            [ASSETS.ETH]: "0xF84e13AEEFdA81d3089762932f9C1FaC0cdc8103",
            [ASSETS.BTC]: "0x811064a7404ED5B9e0196449EEA4e8C73F214519",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x202AA70AccaEA1E08B184cDCa60Ad647640f17B2",
            [ASSETS.TSLA]: "0xC8Ddab250755e8a2Ea942034e003aA5059f2e82A",
            [ASSETS.APPL]: "0xd46578e8ae1fcb7133ee7B9ED0bc6bC12590f739",
            [ASSETS.AMZN]: "0x60Ec7fe1Ad71e7ee5ea450F77803C6974dfF797c",
            [ASSETS.XAU]: "0xC37Bb65F9273B43bE7ee7cEF341e128fB431C05e",
            // [ASSETS.XAG]: "0x2AEaF562f91AF5c663BaB59109866ee54d5bD9Ba",
        },
        [ODDZ_NETWORK.BSC_TEST]: {
            [ASSETS.ETH]: "0xD71434f2B78c2C5D7705c2106e01E890Fff4eF94",
            [ASSETS.BTC]: "0xd68071A9e3A203f8bff2276E7B19f7B934A8a546",
            // [ASSETS.MATIC]: "0x8726F15F3f87542915b41A26C509B7df9aaE043E",
            [ASSETS.BNB]: "0x59efE0C6565f6Ba7a3d639E9CCfE541e756Ad301",
            [ASSETS.TSLA]: "0xAf91708d6AE35e0bcb3051a06696258a3f1a3fBe",
            [ASSETS.APPL]: "0xa0f990Ab826f4AEB4AA0eDd57Be9A84bbC4263e0",
            [ASSETS.AMZN]: "0x5BbC425636A7c18d9f7c5A3e9849864A9425c38e",
            [ASSETS.XAU]: "0xC58675848f21B23e76e69C99bb8cF2C9CFbda37e",
            [ASSETS.XAG]: "0x277f206e647f0ee36E4e83A3A1bB7AE3DaBC5361",
        },
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]: {
            [ASSETS.BTC]: "0xA350A122a65Fa7935BA7f459cDe3b4921ab88991",
            [ASSETS.ETH]: "0xa831632cf91b113564da358ec5d6843f9d864233",
            [ASSETS.XAU]: "0x3faDC9F0536B5E1A47be8bBB206B4763B2f81e3e",
            [ASSETS.TSLA]: "0xFaAEf2EF8741109fad3863A59f505355A211Ab80",
        },
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: {
            [ASSETS.ETH]: "0x4dcC13E81630497977Fb3f4EEE7fde0ebf554686",
            [ASSETS.BTC]: "0x4cf1345536ABFe1F47F88ff8EdD6d349DF0eA094",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "0x72595778c4dD9d4dAb4Cf8bb634D0D6A735A04E0",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
        [ODDZ_NETWORK.MANTLE_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x6c748ad8957323c5d6cfC6d3d2C16Ee4b0A76D0C",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: {
            [ASSETS.ETH]: "0xaCa8ff60De34F9124E45670a13Ff6ff3e4d77535",
            [ASSETS.BTC]: "0x84dFB8842826B50BFf924A9fB613b6ecE58b7AcB",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "0xEd5b47e8290F7EE7D5D6F3b34bBb9dDA0E1216E6",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x9976C080FbC3e533915e021cE73641999d2B49E4",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDc30157f959862BE00a4373b461c5DFb6f42B623",
        },
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0x9976C080FbC3e533915e021cE73641999d2B49E4",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.ZBC]: "0x48aEEf61673B64848f5E2B65e728DA2b7E76429c",
        },
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xF26900af1FeBb1EbD1db34D520CbbF9c59127592",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
            [ASSETS.TLOS]: "0xDc30157f959862BE00a4373b461c5DFb6f42B623",
        },
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: {
            [ASSETS.ETH]: "",
            [ASSETS.BTC]: "0xEf0a1BAd62bcDCaF7d08E7528DE8AbA748b845c3",
            [ASSETS.ARB]: "",
            [ASSETS.MATIC]: "",
            [ASSETS.APPL]: "",
            [ASSETS.TSLA]: "",
            [ASSETS.BNB]: "",
            [ASSETS.AMZN]: "",
            [ASSETS.XAU]: "",
            [ASSETS.XAG]: "",
        },
    },
};

export const ODDZ_SDK = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x8EA8d45e0914919E82f572Df62fAa3F0f3e2f9e7",
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x6398314d1Dbe5cEE159468F3E3849b1801F08218",
        [ODDZ_NETWORK.BSC_TEST]: "0x21a848D99e279252efB3bd69d6B58435147dCa73",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "0x99Ff0395c2726F618E6399d869864c5E08A14f33",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "0xE48D467a8F04A62782DcCdE4B747D329a765db42",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "0xFB02ccF0492b554955e64b1a008EBDbB04dc5932",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "0x5007F2a32589e224DA6e1007885C5c4ff425d33A",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x6BB3f4962C8771AbefFB82ca1fcA59842Ce2b274",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x8d868ff528CB3C64156826Fb7d41C3b3B1da294e",
        [ODDZ_NETWORK.BSC_TEST]: "0x6BB3f4962C8771AbefFB82ca1fcA59842Ce2b274",
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0xcb39B924C20d2535cE26445236EFb808b8301d5d",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "0x4290997190346b7A9B0Dbfcb48Cf186Ae1E1C617",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "0x74125975452B8eF51381dfEF0A333D623A5Df920",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "0x9c3c2B20f2bF08990Da8ecbA6ce29438F8b9eA9a",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "0x11971459A7B0Da39F18b5BA1e2B574e69683baC3",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "0xFB02ccF0492b554955e64b1a008EBDbB04dc5932",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "0x48aEEf61673B64848f5E2B65e728DA2b7E76429c",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "0x474e9Ccd4186Ba5B86ba4E4287d68E3b085e5a06",
    },
};

export const DISABLE_VAULT_DEPOSIT = [
    "0x83Bfcd4a0BF6f442CA62a6f68E7f6CecF5C01D1d",
    "0x4A3ad4bB1A1b7CeE02E30F9f41d99985eA7A1E56",
    "0xA59e8042b8199fB21913AE3b96178e15eF96bAc3",
    "0x7768b73f95d5d5f77aad6cd3cD47591a6565F75D",
    "0x747E2D83B5DaB11bD5351890D54e3944272aBDb9",
    "0x3bc0D5A68f5b77497150cDbdB6f54DF64dD46Af2",
];

export const BHAVISH_VAULT = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]: [
            {
                id: 0,
                vaultName: "Moving Average",
                assetName: "ETH",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average ETH Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ETH in Nexter. The strategy predicts ETH outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0x83Bfcd4a0BF6f442CA62a6f68E7f6CecF5C01D1d",
                icon: "ethereum.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ETHEREUM with the Moving average recommendation",
            },
            {
                id: 1,
                vaultName: "Moving Average",
                assetName: "BTC",
                strategy:
                    "The Moving Average BTC Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on BTC in Nexter. The strategy predicts BTC outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0x4A3ad4bB1A1b7CeE02E30F9f41d99985eA7A1E56",
                icon: "bitcoin.png",
                color: "#F2B56D",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for BITCOIN against the Moving average recommendation",
            },
            {
                id: 2,
                vaultName: "Moving Average",
                assetName: "MATIC",
                strategy:
                    "The Moving Average MATIC Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on MATIC in Nexter. The strategy predicts MATIC outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0xA59e8042b8199fB21913AE3b96178e15eF96bAc3",
                icon: "polygon-matic.png",
                color: "#C767EF",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for MATIC against the Moving average recommendation",
            },
            {
                id: 3,
                vaultName: "Against Moving Average",
                assetName: "ETH",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average Against ETH Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ETH in Nexter. While the strategy predicts ETH outcomes based on Moving average indicator crossovers on TradingView charts, the calculated outcomes are the inverse of the strategy results.",
                contractAddress: "0x7768b73f95d5d5f77aad6cd3cD47591a6565F75D",
                icon: "ethereum.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ETHEREUM with the Moving average recommendation",
            },
            {
                id: 4,
                vaultName: "Against Moving Average",
                assetName: "BTC",
                strategy:
                    "The Moving Average Against BTC Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on BTC in Nexter. While the strategy predicts BTC outcomes based on Moving average indicator crossovers on TradingView charts, the calculated outcomes are the inverse of the strategy results.",
                contractAddress: "0x747E2D83B5DaB11bD5351890D54e3944272aBDb9",
                icon: "bitcoin.png",
                color: "#F2B56D",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for MATIC against the Moving average recommendation",
            },
            {
                id: 5,
                vaultName: "Against Moving Average",
                assetName: "MATIC",
                strategy:
                    "The Moving Average Against MATIC Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on MATIC in Nexter. While the strategy predicts MATIC outcomes based on Moving average indicator crossovers on TradingView charts, the calculated outcomes are the inverse of the strategy results.",
                contractAddress: "0x3bc0D5A68f5b77497150cDbdB6f54DF64dD46Af2",
                icon: "polygon-matic.png",
                color: "#C767EF",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for BITCOIN against the Moving average recommendation",
            },
        ],
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: [
            {
                id: 0,
                vaultName: "Moving Average",
                assetName: "ARB",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average ARB Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ARB in Nexter. The strategy predicts ARB outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0x92C61834A19612702b55A2497f2BC741E32744ad",
                icon: "arbitrum.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ARBITRUM against the Moving average recommendation",
            },
            {
                id: 1,
                vaultName: "Against Moving Average",
                assetName: "ARB",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average Against ARB Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ARB in Nexter. While the strategy predicts ARB outcomes based on Moving average indicator crossovers on TradingView charts, the calculated outcomes are the inverse of the strategy results.",
                contractAddress: "0x96570302Be531bc2F3F503b15AE6428F95e37985",
                icon: "arbitrum.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ARBITRUM with the Moving average recommendation",
            },
        ],
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: [],
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: [],
        [ODDZ_NETWORK.POLYGON_ZKEVM]: [],
        [ODDZ_NETWORK.MANTA_MAINNET]: [],
    },
    BNB: {
        [ODDZ_NETWORK.BSC_TEST]: [
            {
                id: 0,
                vaultName: "Moving Average",
                assetName: "BNB",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average BNB Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ETH in Nexter. The strategy predicts ETH outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0xCD31B7De7c42B9cf82eF10BF4F361F95C596D6A2",
                icon: "bnb.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ETHEREUM with the Moving average recommendation",
            },
        ],
        [ODDZ_NETWORK.BSC_MAINNET]: [
            {
                id: 0,
                vaultName: "Moving Average",
                assetName: "BNB",
                color: "#EEEEEF",
                strategy:
                    "The Moving Average BNB Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on ETH in Nexter. The strategy predicts ETH outcomes based on crossovers of Moving average indicators on TradingView charts. Moving average is a trend-following or lagging indicator since it is based on historical prices.",
                contractAddress: "0xED11222AA605C26306Fbc1d9cFa7ce9Ca403F713",
                icon: "bnb.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for ETHEREUM with the Moving average recommendation",
            },
            {
                id: 1,
                vaultName: "Against Moving Average",
                assetName: "BNB",
                strategy:
                    "The Moving Average Against BNB Vault runs a prediction strategy based on a set of backtested moving average indicators that are automatically run on BNB in Nexter. While the strategy predicts BNB outcomes based on Moving average indicator crossovers on TradingView charts, the calculated outcomes are the inverse of the strategy results.",
                contractAddress: "0x771450Aa420a2d2Ed342E129C0058BBD4f6498a6",
                icon: "bnb.png",
                color: "#C767EF",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
                description:
                    "Generates yield by running an automated predictions for BNB against the Moving average recommendation",
            },
        ],
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]: [
            {
                id: 0,
                vaultName: "Moving Average Recommendation",
                assetName: "Moving Average Recommendation",
                strategy:
                    "Moving Average [R] is a strategy which is a combination of Moving Averages that has consistently provided a high success rate. It is a trend-following or lagging indicator since it is dependent on historical prices. It determines the asset trend as well as the levels of support and resistance.",
                contractAddress: "0xe095a986f26c634e3D15dD0c0Be68DFA69385ce5",
                icon: "ethereum.png",
                imageUrl: [
                    "https://dashboard.oddz.fi/public/question/c2db3762-eebf-44a2-92b3-41eac103fbd2#theme=night",
                    "https://dashboard.oddz.fi/public/question/e3a27915-fd9a-4451-bc6d-327e38d283c7#theme=night",
                ],
            },
        ],
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: [],
        [ODDZ_NETWORK.MANTLE_MAINNET]: [],
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: [],
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: [],
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: [],
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: [],
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: [],
    },
};

export const BHAVISH_VAULT_GRAPH_API = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    ETH: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    BNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    MNT: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    tcBNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    tZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    ZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    TLOS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    SYS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-vault",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-vault",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
};

export const BHAVISH_QUEST_GRAPH_API = {
    [ODDZ_NETWORK.MATIC_MAINNET]:
        "https://gateway-arbitrum.network.thegraph.com/api/d69c59bb335dd01492603cdb910cb187/subgraphs/id/AZymHGjnsHc59StoMdvbhoVoNbutKXDJu7i6rwowApsQ",
    [ODDZ_NETWORK.BSC_MAINNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-quest",
    [ODDZ_NETWORK.BSC_TEST]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-quest",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-quest",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    [ODDZ_NETWORK.MANTLE_TESTNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    [ODDZ_NETWORK.OPBNB_TESTNET]:
        "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
        "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
    [ODDZ_NETWORK.NAUTILUS]:
        "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
    [ODDZ_NETWORK.POLYGON_ZKEVM]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    [ODDZ_NETWORK.MANTLE_MAINNET]:
        "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
    [ODDZ_NETWORK.TELOS_MAINNET]:
        "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
    [ODDZ_NETWORK.ROLLUX_MAINNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    [ODDZ_NETWORK.MANTA_MAINNET]:
        "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
};

export const BHAVISH_PRICE_FEED = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://gateway-arbitrum.network.thegraph.com/api/d69c59bb335dd01492603cdb910cb187/subgraphs/id/4swjPigC29vREVFzxPyxSM8zXhAjn2zabfjHuujauc8X",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    ETH: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-erc20-price",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    BNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    MNT: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    tcBNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    tZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    TLOS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    ZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
    SYS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/polygon-price-charts",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zksync-mainnet/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-price-chart",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-vault",
    },
};

export const ODDZ_PRICE_MANAGER = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x637c0D4525a2B0e247093aAd1B5EF91631B47E3C",
    [ODDZ_NETWORK.BSC_MAINNET]: "0xCce898265CBFfb80EDF12136A3b291D67569d452",
    [ODDZ_NETWORK.BSC_TEST]: "0xf0392839E56eE439715281336579262172A3cF1f",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]:
        "0x4BA5833eB046367049d7b0d3bb96ce63d8973e9c",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "0x012b5ca3378B6FA87fc85523033db0c72fC19b9f",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "0x3Acd334d23a5b90eC85d9aB606D25399302D1e16",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "0x5b7AA0a5542232d752F45f9a528339D03d259be9",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "0x2fF0b48e21228BDf2B7403B4618409e67390414F",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
        "0x8802fa4BcE1086658cd941CE29B7597361b07Cd7",
    [ODDZ_NETWORK.NAUTILUS]: "0x4BA5833eB046367049d7b0d3bb96ce63d8973e9c",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "0xD49B2d3941B94F55c61FbbdD9eD0076C5dAbDd5f",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "0x4BA5833eB046367049d7b0d3bb96ce63d8973e9c",
    [ODDZ_NETWORK.TELOS_MAINNET]: "0xFB02ccF0492b554955e64b1a008EBDbB04dc5932",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "0x88851D43246C34295a83f7629b851C6969F3e07b",
    [ODDZ_NETWORK.MANTA_MAINNET]: "0xFB02ccF0492b554955e64b1a008EBDbB04dc5932",
};

export const NYSE_MARKET = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x80299F4454cBaA07d400741A7875677B80Bd2090",
    [ODDZ_NETWORK.BSC_MAINNET]: "0x91D4354920489E8CDC0808CC7Ba362048f1E3954",
    [ODDZ_NETWORK.BSC_TEST]: "0x664612a7eF2FC591d823874044BCDB6099d73e8C",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS]: "",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
    [ODDZ_NETWORK.TELOS_MAINNET]: "",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    [ODDZ_NETWORK.MANTA_MAINNET]: "",
};

export const ODDZ_SWAP = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x0aAEb646B1aCD5EB1978DdE251986B4Afa764DFb",
    [ODDZ_NETWORK.BSC_TEST]: "0xBa0fEb7e4D19A375740Ccf425fDB2eE75aFB1e97",
    [ODDZ_NETWORK.BSC_MAINNET]: "0xfAd6652a04a460559C1E45D13790A32D8a856DdD",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]:
        "0x48aEEf61673B64848f5E2B65e728DA2b7E76429c",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "0xa513B6b210269e10bB4788044AC6Ce2ADb99D619",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "0xA32ACa190b70CE377fc1aAD8b2497cA05a314805",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS]: "",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "0xC54F1C84d33421f878c59F00A04Fb833CC8f1ADF",
    [ODDZ_NETWORK.TELOS_MAINNET]: "0xFB1983839618D5B7F1E6B4ef158225C7f1eBe304",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "0x202AA70AccaEA1E08B184cDCa60Ad647640f17B2",
    [ODDZ_NETWORK.MANTA_MAINNET]: "0xFB1983839618D5B7F1E6B4ef158225C7f1eBe304",
};

export const USDC_TOKEN = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
};

export const BUSD_TOKEN = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
};

export const USDT_TOKEN = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
};

export const DAI_TOKEN = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
};

export const MARKETS = {
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0xb956363EEf219C09A0035a527be97F40E4b3D959",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0xBfCFD6fb89c1fDd0D87c3d24dD8Fc1D371203651",
        [ODDZ_NETWORK.BSC_TEST]: "0xb956363EEf219C09A0035a527be97F40E4b3D959",
    },
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
        [ODDZ_NETWORK.MANTA_MAINNET]: "",
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x33759Cf5B48C4d43f48E6181B6123cca8E2D1Da5",
        [ODDZ_NETWORK.BSC_TEST]: "0xAaf251E54a2590a1E8bE36ACF3C40A51879912aA",
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "0x1ee118412C36B34641d49c6CAFfb5153bdf64E1D",
    },
};

export const QUESTS = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x2e9F2f229F9864F6aB300A75672b5ED09FDE5F3d",
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0xaC2488782966B2be6c2bFa0C2DD6A696add93235", // mapped to native quest
        [ODDZ_NETWORK.BSC_TEST]: "0x60Ec7fe1Ad71e7ee5ea450F77803C6974dfF797c",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
        [ODDZ_NETWORK.MANTA_MAINNET]: "",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0xdBF389ECbd8d0Af1470B59DE10b86Ce4eCc940cF",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x717Ea9D5F5d71Cb7e2604F7833e6Bd29aC9A6ff5",
        [ODDZ_NETWORK.BSC_TEST]: "0xdBF389ECbd8d0Af1470B59DE10b86Ce4eCc940cF",
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x2e9F2f229F9864F6aB300A75672b5ED09FDE5F3d",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: "",
        [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: "",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    },
};

export const NATIVELOSSYWRAPPER = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x84c19b9Bcfea09AF4113D4D3154b7d3d6d4450E7",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
        [ODDZ_NETWORK.MANTA_MAINNET]: "",
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x133e49d0d28a9f1b9fd63d2d2ba33d758089e1ca",
        [ODDZ_NETWORK.BSC_TEST]: "0x84c19b9Bcfea09AF4113D4D3154b7d3d6d4450E7",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: "",
        [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: "",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    },
};

export const QUESTAGGREGATOR = {
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0xC8A11d1abff7Ead14412Ce818E8CE20DbA369c98",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x358a5918b5Ed8fE1419bae479bfC35CA9662613b",
        [ODDZ_NETWORK.BSC_TEST]: "0xC8A11d1abff7Ead14412Ce818E8CE20DbA369c98",
    },
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0xC8A11d1abff7Ead14412Ce818E8CE20DbA369c98",
    },
    BNB: {
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x358a5918b5Ed8fE1419bae479bfC35CA9662613b",
        [ODDZ_NETWORK.BSC_TEST]: "0xC8A11d1abff7Ead14412Ce818E8CE20DbA369c98",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
        [ODDZ_NETWORK.MANTA_MAINNET]: "",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]: "",
        [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]: "",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    },
};

export const QUEST_POOL = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x780179a3f3647e7BCBE3DD8bC08e9Df8376a1FC7",
    },
    ETH: {
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
        [ODDZ_NETWORK.MANTA_MAINNET]: "",
    },
    BNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x780179a3f3647e7BCBE3DD8bC08e9Df8376a1FC7",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0x03A515b5536Be80D1aD31b407762463E3F999E84",
        [ODDZ_NETWORK.BSC_TEST]: "0x780179a3f3647e7BCBE3DD8bC08e9Df8376a1FC7",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "0xFB1983839618D5B7F1E6B4ef158225C7f1eBe304",
        [ODDZ_NETWORK.BSC_TEST]: "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
        [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "0x780179a3f3647e7BCBE3DD8bC08e9Df8376a1FC7",
    },
    MNT: {
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
    tcBNB: {
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
    tZBC: {
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
    ZBC: {
        [ODDZ_NETWORK.NAUTILUS]: "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
    TLOS: {
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
    SYS: {
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "0x6f82467BDD7ddE1BcB10544180f5Af1A78067de1",
    },
};

export const BHAVISH_REWARD_TOKEN = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x37e142e2Ee88e0B7b59fF2E57483a80B667bb9C4",
    [ODDZ_NETWORK.BSC_MAINNET]: "0xFB02ccF0492b554955e64b1a008EBDbB04dc5932",
    [ODDZ_NETWORK.BSC_TEST]: "0x37e142e2Ee88e0B7b59fF2E57483a80B667bb9C4",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS]: "",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
    [ODDZ_NETWORK.TELOS_MAINNET]: "",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    [ODDZ_NETWORK.MANTA_MAINNET]: "",
};

export const BHAVISH_REINVEST = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x5c00f3953Ab5a1dDcFf983236dd21296078D8437",
    [ODDZ_NETWORK.BSC_MAINNET]: "0x48aEEf61673B64848f5E2B65e728DA2b7E76429c",
    [ODDZ_NETWORK.BSC_TEST]: "0x5c00f3953Ab5a1dDcFf983236dd21296078D8437",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS]: "",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
    [ODDZ_NETWORK.TELOS_MAINNET]: "",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    [ODDZ_NETWORK.MANTA_MAINNET]: "",
};

export const MINIMAL_FORWARDER = {
    [ODDZ_NETWORK.MATIC_MAINNET]: "0xd2756044FdF2C1A803bE8daB40F565e3C6372e5e",
    [ODDZ_NETWORK.MATIC_TEST]: "0xd2756044FdF2C1A803bE8daB40F565e3C6372e5e",
};

export const AUTOTASK_WEBHOOK = {
    [ODDZ_NETWORK.MATIC_TEST]: process.env.NEXT_PUBLIC_AUTOTASK_WEBHOOK_MATIC,
    [ODDZ_NETWORK.MATIC_MAINNET]:
        process.env.NEXT_PUBLIC_AUTOTASK_WEBHOOK_MATIC,
};

export const ASSET_TYPES = {
    [ODDZ_NETWORK.MATIC_MAINNET]: [
        {
            id: 0,
            name: "MATIC",
            symbol: "MATIC",
            isActive: true,
            isActiveLossless: true,
        },
        {
            id: 1,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_MAINNET]: [
        {
            id: 0,
            name: "BNB",
            symbol: "BNB",
            isActive: true,
            isActiveLossless: true,
        },
        {
            id: 1,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_TEST]: [
        {
            id: 0,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BNB",
            symbol: "BNB",
            isActive: true,
            isActiveLossless: true,
        },
    ],
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTA_MAINNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_TESTNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_MAINNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.POLYGON_ZKEVM]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.OPBNB_TESTNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.TELOS_MAINNET]: [
        {
            id: 0,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: true,
        },
        {
            id: 3,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "TELOS",
            symbol: "TLOS",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ROLLUX_MAINNET]: [
        {
            id: 0,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: true,
            isActiveLossless: true,
        },
        {
            id: 3,
            name: "BNB",
            symbol: "BNB",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS]: [
        {
            id: 0,
            name: "ARBITRUM",
            symbol: "ARB",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "MATIC",
            symbol: "MATIC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "ETHEREUM",
            symbol: "ETH",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 3,
            name: "BITCOIN",
            symbol: "BTC",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 4,
            name: "ZBC",
            symbol: "ZBC",
            isActive: true,
            isActiveLossless: false,
        },
    ],
};

export const NETWORK_ASSET = {
    [ODDZ_NETWORK.MATIC_TEST]: "MATIC",
    [ODDZ_NETWORK.MATIC_MAINNET]: "MATIC",
    [ODDZ_NETWORK.BSC_MAINNET]: "BNB",
    [ODDZ_NETWORK.BSC_TEST]: "BNB",
    [ODDZ_NETWORK.AVAX_TESTNET]: "AVAX",
    [ODDZ_NETWORK.AVAX_MAINNET]: "AVAX",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "ETH",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "ETH",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "ETH",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "MNT",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "tcBNB",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "tZBC",
    [ODDZ_NETWORK.NAUTILUS]: "ZBC",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "MNT",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "ETH",
    [ODDZ_NETWORK.TELOS_MAINNET]: "TLOS",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "SYS",
    [ODDZ_NETWORK.MANTA_MAINNET]: "ETH",
};

export const ODDZ_TOKEN = {
    [ODDZ_NETWORK.BSC_TEST]: "0x5325A08168Ba5cD61098A0a156C2f467Efb46AE3",
    [ODDZ_NETWORK.MATIC_MAINNET]: "0x4e830F67Ec499E69930867f9017AEb5B3f629c73",
    [ODDZ_NETWORK.BSC_MAINNET]: "0xcd40f2670cf58720b694968698a5514e924f742d",
    [ODDZ_NETWORK.AVAX_TESTNET]: "0x5C7aF923f42Bc396F588d8B1564c0d9e38c067f1",
    [ODDZ_NETWORK.AVAX_MAINNET]: "0xB0a6e056B587D0a85640b39b1cB44086F7a26A1E",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "",
    [ODDZ_NETWORK.NAUTILUS]: "",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "",
    [ODDZ_NETWORK.TELOS_MAINNET]: "",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "",
    [ODDZ_NETWORK.MANTA_MAINNET]: "",
};

export const ODDZ_HISTORY_GRAPH_API = {
    MATIC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    ETH: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    BNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-prediction-subgraph",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    BGN: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    BGL: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
    },
    MNT: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    tcBNB: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    tZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    ZBC: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    TLOS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
    SYS: {
        [ODDZ_NETWORK.MATIC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.BSC_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/bsc-erc20-prediction",
        [ODDZ_NETWORK.BSC_TEST]:
            "https://api.thegraph.com/subgraphs/name/iharishkumar/bhavish-erc20-crypto",
        [ODDZ_NETWORK.ARBITRUM_MAINNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/arbitrum-prediction",
        [ODDZ_NETWORK.ZKSYNC_TESTNET]:
            "https://api.thegraph.com/subgraphs/name/bhargav55/zksync-testnet-prediction",
        [ODDZ_NETWORK.ZKSYNC_MAINNET]:
            "https://api.studio.thegraph.com/query/47954/zksync-mainnet-prediction/version/latest",
        [ODDZ_NETWORK.MANTLE_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.OPBNB_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.NAUTILUS]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.POLYGON_ZKEVM]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTLE_MAINNET]:
            "https://mantle-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.TELOS_MAINNET]:
            "https://telos-subgraph.nexter.fi/subgraphs/name/bhavish-finance/bhavish-subgraph",
        [ODDZ_NETWORK.ROLLUX_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
        [ODDZ_NETWORK.MANTA_MAINNET]:
            "https://api.studio.thegraph.com/query/48104/zkevm-polygon/version/latest",
    },
};

export const TRANSACTION_URI: { [chainId: number]: string } = {
    97: "https://testnet.bscscan.com/address/",
    80001: "https://explorer-mumbai.maticvigil.com/address/",
    56: "https://bscscan.com/address/",
    137: "https://explorer-mainnet.maticvigil.com/address/",
    43113: "https://testnet.snowtrace.io/address/",
    43114: "https://snowtrace.io/address/",
    421611: "https://rinkeby-explorer.arbitrum.io/address/",
    42161: "https://arbiscan.io/address/",
    280: "https://zksync2-testnet.zkscan.io/address/",
    324: "https://explorer.zksync.io/address/",
    5001: "https://explorer.testnet.mantle.xyz/address/",
    5000: "https://explorer.mantle.xyz/address/",
    5611: "https://opbnbscan.com/address/",
    1101: "https://zkevm.polygonscan.com/address/",
    91002: "https://triton.nautscan.com/address/",
    22222: "https://nautscan.com/address/",
    40: "https://teloscan.io/address/",
    570: "https://explorer.rollux.com/address/",
    169: "https://pacific-explorer.manta.network/address/",
};

export const DEPOSIT_METHOD = {
    EXCHANGES: "EXCHANGES",
    BANKUPI: "BANKUPI",
};

export enum Status {
    LIVE = "live",
    EXPIRED = "expired",
    ENDED = "ended",
    CANCELLED = "cancelled",
    TIE = "tie",
    CREATED = "Created",
    STARTED = "Started",
}

export enum PREDICT_TOKENS {
    MATIC = "MATIC",
    USDC = "USDC",
    USDT = "USDT",
    DAI = "DAI",
    BGN = "BGN",
    BGL = "BGL",
    BRN = "BRN",
    BNB = "BNB",
    ETH = "ETH",
    MNT = "MNT",
    tcBNB = "tcBNB",
    tZBC = "tZBC",
    ZBC = "ZBC",
    TLOS = "TLOS",
    SYS = "SYS",
}

export enum USER_RESULT {
    NOTSTARTED = "NOT STARTED",
    YOUWON = "YOU WON",
    DRAW = "DRAW",
    LOST = "LOST",
}
// Add integration to this enum and make changes to the provider address and integration variable in .env file
export enum INTEGRATIONS {
    BHAVISH = "BHAVISH",
    QUICKSWAP = "QUICKSWAP",
    ZEROSWAP = "ZEROSWAP",
    ONYX = "ONYX",
    ZEBEC = "ZEBEC",
}

export enum BHAVISH_TOKENS {
    BGN = "BGN",
    BRN = "BRN",
    BGL = "BGL",
}

export const FEATURE_SUPPORTED = {
    [ODDZ_NETWORK.MATIC_MAINNET]: {
        [PREDICT_TOKENS.MATIC]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: true,
            quests: true,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: true,
            vaults: false,
            quests: true,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.BSC_MAINNET]: {
        [PREDICT_TOKENS.BNB]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
        [PREDICT_TOKENS.ETH]: {
            commodities: true,
            crypto: false,
            stocks: false,
            vaults: true,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
        [PREDICT_TOKENS.ETH]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
        [PREDICT_TOKENS.ETH]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.MANTLE_TESTNET]: {
        [PREDICT_TOKENS.MNT]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
        [PREDICT_TOKENS.tZBC]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.NAUTILUS]: {
        [PREDICT_TOKENS.ZBC]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.POLYGON_ZKEVM]: {
        [PREDICT_TOKENS.ETH]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.MANTLE_TESTNET]: {
        [PREDICT_TOKENS.MNT]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.MANTLE_MAINNET]: {
        [PREDICT_TOKENS.MNT]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.OPBNB_TESTNET]: {
        [PREDICT_TOKENS.tcBNB]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.TELOS_MAINNET]: {
        [PREDICT_TOKENS.TLOS]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.ROLLUX_MAINNET]: {
        [PREDICT_TOKENS.SYS]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
    [ODDZ_NETWORK.MANTA_MAINNET]: {
        [PREDICT_TOKENS.ETH]: {
            commodities: false,
            crypto: true,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: false,
        },
        [PREDICT_TOKENS.BGN]: {
            commodities: false,
            crypto: false,
            stocks: false,
            vaults: false,
            quests: false,
            leaderBoard: true,
        },
    },
};

export const ASSET_TYPES_STOCKS = {
    [ODDZ_NETWORK.MATIC_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_TEST]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_TESTNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.OPBNB_TESTNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.POLYGON_ZKEVM]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.TELOS_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ROLLUX_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTA_MAINNET]: [
        {
            id: 0,
            name: "TESLA",
            symbol: "TSLA",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "APPLE",
            symbol: "APPL",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 2,
            name: "AMAZON",
            symbol: "AMZN",
            isActive: false,
            isActiveLossless: false,
        },
    ],
};

export const ASSET_TYPES_COMMODITY = {
    [ODDZ_NETWORK.MATIC_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.BSC_TEST]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_TESTNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTLE_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.OPBNB_TESTNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.NAUTILUS]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: true,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: true,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.POLYGON_ZKEVM]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.TELOS_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.ROLLUX_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
    [ODDZ_NETWORK.MANTA_MAINNET]: [
        {
            id: 0,
            name: "GOLD",
            symbol: "XAU",
            isActive: false,
            isActiveLossless: false,
        },
        {
            id: 1,
            name: "SILVER",
            symbol: "XAG",
            isActive: false,
            isActiveLossless: false,
        },
    ],
};

export const FEATURES_ACTIVE = {
    [ODDZ_NETWORK.MATIC_MAINNET]: {
        native: true,
        lossless: true,
    },
    [ODDZ_NETWORK.BSC_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.BSC_TEST]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.MANTLE_TESTNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.MANTLE_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.OPBNB_TESTNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.NAUTILUS]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.POLYGON_ZKEVM]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.TELOS_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.ROLLUX_MAINNET]: {
        native: true,
        lossless: false,
    },
    [ODDZ_NETWORK.MANTA_MAINNET]: {
        native: true,
        lossless: false,
    },
};

export const GTAG_MAPPING = {
    137: process.env.NEXT_PUBLIC_GTAG_POLYGON,
    56: process.env.NEXT_PUBLIC_GTAG_BNB,
    42161: process.env.NEXT_PUBLIC_GTAG_ARBITRUM,
    280: process.env.NEXT_PUBLIC_GTAG_ZKSYNC_TESTNET,
    324: process.env.NEXT_PUBLIC_GTAG_ZKSYNC_MAINNET,
    5001: process.env.NEXT_PUBLIC_GTAG_MANTLE_TESTNET,
    5611: process.env.NEXT_PUBLIC_GTAG_OPBNB_TESTNET,
    91002: process.env.NEXT_PUBLIC_GTAG_NAUTILUS_TRITON_TESTNET,
    22222: process.env.NEXT_PUBLIC_GTAG_NAUTILUS,
    5000: process.env.NEXT_PUBLIC_GTAG_MANTLE_MAINNET,
    1101: process.env.NEXT_PUBLIC_GTAG_POLYGON_ZKEVM,
    40: process.env.NEXT_PUBLIC_GTAG_TELOS_MAINNET,
    570: process.env.NEXT_PUBLIC_GTAG_ROLLUX_MAINNET,
    169: process.env.NEXT_PUBLIC_GTAG_MANTA_MAINNET,
};

export const getFormattedValue = (value, decimal) => {
    return value ? value / decimal : 0;
};

export enum INDICATOR_STATUS {
    UP = "UP",
    DOWN = "DOWN",
    TIE = "TIE",
    LATER = "LATER",
}

export enum CARD_STATUS {
    NEXT = "next",
    CANCELLED = "cancelled",
    SOON = "soon",
    LIVE = "live",
    EXPIRED = "expired",
}

export enum WALLET_NAME {
    Magiclink = "Magiclink",
}
export const symbolToAssetMapping = {
    "BITSTAMP:BTCUSD": {
        url: "/",
        asset: ASSETS.BTC,
    },
    "BITSTAMP:ETHUSD": {
        url: "/",
        asset: ASSETS.ETH,
    },
    "BITSTAMP:MATICUSD": {
        url: "/",
        asset: ASSETS.MATIC,
    },
    "BINANCE:BNBUSD": {
        url: "/",
        asset: ASSETS.BNB,
    },
    "NASDAQ:TSLA": {
        url: "/stocks",
        asset: ASSETS.TSLA,
    },
    "NASDAQ:AAPL": {
        url: "/stocks",
        asset: ASSETS.APPL,
    },
    "NASDAQ:AMZN": {
        url: "/stocks",
        asset: ASSETS.AMZN,
    },
    "TVC:GOLD": {
        url: "/commodities",
        asset: ASSETS.XAU,
    },
    "TVC:SILVER": {
        url: "/commodities",
        asset: ASSETS.XAG,
    },
};

export const vaultBlockedUsers = [
    "0x52f21ac94f210416e415514276bb1ea126caa412",
    "0x94e3c4575e5955eb24e81f0764279663b618a151",
    "0xa8a03676f84f000459ae39e929faa73b10e4362d",
    "0x846431eef1ad7baae8fd44d36f51980683ca57cb",
    "0xfa61128e6767f5e8329e89ce63d63cbc49396fed",
    "0xe9F74aD7e2d4A65fDD05D1b32C32229d007A2A4c",
    "0x78e331cb800FF2ED2C4Cd696bA29C895107BA396",
    "0x4acC5313D353177c658Ef098FafD9A34958649d4",
    "0x3bc0D5A68f5b77497150cDbdB6f54DF64dD46Af2",
    "0x747E2D83B5DaB11bD5351890D54e3944272aBDb9",
    "0x83Bfcd4a0BF6f442CA62a6f68E7f6CecF5C01D1d",
    "0x4A3ad4bB1A1b7CeE02E30F9f41d99985eA7A1E56",
    "0x7768b73f95d5d5f77aad6cd3cD47591a6565F75D",
    "0xA59e8042b8199fB21913AE3b96178e15eF96bAc3",
    "0x8b8b2d4cf0dab63028a4913fb12d54044e206b57",
    "0xbab8e94cec17832b10ae48f0b8876b6983d59bd2",
    "0x3d6d5b7304708d4f3182184c252f91b18cbad3fe",
    "0x1aee992c85a901c7febc04b11fce0a7e170ade82",
    "0xd223a8a6451df0d8b3633a5228e262ea1731ab28",
    "0xe59f840c27329eccbe0d03144a64f9f1794af35e",
    "0x7e4BC90d84922a370A8040AEE4637D787b2879c8",
    "0x116842D5a53D2023b780AC05872B3C42aA1811B6",
    "0xa6AB2d413e0a6Aa4727C66009AfA531877f1e7d1",
    "0x2bfb00F4baE00F6f1348f8b1FA6597F984BD4547",
    "0xb1f86193E2B2889EE8B20F669D979AEc97b89251",
];

export const leaderboardBlockedUsers = [
    "0x1beb9345586f7c20ca9db0dff40edfe3ce4facf4",
    "0x1345a56c12bfc99ec00e913350c539a499d95095",
    "0x4125d4ea54b562a4dad8488b425de8b8c1054ac0",
    "0x61a45b589da5d5457996ffad20cc6a20390bdca6",
    "0x8ba54959441124c315843057ca415da0c815e161",
    "0x8af3ee5735282ede40e876d8fe32f3f090e0bdf1",
    "0xc2df9d521b8366c2bf8ddb10f4e1d34442c12370",
    "0xe872f7b8821e7bccce4288c153b5f33106e55543",
    "0xbca9ef58c1bee72c83fa6bd3a04a1590c06bf03a",
    "0x59cb11ea143c5c85d33fa9a9d67b160f5e3f2fa8",
];

export const TRANSACTION_VIEWER = {
    [ODDZ_NETWORK.BSC_TEST]: "BscScan",
    [ODDZ_NETWORK.MATIC_TEST]: "Polyscan",
    [ODDZ_NETWORK.MATIC_MAINNET]: "Polyscan",
    [ODDZ_NETWORK.AVAX_TESTNET]: "Snowtrace",
    [ODDZ_NETWORK.AVAX_MAINNET]: "Snowtrace",
    [ODDZ_NETWORK.BSC_MAINNET]: "BscScan",
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: "ArbiScan",
    [ODDZ_NETWORK.ZKSYNC_TESTNET]: "zkscan",
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: "zkscan",
    [ODDZ_NETWORK.MANTLE_TESTNET]: "Explorer",
    [ODDZ_NETWORK.OPBNB_TESTNET]: "opbnbscan",
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: "Nautscan",
    [ODDZ_NETWORK.NAUTILUS]: "Nautscan",
    [ODDZ_NETWORK.MANTLE_MAINNET]: "Explorer",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "zkevm.polygonscan",
    [ODDZ_NETWORK.POLYGON_ZKEVM]: "zkevm",
    [ODDZ_NETWORK.TELOS_MAINNET]: "Teloscan",
    [ODDZ_NETWORK.ROLLUX_MAINNET]: "Explorer",
    [ODDZ_NETWORK.MANTA_MAINNET]: "Explorer",
};
