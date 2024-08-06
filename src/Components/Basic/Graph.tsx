import { toDecimals } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import {
    ValueType,
    NameType,
} from "recharts/src/component/DefaultTooltipContent";
/**
 * Define all colors for linear gradient with an id
 */
const GradientColors = () => {
    return (
        <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#50AF95" stopOpacity={1} />
            <stop offset="75%" stopColor="#50AF95" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
    );
};

const CustomTooltip = ({
    active,
    payload,
}: TooltipProps<ValueType, NameType>) => {
    const { t } = useTranslation();
    if (active) {
        return (
            <div className="p-2 bg-card-background text-primary-100 rounded-md">
                <div className=" text-base">
                    {`${t("Time")}: `}
                    <span className="text-sm">
                        {payload ? payload[0]?.payload.time : "---"}
                    </span>
                </div>
                <div className=" text-base">
                    {`${t("Price")}: `}
                    <span className="text-sm">
                        {payload
                            ? toDecimals(payload[0]?.payload.apy, 2)
                            : "---"}
                    </span>
                </div>
            </div>
        );
    }

    return null;
};

const LineGraph = ({ data, dataKey }) => {
    return (
        <div className="bg-card-background w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <GradientColors />
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        dataKey={dataKey}
                        name="APY"
                        type="monotone"
                        stroke="#50AF95"
                        strokeWidth={1}
                        strokeOpacity={1}
                        fill="url(#colorView)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineGraph;
