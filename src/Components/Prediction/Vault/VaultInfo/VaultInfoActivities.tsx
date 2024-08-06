// import DropDown from "@Basic/DropDown";
import useVaultGraphDetails from "@Hooks/useVaultGraphDetails";
import React from "react";
import { useTranslation } from "react-i18next";
import VaultActivityTable from "../VaultActivityTable";

interface VaultInfoActivitiesProps {
    style?: string;
    contractAddress: string;
    currencySupported: any;
}

const VaultInfoActivities: React.FC<VaultInfoActivitiesProps> = ({
    ...props
}) => {
    const graphData = useVaultGraphDetails(
        props.contractAddress,
        props.currencySupported
    );
    const { t } = useTranslation();
    // const options = {
    //     AllActivity: "All Activity",
    //     USDC: "USDC",
    //     USDT: "USDT",
    // };

    return (
        <div className={`w-full ${props.style}`}>
            <div className="flex justify-between mb-5">
                <div className=" text-base font-medium text-primary-100">
                    {t("Vault Activity")}
                </div>
            </div>
            <VaultActivityTable graphData={graphData} />
        </div>
    );
};

export default VaultInfoActivities;
