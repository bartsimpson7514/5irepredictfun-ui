export type Status = "expired" | "live" | "next" | "soon" | "cancelled";
export type RoundStatus = "UP" | "DOWN";

export interface NodeRound {
    downPredictAmount: number;
    endPrice: number | null;
    roundEndTimestamp: number;
    rewardAmount: number;
    rewardBaseCalAmount: number;
    roundId: number;
    roundState: number;
    startPrice: number | null;
    roundStartTimestamp: number;
    totalAmount: number | null;
    upPredictAmount: number;
}

export enum RoundState {
    // INITIALIZED,
    CREATED, // Next
    STARTED, // live
    ENDED, // expired
    CANCELLED,
    LATER,
}

export interface CardProps {
    currentPrice?: number;
    selectedAsset: string;
    lastPrice?: any;
    closedPrice?: number;
    commitedAmount?: number;
    roundId?: number;
    prizePool?: any;
    startPrice?: any;
    roundStatus?: string;
    upPayout?: number;
    downPayout?: number;
    startTime?: number;
    endTime?: number;
    upPredictAmount?: number;
    downPredictAmount?: number;
    rewardAmount?: number;
    isNextCardActive?: boolean;
    userUpPredictAmt?: number;
    userDownPredictAmt?: number;
    currentRoundId?: number;
    rewardGeneratedAmount?: number;
    roundTime?: number;
    reinitiateNextRound?: () => void;
}

export interface RoundProps {
    currentRoundId: number;
    downPredictAmount: number;
    endPrice: number;
    rewardAmount: number;
    rewardBaseCalAmount: number;
    roundEndTimestamp: number;
    roundId: number;
    roundStartTimestamp: number;
    roundState: number;
    startPrice: number;
    totalAmount: number;
    upPredictAmount: number;
}
