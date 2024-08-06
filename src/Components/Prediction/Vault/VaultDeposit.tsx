import ButtonCTA from "@Basic/ButtonCTA";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import { fetchGas } from "@Utils";
import { useAlert } from "react-alert";
import { depositToVaultNative, depositToVaultNativeBNB } from "@Utils/vaults";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingIcon from "@Public/svgs/loading.svg";
import { formatDateTime } from "@Components/Quests/questhelpers";
import { handleGaEvent } from "@Utils/googleanalytics";
import InputField from "@Basic/InputModal";
import {
    DISABLE_VAULT_DEPOSIT,
    INTEGRATIONS,
    PREDICT_TOKENS,
} from "@Constants";
import { useTranslation } from "react-i18next";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";

export interface VaultDepositProps {
    selectedOption: string;
    balanceInfo: number;
    contractAddress: string;
    loading: boolean;
    lockPeriod: number;
    assetName: string;
    vaultName: string;
}

const VaultDeposit: React.FC<VaultDepositProps> = ({
    selectedOption,
    balanceInfo,
    contractAddress,
    loading,
    lockPeriod,
    assetName,
    vaultName,
}) => {
    const { account, library } = useWeb3React();
    const [amount, setAmount] = useState(0);
    // const inputRef = useRef(null);
    const alert = useAlert();
    const {
        transactionSpeedOption,
        predictableToken,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [loader, setLoader] = useState(false); // loader
    const toggleWalletModal = useWalletModalToggle();
    const { t } = useTranslation();

    const depositToVaults = async amnt => {
        setLoader(true);
        try {
            const gasFeed = await fetchGas(
                library,
                transactionSpeedOption,
                selectedChainId
            );
            if (predictableToken === PREDICT_TOKENS.ETH) {
                await depositToVaultNativeBNB(
                    library,
                    amnt,
                    account,
                    gasFeed,
                    () => {
                        setLoader(false);
                    },
                    () => {
                        alert.success(
                            t("deposit", { amount: formatDateTime(lockPeriod) })
                        );
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} DEPOSIT SUCCESSFUL`,
                            { value: Number(balanceInfo), currency: "USD" }
                        );
                        setLoader(false);
                        setAmount(0);
                    },
                    () => {
                        setLoader(false);
                        alert.error(t("Deposit failed try again"));
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} DEPOSIT FAILED`
                        );
                    },
                    contractAddress
                );
            } else {
                await depositToVaultNative(
                    library,
                    amnt,
                    account,
                    gasFeed,
                    () => {
                        setLoader(false);
                    },
                    () => {
                        alert.success(
                            t("deposit", { amount: formatDateTime(lockPeriod) })
                        );
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} DEPOSIT SUCCESSFUL`,
                            { value: Number(balanceInfo), currency: "USD" }
                        );
                        setLoader(false);
                        setAmount(0);
                    },
                    () => {
                        setLoader(false);
                        alert.error(t("Deposit failed try again"));
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} DEPOSIT FAILED`
                        );
                    },
                    contractAddress
                );
            }
        } catch (err) {
            setLoader(false);
        }
    };
    const connectWalletOrDeposit = () => {
        if (!account) {
            toggleWalletModal();
        } else {
            depositToVaults(amount);
        }
        handleGaEvent("DEPOSIT BUTTON CLICKED", {
            value: Number(balanceInfo),
            currency: "USD",
        });
    };

    const isInvalidInput =
        Number(amount) === 0 || !amount || Number(amount) > balanceInfo;
    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={balanceInfo}
                        onMaxSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo);
                        }}
                        onHalfSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Balance"
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={amount}
                        maxAmount={balanceInfo}
                        onMaxSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo);
                        }}
                        onHalfSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 2);
                        }}
                        on25Select={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 4);
                        }}
                        on75Select={() => {
                            balanceInfo > 0 && setAmount((3 * balanceInfo) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Balance"
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={amount}
                        maxAmount={balanceInfo}
                        onMaxSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo);
                        }}
                        onHalfSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 2);
                        }}
                        on25Select={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 4);
                        }}
                        on75Select={() => {
                            balanceInfo > 0 && setAmount((3 * balanceInfo) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Balance"
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={amount}
                        maxAmount={balanceInfo}
                        onMaxSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo);
                        }}
                        onHalfSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 2);
                        }}
                        on25Select={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 4);
                        }}
                        on75Select={() => {
                            balanceInfo > 0 && setAmount((3 * balanceInfo) / 4);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Balance"
                        loading={loading}
                    />
                );
            default:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={balanceInfo}
                        onMaxSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo);
                        }}
                        onHalfSelect={() => {
                            balanceInfo > 0 && setAmount(balanceInfo / 2);
                        }}
                        disabledCondition={false}
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Balance"
                        loading={loading}
                    />
                );
        }
    };

    if (DISABLE_VAULT_DEPOSIT.includes(contractAddress)) {
        return (
            <div className=" text-base my-[130px] leading-5 items-center flex justify-center text-center  text-primary-200 ">
                Vault deposits have been disabled.
                <br />
                New Vaults Coming Soon!
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-6">
            {InputRender()}
            <div>
                {loader ? (
                    <div className="flex flex-row justify-center w-full">
                        <LoadingIcon className="animate-spin h-10 origin-center animate" />
                    </div>
                ) : (
                    <ButtonCTA
                        buttonFunction={() => connectWalletOrDeposit()}
                        variant={`py-2.5 text-primary-white rounded w-full text-sm font-medium ${
                            account && isInvalidInput
                                ? "bg-footer-text opacity-50"
                                : "bg-footer-text"
                        }`}
                        isDisable={account && isInvalidInput}
                        text={!account ? "Connect Wallet" : "Deposit"}
                    />
                )}
            </div>
        </div>
    );
};

export default VaultDeposit;
