import ButtonCTA from "@Basic/ButtonCTA";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import { fetchGas, toDecimals } from "@Utils";
import { useAlert } from "react-alert";

import {
    getVaultPreviewDeposit,
    getVaultUserLastDeposit,
    getVaultUserShares,
    removeDepositFromVaultNative,
    removeDepositFromVaultNativeBNB,
} from "@Utils/vaults";
// import PercentageOptions from "@Basic/PercentageOptions";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingIcon from "@Public/svgs/loading.svg";
// import InputWithMax from "@Basic/InputWithMax";
// import InputSingle from "@Basic/InputSingle";
import useVaultMaxWithdraw from "@Hooks/useVaultMaxWithdraw";
import useVaultPerformanceFees from "@Hooks/useVaultPerformanceFees";
// import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { getDateFromUnixTimestamp } from "@Utils/time";
import { handleGaEvent } from "@Utils/googleanalytics";
import InputField from "@Basic/InputModal";
import { INTEGRATIONS, PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";

interface VaultWithdrawProps {
    selectedOption: string;
    contractAddress: string;
    lockPeriod: number;
    assetName: string;
    vaultName: string;
}

const VaultWithdraw: React.FC<VaultWithdrawProps> = ({
    selectedOption,
    contractAddress,
    lockPeriod,
    assetName,
    vaultName,
}) => {
    const { account, library } = useWeb3React();
    const [amount, setAmount] = useState(0);
    const alert = useAlert();
    const {
        transactionSpeedOption,
        predictableToken,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [loader, setLoader] = useState(false);
    const toggleWalletModal = useWalletModalToggle();
    const [fetch, setFetch] = useState(true);
    const { maxAmount, loading } = useVaultMaxWithdraw(
        loader,
        contractAddress,
        fetch
    );
    const { performaceFee } = useVaultPerformanceFees(contractAddress);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const [userLastDeposit, setUserLastDeposit] = useState<number>(0);
    const withdrawFee = 1;
    const { t } = useTranslation();
    useEffect(() => {
        (async () => {
            try {
                if (account) {
                    const time = await getVaultUserLastDeposit(
                        library,
                        account,
                        contractAddress
                    );

                    setUserLastDeposit(Number(time));
                }
            } catch (err) {
                setFetch(!fetch);
            }
        })();
    }, [contractAddress, account, fetch]);

    const removeDepositFromVaults = async amnt => {
        try {
            setLoader(true);
            const gasFeed = await fetchGas(
                library,
                transactionSpeedOption,
                selectedChainId
            );
            const share = await getVaultPreviewDeposit(
                library,
                Number(amnt),
                contractAddress
            );
            const userShares = await getVaultUserShares(
                library,
                account,
                contractAddress
            );

            const shares = Math.min(
                toDecimals(share, 10),
                toDecimals(userShares, 10)
            );

            if (predictableToken === PREDICT_TOKENS.ETH) {
                await removeDepositFromVaultNativeBNB(
                    library,
                    String(shares),
                    account,
                    gasFeed,
                    () => {
                        setLoader(false);
                    },
                    () => {
                        setLoader(false);
                        alert.success("Withdraw successful");
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} WITHDRAW SUCCESSFUL`,
                            { value: Number(amount), currency: "USD" }
                        );
                        setFetch(!fetch);
                    },
                    () => {
                        setLoader(false);
                        alert.error(t("Withdraw failed try again"));
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} WITHDRAW FAILED`
                        );
                    },
                    contractAddress
                );
            } else {
                await removeDepositFromVaultNative(
                    library,
                    String(shares),
                    account,
                    gasFeed,
                    () => {
                        setLoader(false);
                    },
                    () => {
                        setLoader(false);
                        alert.success("Withdraw successful");
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} WITHDRAW SUCCESSFUL`,
                            { value: Number(amount), currency: "USD" }
                        );
                        setFetch(!fetch);
                    },
                    () => {
                        setLoader(false);
                        alert.error(t("Withdraw failed try again"));
                        handleGaEvent(
                            `VAULT NATIVE ${assetName} ${vaultName} ${predictableToken} WITHDRAW FAILED`
                        );
                    },
                    contractAddress
                );
            }
        } catch (err) {
            setLoader(false);
        }
    };

    const connectWalletOrWithdraw = () => {
        if (!account) {
            toggleWalletModal();
        } else {
            removeDepositFromVaults(amount);
        }
        handleGaEvent("WITHDRAW BUTTON CLICKED", {
            value: Number(amount),
            currency: "MATIC",
        });
    };

    const isInvalidInput =
        Number(amount) === 0 || !amount || Number(amount) > maxAmount;
    const InputRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={maxAmount}
                        onMaxSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount);
                        }}
                        onHalfSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 2);
                        }}
                        disabledCondition={
                            userLastDeposit &&
                            userLastDeposit + lockPeriod > currentTimestamp
                        }
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Withdrawable Balance"
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={amount}
                        maxAmount={maxAmount}
                        onMaxSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount);
                        }}
                        onHalfSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 2);
                        }}
                        on25Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 4);
                        }}
                        on75Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount((3 * maxAmount) / 4);
                        }}
                        disabledCondition={
                            userLastDeposit &&
                            userLastDeposit + lockPeriod > currentTimestamp
                        }
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Withdrawable Balance"
                        loading={loading}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={amount}
                        maxAmount={maxAmount}
                        onMaxSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount);
                        }}
                        onHalfSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 2);
                        }}
                        on25Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 4);
                        }}
                        on75Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount((3 * maxAmount) / 4);
                        }}
                        disabledCondition={
                            userLastDeposit &&
                            userLastDeposit + lockPeriod > currentTimestamp
                        }
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Withdrawable Balance"
                        loading={loading}
                    />
                );

            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={amount}
                        maxAmount={maxAmount}
                        onMaxSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount);
                        }}
                        onHalfSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 2);
                        }}
                        on25Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 4);
                        }}
                        on75Select={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount((3 * maxAmount) / 4);
                        }}
                        disabledCondition={
                            userLastDeposit &&
                            userLastDeposit + lockPeriod > currentTimestamp
                        }
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Withdrawable Balance"
                        loading={loading}
                    />
                );
            default:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={maxAmount}
                        onMaxSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount);
                        }}
                        onHalfSelect={() => {
                            if (
                                maxAmount > 0 &&
                                userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp
                            ) {
                                return;
                            }
                            setAmount(maxAmount / 2);
                        }}
                        disabledCondition={
                            userLastDeposit &&
                            userLastDeposit + lockPeriod > currentTimestamp
                        }
                        inputChange={ev => setAmount(ev.target.value)}
                        selectedOption={selectedOption}
                        balanceText="Withdrawable Balance"
                        loading={loading}
                    />
                );
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-sm  text-info-text">
                {InputRender()}
                <div className="flex justify-between items-center mb-3">
                    <div>{t("Performance fees")}</div>
                    <div>{`${performaceFee / 100}%`}</div>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <div>{t("Withdrawal fees")}</div>
                    <div className="flex gap-1 items-center">
                        <span className="text-up text-sm">{t("Free")}</span>
                        <span className="line-through text-sm">{`${withdrawFee}%`}</span>
                    </div>
                </div>
            </div>
            <div>
                {loader ? (
                    <div className="flex flex-row justify-center w-full">
                        <LoadingIcon className="animate-spin h-10 origin-center animate" />
                    </div>
                ) : (
                    <ButtonCTA
                        buttonFunction={() => connectWalletOrWithdraw()}
                        variant={`py-2.5 bg-footer-text text-primary-white rounded w-full text-sm font-medium ${
                            (account && isInvalidInput) ||
                            (userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp)
                                ? "bg-footer-text opacity-50"
                                : "bg-footer-text"
                        }`}
                        isDisable={
                            (account && isInvalidInput) ||
                            (userLastDeposit &&
                                userLastDeposit + lockPeriod > currentTimestamp)
                        }
                        text={!account ? "Connect Wallet" : "Withdraw"}
                    />
                )}
            </div>
            {userLastDeposit &&
            userLastDeposit + lockPeriod > currentTimestamp ? (
                <div className="text-sm  text-info-text">
                    {t("Vault_Withdraw_Note", {
                        date_lockPeriod: getDateFromUnixTimestamp(
                            userLastDeposit + lockPeriod
                        ),
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default VaultWithdraw;
