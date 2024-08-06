import React from "react";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";

const InsufficientBalance = () => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { account } = useWeb3React();
    const { t } = useTranslation();
    return (
        <div>
            <span className="flex items-center justify-center cursor-pointer px-3 py-2">
                <CurrencyIcon label={predictableToken} className="h-5 w-5" />
            </span>
            <div className="text-center">
                <p className="text-primary-100 font-medium mb-1">
                    {" "}
                    {!account
                        ? t(" Connect Wallet")
                        : t("Insufficient Balance")}
                </p>

                <p className="text-primary-200 text-sm font-normal sm:w-[270px] mx-auto w-full mb-4">
                    {t("InsufficientBalanceInfo", {
                        predictableToken,
                    })}
                </p>
            </div>
        </div>
    );
};
export default InsufficientBalance;
