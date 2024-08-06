import React from "react";
import { useTranslation } from "react-i18next";

interface VaultInfoOtherInfoProps {}

const VaultInfoOtherInfo: React.FC<VaultInfoOtherInfoProps> = () => {
    const { t } = useTranslation();
    return (
        /* Texts in this file has been taken in translation.Added as the value in the json file. */
        <div className="w-full flex flex-col gap-8 ">
            <div className=" text-base font-medium text-primary-100">
                {t("Other Info")}
            </div>

            <div className="text-sm leading-6 text-primary-200 flex flex-col gap-4">
                <div className="leading-5 font-bold  text-primary-200 ">
                    {t("Vault_Deposit_Withdrawal")}
                </div>

                <p>{t("Vault_Info_One")}</p>
                <p>{t("Vault_Info_Two")}</p>
            </div>
            <div className="text-sm leading-6 text-primary-200 flex flex-col gap-4">
                <div className="leading-5 font-bold  text-primary-200 ">
                    {t("Fee Structure")}
                </div>
                <p>{t("Vault_Info_Three")}</p>
            </div>
            <div className="text-sm leading-6 text-primary-200 flex flex-col gap-4">
                <div className="leading-5 font-bold  text-primary-200 ">
                    {t("Risks")}
                </div>
                <p>{t("Vault_Info_Four")}</p>
                <p>{t("Vault_Info_Five")}</p>
            </div>
        </div>
    );
};

export default VaultInfoOtherInfo;
