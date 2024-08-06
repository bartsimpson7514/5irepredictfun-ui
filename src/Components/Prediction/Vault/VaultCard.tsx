import React from "react";
import VaultCardView from "@Components/Prediction/Vault/VaultCardView";
import useAllVaultDetails from "@Hooks/useAllVaultDetails";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { FEATURE_SUPPORTED } from "@Constants";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";

const VaultCard = () => {
    const { data, loading: allVaultsDataLoading }: any = useAllVaultDetails();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]?.vaults ? (
                <div className="  flex flex-col sm:gap-10 gap-6 p-2 sm:p-0">
                    <VaultCardView
                        data={data}
                        allVaultsDataLoading={allVaultsDataLoading}
                    />
                </div>
            ) : (
                <BGNNotSupportedSection title="Vaults" />
            )}
        </>
    );
};

export default VaultCard;
