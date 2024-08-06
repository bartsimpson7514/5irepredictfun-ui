import ConnectWalletModal from "@Components/WalletModal/ConnectWalletModal";
import NoVaultDetails from "@Public/svgs/QuickSwap/NoVaultDetails";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "graphql-hooks";
import { t } from "i18next";
import React, { useEffect } from "react";
import BarLineGraph from "../BarLineGraph";
import { vaultUserData } from "../queries";

interface VaultYourDepositProps {
    contractAddress: string;
}

const VaultYourDeposit: React.FC<VaultYourDepositProps> = ({
    contractAddress,
}) => {
    const { account } = useWeb3React();
    const { data: vaultUserGraphData, refetch } = useQuery(
        vaultUserData(account, contractAddress)
    );

    useEffect(() => {
        refetch();
    }, [account]);

    const Message = () => {
        return (
            <>
                <div className=" text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs">
                    {t("Wallet_Connect_Vault_Screen_Message")}
                </div>
            </>
        );
    };

    return (
        <>
            {account ? (
                <div className="w-full flex flex-col gap-4">
                    {vaultUserGraphData?.userHistories.length ? (
                        <>
                            <div className=" text-base font-medium text-primary-100">
                                {t("Your deposit")}
                            </div>
                            <div className="text-sm leading-6  text-primary-200">
                                <BarLineGraph
                                    vaultUserGraphData={vaultUserGraphData}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="justify-center items-center flex">
                            <div className="w-full flex items-center justify-center flex-col max-w-md h-36 px-10 sm:my-28 my-16">
                                <NoVaultDetails />

                                <span className="text-primary-200 mt-6 text-sm text-center">
                                    {t("NoDepositMadeIntoVault")}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className=" flex items-center justify-center sm:px-10 h-96">
                    <ConnectWalletModal Message={Message} />
                </div>
            )}
        </>
    );
};

export default VaultYourDeposit;
