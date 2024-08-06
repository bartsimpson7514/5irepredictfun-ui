/* eslint-disable no-nested-ternary */
import { getDateFromUnixTimestamp } from "@Utils/time";
import { useQuery } from "graphql-hooks";
import React, { useEffect, useState } from "react";
import { toDecimals } from "@Utils";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useTranslation } from "react-i18next";
import LineGraph from "../../../Basic/Graph";
import { vaultWeekData } from "../queries";

interface VaultInfoPerformanceProps {
    vaultGraphData: any;
    contractAddress: string;
    apy: number;
    startTimestamp: number;
}

const VaultInfoPerformance: React.FC<VaultInfoPerformanceProps> = ({
    vaultGraphData,
    contractAddress,
    apy,
    startTimestamp,
}) => {
    const [data, setData] = useState();
    const { data: vaultWeekGraphData } = useQuery(
        vaultWeekData(contractAddress)
    );
    const [weekPerformace, setWeekPerformace] = useState(Number);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    // const weekDiffrence = 0;
    const weekDiffrence = 10518400;
    const { t } = useTranslation();

    useEffect(() => {
        if (vaultWeekGraphData?.userHistories.length) {
            const latestData =
                vaultWeekGraphData.userHistories[
                    vaultWeekGraphData.userHistories.length - 1
                ];
            const weekOldData = vaultWeekGraphData.userHistories[0];
            if (latestData)
                setWeekPerformace(
                    latestData.assetAmount / latestData.shareAmount -
                        weekOldData.assetAmount / weekOldData.shareAmount
                );
        }
    }, [vaultWeekGraphData]);

    useEffect(() => {
        vaultGraphData?.userHistories.reverse();
        const reqGraphData = vaultGraphData?.userHistories.map(item => {
            return {
                time: getDateFromUnixTimestamp(item.timestamp),
                apy: item.assetAmount / item.shareAmount,
            };
        });
        setData(reqGraphData);
    }, [vaultGraphData]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className=" text-base font-medium text-primary-100">
                {t("Performance")}
            </div>

            <div className="text-lg leading-6  text-primary-200 ">
                <LineGraph data={data} dataKey="apy" />
            </div>
            {currentTimestamp - startTimestamp > weekDiffrence && (
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col">
                        <span
                            className={`${
                                apy
                                    ? apy >= 0
                                        ? "text-primary-success"
                                        : "text-primary-100"
                                    : "text-primary-100"
                            }  text-2xl font-bold`}
                        >
                            {apy &&
                            // eslint-disable-next-line no-restricted-globals
                            isFinite(apy) ? (
                                apy >= 0 ? (
                                    `+${apy.toFixed(2)}%`
                                ) : (
                                    `---`
                                )
                            ) : (
                                <div className="h-4">
                                    <QuickSwapLoader />
                                </div>
                            )}
                        </span>
                        <span className=" text-primary-200 text-xs">
                            {t("Estimated APR")}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span
                            className={`${
                                weekPerformace
                                    ? weekPerformace >= 0
                                        ? "text-primary-success"
                                        : "text-down"
                                    : "text-primary-100"
                            }  text-2xl font-bold`}
                        >
                            {weekPerformace ? (
                                weekPerformace >= 0 ? (
                                    `+${toDecimals(weekPerformace, 2)}%`
                                ) : (
                                    `${toDecimals(weekPerformace, 2)}%`
                                )
                            ) : (
                                <div className="h-4">
                                    <QuickSwapLoader />
                                </div>
                            )}
                        </span>
                        <span className=" text-primary-200 text-xs">
                            {t("Previous Week Performance")}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VaultInfoPerformance;
