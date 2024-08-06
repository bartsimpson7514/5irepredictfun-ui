import React, { useEffect, useRef, useState } from "react";
import { AppState } from "@Redux";
import Lottie from "lottie-react";
import Up from "public/animations/Up.json";
import Down from "public/animations/Down.json";
import { useSelector } from "react-redux";
import { INDICATOR_STATUS } from "@Constants";
import { initialPredictableToken, toDecimals } from "@Utils";
import CarouselRightArrow from "@Public/svgs/carousel-right-arrow.svg";
import { assetsIconRender } from "@Utils/iconRender";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useTranslation } from "react-i18next";

interface VaultActivityTableProps {
    graphData: any;
}

const VaultActivityTable: React.FC<VaultActivityTableProps> = ({
    graphData,
}) => {
    const upReff = useRef(null);
    const downReff = useRef(null);
    const { isDarkMode, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const [selectedOption, setSelectedOption] = useState(0);
    const [maxOptions, setMaxOptions] = useState(0);
    const [showData, setShowData] = useState([]);
    const numberToShow = 5;
    const [loading, setLoading] = useState(true);
    const token = initialPredictableToken(selectedChainId);
    useEffect(() => {
        setMaxOptions(
            graphData ? Math.ceil(graphData.length / numberToShow) : 0
        );
    }, [graphData]);

    useEffect(() => {
        if (graphData) {
            setShowData(
                graphData.slice(
                    selectedOption * numberToShow,
                    selectedOption * numberToShow + numberToShow
                )
            );
        }
    }, [selectedOption, graphData]);

    const listHeader = [
        "Round ID",
        "Asset type",
        "Commit Type",
        "Commit amount",
        "Results",
        "Earnings",
    ];
    const { t } = useTranslation();
    useEffect(() => {
        upReff?.current?.goToAndStop(45, true);
        downReff?.current?.goToAndStop(45, true);
    }, [isDarkMode]);

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    const returnTextColor = results => {
        if (results === "WON") {
            return "text-primary-success";
        }
        if (results === "LOST") {
            return "text-down";
        }
        return "text-primary-100";
    };

    useEffect(() => {
        if (graphData) {
            setLoading(false);
        }
    }, [graphData]);

    const returnCommitType = commitType => {
        if (commitType === INDICATOR_STATUS.UP) {
            return (
                <div className="flex flex-row items-center px-1 py-1 w-fit rounded-sm bg-up">
                    <Lottie
                        animationData={Up}
                        lottieRef={upReff}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(upReff)}
                        onMouseLeave={() => onMouseLeave(upReff, 45)}
                        style={{
                            width: "8px",
                        }}
                    />
                    <span className="font-medium text-xs text-entered-text ml-1">
                        {t("UP")}
                    </span>
                </div>
            );
        }
        return (
            <div
                className={`flex flex-row items-center px-1 py-1 w-fit bg-down rounded-sm `}
            >
                <Lottie
                    animationData={Down}
                    lottieRef={downReff}
                    autoPlay
                    loop
                    onMouseEnter={() => onMouseEnter(downReff)}
                    onMouseLeave={() => onMouseLeave(downReff, 45)}
                    style={{
                        width: "8px",
                    }}
                />
                <span className="font-medium text-xs text-entered-text  ml-1">
                    {t("DOWN")}
                </span>
            </div>
        );
    };

    return (
        <>
            {loading && (
                <div className="h-40">
                    <QuickSwapLoader />
                </div>
            )}
            {!loading && (
                <div className=" md:rounded-t">
                    {graphData && graphData.length !== 0 ? (
                        <>
                            <div className="overflow-scroll hidden sm:block sm:p-6 p-4 bg-card-background rounded-xl">
                                <table className="table-auto w-full  rounded-t table-spacing border-separate">
                                    <thead className="border-b-[0.5px] border-gray-200">
                                        <tr className=" w-full">
                                            {React.Children.toArray(
                                                listHeader.map(item => (
                                                    <th className="border-b border-primary-200 text-primary-200 text-left px-6 pb-3 font-medium text-sm leading-6">
                                                        {t(item)}
                                                    </th>
                                                ))
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {React.Children.toArray(
                                            showData?.map(item => (
                                                <tr className="">
                                                    <td className=" text-primary-200 text-base px-6 py-5 font-medium">
                                                        {`#${item.roundId}`}
                                                    </td>
                                                    <td className=" text-primary-200 text-base font-medium px-2 py-5      flex items-center justify-center gap-2">
                                                        {assetsIconRender(
                                                            item.assetType,
                                                            "h-8 w-8 sm:block hidden"
                                                        )}
                                                        {item.assetType}
                                                    </td>
                                                    <td className=" text-primary-200 text-base px-6 py-5 font-medium">
                                                        {returnCommitType(
                                                            item.commitType
                                                        )}
                                                    </td>
                                                    <td className=" text-primary-200 text-base px-6 py-5 font-medium whitespace-nowrap">
                                                        {`${toDecimals(
                                                            item.commitAmount
                                                        )} ${token}`}
                                                    </td>
                                                    <td
                                                        className={`text-base px-6 py-5 font-medium ${returnTextColor(
                                                            item.results
                                                        )}`}
                                                    >
                                                        {t(item.results)}
                                                    </td>
                                                    <td
                                                        className={` text-base px-6 py-5 font-medium whitespace-nowrap ${
                                                            item.results ===
                                                            "WON"
                                                                ? "text-primary-success"
                                                                : "text-primary-100"
                                                        }`}
                                                    >
                                                        {item.results ===
                                                            "NOT STARTED" ||
                                                        item.results === "LOST"
                                                            ? "-"
                                                            : `${toDecimals(
                                                                  item.earnings
                                                              )}
                                            ${token}`}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col gap-6 sm:hidden">
                                {React.Children.toArray(
                                    showData?.map(item => (
                                        <div className="p-4 bg-card-background  mb-2 flex flex-col gap-6 rounded-lg">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="">
                                                    <h1 className="text-sm leading-4 text-primary-100 text-ellipsis">
                                                        {`#${item.roundId}`}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[0].toString()}
                                                    </h2>
                                                </div>
                                                <div className="flex flex-col gap-0.5 items-start justify-start">
                                                    <h1 className="text-sm leading-4 text-primary-100 flex items-center justify-center">
                                                        {assetsIconRender(
                                                            item.assetType,
                                                            "h-8 w-8 sm:block hidden"
                                                        )}
                                                        {item.assetType}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[1].toString()}
                                                    </h2>
                                                </div>
                                                <div className="">
                                                    <h1 className="text-sm leading-4 text-primary-100 text-ellipsis">
                                                        {returnCommitType(
                                                            item.commitType
                                                        )}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[2].toString()}
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h1 className="text-sm leading-4 text-primary-100 sm:whitespace-nowrap">
                                                        {`${toDecimals(
                                                            item.commitAmount
                                                        )} ${token}`}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[3].toString()}
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h1
                                                        className={`text-sm leading-4 text-primary-100 ${returnTextColor(
                                                            item.results
                                                        )}`}
                                                    >
                                                        {item.results}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[4].toString()}
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h1
                                                        className={`text-sm  leading-4 ${
                                                            item.results ===
                                                                "NOT STARTED" ||
                                                            item.results ===
                                                                "LOST"
                                                                ? "text-primary-100"
                                                                : "text-up"
                                                        }`}
                                                    >
                                                        {item.results ===
                                                            "NOT STARTED" ||
                                                        item.results === "LOST"
                                                            ? "-"
                                                            : `${toDecimals(
                                                                  item.earnings
                                                              )}
                                            ${token}`}
                                                    </h1>
                                                    <h2 className="text-xs font-medium text-primary-200">
                                                        {listHeader[5].toString()}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-end mt-2 text-primary-100 text-highlight">
                                <button
                                    type="button"
                                    className=" z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
                                    onClick={() => {
                                        setSelectedOption(
                                            selectedOption > 0
                                                ? (selectedOption - 1) %
                                                      maxOptions
                                                : maxOptions - 1
                                        );
                                    }}
                                >
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-footer-text dark:bg-primary">
                                        <CarouselRightArrow />
                                        <span className="sr-only">
                                            {t("Previous")}
                                        </span>
                                    </span>
                                </button>
                                <div className="text-sm">
                                    {`${selectedOption + 1} / ${maxOptions}`}
                                </div>
                                <button
                                    type="button"
                                    className=" z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
                                    onClick={() => {
                                        setSelectedOption(
                                            (selectedOption + 1) % maxOptions
                                        );
                                    }}
                                >
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-footer-text dark:bg-primary">
                                        <CarouselRightArrow className="rotate-180" />
                                        <span className="sr-only">
                                            {t("Next")}
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col">
                            <span className="leading-5 font-bold  text-primary-200 ">
                                {t("No Vault Transactions")}
                            </span>
                            <span className="text-sm leading-6 text-primary-200 flex flex-col gap-4">
                                {t(
                                    "Vault has not made any vault transactions yet"
                                )}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default VaultActivityTable;
