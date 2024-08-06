import React from "react";
import USDCCurrency from "@Public/svgs/usdc-currency.svg";
import USDTCurrency from "@Public/svgs/usdt-currency.svg";
import MaticCurrency from "@Public/svgs/matic-currency.svg";
import { BHAVISH_TOKENS, PREDICT_TOKENS } from "@Constants";
import DAICurrency from "@Public/svgs/dai-currency.svg";

const CurrencyIcon = ({ label, className = "" }) => {
    const currency = () => {
        switch (label) {
            case PREDICT_TOKENS.MATIC:
                return (
                    <MaticCurrency
                        className={`${className} text-primary-400`}
                    />
                );
            case PREDICT_TOKENS.USDC:
                return (
                    <USDCCurrency className={`${className} text-primary-400`} />
                );
            case PREDICT_TOKENS.USDT:
                return (
                    <USDTCurrency className={`${className} text-primary-400`} />
                );
            case PREDICT_TOKENS.DAI:
                return (
                    <DAICurrency className={`${className} text-primary-400`} />
                );
            case PREDICT_TOKENS.BNB:
                return (
                    <img
                        src="/images/currency/bnb.png"
                        className="h-6 w-6 mr-2"
                        alt="BNB"
                    />
                );
            case PREDICT_TOKENS.ETH:
                return (
                    <img
                        src="/images/currency/ethereum.png"
                        className="h-6 w-6 mr-2"
                        alt="ethereum"
                    />
                );
            case PREDICT_TOKENS.MNT:
                return (
                    <img
                        src="/images/currency/MNT.svg"
                        className="h-6 w-6 mr-2"
                        alt="MNT"
                    />
                );
            case PREDICT_TOKENS.SYS:
                return (
                    <img
                        src="/images/currency/SYS.svg"
                        className="h-6 w-6 mr-2"
                        alt="SYS"
                    />
                );
            case PREDICT_TOKENS.TLOS:
                return (
                    <img
                        src="/images/currency/telos.png"
                        className="h-6 w-6 mr-2"
                        alt="TLOS"
                    />
                );
            case PREDICT_TOKENS.tZBC:
                return (
                    <img
                        src="/images/currency/tZBC.png"
                        className="h-6 w-6 mr-2"
                        alt="tZBC"
                    />
                );
            case PREDICT_TOKENS.ZBC:
                return (
                    <img
                        src="/images/currency/ZBC.png"
                        className="h-6 w-6 mr-2"
                        alt="ZBC"
                    />
                );
            case PREDICT_TOKENS.tcBNB:
                return (
                    <img
                        src="/images/currency/bnb.png"
                        className="h-6 w-6 mr-2"
                        alt="tcBNB"
                    />
                );
            case BHAVISH_TOKENS.BGN:
                return (
                    <img
                        src="/images/currency/bhavish-lossless-chip.png"
                        className="h-6 w-6 mr-2"
                        alt="bhavish-lossless-chip"
                    />
                );
            case BHAVISH_TOKENS.BGL:
                return (
                    <img
                        src="/images/currency/bhavish-lossy-chip.png"
                        className="h-6 w-6 mr-2"
                        alt="bhavish-lossy-chip"
                    />
                );
            case BHAVISH_TOKENS.BRN:
                return (
                    <img
                        src="/images/currency/bhavish-reward.png"
                        className="h-6 w-6 mr-2"
                        alt="bhavish-lossy-chip"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <span>{currency()}</span>
        </div>
    );
};

export default CurrencyIcon;
