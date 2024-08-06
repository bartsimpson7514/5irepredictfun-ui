/* eslint-disable no-param-reassign */
import { TransactionSpeed } from "@Components/Constants";
import { ODDZ_NETWORK, PREDICT_TOKENS } from "@Constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ApplicationModal {
    WALLET,
    TRADE_SETTING,
    TRADE_MOVE,
    LIQUIDITY_WITHDRAW,
    UNSTAKE,
    STRATEGY,
    OPTIONMODAL,
    ENABLESECONDARYMARKET,
    NETWORKCHANGE,
    PNLCHART,
    POSITIONS_REMOVE,
    TERMSANDCONDITIONSCONSENT,
    COLLECT_EARNING,
    DEPOSIT_MODAL,
    WITHDRAW_MODAL,
    MARKET_PAUSE,
    COLLECT_REFUND,
    DEPOSIT_BGN,
    WITHDRAW_BGN,
    QUEST_OUTCOMES,
    ONBOARDING_MODAL,
    REINVEST_BGN,
    CLAIM_BGN,
    COLLECT_QUEST_REWARD,
    QUEST_GRAPH,
    LANGUAGE,
    BGN_UNSUPPORTED,
}

export interface ICollectReward {
    status: string;
    asset: string;
    roundId: number;
    rewardAmount: number;
    betAmount?: number;
    bgnAmount?: number;
    questions?: string;
    collectEarnings: string;
    isRefund?: boolean;
    market?: string;
}

export interface ICoachPointsFeed {
    mainSection: boolean;
    profile: boolean;
}

export interface ITradeState {
    openModal: ApplicationModal | null;
    isDarkMode: boolean;
    sidebarOpened: boolean;
    isGaslessModeOn: boolean;
    selectedAsset: string;
    isInvalidNetwork: boolean;
    isPredicted: boolean;
    isSocial: boolean;
    selectedChainId: number;
    collectRewardData: ICollectReward;
    coachPoints: ICoachPointsFeed;

    showCalculating: boolean;
    flipCalculating: boolean;
    magicEmail: string;
    walletConnected: string;
    isRewardCollected: boolean;
    isFundTransferred: boolean;
    showChart: boolean;
    transactionSpeedOption: string;
    isLoading: boolean;
    predictableToken: string;
    slippage: number;
    isCommitInfoLoading: boolean;
    showTermsAndConditionsModal: boolean;
    showAlert: boolean;
    showAssetToolTip: boolean;
    balanceLoading: boolean;
    showOnboardingModal: boolean;
    bgnBalance: number;
    bgrBalance: number;
    nativeBalance: number;
    bglBalance: number;
    balance: number;
    isQuestPredicted: boolean;
    claimedRoundId: string;
    selectedutility: string;
    magicNetworkChanged: boolean;
    currentRoundId: number;
}

const initialState: ITradeState = {
    openModal: null,
    sidebarOpened: false,
    isDarkMode: true,
    isGaslessModeOn: true,
    selectedAsset: "MATIC",
    isInvalidNetwork: false,
    slippage: 1,
    isPredicted: false,
    predictableToken: PREDICT_TOKENS.MATIC,
    selectedChainId: ODDZ_NETWORK.MATIC_MAINNET,
    collectRewardData: {
        status: "expired",
        asset: "ETH",
        roundId: 1,
        betAmount: 0,
        rewardAmount: 0,
        collectEarnings: "expiredCard",
    },
    coachPoints: {
        mainSection: false,
        profile: false,
    },
    balance: 0,
    showCalculating: false,
    flipCalculating: false,
    magicEmail: null,
    isSocial: false,
    walletConnected: null,
    isRewardCollected: false,
    isFundTransferred: false,
    showChart: false,
    transactionSpeedOption: TransactionSpeed.Fast,
    isLoading: false,
    showAssetToolTip: true,
    isCommitInfoLoading: false,
    showTermsAndConditionsModal: false,
    showAlert: true,
    balanceLoading: false,
    showOnboardingModal: true,
    isQuestPredicted: false,
    bgnBalance: 0,
    bgrBalance: 0,
    nativeBalance: 0,
    bglBalance: 0,
    claimedRoundId: "",
    selectedutility: "",
    magicNetworkChanged: false,
    currentRoundId: 0,
};

