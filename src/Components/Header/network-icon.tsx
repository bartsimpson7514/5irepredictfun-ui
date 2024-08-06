import React from "react";
import { INTEGRATIONS, ODDZ_NETWORK } from "@Constants";

const MaticLogoRender = () => {
    switch (process.env.NEXT_PUBLIC_INTEGRATION) {
        case INTEGRATIONS.BHAVISH:
        case INTEGRATIONS.QUICKSWAP:
        case INTEGRATIONS.ONYX:
            return "/images/currency/matic.png";
        case INTEGRATIONS.ZEROSWAP:
            return "/images/ZeroSwap/matic.png";

        default:
            return "/images/currency/matic.png";
    }
};

const NetworkIcon = ({ chain = 1, className = "" }) => {
    const iconRender = () => {
        if (
            chain === ODDZ_NETWORK.BSC_MAINNET ||
            chain === ODDZ_NETWORK.BSC_TEST
        )
            return (
                <img
                    className={className}
                    src="/images/currency/bnb.png"
                    alt="BNB"
                />
            );
        if (
            chain === ODDZ_NETWORK.MATIC_MAINNET ||
            chain === ODDZ_NETWORK.MATIC_TEST
        )
            return (
                <img
                    className={className}
                    src={MaticLogoRender()}
                    alt="MATIC"
                />
            );
        if (chain === ODDZ_NETWORK.ARBITRUM_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/arbitrum.png"
                    alt="arbitrum"
                />
            );
        if (chain === ODDZ_NETWORK.ZKSYNC_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/zkSync.svg"
                    alt="ZKSYNC_TESTNET"
                />
            );
        if (chain === ODDZ_NETWORK.ZKSYNC_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/zkSync.svg"
                    alt="ZKSYNC_MAINNET"
                />
            );
        if (chain === ODDZ_NETWORK.MANTLE_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/mantle.svg"
                    alt="Mantle"
                />
            );
        if (chain === ODDZ_NETWORK.MANTA_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/manta.png"
                    alt="Manta"
                />
            );
        if (chain === ODDZ_NETWORK.TELOS_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/telos.png"
                    alt="Telos"
                />
            );
        if (chain === ODDZ_NETWORK.MANTLE_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/mantle.svg"
                    alt="Mantle"
                />
            );
        if (chain === ODDZ_NETWORK.OPBNB_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/bnb.png"
                    alt="OPBNB TESTNET"
                />
            );
        if (chain === ODDZ_NETWORK.ROLLUX_MAINNET)
            return (
                <img
                    className={className}
                    src="/images/currency/rollux.svg"
                    alt="ROLLUX MAINNET"
                />
            );
        if (chain === ODDZ_NETWORK.POLYGON_ZKEVM)
            return (
                <img
                    className={className}
                    src="/images/currency/zkEVM.svg"
                    alt="POLYGON_ZKEVM"
                />
            );
        if (chain === ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/NAUTILUS.svg"
                    alt="NAUTILUS_TRITON_TESTNET"
                />
            );
        if (chain === ODDZ_NETWORK.NAUTILUS)
            return (
                <img
                    className={className}
                    src="/images/currency/NAUTILUS.svg"
                    alt="NAUTILUS"
                />
            );
        return (
            <img
                className={className}
                src="/images/currency/matic.png"
                alt="MATIC"
            />
        );
    };

    return (
        <div>
            <span>{iconRender()}</span>
        </div>
    );
};

export default NetworkIcon;
