/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import Arrow from "@Public/svgs/arrow.svg";
import { updateCollectReward } from "@Reducers/trade";
import {
    PREDICT_TOKENS,
    Status,
    USDC_DECIMAL,
    INDICATOR_STATUS,
    USER_RESULT,
} from "@Constants";
import {
    useToggleCollectEarningsModal,
    useToggleCollectRefundsModal,
} from "@Reducers/trade/hooks";
import { isMobile } from "react-device-detect";
import { returnAssetName } from "@Utils/priceFeed";
import { getUserRewardAmount } from "@Utils/rounds";
import { handleGaEvent } from "@Utils/googleanalytics";
import { toDecimals } from "@Utils";
import IntegrationButton from "@Basic/IntegrationButton";
import AccordionDetail from "./history-accordian-detail";

const HistoryAccMweb = ({
    index,
    round,
    YourResult,
    Yourdirection,
    upPredictAmount,
    downPredictAmount,
    rewardReceived,
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
                <td className="flex items-center" style={{ height: "40px" }}>
                    <button
                        type="button"
                        className="flex text-center w-full sm:px-3 px-2 py-2 sm:justify-center items-center rounded-md bg-footer-text mr-6"
                        onClick={() => {
                            handleGaEvent(
                                `HISTORY ${assetName} COLLECT REFUND CLICKED`
                            );

                            handleCollectEarnings(rewardAmount, true);
                        }}
                    >
                        <span className="sm:text-sm text-xs  leading-4 text-primary-white font-semibold sm:hidden">
                            Refund
                        </span>
                        <span className="sm:text-sm text-xs  leading-4 text-primary-white font-semibold hidden sm:block">
                            Collect Refund
                        </span>
                    </button>
                </td>
            );
        return isMobile ? (
            <span className="w-20 sm:w-max text-left">Collected</span>
        ) : (
            <span className="w-20 sm:w-max text-left">Earnings collected</span>
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
    const isClaimEligible =
        ((upPredictAmount > 0 && round.winStatus === INDICATOR_STATUS.UP) ||
            (downPredictAmount > 0 &&
                round.winStatus === INDICATOR_STATUS.DOWN) ||
            round.winStatus === INDICATOR_STATUS.TIE) &&
        (predictableToken === PREDICT_TOKENS.MATIC ||
            predictableToken === PREDICT_TOKENS.BGN);

    return (
        <div className="sm:hidden p-4 bg-history-section flex flex-col rounded-lg mb-4">
            <div
                role="button"
                tabIndex={0}
                onClick={() => {
                    setIsActive(!isActive);
                }}
            >
                <div className="flex flex-col">
                    <div className="flex  my-2">
                        <div className="w-1/2 m-1">
                            <h1 className="text-xs leading-[22px]  text-primary-100">
                                <div>{`#${index + 1}`}</div>
                                <small className="text-primary-200 font-text-xxs">
                                    {`${new Date(
                                        betTime * 1000
                                    ).toLocaleDateString()} ${new Date(
                                        betTime * 1000
                                    ).toLocaleTimeString()}`}
                                </small>
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                Round
                            </h2>
                        </div>
                        <div className="w-1/2 m-1 font-normal leading-[22px] sm:text-xs text-sm">
                            <div className="ml-[14px]">
                                <h1
                                    className={`text-left text-primary-100 mb-1
                            
                                ${
                                    YourResult === USER_RESULT.NOTSTARTED
                                        ? "text-primary-200"
                                        : YourResult === USER_RESULT.YOUWON ||
                                          YourResult === USER_RESULT.DRAW
                                        ? "text-up"
                                        : "text-down"
                                }`}
                                >
                                    <h1>
                                        {YourResult === USER_RESULT.NOTSTARTED
                                            ? "NOT STARTED"
                                            : YourResult === USER_RESULT.YOUWON
                                            ? "WON"
                                            : YourResult === USER_RESULT.DRAW
                                            ? "DRAW"
                                            : "LOST"}
                                    </h1>
                                </h1>
                                <h2 className="font-normal text-primary-200">
                                    Your Result
                                </h2>
                            </div>
                        </div>
                        <div className="mt-2">
                            {isActive ? (
                                <Arrow className="rotate-180" />
                            ) : (
                                <Arrow />
                            )}
                        </div>
                    </div>
                    <div className="flex my-2">
                        <div className="w-1/2 m-1">
                            <div
                                className={`text-sm leading[-22px] text-primary-100 mb-1 ${
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
                            </div>
                            <h2 className="text-sm font-medium text-primary-200">
                                Earnings
                            </h2>
                        </div>
                        <div className="w-1/2 m-1 ml-[14px]">
                            <h1 className="text-sm leading[-22px] font-normal text-primary-100 mb-1">
                                {returnAssetName(assetPassed[0])}
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                Asset
                            </h2>
                        </div>
                    </div>
                    <div className="">
                        {YourResult === "YOU LOST" ? (
                            <td className="text-left text-primary-200">---</td>
                        ) : (
                            <>
                                {((upPredictAmount > 0 &&
                                    round.winStatus === INDICATOR_STATUS.UP) ||
                                    (downPredictAmount > 0 &&
                                        round.winStatus ===
                                            INDICATOR_STATUS.DOWN) ||
                                    round.winStatus === INDICATOR_STATUS.TIE) &&
                                !claimed &&
                                round.roundState.toUpperCase() ===
                                    Status.ENDED.toUpperCase() &&
                                String(
                                    round.roundId + round.asset.split("/")[0]
                                ) !== String(claimedRoundId) &&
                                !isClaimSuccess ? (
                                    <td className="text-center sm:mt-0 pr-4 rounded-r-[10px]">
                                        <IntegrationButton
                                            onClick={() => {
                                                handleGaEvent(
                                                    `HISTORY ${assetName} COLLECT EARNINGS CLICKED`
                                                );
                                                handleCollectEarnings(
                                                    rewardAmount,
                                                    false
                                                );
                                            }}
                                            className=" sm:py-[5px] sm:relative sm:px-3 px-2 py-2 rounded-md bg-footer-text"
                                            content={() => (
                                                <>
                                                    <span className="sm:text-sm text-xs  leading-4 text-primary-white font-medium">
                                                        Collect Earnings
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="text-start rounded-r-[10px] items-center  mr-1 sm:mr-6 sm:text-sm text-xs  leading-4 text-primary-100 font-normal">
                                        {round.roundState.toUpperCase() ===
                                            Status.CREATED.toUpperCase() ||
                                        round.roundState.toUpperCase() ===
                                            Status.STARTED.toUpperCase()
                                            ? "NA"
                                            : actionText()}
                                    </td>
                                )}
                                {(upPredictAmount > 0 ||
                                    downPredictAmount > 0) &&
                                    round.roundState.toUpperCase() ===
                                        Status.CANCELLED &&
                                    rewardReceived === 0 &&
                                    String(
                                        round.roundId +
                                            round.asset.split("/")[0]
                                    ) !== String(claimedRoundId) && (
                                        <td className="flex items-center sm:mt-0">
                                            <button
                                                type="button"
                                                className="flex text-center w-full sm:px-3 px-2 justify-center items-center rounded-md bg-footer-text"
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
                                                    EARNINGS
                                                </span>
                                                <span className="sm:text-sm text-xs  leading-4 text-primary-white font-semibold">
                                                    Collect Earnings
                                                </span>
                                            </button>
                                        </td>
                                    )}
                            </>
                        )}

                        {(!isClaimEligible || rewardReceived > 0) && (
                            <h2 className="text-sm font-medium text-primary-200">
                                Actions
                            </h2>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Transition
                    show={isActive}
                    enter="duration-500 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-300 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    style={{ width: "100%" }}
                    className="w-full mt-4"
                >
                    {isActive && (
                        <div className="flex transition-all w-full items-center justify-center border-gray-400   border-t sm:border sm:bg-gray-300 rounded-b-xl">
                            <div
                                className="accordion-content w-full text-sm text-primary-100 flex sm:flex-row flex-col gap-x-4 justify-between"
                                style={{
                                    lineHeight: "25.2px",
                                }}
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
                                                  Number(round.totalAmount) /
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
            </div>
        </div>
    );
};

export default HistoryAccMweb;
