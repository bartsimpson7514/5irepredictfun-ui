import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import ArrowCircleDown from "@Public/svgs/ArrowCircleDown.svg";
import { useAlert } from "react-alert";
import { fetchGas, initialPredictableToken, toDecimals } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import IconInfo from "@Public/svgs/quest/info-icon.svg";
import LoadingIcon from "@Public/svgs/loading.svg";
import { deposit, getlockInPeriod } from "@Utils/bhavishPool";
import { INTEGRATIONS, PREDICT_TOKENS } from "@Constants";
import InputField from "@Basic/InputModal";
import CloseIcon from "public/svgs/close.svg";
import ModalComponent from "@Basic/Modal";
import { getDateFromUnixTimestamp } from "@Utils/time";
import { ChainId } from "@Components/Constants";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";

interface IBGDepositModal {
    open: boolean;
    onClose: () => void;
}
export const BGDepositModal: FC<IBGDepositModal> = ({ open, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { library, account } = useWeb3React();
    const alert = useAlert();
    const { t } = useTranslation();
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const {
        transactionSpeedOption,
        balanceLoading,
        nativeBalance,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const tokenName = initialPredictableToken(selectedChainId);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [gameToken, setGameToken] = useState("BGN");
    const [lockinPeriod, setLockinPeriod] = useState(0);
    const minAmount = selectedChainId === ChainId.BSCMainnet ? 0.1 : 0;

    const callback = () => {
        alert.success(`Deposit ${tokenName}: Deposit Successful!`);
        setLoading(false);
        onClose();
    };

    useEffect(() => {
        (async () => {
            if (account) {
                const value = await getlockInPeriod(library, gameToken);
                setLockinPeriod(Number(value));
            }
        })();
    }, [gameToken, account, loading]);

    const errorHandler = () => {
        alert.error(t("Deposit Failed"));
        setLoading(false);
    };

    const onDeposit = async () => {
        if (amount <= 0) {
            alert.error(t("Deposit amout should be greater than 0"));
        } else if (amount > Number(nativeBalance)) {
            alert.error(
                t("Predict_Amount", {
                    nativeBalance: toDecimals(Number(nativeBalance), 2),
                })
            );
        } else {
            setLoading(true);

            const gasFeed = await fetchGas(
                library,
                transactionSpeedOption,
                selectedChainId
            );
            await deposit(
                library,
                amount,
                account,
                () => {},
                callback,
                errorHandler,
                gasFeed,
                gameToken
            );
        }
    };

    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={nativeBalance}
                        onMaxSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance);
                        }}
                        onHalfSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={initialPredictableToken(
                            selectedChainId
                        )}
                        balanceText={`Enter $${initialPredictableToken(
                            selectedChainId
                        )} Amount`}
                        loading={balanceLoading}
                        minAmount={minAmount}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={amount}
                        maxAmount={nativeBalance}
                        onMaxSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance);
                        }}
                        onHalfSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 2);
                        }}
                        on25Select={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 4);
                        }}
                        on75Select={() => {
                            nativeBalance > 0 &&
                                setAmount((3 * nativeBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={initialPredictableToken(
                            selectedChainId
                        )}
                        balanceText={`Enter $${initialPredictableToken(
                            selectedChainId
                        )} Amount`}
                        loading={balanceLoading}
                        minAmount={minAmount}
                        backgroundColor="bg-[#F6F6F7]"
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={amount}
                        maxAmount={nativeBalance}
                        onMaxSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance);
                        }}
                        onHalfSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 2);
                        }}
                        on25Select={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 4);
                        }}
                        on75Select={() => {
                            nativeBalance > 0 &&
                                setAmount((3 * nativeBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={initialPredictableToken(
                            selectedChainId
                        )}
                        balanceText={`Enter $${initialPredictableToken(
                            selectedChainId
                        )} Amount`}
                        loading={balanceLoading}
                        minAmount={minAmount}
                        backgroundColor="bg-[#F6F6F7]"
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={amount}
                        maxAmount={nativeBalance}
                        onMaxSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance);
                        }}
                        onHalfSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 2);
                        }}
                        on25Select={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 4);
                        }}
                        on75Select={() => {
                            nativeBalance > 0 &&
                                setAmount((3 * nativeBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={initialPredictableToken(
                            selectedChainId
                        )}
                        balanceText={`Enter $${initialPredictableToken(
                            selectedChainId
                        )} Amount`}
                        loading={balanceLoading}
                        minAmount={minAmount}
                        backgroundColor="bg-[#F6F6F7]"
                    />
                );

            default:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={nativeBalance}
                        onMaxSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance);
                        }}
                        onHalfSelect={() => {
                            nativeBalance > 0 && setAmount(nativeBalance / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={initialPredictableToken(
                            selectedChainId
                        )}
                        balanceText={`Enter $${initialPredictableToken(
                            selectedChainId
                        )} Amount`}
                        loading={balanceLoading}
                        minAmount={minAmount}
                    />
                );
        }
    };

    /* texts are used for Internationlization */
    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex items-center justify-between">
                <p className="text-highlight dark:text-primary-100 text-lg font-medium">
                    <span>{t("Deposit")}</span>
                </p>
                <CloseIcon
                    className="dark:text-primary-100 text-highlight cursor-pointer"
                    onClick={() => {
                        onClose();
                        setLoading(false);
                    }}
                />
            </div>
            {/** * paysection */}

            {InputRender()}
            <div className="flex flex-col items-center">
                <ArrowCircleDown />
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-sm flex items-center font-medium  space-x-1 mt-3 text-primary-100">
                    {t("You will be receiving")}
                </p>
                {/* <div className="grid grid-cols-2 mt-2 gap-1"> */}
                <div>
                    <button
                        type="button"
                        className={`${
                            gameToken === PREDICT_TOKENS.BGN
                                ? " "
                                : "bg-gray-900 opacity-20"
                        } flex gap-4 p-4 cursor-pointer items-center`}
                        onClick={() => {
                            setGameToken(PREDICT_TOKENS.BGN);
                        }}
                    >
                        <img
                            src="/images/currency/bhavish-lossless-chip.png"
                            alt="lossless"
                            className="h-12 w-12"
                        />
                        <p className="flex flex-col text-primary-100 items-start">
                            <span>
                                {(amount * 100).toFixed(4)}
                                <span className="text-primary-200  font-medium ml-1">
                                    {gameToken}
                                </span>
                            </span>
                            <span className="text-primary-200 text-xs font-medium ">
                                {t("Bhavish Game Lossless Tokens")}
                            </span>
                        </p>
                    </button>
                </div>
                <p className="text-xs mt-1 mb-2 text-primary-200">
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
                    <div className=" flex-col gap-1 flex">
                        <div className="flex text-xs text-primary-200 gap-1">
                            <p className="w-fit">1.</p>
                            <p className="text-xs text-primary-200 col-span-2">
                                {t("Withdraw_Matic_Message", {
                                    date_and_time: getDateFromUnixTimestamp(
                                        lockinPeriod + currentTimestamp
                                    ),
                                })}
                            </p>
                        </div>
                        <div className="flex text-xs text-primary-200 gap-1">
                            <p className="w-fit">2.</p>
                            <p className="text-xs text-primary-200 col-span-2">
                                {t("Confirm_Deposit_Message")}
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

            {loading ? (
                <div className="flex flex-row justify-center w-full my-4">
                    <LoadingIcon className="animate-spin origin-center animate" />
                </div>
            ) : (
                <button
                    type="button"
                    className={`w-full rounded-[10px]  ${
                        amount < minAmount
                            ? "bg-footer-text opacity-20"
                            : "bg-footer-text"
                    } p-2 text-primary-white mt-6`}
                    disabled={amount < minAmount}
                    onClick={() => onDeposit()}
                >
                    {t("Confirm Deposit")}
                </button>
            )}
        </ModalComponent>
    );
};
