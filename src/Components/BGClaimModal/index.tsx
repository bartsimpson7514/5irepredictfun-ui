import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import ArrowCircleDown from "@Public/svgs/ArrowCircleDown.svg";
import { useAlert } from "react-alert";
import { fetchGas, initialPredictableToken, toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import IconInfo from "@Public/svgs/quest/info-icon.svg";
import LoadingIcon from "@Public/svgs/loading.svg";
import CloseIcon from "public/svgs/close.svg";
import { claimWinningRewards, getMaticValue } from "@Utils/bhavishPool";
import { INTEGRATIONS, PREDICT_TOKENS } from "@Constants";
import ButtonCTA from "@Basic/ButtonCTA";
import ModalComponent from "@Basic/Modal";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import InputField from "@Basic/InputModal";
import { useTranslation } from "react-i18next";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";

interface IBGClaimModal {
    open: boolean;
    onClose: () => void;
}
export const BGClaimModal: FC<IBGClaimModal> = ({ open, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { library, account } = useWeb3React();
    const alert = useAlert();
    const {
        transactionSpeedOption,
        bgrBalance,
        bglBalance,
        bgnBalance,
        selectedChainId,
        // predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    // const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const selectedToken = PREDICT_TOKENS.BRN;
    // const [lockinPeriod, setLockinPeriod] = useState(0);

    const balance = { BRN: bgrBalance, BGN: bgnBalance, BGL: bglBalance };
    const { t } = useTranslation();
    const [maticBal, setMaticBal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [valueLoading, setValueLoading] = useState(false);
    const tokenName = initialPredictableToken(selectedChainId);

    const onSuccess = () => {
        alert.success(t("Claim_BRN_Success"));
        setLoading(false);
        onClose();
    };
    const onError = () => {
        alert.error(t("Claim_BRN_Fail"));
        setLoading(false);
    };

    const onWithdraw = async () => {
        setLoading(true);
        const gasFeed = await fetchGas(
            library,
            transactionSpeedOption,
            selectedChainId
        );
        await claimWinningRewards(
            library,
            account,
            onSuccess,
            onError,
            gasFeed
        );
    };

    const getMaticReward = async (val: string) => {
        setValueLoading(true);
        if (Number(val) > 0) {
            const mv = await getMaticValue(library, account);
            setMaticBal(Number(mv));
        } else {
            setMaticBal(0);
        }
        setValueLoading(false);
    };

    useEffect(() => {
        if (account) {
            getMaticReward(String(bgrBalance));
        }
    }, [selectedToken, account, bgrBalance]);

    // useEffect(() => {
    //     (async () => {
    //         if (account) {
    //             const value = await lockInPeriodReward(
    //                 library,
    //                 predictableToken,
    //                 account
    //             );
    //             setLockinPeriod(Number(value));
    //         }
    //     })();
    // }, [selectedToken, account]);

    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={balance[PREDICT_TOKENS.BRN]}
                        maxAmount={balance[PREDICT_TOKENS.BRN]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={PREDICT_TOKENS.BRN}
                        balanceText={t("Enter_TokenAmount", {
                            token_selectedchainid: PREDICT_TOKENS.BRN,
                        })}
                        show50Button={false}
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={balance[PREDICT_TOKENS.BRN]}
                        maxAmount={balance[PREDICT_TOKENS.BRN]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        on25Select={() => {}}
                        on75Select={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={PREDICT_TOKENS.BRN}
                        balanceText={t("Enter_TokenAmount", {
                            token_selectedchainid: PREDICT_TOKENS.BRN,
                        })}
                        show50Button={false}
                        loading={loading}
                        backgroundColor="bg-[#F6F6F7]"
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={balance[PREDICT_TOKENS.BRN]}
                        maxAmount={balance[PREDICT_TOKENS.BRN]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        on25Select={() => {}}
                        on75Select={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={PREDICT_TOKENS.BRN}
                        balanceText={t("Enter_TokenAmount", {
                            token_selectedchainid: PREDICT_TOKENS.BRN,
                        })}
                        show50Button={false}
                        loading={loading}
                        backgroundColor="bg-[#F6F6F7]"
                    />
                );
            default:
                return (
                    <InputField
                        amount={balance[PREDICT_TOKENS.BRN]}
                        maxAmount={balance[PREDICT_TOKENS.BRN]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={PREDICT_TOKENS.BRN}
                        balanceText={t("Enter_TokenAmount", {
                            token_selectedchainid: PREDICT_TOKENS.BRN,
                        })}
                        show50Button={false}
                        loading={loading}
                    />
                );
        }
    };

    /* texts are used for translations */
    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex items-center justify-between">
                <p className="text-highlight dark:text-primary-100 text-lg font-medium">
                    {t("Claim")}
                </p>
                <CloseIcon
                    className="dark:text-primary-100 text-highlight cursor-pointer"
                    onClick={() => {
                        onClose();
                        setLoading(false);
                    }}
                />
            </div>

            <div className="flex w-full">{InputRender()}</div>

            <div className="flex flex-col items-center">
                <ArrowCircleDown />
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-sm flex items-center font-medium  space-x-1 mt-3 text-primary-100">
                    {t("You will be receiving")}
                </p>
                <div className="flex gap-2 items-center p-4">
                    <img
                        src={`/svgs/onboarding/${tokenName}.png`}
                        alt={tokenName}
                        className="h-12 w-12"
                    />
                    <div className="flex flex-col text-primary-100 items-start">
                        {valueLoading ? (
                            <div className="w-14 h-2 mt-6">
                                <QuickSwapLoader />
                            </div>
                        ) : (
                            <span>
                                {`${toDecimals(maticBal, 6)} ${tokenName}`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-base flex space-x-1 mt-6 mb-6 text-primary-100">
                <p>
                    <IconInfo className="h-5 w-5" />
                </p>
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-primary-200">
                        {t("claim_confirm_text")}
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-100 ml-0.5 mr-1 underline underline-offset-2"
                        >
                            {t("Terms of Use")}
                        </a>

                        {` ${t("and")} `}
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-100 ml-0.5 mr-1 underline underline-offset-2"
                        >
                            {t("Privacy Policy")}
                        </a>
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-row justify-center w-full my-4">
                    <LoadingIcon className="animate-spin  origin-center anmiate" />
                </div>
            ) : (
                <ButtonCTA
                    buttonFunction={() => onWithdraw()}
                    variant={`${
                        bgrBalance <= 0
                            ? "bg-footer-text opacity-20"
                            : "bg-footer-text"
                    } py-2.5 text-primary-white rounded-[10px] w-full text-sm font-medium bg-footer-text`}
                    text={!account ? "Connect Wallet" : "Confirm Claim"}
                />
            )}

            {/* {lockinPeriod && currentTimestamp < lockinPeriod ? (
                <div className="text-sm  text-info-text">
                    {`Note: You can Claim on ${getDateFromUnixTimestamp(
                        lockinPeriod
                    )}`}
                </div>
            ) : null} */}
        </ModalComponent>
    );
};
