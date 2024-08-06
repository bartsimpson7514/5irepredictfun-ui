export const categories = {
    Trending: "Trending",
    All: "All Markets",
    New: "New",
    Upcoming: "Upcoming",
    // IPL: "IPL",
    Crypto: "Crypto",
    Sports: "Sports",
    Politics: "Politics",
    Others: "Others",
};

export enum MarketState {
    OPEN,
    RESOLVED,
    CLOSED,
}

export enum MarketResult {
    WIN = "WIN",
    LOSE = "LOSE",
}

interface MarketResolution {
    outcomeId: number;
    questionId: string;
}

interface MarketOutcome {
    marketId: number;
    id: number;
    name: string;
    amount: number;
    traderStakes: any;
    claimed: any;
}

export interface MARKET {
    outcomeBetted: any;
    userOutcomePercentage: any;
    id: string;
    marketId: string;
    state: string;
    outcomeIds: string[];
    outcomeStrings: string[];
    question: string;
    category: string;
    balance: string;
    resolutionSource: string;
    link: string;
}

export interface Quest {
    resolved: any;
    predictionStartTimestamp: number;
    opensAtTimestamp: number;
    closesAtTimestamp: number;
    balance: number;
    reward: number;
    state: MarketState;
    resolution: MarketResolution;
    outcomeIds: number[];
    question: string;
    category: string;
    description: string;
    resolutionSource: string;
    outcomes: string[];
    image: string;
    title: string;
    id: string;
    markets: MARKET[];
    active: boolean;
}

export interface MarketQuestion {
    question: string;
    category: string;
    description: string;
    resolutionSource: string;
    outcomes: string[];
}

export interface Quests {
    id: any;
    questId: number;
    title: string;
    description: string;
    category: string;
    image: string;
    active: boolean;
    markets: MARKET[];
    opensAtTimeStamp: number;
    closesAtTimeStamp: number;
    arbitrator: boolean;
    users: string;
    balance: number;
}

export enum QuestState {
    UPCOMING = "Upcoming",
    LIVE = "Live",
    ENDED = "In Progress",
    INRESOLUTION = "In-Resolution",
    EXPIRED = "Expired",
}

export const iff = (condition, then, otherwise) =>
    condition ? then : otherwise;

export enum MarketStateResult {
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED",
}

export enum QuestSort {
    STATUS = "STATUS",
    AMOUNT = "AMOUNT",
    MARKETTYPE = "MARKETTYPE",
    ACTIONS = "ACTIONS",
}