const TradeSlice = createSlice({
    name: "prediction",
    initialState,
    reducers: {
        setOpenModal(
            state: ITradeState,
            action: PayloadAction<ApplicationModal | null>
        ) {
            state.openModal = action.payload;
        },
        toggleTheme(state: ITradeState) {
            state.isDarkMode = !state.isDarkMode;
        },
        updateSidebarOpened(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.sidebarOpened = action.payload;
        },
        updateGaslessMode(state: ITradeState, action: PayloadAction<boolean>) {
            state.isGaslessModeOn = action.payload;
        },
        updateSelectedAsset(state: ITradeState, action: PayloadAction<string>) {
            state.selectedAsset = action.payload;
        },

        updateInvalidNetwork(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.isInvalidNetwork = action.payload;
        },
        updateIsPredicted(state: ITradeState, action: PayloadAction<boolean>) {
            state.isPredicted = action.payload;
        },
        updateSelectedChainId(
            state: ITradeState,
            action: PayloadAction<number>
        ) {
            state.selectedChainId = action.payload;
        },
        updateCollectReward(
            state: ITradeState,
            action: PayloadAction<ICollectReward>
        ) {
            state.collectRewardData = action.payload;
        },
        updateShowCalculating(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.showCalculating = action.payload;
        },
        updateFlipCalculating(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.flipCalculating = action.payload;
        },
        updateMagicEmail(state: ITradeState, action: PayloadAction<string>) {
            state.magicEmail = action.payload;
        },
        updateIsSocial(state: ITradeState, action: PayloadAction<boolean>) {
            state.isSocial = action.payload;
        },
        updateWalletConnected(
            state: ITradeState,
            action: PayloadAction<string>
        ) {
            state.walletConnected = action.payload;
        },
        updateIsRewardCollected(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.isRewardCollected = action.payload;
        },
        updateBalance(state: ITradeState, action: PayloadAction<number>) {
            state.balance = action.payload;
        },
        updateIsFundTransferred(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.isFundTransferred = action.payload;
        },
        updateShowChart(state: ITradeState, action: PayloadAction<boolean>) {
            state.showChart = action.payload;
        },
        updateTransactionSpeedOption(
            state: ITradeState,
            action: PayloadAction<string>
        ) {
            state.transactionSpeedOption = action.payload;
        },
        updateIsLoading(state: ITradeState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        updatePredictableToken(
            state: ITradeState,
            action: PayloadAction<string>
        ) {
            state.predictableToken = action.payload;
        },

        updateSelectedUtility(
            state: ITradeState,
            action: PayloadAction<string>
        ) {
            state.selectedutility = action.payload;
        },
        updateSlippage(state: ITradeState, action: PayloadAction<number>) {
            state.slippage = action.payload;
        },
        updateIsCommitInfoLoading(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.isCommitInfoLoading = action.payload;
        },
        updateTermsAndConditionsModal(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.showTermsAndConditionsModal = action.payload;
        },
        updateShowAlert(state: ITradeState, action: PayloadAction<boolean>) {
            state.showAlert = action.payload;
        },
        updateOnboardingModal(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.showOnboardingModal = action.payload;
        },
        updateBalanceLoader(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.balanceLoading = action.payload;
        },
        updateBgnBalance(state: ITradeState, action: PayloadAction<number>) {
            state.bgnBalance = action.payload;
        },
        updateBgrBalance(state: ITradeState, action: PayloadAction<number>) {
            state.bgrBalance = action.payload;
        },
        updatenativeBalance(state: ITradeState, action: PayloadAction<number>) {
            state.nativeBalance = action.payload;
        },
        updateBglBalance(state: ITradeState, action: PayloadAction<number>) {
            state.bglBalance = action.payload;
        },
        updateClaimedRoundId(
            state: ITradeState,
            action: PayloadAction<string>
        ) {
            state.claimedRoundId = action.payload;
        },
        updateShowAssetToolTip(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.showAssetToolTip = action.payload;
        },
        updateCoachpoints(
            state: ITradeState,
            action: PayloadAction<ICoachPointsFeed>
        ) {
            state.coachPoints = action.payload;
        },
        updateIsQuestPredicted(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.isQuestPredicted = action.payload;
        },
        updateMagicNetworkChanged(
            state: ITradeState,
            action: PayloadAction<boolean>
        ) {
            state.magicNetworkChanged = action.payload;
        },
        updateCurrentRoundId(
            state: ITradeState,
            action: PayloadAction<number>
        ) {
            state.currentRoundId = action.payload;
        },
    },
});

export const {
    setOpenModal,
    toggleTheme,
    updateSidebarOpened,
    updateGaslessMode,
    updateSelectedAsset,
    updateInvalidNetwork,
    updateIsPredicted,
    updateSelectedChainId,
    updateCollectReward,
    updateShowCalculating,
    updateFlipCalculating,
    updateIsSocial,
    updateMagicEmail,
    updateWalletConnected,
    updateIsRewardCollected,
    updateBalance,
    updateIsFundTransferred,
    updateShowChart,
    updateTransactionSpeedOption,
    updateIsLoading,
    updatePredictableToken,
    updateSlippage,
    updateIsCommitInfoLoading,
    updateTermsAndConditionsModal,
    updateShowAlert,
    updateBalanceLoader,
    updateOnboardingModal,
    updateBgnBalance,
    updateBgrBalance,
    updateBglBalance,
    updatenativeBalance,
    updateMagicNetworkChanged,
    updateShowAssetToolTip,
    updateClaimedRoundId,
    updateCoachpoints,
    updateSelectedUtility,
    updateIsQuestPredicted,
    updateCurrentRoundId,
} = TradeSlice.actions;

export default TradeSlice.reducer;
