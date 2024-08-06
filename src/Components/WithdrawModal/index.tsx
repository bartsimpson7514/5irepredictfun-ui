/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import CloseIcon from "public/svgs/close.svg";
import { useTranslation } from "react-i18next";
import ArrowCircleDown from "@Public/svgs/ArrowCircleDown.svg";
import IconInfo from "@Public/svgs/quest/info-icon.svg";
import {
    claimWinningRewards,
    getMaticValue,
    lockInPeriod,
    userAllWithdrawableBalance,
    userWithdrawableBalanceSplit,
    withdraw,
    withdrawBNB,
} from "@Utils/bhavishPool";
import { useWeb3React } from "@web3-react/core";
import { useAlert } from "react-alert";
import { fetchGas, initialPredictableToken, toDecimals } from "@Utils";
import LoadingIcon from "@Public/svgs/loading.svg";
import { INTEGRATIONS, PREDICT_TOKENS } from "@Constants";
import ButtonCTA from "@Basic/ButtonCTA";
import { getDateFromUnixTimestamp } from "@Utils/time";
import ModalComponent from "@Basic/Modal";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import InputField from "@Basic/InputModal";
import { ChainId } from "@Components/Constants";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";

interface IBGWithdrawModal {
    open: boolean;
    onClose: () => void;
}

