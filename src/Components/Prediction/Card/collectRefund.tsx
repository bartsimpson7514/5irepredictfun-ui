import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import Lottie from "lottie-react";
import Win from "public/animations/WinIcon.json";
import CloseIcon from "public/svgs/close.svg";
import { getCommitedInfo, getTreasuryFee, refund } from "@Utils/rounds";
import LoadingIcon from "@Public/svgs/loading.svg";
import { useWeb3React } from "@web3-react/core";
import { getLastPrice, returnAssetName } from "@Utils/priceFeed";
import { updateIsRewardCollected } from "@Reducers/trade";
import { fetchGasPrice, toDecimals, validNetwork } from "@Utils";
import { useAlert } from "react-alert";
import { handleGaEvent } from "@Utils/googleanalytics";
import { NETWORK_ASSET, PREDICT_TOKENS, USDC_DECIMAL } from "@Constants";
import { useTranslation } from "react-i18next";
import { TransactionSpeed } from "@Components/Constants";
import IconBack from "@Public/assets/svgs/icon-back.svg";
import InfoIconDark from "public/animations/InfoIconDark.json";
import InfoIconLight from "public/animations/InfoIconLight.json";
import ReactTooltip from "react-tooltip";
import { upperCase } from "@Utils/common";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import ModalComponent from "@Basic/Modal";

interface ICollectCardModal {
    open: boolean;
    onClose: (id: string) => void;
}

