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
import { MARKET_STATUS } from "@Components/Constants";
import { NodeRound, RoundState } from "./consts";
import ExpiredCard from "./expiredCard";
import LiveCard from "./liveCard";
import UpcomingCard from "./UpcomingCard";
import LaterCard from "./laterCard";
import CalculatingCard from "./calculatingCard";
import CancelledCard from "./cancelledCard";

interface RoundCardStocksProps {
    currentRoundId: number;
    round: NodeRound;
    asset: string;
    fetch?: boolean;
    currentPrice: number;
    roundTime: number;
    marketState: string;
}

const RoundCardStocks: React.FC<RoundCardStocksProps> = ({
    currentRoundId,
    round,
    asset,
    fetch,
    currentPrice,
    roundTime,
    marketState,
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
                if (
                    Number(prevState) ===
                    Number(commitedAmount.downPredictAmount)
                ) {
                    return prevState;
                }
                dispatch(updateIsCommitInfoLoading(false));
                return Number(commitedAmount.downPredictAmount);
            });
            setUserUpPredictAmt(prevState => {
                if (
                    Number(prevState) === Number(commitedAmount.upPredictAmount)
                ) {
                    return prevState;
                }
                dispatch(updateIsCommitInfoLoading(false));
                return Number(commitedAmount.upPredictAmount);
            });
        } else {
            setUserDownPredictAmt(Number(commitedAmount.downPredictAmount));
            setUserUpPredictAmt(Number(commitedAmount.upPredictAmount));
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

    const getAndSetRewardAndCommitDetails = async () => {
        const commitDetails = await getCommitedDetails();
        updateCommitedAmount(commitDetails);
        if (round.roundId !== currentRoundId) {
            const reward = await getRewardAmount();
            setRewardGeneratedAmount(reward / USDC_DECIMAL);
        }
    };

    useEffect(() => {
        if (account) {
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
                    {marketState === MARKET_STATUS.ACTIVE ? (
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
                    ) : (
                        <>
                            {flipCalculating ? (
                                <CalculatingCard
                                    {...cardProps}
                                    isNextCardActive
                                />
                            ) : (
                                <LiveCard {...cardProps} />
                            )}
                        </>
                    )}
                </>
            )}

            {Number(round.roundId) === Number(currentRoundId) + 1 && (
                <>
                    {marketState === MARKET_STATUS.ACTIVE ? (
                        <>
                            {showCalculating ? (
                                <UpcomingCard {...cardProps} isNextCardActive />
                            ) : (
                                <LaterCard {...cardProps} />
                            )}
                        </>
                    ) : (
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
                </>
            )}

            {Number(round.roundId) === Number(currentRoundId) + 2 && (
                <>
                    {marketState === MARKET_STATUS.ACTIVE ? (
                        <>
                            <LaterCard {...cardProps} />
                        </>
                    ) : (
                        <>
                            {showCalculating ? (
                                <UpcomingCard {...cardProps} isNextCardActive />
                            ) : (
                                <LaterCard {...cardProps} />
                            )}
                        </>
                    )}
                </>
            )}

            {(Number(round.roundId) > Number(currentRoundId) + 2 ||
                round.roundId === 0) && <LaterCard {...cardProps} />}
        </>
    );
};

export default RoundCardStocks;
