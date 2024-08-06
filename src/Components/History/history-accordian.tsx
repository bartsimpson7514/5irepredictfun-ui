/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { getUserRewardAmount } from "@Utils/rounds";
import {
    USDC_DECIMAL,
    Status,
    INDICATOR_STATUS,
    PREDICT_TOKENS,
    USER_RESULT,
} from "@Constants";
import {
    useToggleCollectEarningsModal,
    useToggleCollectRefundsModal,
} from "@Reducers/trade/hooks";
import { updateCollectReward } from "@Reducers/trade";
import { useWeb3React } from "@web3-react/core";
import { toDecimals } from "@Utils";
import { Transition } from "@headlessui/react";
import { isMobile } from "react-device-detect";
import { handleGaEvent } from "@Utils/googleanalytics";
import { returnAssetName } from "@Utils/priceFeed";
import DownArrow from "@Public/svgs/arrow.svg";
import { useTranslation } from "react-i18next";
import IntegrationButton from "@Basic/IntegrationButton";
import AccordionDetail from "./history-accordian-detail";

const Accordion = ({
    index,
    round,
    YourResult,
    Yourdirection,
    upPredictAmount,
    downPredictAmount,
    rewardReceived,
    roundState,
    betTime,
    claimed,
    isClaimSuccess,
    market,
}) => {
    const [isActive, setIsActive] = useState(false);
    const {
        selectedChainId,
        isPredicted,
        isRewardCollected,
        predictableToken,
        claimedRoundId,
    } = useSelector((state: AppState) => state.prediction);
    const [rewardAmount, setRewardAmount] = useState(0);
    const toggleCollectCardModal = useToggleCollectEarningsModal();
    const toggleCollectRefundModal = useToggleCollectRefundsModal();
    const dispatch = useDispatch();
    const { account, library } = useWeb3React();
    const assetPassed = round.asset.split("/");

    const assetName = assetPassed[0];
    const { t } = useTranslation();

    const getRewardAmount = async () => {
        const reward: any = await getUserRewardAmount(
            assetName,
            round.roundId,
            account,
            selectedChainId,
            library,
            predictableToken,
            market
        );
        setRewardAmount(reward / USDC_DECIMAL);
    };

    useEffect(() => {
        if (account) {
            getRewardAmount();
        }
        return () => {
            setRewardAmount(0);
        };
    }, [isPredicted, isRewardCollected]);

    const handleCollectEarnings = (reward, isRefund) => {
        dispatch(
            updateCollectReward({
                status: isRefund ? Status.TIE : Status.EXPIRED,
                asset: assetPassed[0],
                roundId: round.roundId,
                rewardAmount: reward,
                collectEarnings: "HISTORYPAGE",
                market,
            })
        );
        if (isRefund) {
            toggleCollectRefundModal();
        } else {
            toggleCollectCardModal();
        }
    };

    const actionText = () => {
        if (
            (upPredictAmount > 0 || downPredictAmount > 0) &&
            round.roundState.toUpperCase() === Status.CANCELLED.toUpperCase() &&
            !claimed &&
            String(round.roundId + round.asset.split("/")[0]) !==
                String(claimedRoundId)
        )
            return (
                <td
                    className="text-center sm:mt-0 w-fit"
                    style={{ height: "40px" }}
                >
                    <IntegrationButton
                        className=" sm:py-[5px] sm:relative sm:px-3 px-2 py-2 rounded-md bg-footer-text"
                        onClick={() => {
                            handleGaEvent(
                                `HISTORY ${assetName} COLLECT REFUND CLICKED`
                            );

                            handleCollectEarnings(rewardAmount, true);
                        }}
                        content={() => (
                            <>
                                <span className="sm:text-sm text-xs  leading-4 text-primary-white sm:hidden">
                                    {t("Refund")}
                                </span>
                                <span className="sm:text-sm text-xs  leading-4 text-primary-white hidden sm:block">
                                    {t("Collect Refund")}
                                </span>
                            </>
                        )}
                    />
                </td>
            );
        return isMobile ? (
            <span className="w-20 sm:w-max text-left px-2">
                {t("Collected")}
            </span>
        ) : (
            <span className="w-20 sm:w-max text-left sm:relative right-[9px]">
                {t("Earnings Collected")}
            </span>
        );
    };

    const returnRewards = () => {
        if (rewardReceived || rewardAmount) {
            return rewardReceived > 0
                ? Number(rewardReceived / 1e18).toFixed(4)
                : Number(rewardAmount).toFixed(4);
        }
        return String(toDecimals(upPredictAmount + downPredictAmount));
    };

    return (
        <>
            <tr
                className="hidden sm:table-row rounded-xl text-sm transition-all text-primary-100 justify-start border-seperate border-spacing-10 items-start bg-history-section h-[68px]"
                role="button"
                tabIndex={0}
                style={{ lineHeight: "22.4px" }}
                onClick={() => {
                    if (roundState === "ENDED" || roundState === "CANCELED")
                        setIsActive(!isActive);
                }}
            >
                <td className="w-20 sm:w-max rounded-l-[10px]">
                    <div className="flex items-center text-xs sm:text-sm text-highlight dark:text-primary-100 sm:w-48 pl-7">
                        <div>
                            <div className="text-sm font-normal text-primary-100">{`#${index}`}</div>
                            <div className="sm:block hidden">
                                <small
                                    className="text-primary-200"
                                    style={{ fontSize: "10px" }}
                                >
                                    {`${new Date(
                                        betTime * 1000
                                    ).toLocaleDateString()} ${new Date(
                                        betTime * 1000
                                    ).toLocaleTimeString()}`}
                                </small>
                            </div>
                        </div>
                    </div>
                </td>
                <td
                    className={`font-medium sm:text-sm text-xs   text-left ${
                        YourResult === t("NOT STARTED")
                            ? "text-primary-200"
                            : YourResult === t("YOU WON") ||
                              YourResult === t("DRAW")
                            ? "text-up"
                            : "text-down"
                    }`}
                >
                    <div className="sm:hidden">
                        {YourResult === t("NOT STARTED")
                            ? t("NOT STARTED")
                            : YourResult === t("YOU WON")
                            ? t("WON")
                            : YourResult === t("DRAW")
                            ? t("DRAW")
                            : t("LOST")}
                    </div>
                    <div className="sm:block hidden">{YourResult}</div>
                </td>
                {!isMobile &&
                    (roundState === "ENDED" || roundState === "CANCELED" ? (
                        <td
                            className={`font-medium sm:text-sm text-xs   text-left ${
                                YourResult === USER_RESULT.YOUWON ||
                                YourResult === USER_RESULT.DRAW
                                    ? "text-up"
                                    : "text-down"
                            }`}
                        >
                            {YourResult === USER_RESULT.YOUWON ||
                            YourResult === USER_RESULT.DRAW
                                ? `${returnRewards()}`
                                : `-${returnRewards()}`}
                            {` ${
                                predictableToken === PREDICT_TOKENS.BGN
                                    ? PREDICT_TOKENS.BRN
                                    : predictableToken
                            }`}
                        </td>
                    ) : (
                        <td className="font-medium sm:text-sm text-xs    text-left text-primary-200">
                            {t("Not Available")}
                        </td>
                    ))}

                <td className="font-normal sm:text-sm text-xs  text-left text-primary-100">
                    {returnAssetName(assetPassed[0])}
                </td>
                {YourResult === t("YOU LOST") ? (
                    <td className=" text-left">{t("NA")}</td>
                ) : (
                    <>
                        {/* Need to clean up */}
                        {((upPredictAmount > 0 &&
                            round.winStatus === INDICATOR_STATUS.UP) ||
                            (downPredictAmount > 0 &&
                                round.winStatus === INDICATOR_STATUS.DOWN) ||
                            round.winStatus === INDICATOR_STATUS.TIE) &&
                        !claimed &&
                        String(round.roundId + round.asset.split("/")[0]) !==
                            String(claimedRoundId) &&
                        round.roundState.toUpperCase() ===
                            Status.ENDED.toUpperCase() &&
                        !isClaimSuccess ? (
                            <td
                                className=" sm:mt-0 pr-4 w-fit"
                                style={{ height: "40px" }}
                            >
                                <IntegrationButton
                                    className=" sm:py-[5px] sm:relative sm:px-3 px-2 py-2 rounded-md bg-footer-text"
                                    onClick={() => {
                                        handleGaEvent(
                                            `HISTORY ${assetName} COLLECT EARNINGS CLICKED`
                                        );
                                        handleCollectEarnings(
                                            rewardAmount,
                                            false
                                        );
                                    }}
                                    content={() => (
                                        <>
                                            <span className="sm:text-sm text-xs  leading-4 text-primary-white font-normal sm:hidden">
                                                {t("EARNINGS")}
                                            </span>
                                            <span className="sm:text-sm text-xs  leading-4 text-primary-white font-normal hidden sm:block">
                                                {t("Collect Earnings")}
                                            </span>
                                        </>
                                    )}
                                />
                            </td>
                        ) : (
                            <td className="sm:mt-0 text-start  items-center  mr-1 sm:mr-6 sm:text-sm text-xs  leading-4 text-primary-100 dark:text-primary-100 font-normal">
                                {round.roundState.toUpperCase() ===
                                    Status.CREATED.toUpperCase() ||
                                round.roundState.toUpperCase() ===
                                    Status.STARTED.toUpperCase()
                                    ? "NA"
                                    : actionText()}
                            </td>
                        )}
                        {(upPredictAmount > 0 || downPredictAmount > 0) &&
                            round.roundState.toUpperCase() ===
                                Status.CANCELLED &&
                            rewardReceived === 0 &&
                            String(
                                round.roundId + round.asset.split("/")[0]
                            ) !== String(claimedRoundId) && (
                                <td
                                    className="flex items-center sm:mt-0"
                                    style={{ height: "40px" }}
                                >
                                    <button
                                        type="button"
                                        className="flex text-center w-full sm:py-2 sm:px-3 px-2 py-2 sm:  justify-center items-center rounded-md bg-footer-text"
                                        onClick={() => {
                                            handleGaEvent(
                                                `HISTORY ${assetName} COLLECT REFUND CLICKED`
                                            );

                                            handleCollectEarnings(
                                                rewardAmount,
                                                true
                                            );
                                        }}
                                    >
                                        <span className="sm:text-sm text-xs  leading-4 text-primary-white font-semibold">
                                            {t("Earnings")}
                                        </span>
                                        <span className="sm:text-sm text-xs  leading-4 text-primary-white font-semibold">
                                            {t("Collect Earnings")}
                                        </span>
                                    </button>
                                </td>
                            )}
                    </>
                )}

                <td className="w-10 rounded-r-[10px] stroke-footer-text">
                    {isActive ? (
                        <DownArrow className="rotate-180" />
                    ) : (
                        <DownArrow />
                    )}
                </td>
            </tr>
            <tr>
                <td
                    colSpan={isMobile ? 5 : 6}
                    className={`${isActive ? "" : "pb-[3px]"}`}
                >
                    <Transition
                        show={isActive}
                        enter="duration-500 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-300 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        style={{ width: "100%" }}
                        className="w-full"
                    >
                        {isActive && (
                            <div className="flex transition-all w-full items-center justify-center bg-history-section rounded-b-xl mb-1">
                                <div
                                    className="accordion-content w-full px-[2px]  dark:text-primary-100 text-sm text-primary-100 flex sm:flex-row flex-col gap-4 justify-between"
                                    style={{ lineHeight: "25.2px" }}
                                >
                                    <AccordionDetail
                                        roundId={round.roundId}
                                        Yourdirection={Yourdirection}
                                        Yourposition={
                                            rewardReceived
                                                ? rewardReceived / USDC_DECIMAL
                                                : rewardAmount
                                        }
                                        Yourresult={YourResult}
                                        ClosedPrice={
                                            round.endPrice
                                                ? Number(round.endPrice) / 1e8
                                                : 0
                                        }
                                        LockedPrice={
                                            Number(round.startPrice)
                                                ? Number(round.startPrice) / 1e8
                                                : 0
                                        }
                                        PrizePool={round.totalAmount}
                                        PayoutUp={
                                            Number(round.upPredictAmount) > 0
                                                ? toDecimals(
                                                      Number(
                                                          Number(
                                                              round.totalAmount
                                                          ) /
                                                              Number(
                                                                  round.upPredictAmount
                                                              )
                                                      ),
                                                      2
                                                  )
                                                : 0
                                        }
                                        PayoutDOWN={
                                            Number(round.downPredictAmount) > 0
                                                ? toDecimals(
                                                      Number(
                                                          round.totalAmount
                                                      ) /
                                                          Number(
                                                              round.downPredictAmount
                                                          ),
                                                      2
                                                  )
                                                : 0
                                        }
                                        upPredictAmount={upPredictAmount}
                                        downPredictAmount={downPredictAmount}
                                        reward={returnRewards()}
                                        betTime={betTime}
                                    />
                                </div>
                            </div>
                        )}
                    </Transition>
                </td>
            </tr>
        </>
    );
};

export default Accordion;
