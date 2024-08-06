import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import Lottie from "lottie-react";
import Win from "public/animations/WinIcon.json";
import CloseIcon from "public/svgs/close.svg";
import {
    claim,
    claimBNB,
    claimLossless,
    getTreasuryFee,
    getUserRewardAmount,
    refund,
} from "@Utils/rounds";
import LoadingIcon from "@Public/svgs/loading.svg";
import { useWeb3React } from "@web3-react/core";
import { getLastPrice, returnAssetName } from "@Utils/priceFeed";
import { updateBalance, updateIsRewardCollected } from "@Reducers/trade";
import { fetchGasPrice, toDecimals, validNetwork } from "@Utils";
import { useAlert } from "react-alert";
import { handleGaEvent } from "@Utils/googleanalytics";
import {
    NETWORK_ASSET,
    OLD_PREDICITION,
    PREDICT_TOKENS,
    USDC_DECIMAL,
} from "@Constants";
import { useTranslation } from "react-i18next";
import { TransactionSpeed } from "@Components/Constants";
import IconBack from "@Public/assets/svgs/icon-back.svg";
import InfoIconDark from "public/animations/InfoIconDark.json";
import InfoIconLight from "public/animations/InfoIconLight.json";
import ReactTooltip from "react-tooltip";
import { upperCase, getBalanceByToken } from "@Utils/common";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import ModalComponent from "@Basic/Modal";
import IntegrationButton from "@Basic/IntegrationButton";

interface ICollectCardModal {
    open: boolean;
    onClose: (id: string) => void;
    onSuccess: (isSuccess: boolean) => void;
}