export const BGWithdrawModal: FC<IBGWithdrawModal> = ({ open, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { library, account } = useWeb3React();
    const { t } = useTranslation();
    const alert = useAlert();
    const {
        transactionSpeedOption,
        bgrBalance,
        bglBalance,
        bgnBalance,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [amount, setAmount] = useState(0);
    const [rewardsGained, setRewardsGained] = useState(0);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const [selectedToken, setSelectedToken] = useState(PREDICT_TOKENS.BGN);
    const [lockinPeriod, setLockinPeriod] = useState(0);
    const [balance, setBalance] = useState({
        BRN: bgrBalance,
        BGN: bgnBalance,
        BGL: bglBalance,
    });
    const tokenName = initialPredictableToken(selectedChainId);

    const Tokens = {
        // BGL: PREDICT_TOKENS.BGL,
        BGN: PREDICT_TOKENS.BGN,
    };

    const getBRNWithdrawBalance = async () => {
        if (account) {
            const withdrawAllBalance: number = await userAllWithdrawableBalance(
                library,
                PREDICT_TOKENS.BGN,
                account
            );
            setBalance({ ...balance, BGN: withdrawAllBalance });
        }
    };

    useEffect(() => {
        getBRNWithdrawBalance();
    }, [account]);

    useEffect(() => {
        setAmount(balance[selectedToken]);
    }, [balance[selectedToken]]);

    const [maticBal, setMaticBal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [valueLoading, setValueLoading] = useState(false);

    const onSuccess = () => {
        alert.success(t("Reward Claim success"));
        setLoading(false);
        onClose();
    };
    const onError = () => {
        alert.error(t("Withdraw failed"));
        setLoading(false);
        onClose();
    };

    const onSuccessWithdrawal = () => {
        alert.success(t("Withdraw Successful"));
        setLoading(false);
        onClose();
    };

    const onWithdrawError = () => {
        alert.error(t("Withdraw Failed"));
        setLoading(false);
        onClose();
    };

    const onWithdraw = async () => {
        try {
            if (selectedToken === PREDICT_TOKENS.BRN) {
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
            }

            if (selectedToken === PREDICT_TOKENS.BGN || PREDICT_TOKENS.BRN) {
                setLoading(true);
                const gasFeed = await fetchGas(
                    library,
                    transactionSpeedOption,
                    selectedChainId
                );
                if (selectedChainId === ChainId.BSCMainnet) {
                    withdrawBNB(
                        library,
                        account,
                        () => {},
                        onSuccessWithdrawal,
                        onWithdrawError,
                        gasFeed,
                        selectedToken
                    );
                } else {
                    await withdraw(
                        library,
                        account,
                        () => {},
                        onSuccessWithdrawal,
                        onWithdrawError,
                        gasFeed,
                        selectedToken,
                        amount
                    );
                }
            }
        } catch (error) {
            setLoading(false);
        }
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

    const getMatic = async (val: string) => {
        setValueLoading(true);

        if (Number(val) > 0 && amount) {
            const { balances, rewards } = await userWithdrawableBalanceSplit(
                library,
                selectedToken,
                account,
                amount
            );

            setRewardsGained(Number(rewards));
            setMaticBal(Number(balances + rewards));
        } else {
            setMaticBal(0);
        }
        setValueLoading(false);
    };

    useEffect(() => {
        if (account) {
            if (selectedToken === PREDICT_TOKENS.BRN) {
                getMaticReward(String(bgrBalance));
            } else {
                getMatic(String(balance[selectedToken]));
            }
        }
    }, [selectedToken, amount, account]);

    useEffect(() => {
        (async () => {
            if (account) {
                const value = await lockInPeriod(
                    library,
                    selectedToken,
                    account
                );
                setLockinPeriod(Number(value));
            }
        })();
    }, [selectedToken, account, loading]);

    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={balance[selectedToken]}
                        maxAmount={balance[selectedToken]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={selectedToken}
                        balanceText="BGN Balance"
                        loading={loading}
                        show50Button={false}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={balance[selectedToken]}
                        maxAmount={balance[selectedToken]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        on25Select={() => {}}
                        on75Select={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={selectedToken}
                        balanceText="BGN Balance"
                        loading={loading}
                        show50Button={false}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={balance[selectedToken]}
                        maxAmount={balance[selectedToken]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        on25Select={() => {}}
                        on75Select={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={selectedToken}
                        balanceText="BGN Balance"
                        loading={loading}
                        show50Button={false}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={balance[selectedToken]}
                        maxAmount={balance[selectedToken]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        on25Select={() => {}}
                        on75Select={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={selectedToken}
                        balanceText="BGN Balance"
                        loading={loading}
                        show50Button={false}
                    />
                );
            default:
                return (
                    <InputField
                        amount={balance[selectedToken]}
                        maxAmount={balance[selectedToken]}
                        onMaxSelect={() => {}}
                        onHalfSelect={() => {}}
                        disabledCondition
                        inputChange={() => {}}
                        selectedOption={selectedToken}
                        balanceText="BGN Balance"
                        loading={loading}
                        show50Button={false}
                    />
                );
        }
    };

    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-highlight dark:text-primary-100 text-lg font-medium">
                        {t("Withdraw")}
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
                    {t("Enter BGN Amount")}
                </span>
                <div className="relative">
                    {InputRender()}
                    {/* <div className="flex flex-col gap-y-4 mb-3 bg-primary-card-200 rounded-xl p-4">
                        <span className=" flex justify-between text-primary-white  text-sm leading-4 rounded-xl font-medium">
                            {t("Select Currency")}
                            <div className="flex flex-row items-center gap-x-2">
                                <span
                                    role="none"
                                    className="cursor-pointer flex rounded-[4px]  text-sm font-semibold text-tooltip-text px-1  bg-[#FFFFFF1A]"
                                    onClick={() => {
                                        if (
                                            lockinPeriod &&
                                            currentTimestamp < lockinPeriod
                                        ) {
                                            return;
                                        }
                                        setAmount(balance[selectedToken] / 2);
                                    }}
                                >
                                    {t("50%")}
                                </span>
                                <span
                                    className="cursor-pointer flex rounded-[4px] text-sm font-semibold text-tooltip-text px-1 bg-[#FFFFFF1A]"
                                    role="none"
                                    onClick={() => {
                                        if (
                                            lockinPeriod &&
                                            currentTimestamp < lockinPeriod
                                        ) {
                                            return;
                                        }
                                        setAmount(balance[selectedToken]);
                                    }}
                                >
                                    {t("MAX")}
                                </span>
                            </div>
                        </span>
                        <div className="flex justify-between items-center">
                            <div className="sm:w-[150px] w-[6.5rem]">
                                <NetworkSelect
                                    value={selectedToken}
                                    options={Tokens}
                                    variant="border-2"
                                    onChange={(token: any) => {
                                        setSelectedToken(token);
                                    }}
                                    margin={false}
                                />
                            </div>
                            <TurnOffInputSpinner>
                                <input
                                    className="w-full relative bg-primary-card-200 text-primary-100 text-[18px] leading-[26px] text-right font-medium  focus:outline-none self-right"
                                    type="text"
                                    onKeyPress={event => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    value={amount}
                                    disabled={currentTimestamp < lockinPeriod}
                                    placeholder="Enter Amount"
                                    onChange={(ev: any) => {
                                        setAmount(ev.target.value);
                                    }}
                                />
                            </TurnOffInputSpinner>
                        </div>
                        <div className="text-primary-100 text-sm font-medium">
                            <>
                                {`Total Withdraw Balance: ${toDecimals(
                                    balance[selectedToken],
                                    2
                                )}`}
                            </>
                        </div>
                    </div>
                    {account && Number(amount) > balance[selectedToken] && (
                        <div className="text-red-500 absolute text-xs font-medium -bottom-[10px]">
                            {`Amount cannot be greater than ${toDecimals(
                                balance[selectedToken],
                                2
                            )}`}
                        </div>
                    )} */}
                </div>
                <div className="flex flex-col items-center mb-4">
                    <ArrowCircleDown />
                    <div className="flex gap-3 flex-col w-full mt-5">
                        <div className="flex justify-between items-center">
                            <span className=" text-sm text-primary-200">
                                {t("approx", { tokenName })}
                                {/* {`Approx $${tokenName}`} */}
                            </span>
                            <span className="text-primary-100 text-sm">
                                {`${maticBal &&
                                    maticBal - rewardsGained} ${tokenName}`}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm text-primary-200">
                                {t("Approx APY")}
                            </span>
                            <span className="text-primary-100 text-sm">
                                {`${maticBal &&
                                    toDecimals(rewardsGained, 6)} ${tokenName}`}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm flex items-center font-medium  space-x-1 mt-2 mb-3 text-primary-100">
                        {t("You will be receiving")}
                    </p>
                    {valueLoading ? (
                        <div className="w-24 h-6 mt-6">
                            <QuickSwapLoader />
                        </div>
                    ) : (
                        <span className="text-md font-medium text-primary-100 mt-[6px]">
                            {`${toDecimals(maticBal, 6)} ${tokenName}`}
                        </span>
                    )}

                    <div className="text-base flex space-x-1 mt-6 text-primary-100">
                        <p>
                            <IconInfo className="h-5 w-5" />
                        </p>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-primary-200">
                                {t("BGN_Withdraw_Note")}
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

                {loading ? (
                    <div className="flex flex-row justify-center w-full my-4">
                        <LoadingIcon className="animate-spin origin-center animate" />
                    </div>
                ) : (
                    <ButtonCTA
                        buttonFunction={() => onWithdraw()}
                        variant={`py-2.5 bg-footer-text text-primary-white rounded-[10px] w-full text-sm font-medium ${
                            !Number(amount) ||
                            (lockinPeriod && currentTimestamp < lockinPeriod) ||
                            Number(amount) > balance[selectedToken]
                                ? "bg-footer-text opacity-50"
                                : "bg-footer-text"
                        }`}
                        isDisable={
                            !Number(amount) ||
                            (lockinPeriod && currentTimestamp < lockinPeriod) ||
                            Number(amount) > balance[selectedToken]
                        }
                        text={!account ? "Connect Wallet" : "Confirm Withdraw"}
                    />
                )}
            </div>
            {lockinPeriod && currentTimestamp < lockinPeriod ? (
                <div className="text-sm  text-info-text">
                    {t("BGN_Withdraw_Period", {
                        lockingPeriod: getDateFromUnixTimestamp(lockinPeriod),
                    })}
                </div>
            ) : null}
        </ModalComponent>
    );
};
