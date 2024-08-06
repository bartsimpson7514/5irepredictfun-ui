import { fetchGas, initialPredictableToken, toDecimals } from "@Utils";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import {
    getMaticValue,
    lockInPeriod,
    reset,
    userAllWithdrawableBalance,
    userRewards,
    // userAPY,
    userWithdrawableBalance,
} from "@Utils/bhavishPool";
import { useWeb3React } from "@web3-react/core";
import {
    useBGClaimModalToggle,
    useBGDepositModalToggle,
    useBGReinvestModalToggle,
    useBGWithdrawModalToggle,
} from "@Reducers/trade/hooks";
import { PREDICT_TOKENS } from "@Constants";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useAlert } from "react-alert";
import { getDateFromUnixTimestamp } from "@Utils/time";
import ReactCoachPoints from "@Components/Quests/react-coachpoints";
import { useTranslation } from "react-i18next";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const HistoryBalance = ({ balances }) => {
    const { library, account } = useWeb3React();
    const [netWorth, setNetWorth] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    // const [apy, setApy] = useState(0);
    const [lockingPeriod, setLockinPeriod] = useState(0);
    const [totalBGN, setTotalBGN] = useState(0);
    const [reward, setRewards] = useState(0);
    const [loading, setLoading] = useState(false);

    const fullConfig = resolveConfig(tailwindConfig);

    const {
        transactionSpeedOption,
        bgrBalance,
        bglBalance,
        bgnBalance,
        predictableToken,
        selectedAsset,
        coachPoints,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const toggleBGWithdrawModal = useBGWithdrawModalToggle();
    const toggleBGDepositModal = useBGDepositModalToggle();
    const toggleBGClaim = useBGClaimModalToggle();
    const toggleBGReinvest = useBGReinvestModalToggle();
    const alert = useAlert();
    const [bgnMaticValue, setBGNMaticValue] = useState(0);
    const { t } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const balance = { BRN: bgrBalance, BGN: bgnBalance, BGL: bglBalance };

    const getMatic = async (val: number, withdrawToken: string) => {
        if (Number(val) > 0) {
            const value = await userWithdrawableBalance(
                library,
                withdrawToken,
                account,
                val
            );
            return Number(value);
        }
        return 0;
    };

    const calculateNetWorth = async () => {
        const BGRmaticValue = await getMaticValue(library, account);
        const BGNmaticValue = await getMatic(
            Number(totalBGN),
            PREDICT_TOKENS.BGN
        );
        setBGNMaticValue(BGNmaticValue);

        const BGLmaticValue = await getMatic(
            Number(balances.BGL),
            PREDICT_TOKENS.BGL
        );
        return toDecimals(
            BGNmaticValue + BGLmaticValue + Number(BGRmaticValue),
            4
        );
    };

    const getCurrentPrice = async () => {
        const mv = await getMaticValue(library, account);
        if (!mv) return;
        setCurrentPrice(toDecimals(mv, 6));
    };

    useEffect(() => {
        if (selectedAsset) {
            getCurrentPrice();
        }
    }, [selectedAsset, library]);

    const getBRNWithdrawBalance = async () => {
        if (account) {
            const withdrawAllBalance: number = await userAllWithdrawableBalance(
                library,
                PREDICT_TOKENS.BGN,
                account
            );
            const userReward = await userRewards(
                library,
                PREDICT_TOKENS.BGN,
                account
            );
            setRewards(userReward);
            setTotalBGN(withdrawAllBalance);
        }
    };

    useEffect(() => {
        getBRNWithdrawBalance();
    }, [account, library]);

    useEffect(() => {
        (async () => {
            if (account) {
                const val = await calculateNetWorth();
                setNetWorth(val);
            }
        })();
    }, [balances, account, totalBGN, library]);

    useEffect(() => {
        (async () => {
            if (account) {
                const value = await lockInPeriod(
                    library,
                    PREDICT_TOKENS.BGN,
                    account
                );

                setLockinPeriod(Number(value));
            }
        })();
    }, [predictableToken, account, loading, library]);

    const onResetSuccessful = () => {
        alert.success(t("Reset Success"));
    };

    const onResetError = () => {
        alert.error(t("Reset Failed"));
    };

    const onReset = () => {
        (async () => {
            if (account) {
                setLoading(true);
                const gasFeed = await fetchGas(
                    library,
                    transactionSpeedOption,
                    selectedChainId
                );
                await reset(
                    library,
                    account,
                    () => {},
                    onResetSuccessful,
                    onResetError,
                    gasFeed,
                    predictableToken
                );
                setLoading(false);
            }
        })();
    };

    const graphData =
        balances.BGN || balances.BGR || balances.BGL
            ? [
                  // {
                  //     title: "Bhavish Loss tokens (BGL)",
                  //     value: balances.BGL,
                  //     color: "#E84142",
                  // },
                  {
                      title: "Bhavish No Loss tokens (BGN)",
                      value: balances.BGN,
                      color: fullConfig.theme.colors["no-loss-color"],
                  },
                  {
                      title: "Bhavish Reward tokens (BGR)",
                      value: balances.BGR,
                      color: fullConfig.theme.colors["reward-token-color"],
                  },
              ]
            : [
                  {
                      title: "",
                      value: 100,
                      color: fullConfig.theme.colors["primary-200"],
                  },
              ];

    const renderBGNButtons = () => {
        return (
            <>
                <div className="flex flex-row space-x-2 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            toggleBGDepositModal();
                        }}
                        className="p-2 justify-center rounded bg-footer-text deposit"
                    >
                        <span className="text-sm leading-[22px] text-primary-white font-medium whitespace-nowrap">
                            {t("Deposit_Currency", {
                                predictableToken: initialPredictableToken(
                                    selectedChainId
                                ),
                            })}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onReset()}
                        disabled={
                            lockingPeriod && currentTimestamp < lockingPeriod
                        }
                        className={`p-2 justify-center rounded-md border border-primary-blue repeat ${
                            (lockingPeriod &&
                                currentTimestamp < lockingPeriod) ||
                            !totalBGN
                                ? "opacity-50 pointer-events-none"
                                : ""
                        }`}
                    >
                        <span className="text-sm leading-[22px] font-medium gradient-text bg-footer-text ">
                            {t("Reset")}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (balances.BGN) toggleBGWithdrawModal();
                        }}
                        className={`py-2 justify-center rounded-md border border-primary-blue px-2 withdraw ${
                            (lockingPeriod &&
                                currentTimestamp < lockingPeriod) ||
                            !totalBGN
                                ? "opacity-50 pointer-events-none"
                                : ""
                        }`}
                    >
                        <span className="text-sm leading-[22px] font-medium  gradient-text bg-footer-text">
                            {t("Withdraw")}
                        </span>
                    </button>
                </div>
                {lockingPeriod && currentTimestamp < lockingPeriod ? (
                    <div className="text-sm leading-[22px] text-primary-200 w-[285px] sm:h-[66px] font-normal pt-3">
                        <span className="text-primary-100">
                            {`${t("Note")} `}
                        </span>
                        {`${t(
                            "Reset and Withdraw actions will be enabled after"
                        )} `}
                        <span className="text-primary-100">
                            {getDateFromUnixTimestamp(lockingPeriod)}
                        </span>
                        {` ${t("lockin period")}`}
                    </div>
                ) : null}
            </>
        );
    };

    const renderBRNButtons = () => {
        return (
            <>
                <div className="flex gap-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (balances.BGR) toggleBGReinvest();
                        }}
                        className={`py-2 justify-center reinvest
                rounded-md bg-footer-text px-2 ${
                    balances.BGR ? "" : "opacity-50 pointer-events-none"
                }`}
                    >
                        <span className="text-sm leading-4 text-primary-white font-normal">
                            {t("ReInvest")}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (balances.BGR) toggleBGClaim();
                        }}
                        className={`py-2 justify-center rounded-md border border-primary-blue px-2 claim ${
                            balances.BGR ? "" : "opacity-50 pointer-events-none"
                        }`}
                    >
                        <span className="text-sm leading-4 gradient-text bg-footer-text font-normal">
                            {t("Claim")}
                        </span>
                    </button>
                </div>
                {lockingPeriod && currentTimestamp < lockingPeriod ? (
                    <div className="w-[285px] sm:pt-3 sm:h-[66px]">&nbsp;</div>
                ) : null}
            </>
        );
    };

    return (
        <div className="px-0 py-0 md:px-4 md:py-4 lg:px-36 lg:py-[80px]">
            {account &&
                coachPoints &&
                coachPoints.mainSection &&
                !coachPoints.profile && <ReactCoachPoints page="profile" />}

            <div className="flex lg:w-full lg:flex-row flex-col items-center justify-between">
                {/* <div className="h-[254px] lg:mr-[80px] mr-[10px]"> */}
                <div className="lg:mr-[80px]">
                    <PieChart
                        data={graphData}
                        animate
                        lineWidth={40}
                        label={labelRenderProps => {
                            if (
                                labelRenderProps.dataEntry.percentage &&
                                labelRenderProps.dataEntry.title
                            )
                                return `${toDecimals(
                                    labelRenderProps.dataEntry.percentage,
                                    2
                                )}%`;
                        }}
                        labelPosition={80}
                        labelStyle={{
                            fontSize: "5px",
                            fontWeight: "800",
                            color: "white",
                        }}
                    />
                </div>
                <div className="flex flex-col lg:flex-row sm:space-y-0 space-y-8 justify-between lg:gap-[101px] md:gap-[30px] gap-0 sm:pl-0 sm:pt-0 pt-8">
                    <div className="flex flex-col">
                        <div className="inline-flex gap-2 items-center lg:pt-0 pt-4">
                            <div className="rounded w-4 h-4  bg-no-loss-color" />
                            <h1 className="text-primary-100 text-sm font-medium">
                                {t("Bhavish Game No Loss tokens")}
                            </h1>
                        </div>
                        <div className="pt-4">
                            <div className="text-primary-100 text-lg font-semibold">
                                {`${toDecimals(balances.BGN, 2)}`}
                                <span className="text-primary-200 text-sm">
                                    {`/${totalBGN}`}
                                </span>
                                <span className=" text-sm fot-normal text-potential-text">
                                    {` BGN`}
                                </span>
                            </div>
                            <div className="text-xs text-primary-200">
                                &nbsp;
                                {`~${toDecimals(
                                    bgnMaticValue,
                                    6
                                )} ${initialPredictableToken(selectedChainId)}`}
                            </div>
                        </div>

                        {renderBGNButtons()}
                        <div className="flex flex-col pt-[31px] sm:block hidden">
                            <h1 className="text-primary-100 text-sm font-medium">
                                {t("Estimated Net Worth")}
                            </h1>
                            <div className="pt-4">
                                <span className="text-primary-100 text-lg font-semibold leading-6">
                                    {netWorth}
                                </span>
                                <span className="text-potential-text text-sm font-normal leading-6">
                                    {` ${initialPredictableToken(
                                        selectedChainId
                                    )}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:pt-0 pt-8">
                        <div className="inline-flex gap-2 items-center">
                            <div className="rounded w-4 h-4 bg-reward-token-color" />
                            <div className="flex flex-col gap-6">
                                <h1 className="text-primary-100 text-sm font-medium">
                                    {t("Bhavish Game Reward tokens")}
                                </h1>
                            </div>
                        </div>
                        <div className="text-primary-100 text-lg font-semibold  items-center pt-4">
                            <div>
                                {toDecimals(balances.BGR, 6)}
                                <span className=" text-sm  text-potential-text">
                                    &nbsp;
                                    {`${PREDICT_TOKENS.BRN}`}
                                </span>
                            </div>
                            <div className="text-xs text-primary-200">
                                &nbsp;
                                {`~${currentPrice} ${initialPredictableToken(
                                    selectedChainId
                                )}`}
                            </div>
                        </div>

                        {renderBRNButtons()}
                        <div className="flex flex-col pt-[31px]  sm:block hidden">
                            <h1 className="text-primary-100 text-sm font-medium">
                                {t("Potential APY")}
                            </h1>
                            {reward > 0 ? (
                                <div className="pt-4">
                                    <span className="text-primary-100 text-lg font-semibold leading-6">
                                        {`${toDecimals(reward, 6)}`}
                                    </span>
                                    <span className="text-potential-text text-sm font-normal leading-6">
                                        {` ${initialPredictableToken(
                                            selectedChainId
                                        )}`}
                                    </span>
                                </div>
                            ) : (
                                <div className="pt-4">
                                    <span className="text-primary-100 text-lg font-semibold leading-6">
                                        ---
                                    </span>
                                    <span className="text-potential-text text-sm font-normal leading-6">
                                        {` ${initialPredictableToken(
                                            selectedChainId
                                        )}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-8 sm:hidden block">
                        <h1 className="text-primary-100 text-sm font-medium">
                            {t("Estimated Net Worth")}
                        </h1>
                        <div className="pt-4">
                            <span className="text-primary-100 text-lg font-semibold leading-6">
                                {netWorth}
                            </span>
                            <span className="text-potential-text text-sm font-normal leading-6">
                                {` ${initialPredictableToken(selectedChainId)}`}
                            </span>
                        </div>
                    </div>
                    <div className="pt-8 sm:hidden block">
                        <h1 className="text-primary-100 text-sm font-medium">
                            {t("Potential APY")}
                        </h1>
                        {reward > 0 ? (
                            <div className="pt-4">
                                <span className="text-primary-100 text-lg font-semibold leading-6">
                                    {`${toDecimals(reward, 6)}`}
                                </span>
                                <span className="text-potential-text text-sm font-normal leading-6">
                                    {` ${initialPredictableToken(
                                        selectedChainId
                                    )}`}
                                </span>
                            </div>
                        ) : (
                            <div className="pt-4">
                                <span className="text-primary-100 text-lg font-semibold leading-6">
                                    ---
                                </span>
                                <span className="text-potential-text text-sm font-normal leading-6">
                                    {` ${initialPredictableToken(
                                        selectedChainId
                                    )}`}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryBalance;
