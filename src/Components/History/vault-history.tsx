import React from "react";
import HistoryNotFound from "@Components/History/empty-history";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "graphql-hooks";
import { vaultUserAllData } from "@Components/Prediction/Vault/queries";
import { BHAVISH_VAULT } from "@Constants";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import VaultTable from "./vault-table";

const VaultHistory = () => {
    const { account } = useWeb3React();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const VAULT_ADDRESS = BHAVISH_VAULT[predictableToken][selectedChainId]?.map(
        vault => vault.contractAddress
    ) || [""];

    const { data: userHistories, loading } = useQuery(
        vaultUserAllData(account, VAULT_ADDRESS)
    );

    return (
        <>
            <div>
                {userHistories && userHistories?.userHistories?.length > 0 ? (
                    <div className="flex items-center flex-col justify-center">
                        {loading ? (
                            <div className="w-full h-28 mt-10">
                                <QuickSwapLoader />
                            </div>
                        ) : (
                            <>
                                <div className={`w-full `}>
                                    <VaultTable
                                        userHistories={
                                            userHistories?.userHistories
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <HistoryNotFound />
                )}
            </div>
        </>
    );
};

export default VaultHistory;
