import React, { useEffect, useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import WinSmall from "public/animations/WinSmallIcon.json";
import { Status } from "@Constants";
import {
    useModalOpen,
    useToggleCollectQuestRewardModal,
} from "@Reducers/trade/hooks";
import { ApplicationModal, updateCollectReward } from "@Redux/Reducers/trade";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { getUserRewardAmount } from "@Utils/quest";
import CollectQuestRewardModal from "./collectReward";
import { fromWei } from "./questhelpers";

const ClaimOnQuestCards = ({
    questId,
    commitAmt,
    noQuestion,
    page,
    betAmount,
}) => {
    const { account, library } = useWeb3React();

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { isInvalidNetwork, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const [claimedQuestId, setClaimedQuestId] = useState(0);
    const [reward, setReward] = useState({
        totalRewards: "0",
        unClaimed: "0",
    });

    const open = useModalOpen(ApplicationModal.COLLECT_QUEST_REWARD);
    const toggleCollectQuestRewardModal = useToggleCollectQuestRewardModal();

    const closeCollectCard = id => {
        toggleCollectQuestRewardModal();
        setClaimedQuestId(id);
    };

    const handleClaimRefund = () => {
        dispatch(
            updateCollectReward({
                status: Status.EXPIRED,
                asset: predictableToken,
                roundId: questId,
                betAmount: fromWei(betAmount, library),
                rewardAmount: reward.unClaimed
                    ? Number(reward.unClaimed) / 1e18
                    : 0,
                bgnAmount: commitAmt / 1e18,
                questions: noQuestion,
                collectEarnings: "QUESTPAGE",
            })
        );
        toggleCollectQuestRewardModal();
    };

    const getRewardsAmt = async () => {
        const rewardAmt = await getUserRewardAmount(
            library,
            account,
            Number(questId),
            predictableToken
        );
        setReward(rewardAmt);
    };

    useEffect(() => {
        if (account) {
            getRewardsAmt();
            return () => {
                setReward({
                    totalRewards: "0",
                    unClaimed: "0",
                });
            };
        }
    }, [account]);

    return (
        <>
            {account &&
                Number(reward?.unClaimed) > 0 &&
                claimedQuestId !== questId && (
                    <div
                        className={`${
                            page === "DETAIL"
                                ? "w-full mt-6"
                                : "absolute bottom-0 py-2 flex items-center bg-gray-100 w-full justify-center rounded-b-[10px]"
                        }`}
                    >
                        <div
                            className={`px-6 py-2 items-center flex justify-center text-primary-white text-base font-medium outline-none focus:outline-none rounded tracking-wider 
                            ${
                                isInvalidNetwork
                                    ? "bg-gray-100"
                                    : "bg-footer-text"
                            } `}
                        >
                            <button
                                type="submit"
                                disabled={isInvalidNetwork}
                                onClick={() => {
                                    handleClaimRefund();
                                }}
                            >
                                <div
                                    className={`flex flex-row items-center gap-2 text-base font-medium whitespace-nowrap ${
                                        page === "DETAIL"
                                            ? "w-full"
                                            : "w-[144px]"
                                    } justify-center`}
                                >
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
                            </button>
                            <CollectQuestRewardModal
                                open={open}
                                onClose={closeCollectCard}
                            />
                        </div>
                    </div>
                )}
        </>
    );
};

export default ClaimOnQuestCards;
