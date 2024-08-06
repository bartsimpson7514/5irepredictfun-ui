import React, { useEffect, useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import WinSmall from "public/animations/WinSmallIcon.json";
import { ODDZ_PREDICTION, Status } from "@Constants";
import {
    useModalOpen,
    useToggleCollectEarningsModal,
} from "@Reducers/trade/hooks";
import {
    ApplicationModal,
    updateClaimedRoundId,
    updateCollectReward,
} from "@Redux/Reducers/trade";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { handleGaEvent } from "@Utils/googleanalytics";
import IntegrationButton from "@Basic/IntegrationButton";
import CollectCardModal from "./collectCard";

const ClaimOnCards = ({ rewardAmount, roundId }) => {
    const {
        isInvalidNetwork,
        selectedAsset,
        claimedRoundId,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const { account, chainId } = useWeb3React();
    const open = useModalOpen(ApplicationModal.COLLECT_EARNING);
    const [isSuccess, setIsSuccess] = useState(false);
    const toggleCollectCardModal = useToggleCollectEarningsModal();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const closeCollectCard = id => {
        toggleCollectCardModal();
        if (Number(id)) {
            dispatch(updateClaimedRoundId(id));
        }
    };

    useEffect(() => {
        dispatch(updateClaimedRoundId("0"));
    }, [selectedAsset]);

    const handleClaimRefund = () => {
        dispatch(
            updateCollectReward({
                status: Status.EXPIRED,
                asset: selectedAsset,
                roundId,
                rewardAmount,
                collectEarnings: "EXPIREDCARD",
                market:
                    ODDZ_PREDICTION[predictableToken][chainId][selectedAsset],
            })
        );
        toggleCollectCardModal();
    };

    return (
        <>
            {account &&
                rewardAmount > 0 &&
                !isSuccess &&
                Number(roundId) !== Number(claimedRoundId) && (
                    <>
                        <div className="absolute bottom-0 w-full left-0 flex items-center rounded-b-lg justify-center pb-2 pt-3 bg-collect-rewards">
                            <div>
                                <IntegrationButton
                                    className={`px-5 py-3 text-primary-white font-semibold text-sm outline-none focus:outline-none rounded tracking-wider ${
                                        isInvalidNetwork
                                            ? "bg-toggle"
                                            : "bg-footer-text"
                                    }`}
                                    disabled={isInvalidNetwork}
                                    onClick={() => {
                                        handleGaEvent(
                                            `EXPIREDCARD COLLECT EARNINGS CLICKED`
                                        );
                                        handleClaimRefund();
                                    }}
                                    content={() => (
                                        <div className="flex flex-row items-center gap-2">
                                            <Lottie
                                                animationData={WinSmall}
                                                autoPlay
                                                loop
                                                style={{
                                                    width: "15px",
                                                }}
                                            />
                                            {t("Collect Earnings")}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <CollectCardModal
                            open={open}
                            onClose={closeCollectCard}
                            onSuccess={isClaimSuccess => {
                                setIsSuccess(isClaimSuccess);
                            }}
                        />
                    </>
                )}
        </>
    );
};

export default ClaimOnCards;
