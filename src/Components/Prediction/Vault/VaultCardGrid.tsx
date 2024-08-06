import TokenRender from "@Basic/TokenRender";
// import RightArrow from "@Public/svgs/right-arrow";
import React from "react";
import Link from "next/link";
import Card from "@Basic/Card";
import { initialPredictableToken, kFormatter, toDecimals } from "@Utils";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { gaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";

interface VaultCardGridProps {
    id: number;
    assetType: string;
    apy: number;
    currentDeposit: number;
    maxCapacity: number;
    icon: string;
    currencySupported: string;
    strategy: string;
    vaultName: string;
    description: string;
    startTimestamp: number;
    assetName: string;
    color: string;
}

const VaultCardGrid: React.FC<VaultCardGridProps> = ({ ...props }) => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const token = initialPredictableToken(selectedChainId);
    // const weekDiffrence = 0;
    const weekDiffrence = 10518400;
    const { t } = useTranslation();
    const handleGaEvent = () => {
        gaEvent({
            action: upperCase(
                `vault card ${props.assetName} - ${token} ${props.vaultName}`
            ),
            params: {},
        });
    };

    return (
        <Link href={`/vaults/${props.id}`} key={props.id}>
            <div
                className="max-w-[23rem] w-full"
                onClick={() => handleGaEvent()}
                role="presentation"
            >
                <Card>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img
                                src={props.icon}
                                alt="Icon"
                                className="w-10 h-auto"
                            />
                            <div>
                                <p className="text-primary-100 text-base font-medium whitespace-nowrap">
                                    <span>{props.assetName}</span>
                                    <span>{`-${token}`}</span>
                                </p>
                                <p className=" text-xs leading-4 font-medium text-primary-200">
                                    {t(props.vaultName)}
                                </p>
                            </div>
                        </div>
                        {/* <RightArrow className="fill-primary-100 group-hover:fill-primary-blue" /> */}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between mb-1">
                            <div className="text-xs font-medium dark:text-tooltip-text">
                                <p className="text-primary-100 text-base font-medium">
                                    {props.currentDeposit ? (
                                        `${toDecimals(
                                            props.currentDeposit,
                                            5
                                        )} ${predictableToken}`
                                    ) : (
                                        <div className="h-4">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </p>
                                <p className="text-primary-200 text-xs font-medium">
                                    {t("Current deposits")}
                                </p>
                            </div>
                            <div className="text-xs font-medium dark:text-tooltip-text">
                                <p className="text-primary-100 text-base font-medium">
                                    {props.maxCapacity ? (
                                        `${kFormatter(
                                            props.maxCapacity
                                        )} ${predictableToken} `
                                    ) : (
                                        <div className="h-4">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </p>
                                <p className="text-primary-200 text-xs font-medium">
                                    {t("Max capacity")}
                                </p>
                            </div>
                        </div>
                        <div className="w-full bg-vault-deposit-strip rounded-full h-2">
                            <div
                                className={` h-2 rounded-full text-sm`}
                                style={{
                                    backgroundColor: props.color,
                                    width: `${(props.currentDeposit /
                                        props.maxCapacity) *
                                        100}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                {currentTimestamp - props.startTimestamp <
                                weekDiffrence ? (
                                    <div className="text-primary-success text-base font-semibold py-2 w-fit px-3  bg-[#0fc6791A] rounded-[40px]">
                                        {t("New Vault")}
                                    </div>
                                ) : (
                                    <div
                                        className={`${
                                            props.apy > 0
                                                ? "text-primary-success"
                                                : "text-primary-100"
                                        }`}
                                    >
                                        <p className="text-xl leading-6 font-bold">
                                            {props.apy &&
                                            // eslint-disable-next-line no-restricted-globals
                                            isFinite(props.apy) ? (
                                                `${
                                                    props.apy > 0
                                                        ? `${props.apy.toFixed(
                                                              2
                                                          )}%`
                                                        : "---"
                                                }`
                                            ) : (
                                                <div className="h-4">
                                                    <QuickSwapLoader />
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                )}

                                <div className=" text-primary-200 text-xs leading-4 font-normal">
                                    {t("Current Est APR")}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <TokenRender
                                    tokenList={props.currencySupported}
                                />
                                <div className=" text-primary-200 text-xs leading-4 font-normal">
                                    {t("Currency")}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-1 w-full">
                        <p className="text-primary-100 text-xs">
                            {props.description}
                        </p>
                    </div> */}
                </Card>
            </div>
        </Link>
    );
};

export default VaultCardGrid;
