import React, { useState } from "react";
import InfoIconLight from "public/animations/InfoIconLight.json";
import Lottie from "lottie-react";
import resolveConfig from "tailwindcss/resolveConfig";
import InfoIconDark from "public/animations/InfoIconDark.json";
import { INTEGRATIONS } from "@Constants";
import tailwindConfig from "../../../tailwind.config";

const TooltipAnswerHistory = ({ userData, option }) => {
    const [showMore, setShowMore] = useState(false);
    const fullConfig = resolveConfig(tailwindConfig);

    const ToolTipFundingPoolRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        onMouseEnter={() => setShowMore(true)}
                        onMouseLeave={() => setShowMore(false)}
                        style={{
                            width: "9px",
                            marginLeft: "3px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={InfoIconDark}
                        autoPlay
                        loop
                        onMouseEnter={() => setShowMore(true)}
                        onMouseLeave={() => setShowMore(false)}
                        style={{
                            width: "9px",
                            marginLeft: "3px",
                        }}
                    />
                );
            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        onMouseEnter={() => setShowMore(true)}
                        onMouseLeave={() => setShowMore(false)}
                        style={{
                            width: "9px",
                            marginLeft: "3px",
                        }}
                    />
                );
        }
    };

    return (
        <div className="relative cursor-pointer">
            {ToolTipFundingPoolRender()}
            {showMore && (
                <div className="-left-[15px] top-[22px]  z-[100] right-auto  absolute">
                    <div className="mx-auto container p-2  bg-tooltip-background rounded relative">
                        <p className=" text-xs leading-none text-tooltip-text pt-2 pb-2 max-w-[600px]">
                            <div className="flex gap-2 flex-wrap">
                                {userData.map((val, index) => (
                                    <>
                                        {val > 0 && (
                                            <div className="gap-2 flex items-center justify-between bg-[#393944] bg-opacity-50 rounded-[63px] px-3 py-1">
                                                <div className="text-primary-100 text-sm font-medium whitespace-nowrap break-words">
                                                    {option[index]}
                                                </div>
                                                <div className="text-primary-200 text-xs">
                                                    {`x${val}`}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </div>
                        </p>
                        <svg
                            className="absolute z-10 rotate-180 sm:right-auto sm:left-[14px] left-[14px] top-[-10px] "
                            width={16}
                            height={10}
                            viewBox="0 0 16 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 10L0 0L16 1.41326e-06L8 10Z"
                                fill={
                                    fullConfig.theme.colors[
                                        "tooltip-background"
                                    ]
                                }
                            />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TooltipAnswerHistory;
