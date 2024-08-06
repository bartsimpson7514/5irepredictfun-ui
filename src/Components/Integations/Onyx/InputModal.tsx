/* eslint-disable @typescript-eslint/no-unused-vars */
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import { TurnOffInputSpinner } from "@Styled/Options";
import { toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";

const OnyxInputField = ({
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
    backgroundColor = "bg-[#313645]",
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
                className={`${backgroundColor} rounded-lg flex flex-col gap-6 p-3 ${account &&
                    Number(amount) > maxAmount &&
                    " border border-primary-error"}`}
            >
                <div className="w-full flex flex-col gap-2">
                    <div className=" text-[#FFFFFFB2] text-sm font-semibold">
                        {balanceText}
                    </div>
                    <div className="flex items-center justify-between">
                        <TurnOffInputSpinner>
                            <input
                                className="w-full relative bg-transparent text-[#FFFFFF] text-[16px] leading-[24px]  font-medium  focus:outline-none "
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
                            className=" bg-[#FFFFFF1A] rounded-[8px] flex-row gap-2 flex items-center justify-center cursor-pointer px-2 py-1  border-none outline-none transition-all duration-300  sm:text-sm"
                        >
                            <CurrencyIcon
                                label={selectedOption}
                                className="h-5 w-5"
                            />

                            <span
                                className="flex flex-row items-center"
                                data-testid="selected-option"
                            >
                                <span className="text-sm leading-4 font-medium text-[#FFFFFF]">
                                    {`${selectedOption}`}
                                </span>
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        {!loading ? (
                            <div className="text-xs text-[#FFFFFF99]">
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
                            className={`rounded-[12px] text-xs  border border-[#217BF4] cursor-pointer  px-2  ${
                                amount === maxAmount / 4 && amount !== 0
                                    ? "text-[#FFFFFF] bg-[#217BF4]"
                                    : "text-[#217BF4] "
                            }`}
                            role="none"
                            onClick={on25Select}
                        >
                            25%
                        </span>
                        <span
                            className={`rounded-[12px] text-xs  border border-[#217BF4] cursor-pointer  px-2  ${
                                amount === maxAmount / 2 && amount !== 0
                                    ? "text-[#FFFFFF] bg-[#217BF4]"
                                    : "text-[#217BF4] "
                            }`}
                            role="none"
                            onClick={onHalfSelect}
                        >
                            50%
                        </span>
                        <span
                            className={`rounded-[12px] text-xs  border border-[#217BF4] cursor-pointer  px-2  ${
                                amount === (3 * maxAmount) / 4 && amount !== 0
                                    ? "text-[#FFFFFF] bg-[#217BF4]"
                                    : "text-[#217BF4] "
                            }`}
                            role="none"
                            onClick={on75Select}
                        >
                            75%
                        </span>
                        <span
                            className={`rounded-[12px] text-xs  border border-[#217BF4] cursor-pointer  px-2  ${
                                amount === maxAmount && amount !== 0
                                    ? "text-[#FFFFFF] bg-[#217BF4]"
                                    : "text-[#217BF4] "
                            }`}
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

export default OnyxInputField;
