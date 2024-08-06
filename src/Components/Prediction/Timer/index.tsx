import React from "react";
import Countdown from "react-countdown";
import TimerIcon from "public/svgs/TimerIcon.svg";
import { MARKET_STATUS } from "@Components/Constants";
import { formatTime } from "@Utils/time";

const Timer = ({ roundEndTime, marketState, roundTime }) => {
    const renderer = ({ days, hours, minutes, seconds }) => {
        return <span>{formatTime(days, hours, minutes, seconds)}</span>;
    };

    function convertTime(seconds) {
        if (seconds >= 86400) {
            // If the input is greater than or equal to 86400 (i.e. 24 hours),
            // divide by 86400 to get the number of days and return that with the
            // 'h' suffix
            const days = Math.floor(seconds / 86400);
            const remainingSeconds = seconds % 86400;
            if (remainingSeconds >= 3600) {
                const hours = Math.floor(remainingSeconds / 3600);
                return `${days}day ${hours}h`;
            }
            return `${days}day`;
        }
        if (seconds >= 3600) {
            // If the input is greater than or equal to 3600 (i.e. 1 hour),
            // divide by 3600 to get the number of hours and return that with the
            // 'h' suffix
            return `${(seconds / 3600).toFixed(0)}h`;
        }
        if (seconds >= 60) {
            // If the input is greater than or equal to 60 (i.e. 1 minute),
            // divide by 60 to get the number of minutes and return that with the
            // 'min' suffix
            return `${(seconds / 60).toFixed(0)}min`;
        }
        // Otherwise, return the input value with the 's' suffix
        return `${seconds}s`;
    }

    return (
        <div className="w-fit">
            <div className="flex items-center w-full p-3 bg-timer h-10 rounded-timer  gap-1">
                <TimerIcon />
                {marketState === MARKET_STATUS.PAUSED ? (
                    <span className="text-timer-text font-medium">-- / --</span>
                ) : (
                    <>
                        <span className="font-semibold text-xs sm:text-sm leading-4  text-timer-text">
                            {roundEndTime ? (
                                <span className="">
                                    <Countdown
                                        key={roundEndTime.toString()}
                                        date={roundEndTime}
                                        renderer={renderer}
                                    />
                                </span>
                            ) : (
                                <> -- </>
                            )}
                            {marketState === MARKET_STATUS.LIVE && <> /</>}
                        </span>
                        {marketState === MARKET_STATUS.LIVE && (
                            <span className="font-medium text-xs  leading-4 text-primary-200">
                                {roundEndTime ? (
                                    <>{convertTime(roundTime)}</>
                                ) : (
                                    <> -- </>
                                )}
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Timer;
