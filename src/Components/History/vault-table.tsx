import useVaultHistoryDetails from "@Hooks/useVaultHistoryDetails";
import { AppState } from "@Redux";
import { toDecimals } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const VaultTable = ({ userHistories }) => {
    const { header, data } = useVaultHistoryDetails(userHistories);
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();

    return (
        <>
            <div className="hidden sm:block w-full">
                <table className="box-content mt-6 w-full z-50 vault-table">
                    <thead className="text-primary-200 z-50 h-12 py-2 rounded-xl text-sm">
                        <tr className="w-full text-justify">
                            {React.Children.toArray(
                                header.map(item => (
                                    <th>
                                        <div className="text-start leading-4 text-sm text-secondary dark:text-primary-200 font-medium">
                                            {t(item)}
                                        </div>
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {React.Children.toArray(
                            data?.map(item => (
                                <>
                                    <tr
                                        className="transition-all border-gray-300 text-primary-100 justify-between bg-history-section items-center font-medium 
                                h-16 rounded-xl text-sm accordion-item pb-1 pt-1"
                                    >
                                        <td className="font-medium text-sm text-primary-200 rounded-l-[10px]">
                                            {item.slno}
                                        </td>

                                        <td className="text-sm font-normal text-primary-100">
                                            {item.vaultName}
                                        </td>
                                        <td
                                            className={` ${
                                                item.type === "DEPOSIT"
                                                    ? "text-up"
                                                    : "text-down"
                                            }`}
                                        >
                                            {t(item.type)}
                                        </td>
                                        <td className="">
                                            {toDecimals(item.BGAmount, 6)}
                                        </td>
                                        <td className="rounded-r-[10px]">
                                            {item.date}
                                        </td>
                                    </tr>
                                    <td colSpan={5} className="pb-[3px]" />
                                </>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-6 sm:hidden mt-10">
                {React.Children.toArray(
                    data?.map(item => (
                        <div className="p-4 bg-history-section flex flex-col gap-6 rounded-lg">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <div className="text-sm font-normal text-primary-100">
                                        {item.slno}
                                    </div>
                                    <div className="mt-1 font-medium text-sm text-primary-200">
                                        {t("Sl No")}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0.5 items-start justify-start">
                                    <h1 className="text-sm leading-4 font-medium text-primary-100">
                                        {item.vaultName}
                                    </h1>
                                    <h2 className="text-sm font-medium text-primary-200">
                                        {t("Vault Name")}
                                    </h2>
                                </div>
                                <div className="">
                                    <h1
                                        className={`text-sm font-normal leading-4 text-ellipsis ${
                                            item.type === "DEPOSIT"
                                                ? "text-up"
                                                : "text-down"
                                        }`}
                                    >
                                        {t(item.type)}
                                    </h1>
                                    <h2 className="text-sm font-medium text-primary-200">
                                        {t("Type")}
                                    </h2>
                                </div>
                                <div>
                                    <h1 className="text-sm leading-4 text-primary-100">
                                        {toDecimals(item.BGAmount, 6)}
                                    </h1>
                                    <h2 className="text-sm font-medium text-primary-200">
                                        {`${predictableToken}`}
                                    </h2>
                                </div>
                                <div>
                                    <h1 className="text-sm leading-4 text-primary-100">
                                        {item.date}
                                    </h1>
                                    <h2 className="text-sm font-medium text-primary-200">
                                        {t("Date")}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default VaultTable;
