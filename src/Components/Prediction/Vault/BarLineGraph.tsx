import { getDateFromUnixTimestamp } from "@Utils/time";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

const BarLineGraph = ({ vaultUserGraphData }) => {
    const fullConfig = resolveConfig(tailwindConfig);

    const [data, setData] = useState();
    const { t } = useTranslation();
    useEffect(() => {
        let deposit = 0;
        const reqGraphData = vaultUserGraphData?.userHistories.map(item => {
            if (item.txnType === "DEPOSIT") {
                deposit += Number(ethers.utils.formatEther(item.assetAmount));
            } else {
                deposit -= Number(ethers.utils.formatEther(item.assetAmount));
            }
            return {
                time: getDateFromUnixTimestamp(item.timestamp),
                apy: item.assetAmount / item.shareAmount,
                amountDeposit: deposit,
            };
        });
        setData(reqGraphData);
    }, [vaultUserGraphData]);

    return (
        <div className=" w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <XAxis dataKey="time" scale="band" />
                    <YAxis />
                    <Tooltip
                        itemStyle={{
                            color: fullConfig.theme.colors["tooltip-text"],
                            backgroundColor:
                                fullConfig.theme.colors["card-background"],
                        }}
                        contentStyle={{
                            backgroundColor:
                                fullConfig.theme.colors["card-background"],
                        }}
                    />

                    {/* <Area
                        type="monotone"
                        dataKey="apy"
                        name="APY"
                        fill="#50AF95"
                        stroke="#50AF95"
                    /> */}
                    <Area
                        dataKey="amountDeposit"
                        name={t("Amount Deposited")}
                        fill="#1C7EFF"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarLineGraph;
