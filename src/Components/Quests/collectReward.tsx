import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import Lottie from "lottie-react";
import Win from "public/animations/WinIcon.json";
import CloseIcon from "public/svgs/close.svg";
import { getTreasuryFee } from "@Utils/rounds";
import LoadingIcon from "@Public/svgs/loading.svg";
import { useWeb3React } from "@web3-react/core";
import { updateBalance, updateIsRewardCollected } from "@Reducers/trade";
import { fetchGasPrice, toDecimals, validNetwork } from "@Utils";
import { useAlert } from "react-alert";
import { handleGaEvent } from "@Utils/googleanalytics";
import { PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";
import { TransactionSpeed } from "@Components/Constants";
import { upperCase, getBalanceByToken } from "@Utils/common";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import ModalComponent from "@Basic/Modal";
import { claimRewards, claimRewardsLossyWrapperQuest } from "@Utils/quest";
import { returnCurrencyName } from "./questhelpers";

interface ICollectQuestRewardModal {
    open: boolean;
    onClose: (id: number) => void;
}

const CollectQuestRewardModal: FC<ICollectQuestRewardModal> = ({
    open,
    onClose,
}) => {
    const { account, library } = useWeb3React();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const {
        collectRewardData,
        isRewardCollected,
        selectedChainId,
        selectedAsset,
        transactionSpeedOption,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const [loading, setLoading] = useState(false);
    const [treasuryFee, setTreasuryFee] = useState(0);
    const dispatch = useDispatch();
    const [txnFeeIncludedOnRewards, settxnFeeIncludedOnRewards] = useState(0);

    const alert = useAlert();
    const { t } = useTranslation();

    const fetchGas = async () => {
        const gasPriceRes = await fetchGasPrice(library, selectedChainId);
        switch (transactionSpeedOption) {
            case TransactionSpeed.Standard:
                return gasPriceRes.SafeGasPrice;
            case TransactionSpeed.Fast:
                return gasPriceRes.ProposeGasPrice;
            case TransactionSpeed.Instant:
                return gasPriceRes.FastGasPrice;
            default:
                return gasPriceRes.FastGasPrice;
        }
    };

    useEffect(() => {
        if (treasuryFee && collectRewardData.rewardAmount) {
            // in noLoss we deduct txn fee from BRN, in  Lossy we deduct from BG
            const txnOnReward: number = collectRewardData.rewardAmount;
            if (txnOnReward && txnOnReward !== 0) {
                const txnFeeDeducted =
                    (Number(collectRewardData.rewardAmount) /
                        (1 - treasuryFee / 100)) *
                    (treasuryFee / 100);
                settxnFeeIncludedOnRewards(
                    Number(collectRewardData.rewardAmount) + txnFeeDeducted
                );
            }
        }
        return () => {
            settxnFeeIncludedOnRewards(0);
        };
    }, [
        collectRewardData.rewardAmount,
        collectRewardData.bgnAmount,
        treasuryFee,
    ]);

    const refetchBalances = async () => {
        const balanceRes = await getBalanceByToken(
            account,
            predictableToken,
            library
        );
        dispatch(updateBalance(Number(balanceRes)));
    };

    const onClaimSuccess = () => {
        const token =
            predictableToken === PREDICT_TOKENS.BGN
                ? PREDICT_TOKENS.BRN
                : predictableToken;
        refetchBalances();
        setLoading(false);
        alert.success(
            t(
                `Collected ${token} successfully. Visit Profile section to claim MATIC`
            )
        );
        handleGaEvent(
            `${collectRewardData.collectEarnings} ${collectRewardData.asset} ${predictableToken} ${token} SUCCESS`
        );

        dispatch(updateIsRewardCollected(!isRewardCollected));
        onClose(collectRewardData.roundId);
    };

    const onClaimError = () => {
        setLoading(false);
        alert.error(t("Claim failed please try again after sometime"));
        handleGaEvent(
            upperCase(
                `${collectRewardData.collectEarnings} ${collectRewardData.asset} ${predictableToken} claim fail`
            )
        );
    };

    const claimReward = async () => {
        setLoading(true);
        const gasFeed = await fetchGas();
        if (
            predictableToken === PREDICT_TOKENS.BGN ||
            predictableToken === PREDICT_TOKENS.BNB
        ) {
            await claimRewards(
                library,
                account,
                collectRewardData.roundId, // questId
                onClaimSuccess,
                onClaimError,
                gasFeed,
                predictableToken
            );
        } else {
            await claimRewardsLossyWrapperQuest(
                library,
                account,
                collectRewardData.roundId, // questId
                onClaimSuccess,
                onClaimError,
                gasFeed,
                predictableToken
            );
        }
    };

    const handleClaim = () => {
        claimReward();
    };

    const getTxnFee = async () => {
        const result: any = await getTreasuryFee(
            selectedAsset,
            selectedChainId,
            library,
            PREDICT_TOKENS.MATIC
        );
        setTreasuryFee(result / 10);
    };

    useEffect(() => {
        if (validNetwork(selectedChainId)) {
            getTxnFee();
        }
        return () => {
            setTreasuryFee(0);
        };
    }, []);

    const transactionFeeTextReward = () => {
        if (Number(collectRewardData.rewardAmount)) {
            const txnFeeDeducted =
                (Number(collectRewardData.rewardAmount) /
                    (1 - treasuryFee / 100)) *
                (treasuryFee / 100);

            return `${toDecimals(txnFeeDeducted, 6)} ${returnCurrencyName(
                predictableToken
            )}`;
        }
    };

    return (
        <ModalComponent
            open={open}
            modalRef={modalRef}
            cssstyle="px-4 pt-4 pb-6"
        >
            <div className="sm:flex sm:items-start flex-col">
                <div className="flex flex-col items-center justify-center bg-content-background rounded-xl w-[295px]">
                    <div className="flex items-center justify-end w-full">
                        <CloseIcon
                            className="text-asset-text cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    <Lottie
                        animationData={Win}
                        autoPlay
                        loop
                        style={{
                            width: "40px",
                        }}
                    />
                    <div className="text-primary-100 text-highlight mt-6 mb-4 text-base font-semibold">
                        {collectRewardData.isRefund
                            ? t("Collect Refund")
                            : t("Collect Earnings")}
                    </div>
                    <div className=" bg-history-section rounded-md w-full p-2">
                        <div className="flex justify-between">
                            <div
                                className="text-primary-200 font-medium"
                                style={{ fontSize: "12px" }}
                            >
                                {t("Questions")}
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-primary-200 text-highlight text-sm font-semibold">
                                    {collectRewardData.questions}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between pt-3">
                            <div className=" text-primary-200 text-highlight text-xs font-medium">
                                {t("Round")}
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-primary-200 text-highlight text-sm font-semibold flex flex-row items-center justify-center">
                                    #
                                    {collectRewardData.roundId ? (
                                        collectRewardData.roundId
                                    ) : (
                                        <div className="w-40 h-2">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 bg-history-section rounded-md w-full p-2">
                        <div className="flex justify-between items-center">
                            <div className=" text-primary-200 text-highlight text-xs font-medium">
                                {t("Amount Entered")}
                            </div>
                            <div className="flex flex-col items-end">
                                <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                    {collectRewardData.betAmount ? (
                                        `${
                                            collectRewardData.bgnAmount ? (
                                                toDecimals(
                                                    Number(
                                                        collectRewardData.betAmount
                                                    ),
                                                    2
                                                )
                                            ) : (
                                                <div className="w-40 h-2">
                                                    <QuickSwapLoader />
                                                </div>
                                            )
                                        } ${predictableToken}`
                                    ) : (
                                        <div className="w-40 h-2">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-3">
                            <div className=" text-primary-200 text-highlight text-xs font-medium">
                                {t("Amount Received")}
                            </div>
                            <div className="flex flex-col items-end">
                                <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                    {collectRewardData.bgnAmount ? (
                                        `${
                                            collectRewardData.bgnAmount ? (
                                                toDecimals(
                                                    predictableToken ===
                                                        PREDICT_TOKENS.BGN
                                                        ? Number(
                                                              collectRewardData.bgnAmount
                                                          )
                                                        : Number(
                                                              collectRewardData.bgnAmount
                                                          ) +
                                                              txnFeeIncludedOnRewards,
                                                    6
                                                )
                                            ) : (
                                                <div className="w-40 h-2">
                                                    <QuickSwapLoader />
                                                </div>
                                            )
                                        } ${predictableToken}`
                                    ) : (
                                        <div className="w-40 h-2">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!collectRewardData.isRefund &&
                            Number(collectRewardData.rewardAmount) !== 0 && (
                                <>
                                    {predictableToken === PREDICT_TOKENS.BGN ? (
                                        <div className="flex justify-between items-center pt-3">
                                            <div className=" text-primary-200 text-highlight text-xs font-medium">
                                                {t("Rewards")}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                                    {`${toDecimals(
                                                        txnFeeIncludedOnRewards,
                                                        6
                                                    )} ${returnCurrencyName(
                                                        predictableToken
                                                    )}`}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="flex justify-between pt-3">
                                        <div className=" text-primary-200 text-highlight text-xs font-medium">
                                            {`${t(
                                                "Txn Fee"
                                            )} (${treasuryFee}%)`}
                                        </div>
                                        <div className="items-end">
                                            <div className=" text-primary-200 text-highlight text-sm font-semibold text-right">
                                                {transactionFeeTextReward()}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        <div className="flex justify-between items-center pt-3">
                            <div className=" text-primary-100 text-highlight text-xs font-medium">
                                {t("You’ll receive")}
                            </div>
                            <div className="flex flex-col items-end">
                                {predictableToken === PREDICT_TOKENS.MATIC ||
                                predictableToken === PREDICT_TOKENS.BNB ? (
                                    <div className=" text-primary-100 text-highlight text-sm font-medium">
                                        {`${toDecimals(
                                            Number(
                                                collectRewardData.bgnAmount
                                            ) +
                                                Number(
                                                    collectRewardData.rewardAmount
                                                ),
                                            4
                                        )} ${predictableToken}`}
                                    </div>
                                ) : (
                                    <>
                                        {" "}
                                        <div className=" text-primary-100 text-highlight text-sm font-medium">
                                            {`${toDecimals(
                                                Number(
                                                    collectRewardData.bgnAmount
                                                ),
                                                2
                                            )} ${predictableToken}`}
                                            {` ${
                                                Number(
                                                    collectRewardData.rewardAmount
                                                )
                                                    ? "&"
                                                    : ""
                                            }`}
                                        </div>
                                        {Number(
                                            collectRewardData.rewardAmount
                                        ) > 0 && (
                                            <div className="flex flex-col items-end">
                                                <div className=" text-primary-100 text-highlight text-sm font-medium">
                                                    {` ${collectRewardData &&
                                                        toDecimals(
                                                            Number(
                                                                collectRewardData.rewardAmount
                                                            ),
                                                            6
                                                        )} ${returnCurrencyName(
                                                        predictableToken
                                                    )}`}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex  flex-row justify-center w-full mt-4">
                            <LoadingIcon className="animate-spin origin-center animate w-10 h-10" />
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="flex bg-footer-text text-primary-white w-full py-3 mt-4 justify-center rounded-large"
                                onClick={() => {
                                    handleClaim();
                                    handleGaEvent(
                                        upperCase(
                                            `${collectRewardData.collectEarnings} ${collectRewardData.asset} collect matic collected`
                                        )
                                    );
                                }}
                            >
                                <span className="text-sm leading-4 text-secondary-600 font-semibold">
                                    {t(`Collect`)}
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </ModalComponent>
    );
};

export default CollectQuestRewardModal;
