/* eslint-disable @typescript-eslint/no-unused-vars */
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import { TurnOffInputSpinner } from "@Styled/Options";
import { toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";

const ZeroSwapInputField = ({
    amount,
    maxAmount,
    onMaxSelect,
    onHalfSelect,
    on25Select,
    on75Select,
    disabledCondition,
    inputChange,
    selectedOption,
    balanceText,
    loading,
    infoText = "",
    showMaxButton = true,
    show50Button = true,
    minAmount = 0,
    backgroundColor = "bg-[#FFFFFFCC]",
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
        <div className="w-full flex flex-col gap-2 mb-1">
            <div
                className={`${backgroundColor} rounded-lg flex flex-col gap-6 px-4 py-[14px] ${account &&
                    Number(amount) > maxAmount &&
                    " border border-primary-error"}`}
            >
                <div className="w-full flex flex-col gap-2">
                    <div className=" text-primary-100 text-sm font-semibold">
                        {balanceText}
                    </div>
                    <div className="flex items-center justify-between">
                        <TurnOffInputSpinner>
                            <input
                                className="w-full relative bg-transparent text-[#808191] text-[16px] leading-[24px]  font-medium  focus:outline-none "
                                type="text"
                                onKeyPress={event => {
                                    if (!/[0-9.]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                disabled={disabledCondition}
                                value={amount}
                                placeholder="Enter Amount"
                                onChange={(ev: any) => {
                                    inputChange(ev);
                                }}
                            />
                        </TurnOffInputSpinner>
                        <div className=" text-xs font-medium text-primary-200">
                            {infoText}
                        </div>
                        <button
                            type="button"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                            className=" bg-[#11142D0A] flex-row gap-2 flex items-center justify-center cursor-pointer px-2 py-1 rounded-[44px] border-none outline-none transition-all duration-300  sm:text-sm"
                        >
                            <CurrencyIcon
                                label={selectedOption}
                                className="h-5 w-5"
                            />

                            <span
                                className="flex flex-row items-center"
                                data-testid="selected-option"
                            >
                                <span className="text-sm leading-4 font-medium text-[#11142D]">
                                    {`${selectedOption}`}
                                </span>
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        {!loading ? (
                            <div className="font-semibold text-xs text-primary-200">
                                {`${t(balanceText)}: ${toDecimals(
                                    maxAmount,
                                    6
                                )} ${selectedOption}`}
                            </div>
                        ) : (
                            <div className="h-[22px] w-24">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-5 items-center justify-end">
                        <span
                            className={`bg-[#11142D0A] rounded-[40px] text-xs text-[#808191] cursor-pointer  px-2  `}
                            role="none"
                            onClick={on25Select}
                        >
                            25%
                        </span>
                        <span
                            className={`bg-[#11142D0A] rounded-[40px] text-xs text-[#808191] cursor-pointer  px-2  `}
                            role="none"
                            onClick={onHalfSelect}
                        >
                            50%
                        </span>
                        <span
                            className={`bg-[#11142D0A] rounded-[40px] text-xs text-[#808191] cursor-pointer  px-2  `}
                            role="none"
                            onClick={on75Select}
                        >
                            75%
                        </span>
                        <span
                            className={`bg-[#11142D0A] rounded-[40px] text-xs text-[#808191] cursor-pointer  px-2  `}
                            role="none"
                            onClick={onMaxSelect}
                        >
                            100%
                        </span>
                    </div>
                </div>
            </div>
            {handleValidation()}
        </div>
    );
};

export default ZeroSwapInputField;
