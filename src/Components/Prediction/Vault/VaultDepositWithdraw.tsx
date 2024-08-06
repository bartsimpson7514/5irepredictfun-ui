import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NETWORK_ASSET } from "@Constants";
import { AppState } from "@Redux";
import { upperCase } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import LinkIcon from "@Public/svgs/link-icon";
import { getEtherscanLink, shortenAddress } from "@Utils";

import { getVaultLockPeriod } from "@Utils/vaults";
import { handleGaEvent } from "@Utils/googleanalytics";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useTranslation } from "react-i18next";
import VaultDeposit from "./VaultDeposit";
import VaultWithdraw from "./VaultWithdraw";

export interface VaultDepositWithdrawProps {
    contractAddress: string;
    vaultName: any;
    assetName: any;
}

enum OptionSelection {
    Deposit = 0,
    Withdraw = 1,
}

const VaultDepositWithdraw: React.FC<VaultDepositWithdrawProps> = ({
    contractAddress,
    vaultName,
    assetName,
}) => {
    const { account, library } = useWeb3React();
    const { t } = useTranslation();
    const { balanceLoading, nativeBalance, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const selectedOption = NETWORK_ASSET[selectedChainId];

    // const [balanceInfo, setBalance] = useState(0);
    const [lockPeriod, setLockPeriod] = useState<number>(0);
    const balance = {
        MATIC: nativeBalance,
        BNB: nativeBalance,
        ETH: nativeBalance,
        tZBC: nativeBalance,
        ZBC: nativeBalance,
    };
    // const balanceFromFetcher: any =
    //     selectedOption.toUpperCase() !== PREDICT_TOKENS.MATIC && library
    //         ? tokenBalance(selectedOption, selectedChainId, library, account)
    //         : nativeBalance;

    // const updateTokenBalanceWithDecimals = async () => {
    //     const tokenAddress = returnTokenAddress(
    //         selectedOption,
    //         selectedChainId
    //     );
    //     const decimals = await getTokenDecimal(tokenAddress, library);
    //     const tokenValue = toDecimals(
    //         formatUnits(balanceFromFetcher, decimals),
    //         4
    //     );
    //     setBalance(tokenValue);
    //     dispatch(updateBalanceLoader(false));
    // };

    useEffect(() => {
        (async () => {
            try {
                if (contractAddress) {
                    const lockTime = await getVaultLockPeriod(
                        library,
                        contractAddress
                    );
                    setLockPeriod(Number(lockTime));
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        })();
    }, [contractAddress, account]);

    // useEffect(() => {
    //     if (balanceFromFetcher) {
    //         if (selectedOption.toUpperCase() !== PREDICT_TOKENS.MATIC) {
    //             updateTokenBalanceWithDecimals();
    //         } else {
    //             setBalance(balanceFromFetcher);
    //             dispatch(updateBalanceLoader(false));
    //         }
    //     }
    // }, [balanceFromFetcher, selectedOption]);
    const [option, setOption] = useState(OptionSelection.Deposit);

    const tabs = [
        {
            name: "Deposit",
        },
        {
            name: "Withdraw",
        },
    ];

    return (
        <div className="rounded sm:w-4/12 w-full">
            <div className="bg-card-background rounded-t sm:p-6 px-3 py-4">
                <div className="flex flex-row justify-center">
                    <nav
                        className="flex rounded-lg cursor-pointer mb-8 bg-toggle"
                        aria-label="Tabs"
                    >
                        {React.Children.toArray(
                            tabs.map(tab => (
                                <button
                                    type="button"
                                    key={tab.name}
                                    className={`${
                                        OptionSelection[tab.name] === option
                                            ? "text-asset-switch bg-footer-text"
                                            : `text-primary-300 bg-toggle gradient-text-hover-${process.env.NEXT_PUBLIC_INTEGRATION} hover:bg-gray-300`
                                    }
                                      rounded  group  relative min-w-0 overflow-hidden  py-3 px-8 text-sm font-normal text-center  focus:z-10`}
                                    onClick={() => {
                                        setOption(OptionSelection[tab.name]);
                                        handleGaEvent(
                                            upperCase(`${tab.name} selected`)
                                        );
                                    }}
                                >
                                    <span className="cursor-pointer">
                                        {t(tab.name)}
                                    </span>
                                </button>
                            ))
                        )}
                    </nav>
                    {/* <OptionButton
                        styleParent="w-[13.125rem] text-sm leading-4  h-10  text-primary-100 mb-8"
                        styleButton=" font-medium text-sm leading-4 rounded-md h-full"
                        styleSelected="bg-footer-text text-primary-100"
                        labels={["Deposit", "Withdraw"]}
                        selected={option}
                        onChange={type => setOption(type)}
                    /> */}
                </div>
                {OptionSelection[option] === OptionSelection[0] ? (
                    <VaultDeposit
                        selectedOption={selectedOption}
                        balanceInfo={balance[selectedOption]}
                        contractAddress={contractAddress}
                        loading={balanceLoading}
                        lockPeriod={lockPeriod}
                        vaultName={vaultName}
                        assetName={assetName}
                    />
                ) : (
                    <VaultWithdraw
                        selectedOption={selectedOption}
                        contractAddress={contractAddress}
                        lockPeriod={lockPeriod}
                        vaultName={vaultName}
                        assetName={assetName}
                    />
                )}
            </div>
            <div className="bg-quest-contract-section  py-2 flex items-center justify-center">
                <a
                    href={getEtherscanLink(
                        selectedChainId,
                        contractAddress,
                        "address"
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className=" text-primary-100 flex gap-1 text-xs font-medium"
                >
                    <span>
                        {contractAddress ? (
                            <>
                                {`${t("Contract")} ${shortenAddress(
                                    contractAddress
                                )}`}
                            </>
                        ) : (
                            <div className="w-14 h-2">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </span>
                    <LinkIcon className="fill-primary-100" />
                </a>
            </div>
        </div>
    );
};

export default VaultDepositWithdraw;
