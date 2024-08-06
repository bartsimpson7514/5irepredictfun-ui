/* eslint-disable import/no-extraneous-dependencies */
import ChartIcon from "public/svgs/chart-icon.svg";
import HistoryIcon from "public/svgs/history-icon.svg";
import LeaderboardIcon from "public/svgs/leaderboard-icon.svg";
import React, { useRef, useState } from "react";
import Lottie from "lottie-react";
import Chart from "public/animations/ChartIcon.json";
import History from "public/animations/HistoryIcon.json";
import Leaderboard from "public/animations/LeaderboardIcon.json";
import Predict from "public/animations/PredictIcon.json";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import PredictIcon from "@Public/svgs/predict-icon.svg";
import { PREDICTION_SECTIONS, SUPPORTED_NETWORKS } from "@Components/Constants";

const MobileNavigation = ({
    onActionChange,
    onHideChart,
    tabView,
}: {
    onActionChange: (val: any) => void;
    onHideChart: (val: boolean) => void;
    tabView: any;
}) => {
    const networks: any = {};
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);

    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].forEach(element => {
        if (element.isActive) {
            networks[` ${element.chainId.toString()}`] = [element.networkName];
        }
    });
    const predictReff = useRef(null);
    const leaderboardReff = useRef(null);
    const historyReff = useRef(null);
    const chartReff = useRef(null);

    const selectedColor = () =>
        isDarkMode
            ? {
                  primaryColor: "#1C7EFF",
                  secondaryColor: "#FFFFFF",
              }
            : {
                  primaryColor: "#1C7EFF",
                  secondaryColor: "#BEDAFF",
              };

    const NonselectedColor = () =>
        isDarkMode
            ? {
                  primaryColor: "#9E9FA3",
                  secondaryColor: "#9E9FA3",
              }
            : {
                  primaryColor: "#9E9FA3",
                  secondaryColor: "#515151",
              };

    const [showChart, setShowChart] = useState(true);
    const MOBILE_NAVIGATION = [
        {
            name: PREDICTION_SECTIONS.PREDICT,
            title: "Predict",
            clickHandler: () => {
                onActionChange(PREDICTION_SECTIONS.PREDICT);
            },
            animationData: Predict,
            ref: predictReff,
            Icon: PredictIcon,
        },
        {
            name: PREDICTION_SECTIONS.CHART,
            title: "Chart",
            clickHandler: () => {
                setShowChart(!showChart);
                onActionChange(PREDICTION_SECTIONS.CHART);
                onHideChart(!showChart);
            },
            animationData: Chart,
            ref: chartReff,
            Icon: ChartIcon,
        },
        {
            name: PREDICTION_SECTIONS.HISTORY,
            title: "History",
            clickHandler: () => {
                onActionChange(PREDICTION_SECTIONS.HISTORY);
            },
            animationData: History,
            ref: historyReff,
            Icon: HistoryIcon,
        },
        {
            name: PREDICTION_SECTIONS.LEADERBOARD,
            title: "Leaderboard",
            clickHandler: () => {
                onActionChange(PREDICTION_SECTIONS.LEADERBOARD);
            },
            animationData: Leaderboard,
            ref: leaderboardReff,
            Icon: LeaderboardIcon,
        },
    ];
    return (
        <div className="flex justify-around z-50 gap-12 dark:bg-gray-200 bg-white py-2.5 px-8 absolute bottom-0 w-full left-0 right-0 ">
            {React.Children.toArray(
                MOBILE_NAVIGATION.map(
                    ({
                        clickHandler,
                        name,
                        animationData,
                        ref,
                        Icon,
                        title,
                    }) => {
                        return (
                            <div
                                role="none"
                                onClick={clickHandler}
                                className="flex items-center flex-col justify-center cursor-pointer"
                            >
                                {tabView === name ? (
                                    <Lottie
                                        animationData={animationData}
                                        lottieRef={ref}
                                        autoPlay
                                        style={{
                                            width: "16px",
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        className="w-4 h-4"
                                        fill={
                                            tabView === name
                                                ? selectedColor()
                                                : NonselectedColor()
                                        }
                                    />
                                )}

                                <div
                                    className={` mt-1.5 text-sm ${
                                        tabView === name
                                            ? "text-primary"
                                            : "dark:text-primary-100 text-primary-100"
                                    }`}
                                    style={{ lineHeight: "14px" }}
                                >
                                    {title}
                                </div>
                                {tabView === name && (
                                    <div
                                        className="bg-footer-text w-6 absolute bottom-0"
                                        style={{ height: "3px" }}
                                    />
                                )}
                            </div>
                        );
                    }
                )
            )}
        </div>
    );
};

export default MobileNavigation;
