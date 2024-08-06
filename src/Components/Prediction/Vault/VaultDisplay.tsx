import VaultDepositWithdraw from "@Components/Prediction/Vault/VaultDepositWithdraw";
import VaultInfo from "@Components/Prediction/Vault/VaultInfo";
import VaultInfoOptions from "@Components/Prediction/Vault/VaultInfoOptions";
import React from "react";
import { useRouter } from "next/router";
import useVaultDetails from "@Hooks/useVaultDetails";
import BackToIndex from "@Basic/BackToIndex";
import { useQuery } from "graphql-hooks";
import { vaultData } from "@Components/Prediction/Vault/queries";
import { FEATURE_SUPPORTED } from "@Constants";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";
import { useTranslation } from "react-i18next";

const VaultDisplay = () => {
    const router = useRouter();
    const param = router.query.vault;
    const { data }: any = useVaultDetails(param);
    const { data: vaultGraphData } = useQuery(vaultData(data.contractAddress));
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    return (
        <div className="  flex flex-col sm:gap-10 gap-6 sm:py-0 py-8">
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]?.vaults ? (
                <>
                    <BackToIndex title="Vaults" link="/vaults" />
                    <h1 className="text-[1.625rem] leading-8 font-bold  text-primary-100 ">
                        {t(data.vaultName)}
                    </h1>
                    <VaultInfo
                        apy={data.apy}
                        currentDeposits={Number(data.currentDeposit)}
                        maxDeposits={Number(data.maxCapacity)}
                        color={data.color}
                        startTimestamp={data.startTimestamp}
                    />
                    <div className="flex gap-6 w-full sm:flex-row flex-col-reverse">
                        <VaultInfoOptions
                            strategyInfo={data.strategy}
                            imageUrl={data.imageUrl}
                            contractAddress={data.contractAddress}
                            currencySupported={data.currencySupported}
                            vaultGraphData={vaultGraphData}
                            apy={data.apy}
                            startTimestamp={data.startTimestamp}
                        />
                        <VaultDepositWithdraw
                            contractAddress={data.contractAddress}
                            vaultName={data.vaultName}
                            assetName={data.assetName}
                        />
                    </div>
                </>
            ) : (
                <BGNNotSupportedSection title="Vaults" />
            )}
        </div>
    );
};

export default VaultDisplay;
