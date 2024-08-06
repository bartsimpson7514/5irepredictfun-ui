import { useMarkets } from "@Hooks/useMarkets";
import React, { useState } from "react";

import { Transition } from "@headlessui/react";

import { useTranslation } from "react-i18next";
import { formatQuestion } from "./questhelpers";
import RenderResolutionSection from "./resolutionSection";

const ResolveQuestionForm = () => {
    const [claimed, setClaimed] = useState(false);
    const { marketsByCategory: allMarketData } = useMarkets(
        "All Markets",
        claimed
    );

    const isActive = true;
    const { t } = useTranslation();
    const tableHeader = ["MarketId", "MarketQuestion", "State", "Resolution"];

    return (
        <div className="overflow-hidden md:rounded-t">
            <table className="table-auto w-full  rounded-t table-spacing border-separate">
                <thead>
                    <tr className="bg-section-blue w-full">
                        {React.Children.toArray(
                            tableHeader.map(item => (
                                <th className=" text-primary-200 text-left px-6 py-3 font-medium text-sm leading-4">
                                    {item}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                {allMarketData && (
                    <tbody>
                        {React.Children.toArray(
                            allMarketData.map(item => {
                                return (
                                    <>
                                        <tr
                                            tabIndex={0}
                                            className="rounded-[10px] text-sm transition-all text-primary-100 justify-start items-start bg-gray-300 h-[76px] "
                                        >
                                            <td className=" text-primary-200 text-sm px-6 py-5 leading-4 font-medium">
                                                {item.id}
                                            </td>
                                            <td className=" text-primary-200 text-sm px-6 py-5 leading-4 font-medium">
                                                {formatQuestion(item.title)}
                                            </td>
                                            <td className=" text-primary-200 text-sm px-6 py-5 leading-4 font-medium">
                                                {/* {getMarketState(item)} */}
                                            </td>
                                            <td className=" text-primary-200 text-sm px-6 py-5 leading-4 font-medium">
                                                {/* {getMarketState(item) ===
                                                    questState.RESOLVE && (
                                                    <span className="text-primary-white font-medium text-base">
                                                        Resolve Market
                                                    </span>
                                                )}
                                                {getMarketState(item) ===
                                                    questState.CLOSE && (
                                                    <span className="text-primary-white font-medium text-base">
                                                        Close Market
                                                    </span>
                                                )} */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <Transition
                                                    show={isActive}
                                                    enter="duration-500 ease-out"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="duration-300 ease-in"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                    style={{ width: "100%" }}
                                                    className="w-full -translate-y-2"
                                                >
                                                    {isActive && (
                                                        <div className="flex transition-all w-full items-center justify-center bg-history-section rounded-b-xl">
                                                            <div
                                                                className="accordion-content mb-6 w-full px-[2px]  text-primary-100 text-sm  flex flex-col gap-4"
                                                                style={{
                                                                    lineHeight:
                                                                        "25.2px",
                                                                }}
                                                            >
                                                                {React.Children.toArray(
                                                                    item.markets.map(
                                                                        market => (
                                                                            <div className="flex flex-row justify-between  items-center px-4">
                                                                                <div>
                                                                                    <span className="text-primary-100 text-sm font-normal">
                                                                                        {`${market.marketId}. `}
                                                                                    </span>
                                                                                    <span className="text-primary-100 text-sm font-normal flex flex-col">
                                                                                        {formatQuestion(
                                                                                            market.question
                                                                                        )}
                                                                                        <a
                                                                                            href={`${market.link}`}
                                                                                            className="text-primary-blue underline"
                                                                                        >
                                                                                            {t(
                                                                                                "reality"
                                                                                            )}
                                                                                        </a>
                                                                                    </span>
                                                                                </div>

                                                                                <RenderResolutionSection
                                                                                    marketid={
                                                                                        market.id
                                                                                    }
                                                                                    marketState={
                                                                                        market.state
                                                                                    }
                                                                                    setClaimed={
                                                                                        setClaimed
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Transition>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default ResolveQuestionForm;
