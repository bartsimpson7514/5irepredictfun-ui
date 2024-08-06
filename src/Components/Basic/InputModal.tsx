import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import { TurnOffInputSpinner } from "@Styled/Options";
import { toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";

const InputField = ({
    amount,
    maxAmount,
    onMaxSelect,
    onHalfSelect,
    disabledCondition,
    inputChange,
    selectedOption,
    balanceText,
    loading,
    infoText = "",
    showMaxButton = true,
    show50Button = true,
    minAmount = 0,
}) => {
    const { account } = useWeb3React();
    const { t } = useTranslation();
    const handleValidation = () => {
        if (account && PREDICT_TOKENS.MATIC && maxAmount === 0) {
            return (
                <div className="text-red-500 text-xs font-medium ">
                    {t("Insufficient funds")}
                </div>
            );
        }
        if (account && Number(amount) > 0 && Number(amount) > maxAmount) {
            return (
                <div className="text-red-500 text-xs font-medium ">
                    {t("InputModalAmount", {
                        maxAmount: toDecimals(maxAmount),
                    })}
                </div>
            );
        }
        if (
            account &&
            Number(amount) > 0 &&
            minAmount > 0 &&
            Number(amount) < minAmount
        ) {
            return (
                <div className="text-red-500 text-xs font-medium ">
                    {t("MinAmount", { minAmount: toDecimals(minAmount) })}
                </div>
            );
        }
    };

    return (
        <div className="relative w-full">
            <div
                className={`flex flex-col gap-y-4 sm:mb-4 mb-1 bg-primary-card-200 rounded-xl p-4 ${account &&
                    Number(amount) > maxAmount &&
                    " border border-primary-error"}`}
            >
                <span className=" flex justify-between text-primary-white  text-sm leading-4 rounded-xl font-medium">
                    {t("Currency")}
                    <div className="flex flex-row items-center gap-x-2">
                        {show50Button && (
                            <span
                                role="none"
                                className={`cursor-pointer flex rounded-[4px]  text-sm font-semibold text-tooltip-text px-1   ${
                                    Number(maxAmount) > 0 &&
                                    Number(amount) === maxAmount / 2
                                        ? "bg-footer-text"
                                        : "bg-[#FFFFFF1A]"
                                }`}
                                onClick={onHalfSelect}
                            >
                                50%
                            </span>
                        )}
                        {showMaxButton && (
                            <span
                                className={`cursor-pointer flex rounded-[4px]  text-sm font-semibold text-tooltip-text px-1   ${
                                    Number(maxAmount) > 0 &&
                                    Number(amount) === maxAmount
                                        ? "bg-footer-text"
                                        : "bg-[#FFFFFF1A]"
                                }`}
                                role="none"
                                onClick={onMaxSelect}
                            >
                                {t("MAX")}
                            </span>
                        )}
                    </div>
                </span>
                <div className="flex justify-between items-center gap-2">
                    <div className="w-full">
                        <div className="relative oddz-select cursor-pointer w-fit ">
                            <button
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded="true"
                                aria-labelledby="listbox-label"
                                className="w-full cursor-pointer bg-gray-400  items-center flex flex-row gap-2  rounded-[44px] border-none outline-none transition-all duration-300 h-[42px]  sm:text-sm"
                            >
                                <span className="flex items-center justify-center cursor-pointer px-3 py-2">
                                    <CurrencyIcon
                                        label={selectedOption}
                                        className="h-5 w-5"
                                    />

                                    <span
                                        className="flex truncate   flex-row items-center"
                                        data-testid="selected-option"
                                    >
                                        <span className="text-sm leading-4 font-medium text-primary-white ml-1">
                                            {`${selectedOption}`}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <TurnOffInputSpinner>
                            <input
                                className="w-full relative bg-primary-card-200 text-primary-100 text-[18px] leading-[26px] text-right font-medium  focus:outline-none self-right"
                                type="text"
                                onKeyPress={event => {
                                    if (!/[0-9.]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                disabled={disabledCondition}
                                value={amount}
                                placeholder={t("Enter Amount")}
                                onChange={(ev: any) => {
                                    inputChange(ev);
                                }}
                            />
                        </TurnOffInputSpinner>
                        <div className=" text-xs font-medium text-primary-200">
                            {infoText}
                        </div>
                    </div>
                </div>
                {!loading ? (
                    <div className="text-primary-100 text-sm font-medium">
                        {`${t(balanceText)}: ${toDecimals(maxAmount, 6)}`}
                    </div>
                ) : (
                    <div className="h-[22px] w-24">
                        <QuickSwapLoader />
                    </div>
                )}
            </div>
            {handleValidation()}
        </div>
    );
};

export default InputField;
