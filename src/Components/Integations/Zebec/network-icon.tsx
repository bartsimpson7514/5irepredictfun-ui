import React from "react";
import { ODDZ_NETWORK } from "@Constants";

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
                    src="/images/ZeroSwap/matic.png"
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
        if (chain === ODDZ_NETWORK.OPBNB_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/bnb.png"
                    alt="OPBNB TESTNET"
                />
            );
        if (chain === ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET)
            return (
                <img
                    className={className}
                    src="/images/currency/tZBC.png"
                    alt="tZBC"
                />
            );
        if (chain === ODDZ_NETWORK.NAUTILUS)
            return (
                <img
                    className={className}
                    src="/images/currency/ZBC.png"
                    alt="ZBC"
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
