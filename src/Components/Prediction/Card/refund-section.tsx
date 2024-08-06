import React from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import WinSmall from "public/animations/WinSmallIcon.json";
import { ODDZ_PREDICTION, Status } from "@Constants";
import {
    useModalOpen,
    useToggleCollectRefundsModal,
} from "@Reducers/trade/hooks";
import {
    ApplicationModal,
    updateClaimedRoundId,
    updateCollectReward,
} from "@Redux/Reducers/trade";
import { useTranslation } from "react-i18next";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useWeb3React } from "@web3-react/core";
import CollectRefundModal from "./collectRefund";

const RefundUsers = ({ committedAmount, roundId }) => {
    const {
        isInvalidNetwork,
        selectedAsset,
        claimedRoundId,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const { chainId } = useWeb3React();
    const open = useModalOpen(ApplicationModal.COLLECT_REFUND);
    const toggleCollectCardModal = useToggleCollectRefundsModal();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const closeCollectRefundCard = id => {
        toggleCollectCardModal();
        if (id) {
            dispatch(updateClaimedRoundId(id));
        }
    };

    const handleClaimRefund = () => {
        dispatch(
            updateCollectReward({
                status: Status.CANCELLED,
                asset: selectedAsset,
                roundId,
                rewardAmount: committedAmount,
                collectEarnings: "CANCELLEDCARDS",
                market:
                    ODDZ_PREDICTION[predictableToken][chainId][selectedAsset],
            })
        );
        toggleCollectCardModal();
    };

    return (
        <>
            {committedAmount > 0 && roundId !== claimedRoundId && (
                <>
                    <div className="absolute bottom-0 w-full left-0 flex items-center rounded-b-lg justify-center pb-2 pt-3 dark:bg-gray-300-90 bg-footer-text bg-opacity-60">
                        <button
                            type="submit"
                            className={`px-5 py-3 text-primary-100 font-semibold text-sm outline-none focus:outline-none rounded tracking-wider ${
                                isInvalidNetwork
                                    ? "bg-toggle"
                                    : "bg-footer-text"
                            }`}
                            disabled={isInvalidNetwork}
                            onClick={() => {
                                handleGaEvent(`CANCELLED CARD REFUND CLICKED`);
                                handleClaimRefund();
                            }}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <Lottie
                                    animationData={WinSmall}
                                    autoPlay
                                    loop
                                    style={{
                                        width: "15px",
                                    }}
                                />
                                {t("Collect Refund")}
                            </div>
                        </button>
                    </div>
                    <CollectRefundModal
                        open={open}
                        onClose={closeCollectRefundCard}
                    />
                </>
            )}
        </>
    );
};

export default RefundUsers;
