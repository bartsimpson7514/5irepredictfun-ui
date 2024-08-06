/* eslint-disable no-nested-ternary */
import React, { ReactElement, useEffect, useRef } from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import HeaderIcon from "@Components/Header/header-icon";
import { renderer } from "@Components/Quests/questUtils";
import { Status } from "./consts";

interface ICardHeaderProps {
    status?: Status;
    icon: ReactElement;
    epoch: number;
    time?: any;
    text?: string;
    currentRoundId?: number;
    isNextCardActive?: boolean;
    textIcon: String;
}

const CardHeader: React.FC<ICardHeaderProps> = ({ ...props }) => {
    const time = Number(props.time) * 1000;
    const infoReff = useRef(null);
    const { isDarkMode, flipCalculating } = useSelector(
        (state: AppState) => state.prediction
    );

    useEffect(() => {
        infoReff?.current?.goToAndStop(24, true);
    }, [isDarkMode]);

    return (
        <div
            className={`flex flex-row items-center whitespace-nowrap justify-between ${
                props.text === "Starts in"
                    ? "mt-6 mb-4 mx-3.5"
                    : props.text === "Closes in"
                    ? "px-4 mt-6 mb-4"
                    : "mx-4 mt-6 mb-4"
            } `}
        >
            <div className="flex items-center justify-center mt-">
                <HeaderIcon icon={props.icon} text={props.textIcon} />
            </div>
            <div className="text-primary-warning font-normal text-xs ml-1 mt-1 flex flex-row items-center">
                {!(
                    flipCalculating &&
                    Number(props.currentRoundId) + 1 === Number(props.epoch)
                ) && <div style={{ marginRight: "3px" }}>{props.text}</div>}
                {props.status !== "soon" &&
                    !(
                        flipCalculating &&
                        Number(props.currentRoundId) + 1 === Number(props.epoch)
                    ) && (
                        <span className="text-primary-100 ml-1 text-sm font-medium">
                            <Countdown
                                key={time.toString()}
                                date={time}
                                renderer={renderer}
                            />
                        </span>
                    )}
            </div>
            {Number(props.epoch) < Number(props.currentRoundId) ? (
                <div className=" text-xs text-heart-stroke-selected">
                    {`#${Number(props.epoch)}`}
                </div>
            ) : null}
        </div>
    );
};

export default CardHeader;
