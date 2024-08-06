/* eslint-disable no-nested-ternary */
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { AppState } from "@Redux";
import { kFormatter, toDecimals } from "@Utils";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export interface VaultInfoProps {
    apy: number;
    currentDeposits: number;
    maxDeposits: number;
    color: string;
    startTimestamp: number;
}

const VaultInfo: React.FC<VaultInfoProps> = ({ ...props }) => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const { t } = useTranslation();
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    // const weekDiffrence = 0;
    const weekDiffrence = 10518400;

    return (
        <div className="px-4 py-5 sm:py-4 sm:px-8 flex sm:flex-row flex-col bg-card-background sm:items-center items-start rounded-t-lg gap-4 sm:gap-0">
            <div className="flex flex-col gap-2 w-fit sm:mr-10 justify-between items-start">
                {currentTimestamp - props.startTimestamp < weekDiffrence ? (
                    <div className="text-primary-success text-base font-semibold py-2 w-fit px-3  bg-[#0fc6791A] rounded-[40px] whitespace-nowrap">
                        {t("New Vault")}
                    </div>
                ) : (
                    <div
                        className={`text-2xl leading-6 sm:text-[2rem] sm:leading-8 ${
                            props.apy &&
                            // eslint-disable-next-line no-restricted-globals
                            isFinite(props.apy)
                                ? props.apy >= 0
                                    ? "text-primary-success"
                                    : "text-primary-100"
                                : "text-primary-100"
                        } font-bold`}
                    >
                        {props.apy &&
                        // eslint-disable-next-line no-restricted-globals
                        isFinite(props.apy) ? (
                            `${
                                props.apy > 0
                                    ? `${props.apy.toFixed(2)}%`
                                    : "---"
                            }`
                        ) : (
                            <div className="h-4 w-24">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </div>
                )}
                <p className="text-xs  text-primary-200 break-normal whitespace-nowrap">
                    {t("Current Est APR")}
                </p>
            </div>
            <div className="w-full h-px bg-primary-200 sm:h-10 sm:w-px" />
            <div className="flex flex-col gap-2 sm:mx-10 w-full">
                <div className="flex justify-between mb-1">
                    <div className="text-xs font-medium dark:text-tooltip-text">
                        <p className="text-primary-200">
                            {t("Current deposits")}
                        </p>
                        {props.currentDeposits ? (
                            <p className="text-primary-100">
                                {`${toDecimals(
                                    props.currentDeposits,
                                    5
                                )} ${predictableToken}`}
                            </p>
                        ) : (
                            <div className="h-4">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </div>
                    <div className="text-xs font-medium dark:text-tooltip-text">
                        <p className="text-primary-200">{t("Max capacity")}</p>
                        {props.maxDeposits ? (
                            <p className="text-primary-100">
                                {`${kFormatter(
                                    props.maxDeposits
                                )} ${predictableToken} `}
                            </p>
                        ) : (
                            <div className="h-4">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full bg-vault-deposit-strip rounded-full h-3">
                    <div
                        className=" h-3 rounded-full text-sm"
                        style={{
                            backgroundColor: props.color,
                            width: `${(Number(props.currentDeposits) /
                                Number(props.maxDeposits)) *
                                100}%`,
                        }}
                    />
                </div>
            </div>
            <div className="w-full h-px bg-primary-200 sm:h-10 sm:w-px" />
            <div className="w-full sm:ml-10 text-sm leading-5  text-primary-200 ">
                {t("Earnings_From_Predictions")}
            </div>
        </div>
    );
};

export default VaultInfo;
