/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useTranslation } from "react-i18next";
import Modal from "@Basic/BasicModal";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import InputField from "@Basic/InputModal";
import InsufficientBalance from "@Components/Quests/insufficient-balance";
import { INTEGRATIONS, USDC_DECIMAL } from "@Constants";
import { toDecimals } from "@Utils";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";

const CardBuybody = ({ ...props }) => {
    const [currBalance, setBalance] = useState(0);
    const [potentailEarning, setPotentailEarning] = useState(0);
    const { account } = useWeb3React();
    const {
        isDarkMode,
        predictableToken,
        balanceLoading,
        bgnBalance,
        bgrBalance,
        nativeBalance,
    } = useSelector((state: AppState) => state.prediction);
    const [openTnC, setOpenTnC] = useState(false);
    const [amount, setAmount] = useState(0);

    const balances = {
        BGN: bgnBalance,
        BGR: bgrBalance,
        MATIC: nativeBalance,
        BNB: nativeBalance,
        ETH: nativeBalance,
        MNT: nativeBalance,
        tcBNB: nativeBalance,
        tZBC: nativeBalance,
        ZBC: nativeBalance,
        TLOS: nativeBalance,
        SYS: nativeBalance,
    };

    const { t } = useTranslation();

    const networks: any = {};
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].forEach(element => {
        if (element.isActive) {
            networks[`${element.networkName.toString()}`] = [
                element.networkName,
            ];
        }
    });

    useEffect(() => {
        const upAmount = Number(props.totalUpPredictAmount / USDC_DECIMAL);
        const downAmount = Number(props.totalDownPredictAmount / USDC_DECIMAL);

        let earnings;
        if (props.indicator === "UP") {
            earnings = Number(
                Number(upAmount + downAmount + Number(amount)) /
                    (upAmount + Number(amount))
            );
        } else {
            earnings = Number(
                (upAmount + downAmount + Number(amount)) /
                    (downAmount + Number(amount))
            );
        }
        setPotentailEarning(earnings);
    }, [amount, props.indicator]);

    useEffect(() => {
        setBalance(balances[predictableToken]);
    }, [predictableToken, account, bgnBalance, bgrBalance, nativeBalance]);

    useEffect(() => {
        props.onChange(amount);
    }, [amount]);

    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={currBalance}
                        onMaxSelect={() => {
                            currBalance > 0 && setAmount(currBalance);
                        }}
                        onHalfSelect={() => {
                            currBalance > 0 && setAmount(currBalance / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={predictableToken}
                        balanceText={t("Balance")}
                        loading={balanceLoading}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={amount}
                        maxAmount={currBalance}
                        onMaxSelect={() => {
                            currBalance > 0 && setAmount(currBalance);
                        }}
                        onHalfSelect={() => {
                            currBalance > 0 && setAmount(currBalance / 2);
                        }}
                        on25Select={() => {
                            currBalance > 0 && setAmount(currBalance / 4);
                        }}
                        on75Select={() => {
                            currBalance > 0 && setAmount((3 * currBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={predictableToken}
                        balanceText={t("Balance")}
                        loading={balanceLoading}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={amount}
                        maxAmount={currBalance}
                        onMaxSelect={() => {
                            currBalance > 0 && setAmount(currBalance);
                        }}
                        onHalfSelect={() => {
                            currBalance > 0 && setAmount(currBalance / 2);
                        }}
                        on25Select={() => {
                            currBalance > 0 && setAmount(currBalance / 4);
                        }}
                        on75Select={() => {
                            currBalance > 0 && setAmount((3 * currBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={predictableToken}
                        balanceText={t("Balance")}
                        loading={balanceLoading}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={amount}
                        maxAmount={currBalance}
                        onMaxSelect={() => {
                            currBalance > 0 && setAmount(currBalance);
                        }}
                        onHalfSelect={() => {
                            currBalance > 0 && setAmount(currBalance / 2);
                        }}
                        on25Select={() => {
                            currBalance > 0 && setAmount(currBalance / 4);
                        }}
                        on75Select={() => {
                            currBalance > 0 && setAmount((3 * currBalance) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={predictableToken}
                        balanceText={t("Balance")}
                        loading={balanceLoading}
                    />
                );
            default:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={currBalance}
                        onMaxSelect={() => {
                            currBalance > 0 && setAmount(currBalance);
                        }}
                        onHalfSelect={() => {
                            currBalance > 0 && setAmount(currBalance / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={predictableToken}
                        balanceText={t("Balance")}
                        loading={balanceLoading}
                    />
                );
        }
    };

    return (
        <div className="mx-4">
            {account &&
            predictableToken === "BGN" &&
            balances[predictableToken] <= 0 ? (
                <div className="h-full mt-1 py-6 pt-6 pb-0.5">
                    <InsufficientBalance />
                </div>
            ) : (
                InputRender()
            )}
            <div className="flex justify-between items-center mt-1 text-sm">
                <div className="text-primary-200">
                    {t("Potential Earnings")}
                </div>
                <div className=" font-medium text-primary-success">
                    {amount > 0
                        ? `${toDecimals(
                              Number(amount) * potentailEarning
                          )} ${predictableToken}`
                        : "---"}
                </div>
            </div>

            <div className="text-t&c text-sm mt-[53px]">
                <span>{t("crypto_card_confirm_note")}</span>
                <button
                    className="ml-1 cursor-pointer gradient-text bg-footer-text font-bold text-sm"
                    type="button"
                    onClick={() => {
                        handleGaEvent("T_C");
                        setOpenTnC(true);
                    }}
                >
                    {t("T&C's")}
                </button>
            </div>

            <Modal
                showBack={false}
                onBack={() => {}}
                title={account && t("Terms_Conditions")}
                open={openTnC}
                onClose={() => {
                    setOpenTnC(false);
                }}
                variant={`${isDarkMode ? "dark" : ""}`}
            >
                <span className="text-xs">
                    {t("Terms_Conditions_Text")}
                    <a href="/" target="_blank" rel="noreferrer">
                        <span className="cursor text-primary-blue ml-1">
                            {t("Read more")}
                        </span>
                    </a>
                </span>
            </Modal>
        </div>
    );
};

export default CardBuybody;
