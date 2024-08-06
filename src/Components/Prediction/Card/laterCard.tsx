import React from "react";
import IconLater from "public/assets/svgs/icon-later.svg";
import { INDICATOR_STATUS } from "@Constants";
import Card from "./card";
import CardHeader from "./card-header";
import LaterCardBody from "./later-card-body";
import { CardProps } from "./consts";
import RoundIndicatorUp from "./roundIndicatorUp";
import RoundIndicatorDown from "./roundIndicatorDown";

const LaterCard: React.FC<CardProps> = ({ ...props }) => {
    return (
        <>
            <Card isSoon>
                <CardHeader
                    status="soon"
                    epoch={props.roundId}
                    icon={<IconLater />}
                    textIcon="Later"
                />
                <div className="mx-4 mt-4 mb-4 z-100">
                    <RoundIndicatorUp option={INDICATOR_STATUS.LATER} />
                    <LaterCardBody
                        asset={props.selectedAsset}
                        status="soon"
                        time="2.30"
                        endTime={props.endTime}
                        roundId={props.roundId}
                        startTime={props.startTime}
                        roundTime={props.roundTime}
                    />
                    <RoundIndicatorDown option={INDICATOR_STATUS.LATER} />
                </div>
            </Card>
        </>
    );
};

export default LaterCard;
