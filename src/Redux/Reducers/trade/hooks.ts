import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, AppDispatch } from "@Redux";
import { ApplicationModal, setOpenModal } from "./index";

export function useModalOpen(modal: ApplicationModal | null): boolean {
    const openModal = useSelector(
        (state: AppState) => state.prediction.openModal
    );
    return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
    const open = useModalOpen(modal);

    const dispatch = useDispatch<AppDispatch>();
    return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [
        dispatch,
        modal,
        open,
    ]);
}

export function useWalletModalToggle(): () => void {
    return useToggleModal(ApplicationModal.WALLET);
}

export function useTradeMoveModalToggle(): () => void {
    return useToggleModal(ApplicationModal.TRADE_MOVE);
}

export function useTradeSettingModalToggle(): () => void {
    return useToggleModal(ApplicationModal.TRADE_SETTING);
}
export function useBGDepositModalToggle(): () => void {
    return useToggleModal(ApplicationModal.DEPOSIT_BGN);
}

export function useBGWithdrawModalToggle(): () => void {
    return useToggleModal(ApplicationModal.WITHDRAW_BGN);
}

export function useBGReinvestModalToggle(): () => void {
    return useToggleModal(ApplicationModal.REINVEST_BGN);
}

export function useBGClaimModalToggle(): () => void {
    return useToggleModal(ApplicationModal.CLAIM_BGN);
}

export function useStrategyModalToggle(): () => void {
    return useToggleModal(ApplicationModal.STRATEGY);
}

export function useNetworkChangeModal(): () => void {
    return useToggleModal(ApplicationModal.NETWORKCHANGE);
}

export function useToggleCollectEarningsModal(): () => void {
    return useToggleModal(ApplicationModal.COLLECT_EARNING);
}

export function useToggleCollectRefundsModal(): () => void {
    return useToggleModal(ApplicationModal.COLLECT_REFUND);
}

export function useToggleDepositModal(): () => void {
    return useToggleModal(ApplicationModal.DEPOSIT_MODAL);
}

export function useToggleWithdrawModal(): () => void {
    return useToggleModal(ApplicationModal.WITHDRAW_MODAL);
}

export function useToggleCollectQuestRewardModal(): () => void {
    return useToggleModal(ApplicationModal.COLLECT_QUEST_REWARD);
}

export function useToggleQuestGraphModal(): () => void {
    return useToggleModal(ApplicationModal.QUEST_GRAPH);
}

export function useToggleLanguageNetworkModalToggle(): () => void {
    return useToggleModal(ApplicationModal.LANGUAGE);
}
export function useBGNUnsupportedModal(): () => void {
    return useToggleModal(ApplicationModal.BGN_UNSUPPORTED);
}
