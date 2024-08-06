import React, { useEffect, useState } from "react";
import {
    getMinimumGaslessBetAmount,
    predict,
    predictWithGameToken,
} from "@Utils/predict";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import {
    updateIsPredicted,
    updateIsLoading,
    updateIsCommitInfoLoading,
    updateBalance,
} from "@Reducers/trade";
import LoadingIcon from "@Public/svgs/loading.svg";
import { useAlert } from "react-alert";
import { getMinPredictAmount } from "@Utils/rounds";
import {
    useBGDepositModalToggle,
    useNetworkChangeModal,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import { handleGaEvent } from "@Utils/googleanalytics";
import {
    convertedAssetValue,
    fetchGas,
    getEtherscanLink,
    initialPredictableToken,
    isAssetEligibleForGasless,
    toDecimals,
    validNetwork,
} from "@Utils";
import { useTranslation } from "react-i18next";
import { PREDICT_TOKENS, WALLET_NAME } from "@Constants";
import { getBalanceByToken, upperCase } from "@Utils/common";
import { ChainId } from "@Components/Constants";
import IntegrationButton from "@Basic/IntegrationButton";

const CardBuyButton = ({ ...props }) => {
    const { account, library, chainId } = useWeb3React();
    const [minPredictAmount, setMinPredictAmount] = useState(0.1);
    const {
        selectedAsset,
        isGaslessModeOn,
        isPredicted,
        selectedChainId,
        transactionSpeedOption,
        isLoading,
        predictableToken,
        walletConnected,
        bgnBalance,
        bglBalance,
        bgrBalance,
        nativeBalance,
    } = useSelector((state: AppState) => state.prediction);
    const toggleNetworkModal = useNetworkChangeModal();
    const toggleWalletModal = useWalletModalToggle();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { t } = useTranslation();
    const [minGasLessPremium, setMinGaslessPremium] = useState(0);
    const balanceFromFetcher = { BGN: bgnBalance, BGL: bglBalance };

    const balances = {
        BRN: bgrBalance,
        BGN: bgnBalance,
        BGL: bglBalance,
        MATIC: nativeBalance,
        ETH: nativeBalance,
        MNT: nativeBalance,
        tcBNB: nativeBalance,
        tZBC: nativeBalance,
        ZBC: nativeBalance,
        TLOS: nativeBalance,
        SYS: nativeBalance,
    };

    const [isInputValid, setIsInputValid] = useState(false);

    useEffect(() => {
        if (!account) {
            setIsInputValid(false);
        } else if (
            Number(props.predictvalue) > Number(balances[predictableToken]) ||
            Number(props.predictvalue) === 0
        ) {
            setIsInputValid(true);
        } else {
            setIsInputValid(false);
        }
    }, [account, props.predictvalue]);

    const getMinPredictBetAmount = async () => {
        const minPredictAmt: any = await getMinPredictAmount(
            selectedAsset,
            account,
            selectedChainId,
            library,
            predictableToken
        );
        return minPredictAmt;
    };

    const getMinGaslessAmount = async () => {
        const minGaslessBetAmount: any = await getMinimumGaslessBetAmount(
            library,
            selectedChainId,
            predictableToken
        );
        return minGaslessBetAmount;
    };

    useEffect(() => {
        if (account) {
            (async () => {
                const minPredictAmt = await getMinPredictBetAmount();
                setMinPredictAmount(minPredictAmt);
                const minGaslessBetAmount = await getMinGaslessAmount();
                setMinGaslessPremium(minGaslessBetAmount);
            })();
        }
        return () => {
            setMinPredictAmount(0);
            setMinGaslessPremium(0);
        };
    }, [props.predictvalue, account, predictableToken]);

    const errorHandler = err => {
        dispatch(updateIsLoading(false));

        handleGaEvent(
            upperCase(
                `${selectedAsset} ${props.indicator} ${predictableToken} predict failed`
            )
        );
        if (walletConnected === WALLET_NAME.Magiclink) {
            alert.error(err.message);
        } else {
            const message = "Something went wrong";
            const regex = new RegExp(/[^{}]+(?=})/g);

            if (err && regex.exec(err.message).length > 0) {
                const reverterErrorMsg = t(
                    "Transaction has been reverted by the EVM"
                );
                const receiptString = err.message.slice(
                    reverterErrorMsg.length
                );
                const blockDetails = JSON.parse(receiptString);

                const txmMessage = (
                    <span>
                        {t("Transaction failed Check out the Txn Hash")}
                        <a
                            href={getEtherscanLink(
                                chainId,
                                blockDetails.transactionHash,
                                "transaction"
                            )}
                            rel="noreferrer"
                            target="_blank"
                        >
                            &nbsp;
                            {t("here")}
                        </a>
                    </span>
                );
                const errorMessage = blockDetails.transactionHash
                    ? txmMessage
                    : message;
                alert.error(errorMessage);
            } else {
                alert.error(t(message));
            }
        }
        return "";
    };

    const refetchBalances = async () => {
        const balanceRes = await getBalanceByToken(
            account,
            predictableToken,
            library
        );
        dispatch(updateBalance(Number(balanceRes)));
    };

    const callbackFunction = async () => {
        refetchBalances();
        dispatch(updateIsLoading(false));
        alert.success(t("Prediction Successful"));
        dispatch(updateIsPredicted(!isPredicted));
        dispatch(updateIsCommitInfoLoading(true));
        handleGaEvent(
            upperCase(
                `${selectedAsset} ${props.indicator} ${predictableToken} PREDICT SUCCESSFUL`
            ),
            { value: Number(props.predictvalue), currency: "USD" }
        );
    };

    const handlePredict = async () => {
        const convertedValue = convertedAssetValue(
            predictableToken,
            props.currentMaticPrice,
            props.predictvalue
        );
        const compareBalance = balanceFromFetcher[predictableToken];

        // predictableToken === PREDICT_TOKENS.BGN ? bgBalance : balanceFromFetcher;
        if (!account) {
            toggleWalletModal();
        } else if (!Number(props.predictvalue)) {
            alert.error(t("Enter predict amount"));
        } else if (Number(props.predictvalue) <= 0) {
            alert.error(t("Predict amount cannot be zero"));
        } else if (Number(props.predictvalue) < minPredictAmount) {
            alert.error(
                `${t("Minimun amount to predict is")} ${minPredictAmount}`
            );
        } else if (Number(props.predictvalue) > compareBalance) {
            alert.error(
                `${t("Predict amount cannot be greater than")} ${toDecimals(
                    compareBalance,
                    2
                )}!`
            );
        } else if (
            isGaslessModeOn &&
            isAssetEligibleForGasless(predictableToken) &&
            Number(convertedValue) < Number(minGasLessPremium) &&
            selectedChainId === ChainId.MaticMainnet
        ) {
            // t("deposit", { amount: formatDateTime(lockPeriod) })
            alert.error(
                `${t(
                    `Minimum bet amount for gasless should be worth of ${minGasLessPremium} ${initialPredictableToken(
                        selectedChainId
                    )}`
                )}.`
            );
        } else {
            handleGaEvent(
                upperCase(
                    `${selectedAsset} going ${props.indicator} ${predictableToken} token  confirm clicked`
                )
            );
            dispatch(updateIsLoading(true));
            if (account) {
                const isPredictUP = props.indicator === "UP";
                const gasFeed = await fetchGas(
                    library,
                    transactionSpeedOption,
                    selectedChainId
                );
                if (predictableToken === PREDICT_TOKENS.BGN) {
                    predictWithGameToken(
                        library,
                        selectedAsset,
                        props.roundId,
                        Number(props.predictvalue),
                        account,
                        isPredictUP,
                        gasFeed,
                        () => {},
                        callbackFunction,
                        errorHandler,
                        predictableToken
                    );
                } else {
                    predict(
                        library,
                        selectedAsset,
                        props.roundId,
                        Number(props.predictvalue),
                        account,
                        isPredictUP,
                        gasFeed,
                        () => {},
                        callbackFunction,
                        errorHandler,
                        predictableToken
                    );
                }
            }
        }
    };

    const toggleBGDepositModal = useBGDepositModalToggle();
    const showInfo = () => {
        if (!account) {
            return "Connect Wallet";
        }
        if (
            account &&
            balances[predictableToken] === 0 &&
            predictableToken === PREDICT_TOKENS.BGN
        ) {
            return "Desposit";
        }
        return "Confirm";
    };

    const connectWalletOrDeposit = () => {
        if (!account) {
            toggleWalletModal();
        } else if (
            account &&
            balances[predictableToken] === 0 &&
            predictableToken === PREDICT_TOKENS.BGN
        ) {
            toggleBGDepositModal();
        }
    };

    return (
        <>
            <div
                className="flex flex-col px-4 mb-8 mt-4 w-full"
                style={{ height: "40px" }}
            >
                {isLoading ? (
                    <div className="flex flex-row justify-center w-full">
                        <LoadingIcon className="animate-spin origin-center animate h-10 w-10" />
                    </div>
                ) : (
                    <>
                        {account && !validNetwork(chainId) ? (
                            <IntegrationButton
                                onClick={() => {
                                    toggleNetworkModal();
                                }}
                                className={`py-3 justify-center rounded-large bg-confirm "
                                }`}
                                content={() => (
                                    <span className="text-sm leading-4 text-primary-white font-normal">
                                        {t("Switch to Supported Network")}
                                    </span>
                                )}
                            />
                        ) : (
                            <div className="w-full">
                                <IntegrationButton
                                    className={`py-3 justify-center rounded-large w-full ${
                                        !(
                                            balances[predictableToken] === 0 &&
                                            predictableToken ===
                                                PREDICT_TOKENS.BGN
                                        ) &&
                                        ((isInputValid &&
                                            predictableToken ===
                                                PREDICT_TOKENS.MATIC) ||
                                            (isInputValid &&
                                                predictableToken ===
                                                    PREDICT_TOKENS.BGN))
                                            ? "bg-confirm opacity-50"
                                            : "bg-confirm"
                                    }`}
                                    onClick={() => {
                                        balances[predictableToken] === 0
                                            ? connectWalletOrDeposit()
                                            : handlePredict();
                                    }}
                                    disabled={
                                        !(
                                            balances[predictableToken] === 0 &&
                                            predictableToken ===
                                                PREDICT_TOKENS.BGN
                                        ) &&
                                        ((isInputValid &&
                                            predictableToken ===
                                                PREDICT_TOKENS.MATIC) ||
                                            (isInputValid &&
                                                predictableToken ===
                                                    PREDICT_TOKENS.BGN))
                                    }
                                    content={() => (
                                        <span className=" text-base  text-primary-white font-bold">
                                            {t(showInfo())}
                                        </span>
                                    )}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default CardBuyButton;
