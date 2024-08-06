import React, { useState } from "react";
import ChainLinkGraph from "./Graph";

const ChainLinkChartSection = ({ selectedAsset }) => {
    const [hoverData, setHoverData] = useState({
        price: 0,
        roundId: 0,
        timestamp: 0,
    });
    const [data, setData] = useState([]);

    return (
        <div className="flex flex-col h-full sm:py-6 pb-[100px]">
            <div className="flex sm:gap-2 gap-1 items-center text-primary-200">
                <p className="text-primary-100 sm:text-2xl text-xl">
                    {hoverData?.price ? hoverData?.price : data[0]?.price}
                </p>
                <span className="sm:text-base text-sm">{`${selectedAsset}/USD`}</span>
                {hoverData.timestamp ? (
                    <span className=" sm:text-base text-xs whitespace-nowrap">
                        {new Date(hoverData?.timestamp * 1000).toLocaleString(
                            "en-GB",
                            {
                                year: "numeric",
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            }
                        )}
                    </span>
                ) : null}
                {hoverData?.roundId ? (
                    <div className="sm:text-base text-xs whitespace-nowrap">{`RoundID: #${hoverData.roundId}`}</div>
                ) : null}
            </div>
            <div
                className="sm:h-[300px] h-full"
                onMouseLeave={() =>
                    setHoverData({ price: 0, roundId: 0, timestamp: 0 })
                }
            >
                <ChainLinkGraph
                    selectedAsset={selectedAsset}
                    setHoverData={setHoverData}
                    data={data}
                    setData={setData}
                />
            </div>
        </div>
    );
};

export default ChainLinkChartSection;
