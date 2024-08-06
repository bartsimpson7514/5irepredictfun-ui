import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { rendererMin } from "@Components/Quests/questUtils";
import { Status } from "./consts";

interface ICardBodyPros {
    roundId?: number;
    status?: Status;
    price?: number;
    asset: string;
    closedPrice?: number;
    startPrice?: number;
    commitedAmount?: number;
    prizePool?: number;
    time?: string;
    currentPrice?: number;
    endTime?: number;
    startTime?: number;
    rewardAmount?: number;
    upPredictAmount?: number;
    downPredictAmount?: number;
    roundTime: number;
}

const LaterCardBody: React.FC<ICardBodyPros> = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <div className=" bg-primary-card-200 border border-card-section-border p-4 my-1">
            <div className="p-3 flex items-center flex-col">
                <div className="text-primary-100 text-hilight text-xs leading-4">
                    {t("Entry Starts in")}
                </div>
                <div className="text-primary-100 text-hilight text-2xl leading-4 mt-2 font-normal">
                    <Countdown
                        key={(
                            props.endTime * 1000 -
                            props.roundTime * 1000
                        ).toString()}
                        date={(props.endTime - props.roundTime) * 1000}
                        renderer={rendererMin}
                    />
                </div>
            </div>
        </div>
    );
};

export default LaterCardBody;