const CollectRefundModal: FC<ICollectCardModal> = ({ open, onClose }) => {
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
    } = useSelector((state: AppState) => state.prediction);
    const [loading, setLoading] = useState(false);
    const [treasuryFee, setTreasuryFee] = useState(0);
    const dispatch = useDispatch();
    const [wonAmt, setWonAmt] = useState(0);
    const [premium, setPremium] = useState(0);
    const alert = useAlert();
    const { t } = useTranslation();
    const infoReffLive = useRef(null);
    const infoReff = useRef(null);
    const [committedAmount, setCommittedAmount] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
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

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    useEffect(() => {
        if (committedAmount) {
            setWonAmt(Number(committedAmount) / (1 - treasuryFee / 100));
            setPremium(
                (Number(committedAmount) / (1 - treasuryFee / 100)) *
                    (treasuryFee / 100)
            );
        }
        return () => {
            setWonAmt(0);
            setPremium(0);
        };
    }, [committedAmount, treasuryFee]);

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
                    alert.success(t("Refund Successful!"));
                    dispatch(updateIsRewardCollected(!isRewardCollected));
                    onClose(
                        `${String(collectRewardData.roundId)}${String(
                            collectRewardData.asset
                        )}`
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

    const handleRefund = () => {
        refundUser();
    };

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
            selectedAsset,
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

    const getCommitedDetails = async () => {
        const commitedAmount = await getCommitedInfo(
            collectRewardData.roundId,
            account,
            collectRewardData.asset,
            selectedChainId,
            library,
            predictableToken
        );

        setCommittedAmount(
            Number(commitedAmount.downPredictAmount) / USDC_DECIMAL +
                Number(commitedAmount.upPredictAmount) / USDC_DECIMAL
        );
    };

    useEffect(() => {
        if (selectedAsset) {
            getCurrentPrice();
            getCommitedDetails();
        }
        if (validNetwork(selectedChainId)) {
            getPremiumFee();
        }
        return () => {
            setCurrentPrice(0);
            setCommittedAmount(0);
            setTreasuryFee(0);
        };
    }, [collectRewardData.roundId]);

    const renderLoadingLottie = () => {
        return (
            <div className="w-40 h-2">
                <QuickSwapLoader />
            </div>
        );
    };

    const transactionFeeText = () => {
        if (committedAmount && Number(premium)) {
            return isCollectToken
                ? `$${toDecimals(Number(premium) * Number(currentPrice), 4)}`
                : `${toDecimals(Number(premium), 4)} ${predictableToken}`;
        }
        renderLoadingLottie();
    };

    const returnYouWillReceive = () => {
        if (collectRewardData && committedAmount) {
            // const txnFee = Number(premium) * Number(currentPrice);
            // const youWillReceive = toDecimals(committedAmount - txnFee, 4);
            return `${committedAmount} ${predictableToken} `;
        }
        renderLoadingLottie();
    };

    return (
        <ModalComponent
            open={open}
            modalRef={modalRef}
            cssstyle="px-4 pt-4 pb-6"
        >
            {!isCollectToken && (
                <div className="sm:flex sm:items-start flex-col">
                    <div
                        className="flex flex-col items-center justify-center  rounded-xl"
                        style={{ width: "295px" }}
                    >
                        <div className="flex items-center justify-end w-full">
                            <CloseIcon
                                className="dark:text-primary-100 text-highlight cursor-pointer"
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
                        <div className="dark:text-primary-100 text-highlight mt-6 mb-4 text-base font-bold">
                            {t("Collect Refunds")}
                        </div>
                        <div className=" bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between">
                                <div
                                    className="dark:text-primary-100 font-medium"
                                    style={{ fontSize: "12px" }}
                                >
                                    {t("Prediction Asset")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="dark:text-primary-100  text-highlight text-sm font-medium">
                                        {returnAssetName(
                                            collectRewardData.asset
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {t("Round")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="dark:text-primary-100 text-highlight text-sm font-semibold flex flex-row items-center justify-center">
                                        #
                                        {collectRewardData.roundId
                                            ? collectRewardData.roundId
                                            : renderLoadingLottie()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between items-center">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {`Rewards(${
                                        predictableToken === PREDICT_TOKENS.BGN
                                            ? PREDICT_TOKENS.BRN
                                            : predictableToken
                                    })`}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {`${
                                            committedAmount
                                                ? toDecimals(
                                                      Number(committedAmount),
                                                      4
                                                  )
                                                : renderLoadingLottie()
                                        } ${
                                            predictableToken ===
                                            PREDICT_TOKENS.BGN
                                                ? PREDICT_TOKENS.BRN
                                                : predictableToken
                                        }`}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex justify-between items-center">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {`${t("Txn Fee")} (${treasuryFee}%)`}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {transactionFeeText()}
                                    </div>
                                </div>
                            </div> */}
                            <div className="flex justify-between items-center">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {t("You’ll receive")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {returnYouWillReceive()}
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
                                        handleRefund();
                                        handleGaEvent(
                                            upperCase(
                                                `${collectRewardData.collectEarnings} ${collectRewardData.asset} collect matic collected`
                                            )
                                        );
                                    }}
                                >
                                    <span className="text-sm leading-4 text-primary-white font-semibold">
                                        {`Collect ${
                                            predictableToken ===
                                            PREDICT_TOKENS.BGN
                                                ? PREDICT_TOKENS.BRN
                                                : predictableToken
                                        }`}
                                    </span>
                                </button>

                                {/* {predictableToken !== PREDICT_TOKENS.MATIC && (
                                    <button
                                        type="button"
                                        className="flex  w-full py-3 mt-4 justify-center rounded-md"
                                        onClick={() => {
                                            handleGaEvent(
                                                `${collectRewardData.collectEarnings} COLLECT IN ${predictableToken} CLICKED`
                                            );
                                            setIsCollectToken(true);
                                        }}
                                    >
                                        <span className="text-sm leading-4 text-primary font-semibold">
                                            {`${t(
                                                "Collect in"
                                            )} ${predictableToken}`}
                                        </span>
                                    </button>
                                )} */}
                            </>
                        )}
                    </div>
                </div>
            )}
            {isCollectToken && (
                <div className="sm:flex sm:items-start flex-col">
                    <div
                        className="flex flex-col items-center justify-center rounded-xl"
                        style={{ width: "295px", height: "410px" }}
                    >
                        <div
                            className="flex items-center justify-start w-full"
                            role="none"
                            onClick={() => {
                                setIsCollectToken(false);
                            }}
                        >
                            <IconBack className="dark:text-primary fill-primary cursor-pointer" />
                        </div>
                        <Lottie
                            animationData={Win}
                            autoPlay
                            loop
                            style={{
                                width: "40px",
                            }}
                        />
                        <div className=" dark:text-primary-100 text-highlight mt-6 mb-4 text-base font-bold">
                            {`${t("Collect in")} ${predictableToken}`}
                        </div>
                        <div className=" bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {t("Prediction Asset")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {returnAssetName(
                                            collectRewardData.asset
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {t("Round")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold flex flex-row items-center justify-center">
                                        #
                                        {collectRewardData.roundId
                                            ? collectRewardData.roundId
                                            : renderLoadingLottie()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 bg-history-section rounded-md w-full p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex dark:text-primary-100 text-highlight text-xs font-medium">
                                    {/* {t("Rewards_Token",{predictableToken:predictableToken})} */}

                                    <span className="pl-1">
                                        <div
                                            className="cursor-pointer"
                                            data-tip={t("approx_token_value", {
                                                predictableToken,
                                            })}
                                            data-for="toolTipReward"
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
                                                id="toolTipReward"
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
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {committedAmount && wonAmt
                                            ? toDecimals(
                                                  Number(wonAmt) *
                                                      Number(currentPrice),
                                                  4
                                              )
                                            : renderLoadingLottie()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className=" dark:text-primary-100 text-highlight text-xs font-medium">
                                    {`${t("Txn Fee")} (${treasuryFee}%)`}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className=" dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {transactionFeeText()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="dark:text-primary-100 text-xs font-bold">
                                    {t("approx_receive_text")}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="dark:text-primary-100 text-highlight text-sm font-semibold">
                                        {committedAmount
                                            ? `$${(
                                                  Number(committedAmount) *
                                                  Number(currentPrice)
                                              ).toFixed(4)}`
                                            : renderLoadingLottie()}
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
                                            `${collectRewardData.collectEarnings} in ${predictableToken} collected`
                                        );
                                        handleRefund();
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

export default CollectRefundModal;