const CollectCardModal: FC<ICollectCardModal> = ({
    open,
    onClose,
    onSuccess,
}) => {
    const { account, chainId, library } = useWeb3React();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [isCollectToken, setIsCollectToken] = useState(false);
    const {
        isDarkMode,
        collectRewardData,
        isRewardCollected,
        selectedChainId,
        selectedAsset,
        transactionSpeedOption,
        predictableToken,

        slippage,
    } = useSelector((state: AppState) => state.prediction);
    const [loading, setLoading] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [treasuryFee, setTreasuryFee] = useState(0);
    const dispatch = useDispatch();
    const [wonAmt, setWonAmt] = useState(0);
    const [premium, setPremium] = useState(0);
    const alert = useAlert();
    const { t } = useTranslation();
    const infoReffLive = useRef(null);
    const infoReff = useRef(null);
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

    const getRewardAmount = async () => {
        const reward: any = await getUserRewardAmount(
            collectRewardData.asset,
            collectRewardData.roundId,
            account,
            selectedChainId,
            library,
            predictableToken,
            collectRewardData.market
        );

        setRewardAmount(Number(reward) / USDC_DECIMAL);
    };

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    useEffect(() => {
        if (rewardAmount) {
            setWonAmt(Number(rewardAmount) / (1 - treasuryFee / 100));
            setPremium(
                (Number(rewardAmount) / (1 - treasuryFee / 100)) *
                    (treasuryFee / 100)
            );
        }
        return () => {
            setWonAmt(0);
            setPremium(0);
        };
    }, [rewardAmount, treasuryFee]);

    useEffect(() => {
        if (account) {
            getRewardAmount();
        }
        return () => {
            setRewardAmount(0);
        };
    }, [collectRewardData.asset, collectRewardData.roundId]);

    const refundUser = async () => {
        setLoading(true);
        const gasFeed = await fetchGas();

        if (account) {
            refund(
                collectRewardData.asset,
                Number(collectRewardData.roundId),
                gasFeed,
                account,
                () => {},
                () => {
                    setLoading(false);
                    alert.success(t("Refund Successful"));

                    dispatch(updateIsRewardCollected(!isRewardCollected));
                    onClose(
                        String(collectRewardData.roundId) +
                            collectRewardData.asset
                    );
                },
                () => {
                    setLoading(false);
                    alert.error(t("Refund Failed"));
                },
                library,
                predictableToken
            );
        }
    };

    const refetchBalances = async () => {
        const balanceRes = await getBalanceByToken(
            account,
            predictableToken,
            library
        );
        dispatch(updateBalance(Number(balanceRes)));
    };

    const claimReward = async () => {
        setLoading(true);
        const gasFeed = await fetchGas();
        const token =
            predictableToken === PREDICT_TOKENS.BGN
                ? PREDICT_TOKENS.BRN
                : predictableToken;

        const OLD_PREDICTION_VALUES = OLD_PREDICITION.map(val =>
            val.toLowerCase()
        );

        if (account) {
            if (predictableToken === PREDICT_TOKENS.BGN) {
                claimLossless(
                    library,
                    gasFeed,
                    collectRewardData.asset,
                    collectRewardData.roundId,
                    account,
                    () => {
                        refetchBalances();
                        setLoading(false);
                        onSuccess(true);
                        alert.success(
                            t("CollectedTokenSuccess", {
                                token,
                                predictableToken,
                            })
                        );
                        dispatch(updateIsRewardCollected(!isRewardCollected));
                        onClose(
                            String(collectRewardData.roundId) +
                                collectRewardData.asset
                        );
                    },
                    () => {
                        setLoading(false);
                        onSuccess(false);
                        alert.error(t("ClaimFailedText"));
                        handleGaEvent(
                            upperCase(
                                `${collectRewardData.collectEarnings} ${collectRewardData.asset}  claim fail`
                            )
                        );
                    },
                    predictableToken
                );
            } else if (
                // Need to clean up
                predictableToken !== PREDICT_TOKENS.BGN &&
                !OLD_PREDICTION_VALUES.includes(
                    collectRewardData.market.toLowerCase()
                )
            ) {
                claimBNB(
                    library,
                    gasFeed,
                    collectRewardData.asset,
                    collectRewardData.roundId,
                    account,
                    () => {
                        refetchBalances();
                        setLoading(false);
                        onSuccess(true);
                        alert.success(t(`Claim Successful`));
                        dispatch(updateIsRewardCollected(!isRewardCollected));
                        onClose(
                            String(collectRewardData.roundId) +
                                collectRewardData.asset
                        );
                    },
                    () => {
                        setLoading(false);
                        onSuccess(false);
                        alert.error(t("ClaimFailedText"));
                        handleGaEvent(
                            upperCase(
                                `${collectRewardData.collectEarnings} ${collectRewardData.asset}  claim fail`
                            )
                        );
                    },
                    predictableToken,
                    slippage,
                    predictableToken
                );
            } else {
                claim(
                    library,
                    predictableToken,
                    gasFeed,
                    collectRewardData.asset,
                    collectRewardData.roundId,
                    account,
                    slippage,
                    collectRewardData.market,
                    () => {},
                    () => {
                        refetchBalances();
                        setLoading(false);
                        onSuccess(true);
                        alert.success(t("Claim Successful"));
                        handleGaEvent(
                            upperCase(
                                `${collectRewardData.collectEarnings} ${collectRewardData.asset}  claim success`
                            )
                        );
                        dispatch(updateIsRewardCollected(!isRewardCollected));
                        onClose(
                            String(collectRewardData.roundId) +
                                collectRewardData.asset
                        );
                    },
                    () => {
                        setLoading(false);
                        onSuccess(false);
                        alert.error(t("ClaimFailedText"));
                        handleGaEvent(
                            upperCase(
                                `${collectRewardData.collectEarnings} ${collectRewardData.asset}  claim fail`
                            )
                        );
                    }
                );
            }
        }
    };

    const handleClaim = () => {
        if (collectRewardData.status === "expired") {
            claimReward();
        } else {
            refundUser();
        }
    };

    const [currentPrice, setCurrentPrice] = useState(0);
    const getCurrentPrice = async () => {
        const result: any = await getLastPrice(
            NETWORK_ASSET[chainId],
            selectedChainId,
            library
        );
        if (!result) return 0;
        setCurrentPrice(result.toFixed(2));
    };

    const getPremiumFee = async () => {
        const result: any = await getTreasuryFee(
            collectRewardData?.asset,
            selectedChainId,
            library,
            predictableToken
        );
        setTreasuryFee(result / 10);
    };

    const getBackgroundColor = darkMode => {
        return darkMode ? "#222D40" : "#D8E6FB";
    };

    const getTextColor = darkMode => {
        return darkMode ? "text-primary-white" : "text-highlight";
    };

    useEffect(() => {
        if (selectedAsset) {
            getCurrentPrice();
        }
        if (validNetwork(selectedChainId)) {
            getPremiumFee();
        }
        return () => {
            setCurrentPrice(0);
            setTreasuryFee(0);
        };
    }, []);

    const transactionFeeText = () => {
        if (rewardAmount) {
            if (Number(premium)) {
                return isCollectToken
                    ? `$${toDecimals(
                          Number(premium) * Number(currentPrice),
                          5
                      )}`
                    : `${toDecimals(Number(premium), 5)} ${
                          predictableToken === PREDICT_TOKENS.BGN
                              ? PREDICT_TOKENS.BRN
                              : predictableToken
                      }`;
            }
            return (
                <div className="w-40 h-2">
                    <QuickSwapLoader />
                </div>
            );
        }
        return (
            <div className="w-40 h-2">
                <QuickSwapLoader />
            </div>
        );
    };

    return (
        <ModalComponent
            open={open}
            modalRef={modalRef}
            cssstyle="px-4 pt-4 pb-6"
        >
            {!isCollectToken && (
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
                            {t("Collect Rewards")}
                        </div>
                        <div className=" bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between">
                                <div
                                    className="text-primary-200 font-medium"
                                    style={{ fontSize: "12px" }}
                                >
                                    {t("Prediction Asset")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-primary-200 text-highlight text-sm font-semibold">
                                        {returnAssetName(
                                            collectRewardData.asset
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
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
                                    {t("Rewards", {
                                        predictable_token:
                                            predictableToken ===
                                            PREDICT_TOKENS.BGN
                                                ? PREDICT_TOKENS.BRN
                                                : predictableToken,
                                    })}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                        {rewardAmount ? (
                                            `${
                                                wonAmt ? (
                                                    toDecimals(Number(wonAmt))
                                                ) : (
                                                    <div className="w-40 h-2">
                                                        <QuickSwapLoader />
                                                    </div>
                                                )
                                            } ${
                                                predictableToken ===
                                                PREDICT_TOKENS.BGN
                                                    ? PREDICT_TOKENS.BRN
                                                    : predictableToken
                                            }`
                                        ) : (
                                            <div className="w-40 h-2">
                                                <QuickSwapLoader />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className=" text-primary-200 text-highlight text-xs font-medium">
                                    {`${t("Txn Fee")} (${treasuryFee}%)`}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                        {transactionFeeText()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className=" text-primary-100 text-highlight text-xs font-medium">
                                    {t("receive")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" text-primary-100 text-highlight text-sm font-semibold">
                                        {rewardAmount ? (
                                            `${collectRewardData &&
                                                Number(rewardAmount).toFixed(
                                                    4
                                                )} ${
                                                predictableToken ===
                                                PREDICT_TOKENS.BGN
                                                    ? PREDICT_TOKENS.BRN
                                                    : predictableToken
                                            }`
                                        ) : (
                                            <div className="w-40 h-2">
                                                <QuickSwapLoader />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <div className="flex  flex-row justify-center w-full mt-4">
                                <LoadingIcon className="animate-spin origin-center animate w-10 h-10" />
                            </div>
                        ) : (
                            <div className="mt-4 w-full">
                                <IntegrationButton
                                    onClick={() => {
                                        handleClaim();
                                        handleGaEvent(
                                            upperCase(
                                                `${collectRewardData.collectEarnings} ${collectRewardData.asset} collect matic collected`
                                            )
                                        );
                                    }}
                                    content={() => (
                                        <span className="text-sm leading-4 text-secondary-600 font-semibold">
                                            {t("collect", {
                                                predictable_token:
                                                    predictableToken ===
                                                    PREDICT_TOKENS.BGN
                                                        ? PREDICT_TOKENS.BRN
                                                        : predictableToken,
                                            })}
                                        </span>
                                    )}
                                    className="flex bg-footer-text text-primary-white w-full py-3 justify-center rounded-large"
                                />

                                {/* {predictableToken !== PREDICT_TOKENS.MATIC && (
                                    <button
                                        type="button"
                                        className="flex  w-full py-3 mt-4 justify-center rounded-md "
                                        onClick={() => {
                                            handleGaEvent(
                                                `${collectRewardData.collectEarnings} COLLECT IN ${predictableToken} CLICKED`
                                            );
                                            setIsCollectToken(true);
                                        }}
                                    >
                                        <span className="text-sm leading-4 text-primary-white font-semibold">
                                            {`${t(
                                                "Collect in"
                                            )} ${predictableToken}`}
                                        </span>
                                    </button>
                                )} */}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isCollectToken && (
                <div className="sm:flex sm:items-start flex-col">
                    <div
                        className="flex flex-col items-center justify-center px-4 pt-4 pb-6  bg-gray-100 rounded-xl"
                        style={{ width: "295px", height: "410px" }}
                    >
                        <div
                            className="flex items-center justify-start w-full"
                            role="none"
                            onClick={() => {
                                setIsCollectToken(false);
                            }}
                        >
                            <IconBack className="text-primary-white fill-asset-text cursor-pointer" />
                        </div>
                        <Lottie
                            animationData={Win}
                            autoPlay
                            loop
                            style={{
                                width: "40px",
                            }}
                        />
                        <div className="text-primary-white text-highlight mt-6 mb-4 text-base font-bold">
                            {t("Collect in", {
                                predictableToken,
                            })}
                        </div>
                        <div className=" bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between">
                                <div className=" text-primary-200 text-highlight text-xs font-medium">
                                    {t("Prediction Asset")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-primary-200 text-highlight text-sm font-semibold">
                                        {returnAssetName(
                                            collectRewardData.asset
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" text-primary-200 text-highlight text-xs font-medium">
                                    {t("Round")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" text-primary-200 text-highlight text-sm font-semibold flex flex-row items-center justify-center">
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
                                <div className="flex text-primary-200 text-highlight text-xs font-medium">
                                    {t("Rewards", {
                                        predictable_token:
                                            predictableToken ===
                                            PREDICT_TOKENS.BGN
                                                ? PREDICT_TOKENS.BRN
                                                : predictableToken,
                                    })}

                                    <span className="pl-1">
                                        <div
                                            className="cursor-pointer "
                                            data-tip={`An approximative value of ${predictableToken}
                                                        is taken into consideration`}
                                            data-for="toolTipAprox"
                                            data-place="bottom"
                                        >
                                            {isDarkMode ? (
                                                <Lottie
                                                    animationData={
                                                        InfoIconLight
                                                    }
                                                    lottieRef={infoReffLive}
                                                    autoPlay
                                                    loop
                                                    onMouseEnter={() =>
                                                        onMouseEnter(
                                                            infoReffLive
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        onMouseLeave(
                                                            infoReffLive,
                                                            24
                                                        )
                                                    }
                                                    style={{
                                                        width: "12px",
                                                        marginLeft: "3px",
                                                    }}
                                                />
                                            ) : (
                                                <Lottie
                                                    animationData={InfoIconDark}
                                                    lottieRef={infoReff}
                                                    autoPlay
                                                    loop
                                                    onMouseEnter={() =>
                                                        onMouseEnter(
                                                            infoReffLive
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        onMouseLeave(
                                                            infoReffLive,
                                                            24
                                                        )
                                                    }
                                                    style={{
                                                        width: "12px",
                                                        marginLeft: "3px",
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <ReactTooltip
                                                id="toolTipAprox"
                                                effect="solid"
                                                className="text-center w-40 text-sm justify-center absolute z-100 rounded-md"
                                                backgroundColor={getBackgroundColor(
                                                    isDarkMode
                                                )}
                                                textColor={getTextColor(
                                                    isDarkMode
                                                )}
                                                multiline
                                            />
                                        </div>
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" text-primary-200 text-highlight text-sm font-semibold">
                                        {rewardAmount ? (
                                            `$${
                                                wonAmt ? (
                                                    toDecimals(
                                                        Number(wonAmt) *
                                                            Number(currentPrice)
                                                    )
                                                ) : (
                                                    <div className="w-40 h-2">
                                                        <QuickSwapLoader />
                                                    </div>
                                                )
                                            } `
                                        ) : (
                                            // ${
                                            //     NETWORK_ASSET[
                                            //         selectedChainId
                                            //     ]
                                            //         ? NETWORK_ASSET[
                                            //               selectedChainId
                                            //           ]
                                            //         : ""
                                            // }`
                                            <div className="w-40 h-2">
                                                <QuickSwapLoader />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-primary-200 text-highlight text-xs font-medium">
                                    {`${t("Txn Fee")} (${treasuryFee}%)`}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-primary-200 text-highlight text-sm font-semibold">
                                        {transactionFeeText()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-primary-100 text-xs font-semibold">
                                    {t("approx_receive_text")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-primary-100 text-highlight text-sm font-semibold">
                                        {rewardAmount ? (
                                            `$${(
                                                Number(rewardAmount) *
                                                Number(currentPrice)
                                            ).toFixed(4)}`
                                        ) : (
                                            <div className="w-40 h-2">
                                                <QuickSwapLoader />
                                            </div>
                                        )}
                                    </div>
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
                                    className="flex bg-footer-text w-full py-3 mt-4 justify-center rounded-md"
                                    onClick={() => {
                                        handleGaEvent(
                                            `${collectRewardData.collectEarnings} ${collectRewardData.asset} IN ${predictableToken} COLLECTED`
                                        );
                                        handleClaim();
                                    }}
                                >
                                    <span className="text-sm leading-4 text-primary-white font-semibold">
                                        {t("Collect")}
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </ModalComponent>
    );
};

export default CollectCardModal;
