/* eslint-disable import/no-extraneous-dependencies */
import HistoryIcon from "public/svgs/history-icon.svg";
import LeaderboardIcon from "public/svgs/leaderboard-icon.svg";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import Predict from "public/animations/Predict.json";
import Leaderboard from "public/animations/Leaderboard.json";
import History from "public/animations/History.json";
import { AppState } from "@Redux";
import PredictIcon from "@Public/svgs/predict-icon.svg";
import { handleGaEvent } from "@Utils/googleanalytics";
import { SUPPORTED_NETWORKS, PREDICTION_SECTIONS } from "@Components/Constants";

const Navigation = ({
    onActionChange,
    // onHideChart,
    tabView,
}: {
    onActionChange: (val: any) => void;
    // onHideChart: (val: boolean) => void;
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

    const selectedColor = () =>
        tabView === PREDICTION_SECTIONS.CARD
            ? {
                  primaryColor: "#FFFFFF",
                  secondaryColor: "#1C7EFF",
              }
            : {
                  primaryColor: "#FFFFFF",
                  secondaryColor: "#BEDAFF",
              };

    const NonselectedColor = () =>
        isDarkMode
            ? {
                  primaryColor: "#1C7EFF",
                  secondaryColor: "#BEDAFF",
              }
            : {
                  primaryColor: "#1C7EFF",
                  secondaryColor: "#FFFFFF",
              };

    useEffect(() => {
        predictReff && predictReff?.current?.goToAndStop(0, true);
    }, [tabView]);

    useEffect(() => {
        leaderboardReff && leaderboardReff?.current?.goToAndStop(0, true);
    }, [tabView]);

    useEffect(() => {
        historyReff && historyReff?.current?.goToAndStop(98, true);
    }, [tabView]);

    const onMouseEnter = ref => {
        ref && ref.current.play();
    };

    const onMouseLeave = (ref, frame) => {
        ref && ref.current.goToAndStop(frame, true);
    };

    const [showChart, setShowChart] = useState(true);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const [isHoveringHistory, setIsHoveringHistory] = useState(false);
    const [isHoveringLeaderboard, setIsHoveringLeaderboard] = useState(false);

    const handleMouseOver = card => {
        switch (card) {
            case "CARD":
                setIsHoveringCard(true);
                return;
            case "HISTORY":
                setIsHoveringHistory(true);
                return;
            case "LEADERBOARD":
                setIsHoveringLeaderboard(true);
                return;
            default:
                setIsHoveringCard(true);
        }
    };

    const handleMouseOut = card => {
        switch (card) {
            case "CARD":
                setIsHoveringCard(false);
                return;
            case "HISTORY":
                setIsHoveringHistory(false);
                return;
            case "LEADERBOARD":
                setIsHoveringLeaderboard(false);
                return;
            default:
                setIsHoveringCard(false);
        }
    };

    return (
        <div className="flex justify-between gap-6">
            {tabView === PREDICTION_SECTIONS.CARD ? (
                <div
                    role="none"
                    title="Predict"
                    onClick={() => {
                        setShowChart(!showChart);
                        onActionChange(PREDICTION_SECTIONS.CARD);
                        // onHideChart(!showChart);
                    }}
                    className="p-3 rounded-full cursor-pointer border-2 bg-footer-text dark:border-primary-300 border-secondary-gray"
                >
                    <PredictIcon
                        className="w-6 h-6"
                        fill={
                            tabView === PREDICTION_SECTIONS.CARD
                                ? selectedColor()
                                : NonselectedColor()
                        }
                    />
                </div>
            ) : (
                <div
                    role="none"
                    title="Predict"
                    onClick={() => {
                        setShowChart(!showChart);
                        onActionChange(PREDICTION_SECTIONS.CARD);
                        handleMouseOut("CARD");
                        // onHideChart(!showChart);
                    }}
                    onMouseEnter={() => handleMouseOver("CARD")}
                    onMouseLeave={() => handleMouseOut("CARD")}
                >
                    {isHoveringCard ? (
                        <Lottie
                            animationData={Predict}
                            lottieRef={predictReff}
                            autoPlay
                            loop
                            onMouseEnter={() => onMouseEnter(predictReff)}
                            onMouseLeave={() => onMouseLeave(predictReff, 0)}
                            style={{
                                width: "52px",
                            }}
                        />
                    ) : (
                        <div
                            role="none"
                            title="Predict"
                            className="p-3 rounded-full cursor-pointer border-2 dark:border-primary-300 bg-primary-300 dark:bg-gray-300 border-secondary-gray"
                        >
                            <PredictIcon
                                className="w-6 h-6"
                                fill={
                                    tabView === PREDICTION_SECTIONS.CARD
                                        ? selectedColor()
                                        : NonselectedColor()
                                }
                            />
                        </div>
                    )}
                </div>
            )}
            {tabView === PREDICTION_SECTIONS.HISTORY ? (
                <div
                    role="none"
                    title="History"
                    onClick={() => {
                        handleGaEvent("HISTORY CLICKED");
                        onActionChange(PREDICTION_SECTIONS.HISTORY);
                    }}
                    className={`p-3 rounded-full cursor-pointer border-2 ${
                        tabView === PREDICTION_SECTIONS.HISTORY
                            ? "bg-footer-text dark:bg-footer-text  dark:border-primary border-secondary-gray"
                            : "dark:border-primary-300 bg-primary-300 dark:bg-gray-300 border-secondary-gray"
                    }`}
                >
                    <HistoryIcon
                        className="w-6 h-6"
                        fill={
                            tabView === PREDICTION_SECTIONS.HISTORY
                                ? selectedColor()
                                : NonselectedColor()
                        }
                    />
                </div>
            ) : (
                <div
                    role="none"
                    title="History"
                    onClick={() => {
                        handleGaEvent("HISTORY CLICKED");
                        onActionChange(PREDICTION_SECTIONS.HISTORY);
                        handleMouseOut("HISTORY");
                    }}
                    onMouseEnter={() => handleMouseOver("HISTORY")}
                    onMouseLeave={() => handleMouseOut("HISTORY")}
                >
                    {isHoveringHistory ? (
                        <Lottie
                            animationData={History}
                            lottieRef={historyReff}
                            autoPlay
                            loop
                            onMouseEnter={() => onMouseEnter(historyReff)}
                            onMouseLeave={() => onMouseLeave(historyReff, 98)}
                            style={{
                                width: "52px",
                            }}
                        />
                    ) : (
                        <div
                            role="none"
                            title="History"
                            className="p-3 rounded-full cursor-pointer border-2 dark:border-primary-300 bg-primary-300 dark:bg-gray-300 border-secondary-gray"
                        >
                            <HistoryIcon
                                className="w-6 h-6"
                                fill={NonselectedColor()}
                            />
                        </div>
                    )}
                </div>
            )}
            {tabView === PREDICTION_SECTIONS.LEADERBOARD ? (
                <div
                    role="none"
                    title="Leaderboard"
                    onClick={() => {
                        onActionChange(PREDICTION_SECTIONS.LEADERBOARD);
                        handleGaEvent("LEADERBOARD CLICKED");
                    }}
                    className={`p-3 rounded-full cursor-pointer border-2 ${
                        tabView === PREDICTION_SECTIONS.LEADERBOARD
                            ? "bg-footer-text dark:bg-footer-text  dark:border-primary border-secondary-gray"
                            : "dark:border-primary-300 bg-primary-300 dark:bg-dark-blu border-secondary-gray"
                    }`}
                >
                    <LeaderboardIcon
                        className="w-6 h-6"
                        fill={
                            tabView === PREDICTION_SECTIONS.LEADERBOARD
                                ? selectedColor()
                                : NonselectedColor()
                        }
                    />
                </div>
            ) : (
                <div
                    role="none"
                    title="Leaderboard"
                    onClick={() => {
                        handleGaEvent("LEADERBOARD CLICKED");
                        onActionChange(PREDICTION_SECTIONS.LEADERBOARD);

                        handleMouseOut("LEADERBOARD");
                    }}
                    onMouseEnter={() => handleMouseOver("LEADERBOARD")}
                    onMouseLeave={() => handleMouseOut("LEADERBOARD")}
                >
                    {isHoveringLeaderboard ? (
                        <Lottie
                            animationData={Leaderboard}
                            lottieRef={leaderboardReff}
                            autoPlay
                            loop
                            onMouseEnter={() => onMouseEnter(leaderboardReff)}
                            onMouseLeave={() =>
                                onMouseLeave(leaderboardReff, 0)
                            }
                            style={{
                                width: "52px",
                            }}
                        />
                    ) : (
                        <div
                            role="none"
                            title="Leaderboard"
                            className="p-3 rounded-full cursor-pointer border-2 dark:border-primary-300 bg-primary-300 dark:bg-gray-300 border-secondary-gray"
                        >
                            <LeaderboardIcon
                                className="w-6 h-6"
                                fill={NonselectedColor()}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navigation;
