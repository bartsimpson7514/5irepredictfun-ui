import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import VaultInfoContent from "./VaultInfoContent";
import VaultInfoHeader from "./VaultInfoHeader";

export enum SelectedOption {
    VAULT,
    YOURDEPOSIT,
}

interface VaultInfoOptionsProps {
    strategyInfo: String;
    imageUrl: any;
    contractAddress: string;
    currencySupported: any;
    vaultGraphData: any;
    apy: number;
    startTimestamp: number;
}

const VaultInfoOptions: React.FC<VaultInfoOptionsProps> = ({
    strategyInfo,
    imageUrl,
    contractAddress,
    currencySupported,
    vaultGraphData,
    apy,
    startTimestamp,
}) => {
    const [option, setOption] = useState(SelectedOption.VAULT);
    const { t } = useTranslation();
    return (
        <div className="sm:w-8/12 w-full flex flex-col sm:gap-10 gap-6">
            <div className="text-base font-medium text-primary-100">
                {t("More information related to this Vault")}
            </div>
            <div>
                <VaultInfoHeader option={option} setOption={setOption} />
                <VaultInfoContent
                    option={option}
                    strategyInfo={strategyInfo}
                    imageUrl={imageUrl}
                    contractAddress={contractAddress}
                    currencySupported={currencySupported}
                    vaultGraphData={vaultGraphData}
                    apy={apy}
                    startTimestamp={startTimestamp}
                />
            </div>
        </div>
    );
};

export default VaultInfoOptions;
