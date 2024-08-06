import React, { useEffect, useState } from "react";
import { getCommitedInfo, getUserRewardAmount } from "@Utils/rounds";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { updateIsCommitInfoLoading } from "@Reducers/trade";
import {
    getFormattedValue,
    ODDZ_PREDICTION,
    ONEE_EIGHT,
    USDC_DECIMAL,
} from "@Constants";
import { NodeRound, RoundState } from "./consts";
import ExpiredCard from "./expiredCard";
import LiveCard from "./liveCard";
import UpcomingCard from "./UpcomingCard";
import LaterCard from "./laterCard";
import CalculatingCard from "./calculatingCard";
import CancelledCard from "./cancelledCard";

interface RoundCardProps {
    currentRoundId: number;
    round: NodeRound;
    asset: string;
    fetch?: boolean;
    currentPrice: number;
    roundTime: number;
}

const RoundCard: React.FC<RoundCardProps> = ({
    round,
    asset,
    fetch,
    currentPrice,
    roundTime,
}) => {
    const { account, library } = useWeb3React();
    const [commitedAmt, setCommitedAmt] = useState(0);
    const [userUpPredictAmt, setUserUpPredictAmt] = useState(0);
    const [userDownPredictAmt, setUserDownPredictAmt] = useState(0);
    const {
        selectedChainId,
        flipCalculating,
        showCalculating,
        isPredicted,
        selectedAsset,
        isRewardCollected,
        predictableToken,
        currentRoundId,
    } = useSelector((state: AppState) => state.prediction);
    const dispatch = useDispatch();
    const [rewardGeneratedAmount, setRewardGeneratedAmount] = useState(0);

    const getCommitedDetails = async () => {
        const commitedAmount = await getCommitedInfo(
            round.roundId,
            account,
            asset,
            selectedChainId,
            library,
            predictableToken
        );

        return commitedAmount;
    };

    const updateCommitedAmount = commitedAmount => {
        if (
            Number(currentRoundId) + 1 === Number(round.roundId) ||
            Number(currentRoundId) + 2 === Number(round.roundId)
        ) {
            setUserDownPredictAmt(prevState => {
                if (Number(prevState) === Number(commitedAmount[1])) {
                    return prevState;
                }
                dispatch(updateIsCommitInfoLoading(false));
                return Number(commitedAmount[1]);
            });
            setUserUpPredictAmt(prevState => {
                if (Number(prevState) === Number(commitedAmount[0])) {
                    return prevState;
                }
                dispatch(updateIsCommitInfoLoading(false));
                return Number(commitedAmount.upPredictAmount);
            });
        } else {
            setUserDownPredictAmt(Number(commitedAmount[1]));
            setUserUpPredictAmt(Number(commitedAmount[0]));
        }
        setCommitedAmt(Number(commitedAmount[1]) + Number(commitedAmount[2]));
    };

    const startPrice = Number(round.startPrice)
        ? getFormattedValue(round.startPrice, ONEE_EIGHT)
        : 0;
    const endPrice = round.endPrice
        ? getFormattedValue(round.endPrice, ONEE_EIGHT)
        : 0;
    const isRoundUp: boolean = !(startPrice > endPrice);
    const roundStatus: string = isRoundUp ? "DOWN" : "UP";

    const getRewardAmount = async () => {
        const reward: any = await getUserRewardAmount(
            selectedAsset,
            round.roundId,
            account,
            selectedChainId,
            library,
            predictableToken,
            ODDZ_PREDICTION[predictableToken][selectedChainId][selectedAsset]
        );
        return reward;
    };

    const setDataToCache = (id, commitDetails) => {
        const commitData = JSON.parse(window.localStorage.getItem(id));
        const dict = { ...commitData };
        dict[round.roundId] = commitDetails;
        window.localStorage.setItem(id, JSON.stringify(dict));
    };

    const getAndSetRewardAndCommitDetails = async () => {
        const commitDetailsData = JSON.parse(
            window.localStorage.getItem("commitDetails")
        );
        if (
            !commitDetailsData ||
            !commitDetailsData[round.roundId] ||
            Number(round.roundId) === Number(currentRoundId) + 1
        ) {
            const commitDetails = await getCommitedDetails();
            setDataToCache("commitDetails", commitDetails);
            updateCommitedAmount(commitDetails);
        } else {
            updateCommitedAmount(commitDetailsData[round.roundId]);
        }

        if (round.roundId && round.roundId < currentRoundId) {
            const rewardAmountData = JSON.parse(
                window.localStorage.getItem("rewardAmount")
            );

            if (
                !rewardAmountData ||
                !rewardAmountData[round.roundId] ||
                rewardAmountData[round.roundId] > 0
            ) {
                const reward = await getRewardAmount();
                setDataToCache("rewardAmount", reward);
                setRewardGeneratedAmount(reward / USDC_DECIMAL);
            } else {
                setRewardGeneratedAmount(
                    rewardAmountData[round.roundId] / USDC_DECIMAL
                );
            }
        }
    };

    useEffect(() => {
        if (
            account &&
            Number(round.roundId) &&
            Number(round.roundId) <= Number(currentRoundId) + 1
        ) {
            getAndSetRewardAndCommitDetails();
        } else {
            setUserDownPredictAmt(0);
            setUserUpPredictAmt(0);
            setCommitedAmt(0);
        }
    }, [asset, isPredicted, fetch, account, isRewardCollected]);

    const UPPayout: any =
        Number(round.totalAmount) / Number(round.upPredictAmount);
    const DOWNPayout: any =
        Number(round.totalAmount) / Number(round.downPredictAmount);
    const upPayout: any = Number.isFinite(UPPayout) && UPPayout ? UPPayout : 0;
    const downPayout: any =
        Number.isFinite(DOWNPayout) && DOWNPayout ? DOWNPayout : 0;

    const cardProps = {
        selectedAsset: asset,
        lastPrice: startPrice,
        closedPrice: endPrice,
        commitedAmount: commitedAmt,
        roundId: round.roundId,
        prizePool: round.totalAmount,
        roundStatus,
        upPayout,
        downPayout,
        startTime: round.roundStartTimestamp,
        endTime: round.roundEndTimestamp,
        upPredictAmount: round.upPredictAmount,
        downPredictAmount: round.downPredictAmount,
        rewardAmount: Number(round.rewardAmount),
        userUpPredictAmt,
        userDownPredictAmt,
        currentRoundId,
        startPrice,
        rewardGeneratedAmount,
        currentPrice,
        roundTime,
    };

    return (
        <>
            {Number(round.roundId) < Number(currentRoundId) && (
                <>
                    {Number(round.roundState) === Number(RoundState.ENDED) && (
                        <ExpiredCard {...cardProps} />
                    )}
                    {Number(round.roundState) ===
                        Number(RoundState.CANCELLED) && (
                        <CancelledCard {...cardProps} />
                    )}
                </>
            )}

            {round.roundId === currentRoundId && (
                <>
                    {flipCalculating ? (
                        <CalculatingCard {...cardProps} isNextCardActive />
                    ) : (
                        <LiveCard {...cardProps} />
                    )}
                </>
            )}

            {Number(round.roundId) === Number(currentRoundId) + 1 && (
                <>
                    {showCalculating && flipCalculating ? (
                        <CalculatingCard
                            {...cardProps}
                            isNextCardActive={false}
                        />
                    ) : (
                        <UpcomingCard
                            {...cardProps}
                            isNextCardActive={
                                !showCalculating && !flipCalculating
                            }
                        />
                    )}
                </>
            )}

            {Number(round.roundId) === Number(currentRoundId) + 2 && (
                <>
                    {showCalculating ? (
                        <UpcomingCard {...cardProps} isNextCardActive />
                    ) : (
                        <LaterCard {...cardProps} />
                    )}
                </>
            )}

            {(Number(round.roundId) > Number(currentRoundId) + 2 ||
                round.roundId === 0) && <LaterCard {...cardProps} />}
        </>
    );
};

export default RoundCard;
