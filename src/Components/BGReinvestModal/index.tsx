import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import ArrowCircleDown from "@Public/svgs/ArrowCircleDown.svg";
import { useAlert } from "react-alert";
import { fetchGas, initialPredictableToken, toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import IconInfo from "@Public/svgs/quest/info-icon.svg";
import LoadingIcon from "@Public/svgs/loading.svg";
import { getMaticValue, getPoolData, reInvest } from "@Utils/bhavishPool";
import { INTEGRATIONS, PREDICT_TOKENS } from "@Constants";
import CloseIcon from "public/svgs/close.svg";
import ButtonCTA from "@Basic/ButtonCTA";
import ModalComponent from "@Basic/Modal";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { ethers } from "ethers";
import InputField from "@Basic/InputModal";
import { t } from "i18next";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";

interface IBGReinvestModal {
    open: boolean;
    onClose: () => void;
}
export const BGReinvestModal: FC<IBGReinvestModal> = ({ open, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { library, account } = useWeb3React();
    const alert = useAlert();
    const {
        transactionSpeedOption,
        bgrBalance,
        bglBalance,
        bgnBalance,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const selectedToken = PREDICT_TOKENS.BRN;
    const [minBGRDeposit, setMinBGRDeposit] = useState(0);
    const balance = { BRN: bgrBalance, BGN: bgnBalance, BGL: bglBalance };
    const tokenName = initialPredictableToken(selectedChainId);
    const [maticBal, setMaticBal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [valueLoading, setValueLoading] = useState(false);

    const onSuccess = () => {
        alert.success(
            "Re-Invest: Re-invested successfully! - You can withdraw the re-invested funds and the accumulated APY after  lock-in period"
        );
        setLoading(false);
        onClose();
    };
    const onError = () => {
        alert.error("Re-Invest: Re-invested failed");
        setLoading(false);
    };

    const onReinvest = async () => {
        setLoading(true);
        const gasFeed = await fetchGas(
            library,
            transactionSpeedOption,
            selectedChainId
        );
        await reInvest(library, account, onSuccess, onError, gasFeed);
    };

    const getMaticReward = async (val: string) => {
        const poolData = await getPoolData(library, PREDICT_TOKENS.BGN);
        const { minDeposit } = poolData;
        const minDepositAmount: string = ethers.utils.formatEther(minDeposit);
        setMinBGRDeposit(Number(minDepositAmount));
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
                        balanceText="Withdrawable Balance"
                        loading={loading}
                        show50Button={false}
                        infoText={`~${maticBal.toFixed(6)} ${tokenName}`}
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
                        balanceText="Withdrawable Balance"
                        loading={loading}
                        show50Button={false}
                        infoText={`~${maticBal.toFixed(6)} ${tokenName}`}
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
                        balanceText="Withdrawable Balance"
                        loading={loading}
                        show50Button={false}
                        infoText={`~${maticBal.toFixed(6)} ${tokenName}`}
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
                        balanceText="Withdrawable Balance"
                        loading={loading}
                        show50Button={false}
                        infoText={`~${maticBal.toFixed(6)} ${tokenName}`}
                    />
                );
        }
    };

    /* texts are used for translations */
    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex items-center justify-between">
                <p className="text-highlight dark:text-primary-100 text-lg font-medium">
                    <span className="text-highlight dark:text-primary-100 text-lg font-medium">
                        {t("Reinvest")}
                    </span>
                </p>
                <CloseIcon
                    className="dark:text-primary-100 text-highlight cursor-pointer"
                    onClick={() => {
                        onClose();
                        setLoading(false);
                    }}
                />
            </div>
            <span className="text-primary-100 mt-4 text-sm font-medium">
                {t("Enter_BGN_Amount")}
            </span>
            <div className="relative">
                <div className="flex w-full items-center justify-center relative">
                    {InputRender()}
                </div>

                {maticBal < minBGRDeposit ? (
                    <span className="absolute sm:-bottom-2 -bottom-9 text-xs text-primary-error">
                        {`You must have a minimum Balance of ${minBGRDeposit.toFixed(
                            2
                        )} ${tokenName} to Re-Invest to
                BGN.`}
                    </span>
                ) : (
                    <span className="text-xs text-primary-200">
                        {t(
                            "$BRN tokens can only be reinvested at their 100% value!"
                        )}
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center my-4">
                <ArrowCircleDown />

                <div className="flex flex-col justify-center items-center">
                    <p className="text-sm flex items-center font-medium  space-x-1 mt-3 text-primary-100">
                        {t("You will be receiving")}
                    </p>
                    <div className="flex gap-4 p-4 items-center">
                        <img
                            src="/images/currency/bhavish-lossless-chip.png"
                            alt="lossless"
                            className="h-12 w-12"
                        />
                        <div className="flex flex-col text-primary-100 items-start">
                            <span>
                                {valueLoading ? (
                                    <div className="w-14 h-2 mt-6">
                                        <QuickSwapLoader />
                                    </div>
                                ) : (
                                    <span className="text-primary-100  font-medium ml-1">
                                        {`${toDecimals(maticBal * 100, 6)} ${
                                            PREDICT_TOKENS.BGN
                                        }`}
                                    </span>
                                )}
                            </span>

                            <span className="text-primary-200 text-xs font-medium ">
                                {t("Bhavish Game Lossless Tokens")}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-primary-200">
                        {t("To know more about Lossless chips")}
                        <a
                            href="/assets/docs/bhavish-predictions-tou.pdf"
                            className="text-primary-100 ml-1 underline underline-offset-4"
                            target="_blank"
                        >
                            {t("Click here")}
                        </a>
                    </p>
                    <div className="text-base flex space-x-1 mt-6 text-primary-100">
                        <p>
                            <IconInfo className="h-5 w-5" />
                        </p>
                        <div className="flex flex-col gap-1">
                            <div className="flex text-xs text-primary-200 gap-1">
                                <p className="w-fit">1.</p>
                                <p className="text-xs text-primary-200">
                                    {t("Withdraw_ReInvested_BGR")}
                                </p>
                            </div>
                            <div className="flex text-xs text-primary-200 gap-1">
                                <p className="w-fit">2.</p>
                                <p className="text-xs text-primary-200">
                                    {t("ReInvest_Confirm_Terms_Text")}
                                    <a
                                        href="/assets/docs/bhavish-predictions-tou.pdf"
                                        target="_blank"
                                        className="text-primary-100 ml-0.5 mr-1 underline underline-offset-2"
                                    >
                                        {t("Terms of Use")}
                                    </a>

                                    {` ${t("and")} `}
                                    <a
                                        href=""
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-primary-100 ml-0.5 mr-1 underline underline-offset-2"
                                    >
                                        {t("Privacy Policy")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex flex-row justify-center w-full my-4">
                    <LoadingIcon className="animate-spin origin-center animate" />
                </div>
            ) : (
                <ButtonCTA
                    buttonFunction={() => onReinvest()}
                    isDisable={maticBal < minBGRDeposit}
                    variant={`${
                        bgrBalance <= 0 || maticBal < minBGRDeposit
                            ? "bg-footer-text opacity-20"
                            : "bg-footer-text"
                    } py-2.5 text-primary-white rounded-[10px] w-full text-sm font-medium bg-footer-text`}
                    text={!account ? "Connect Wallet" : "Confirm ReInvest"}
                />
            )}
        </ModalComponent>
    );
};
