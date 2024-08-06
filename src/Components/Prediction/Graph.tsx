import { useGetChainLinkFeed } from "@Hooks/useGetChainLinkFeed";
import LineChartLoaderSVG from "@Public/svgs/LineChartLoaderSVG";
import React, { useEffect } from "react";
import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Dot,
} from "recharts";
import resolveConfig from "tailwindcss/resolveConfig";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import tailwindConfig from "../../../tailwind.config";
import useSwiper from "./Card/hooks/useSwiper";

export const LineChartLoader: React.FC = () => {
    return (
        <div className="h-full relative">
            <LineChartLoaderSVG />
            <div className="absolute ml-auto mr-auto top-1/2 text-[#7A6EAA]  text-base left-0 right-0 text-center">
                Loading chart data...
            </div>
        </div>
    );
};

const ChainLinkGraph = ({ selectedAsset, setHoverData, data, setData }) => {
    const { data: priceFeed, loading } = useGetChainLinkFeed(selectedAsset);
    const fullConfig = resolveConfig(tailwindConfig);

    useEffect(() => {
        const price = priceFeed.map(info => {
            return {
                roundId: info.roundId,
                price: (info.price / 1e8).toFixed(4),
                timestamp: info.timestamp,
            };
        });
        setData(price);
    }, [priceFeed]);

    const chartColor = {
        gradient1: "#00E7B0",
        gradient2: "#0C8B6C",
        stroke: "#31D0AA",
    };

    if (loading) {
        return <LineChartLoader />;
    }

    return (
        <ResponsiveContainer>
            <AreaChart
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={chartColor.gradient1}
                            stopOpacity={0.34}
                        />
                        <stop
                            offset="100%"
                            stopColor={chartColor.gradient2}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={time => {
                        return new Date(time * 1000).toLocaleString("en-GB", {
                            hour: "numeric",
                            minute: "2-digit",
                        });
                    }}
                    color={fullConfig.theme.colors["show-chart"]}
                    fontSize="12px"
                    minTickGap={8}
                    reversed
                    tick={{ fill: fullConfig.theme.colors["show-chart"] }}
                />
                <YAxis
                    dataKey="price"
                    tickCount={6}
                    scale="linear"
                    color="#7A6EAA"
                    fontSize="12px"
                    domain={["auto", "auto"]}
                    orientation="right"
                    tick={{ dx: 10, fill: "#7A6EAA" }}
                />
                <Tooltip
                    cursor={{
                        stroke: "#7A6EAA",
                        strokeDasharray: "3 3",
                    }}
                    contentStyle={{ display: "none" }}
                    formatter={(_, __, props) => {
                        setHoverData(props.payload);
                    }}
                />
                <Area
                    dataKey="price"
                    type="linear"
                    stroke={chartColor.stroke}
                    fill="url(#gradient)"
                    strokeWidth={2}
                    activeDot={props => {
                        if (props.payload.roundId) {
                            return <ActiveDot {...props} />;
                        }
                        return null;
                    }}
                    dot={props => {
                        if (props.payload.roundId) {
                            return (
                                <Dot
                                    {...props}
                                    r={6}
                                    fill="#E59840"
                                    fillOpacity={1}
                                    strokeWidth={0}
                                />
                            );
                        }
                        return null;
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const ActiveDot = props => {
    const fullConfig = resolveConfig(tailwindConfig);
    const { currentRoundId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { swiper } = useSwiper();

    return (
        <Dot
            {...props}
            r={12}
            stroke={fullConfig.theme.colors["potential-text"]}
            strokeWidth={10}
            fill="#E59840"
            style={{ cursor: "pointer" }}
            onClick={() => {
                // eslint-disable-next-line react/destructuring-assignment
                swiper.slideTo(props.payload.roundId - currentRoundId + 3);
            }}
        />
    );
};

export default ChainLinkGraph;
