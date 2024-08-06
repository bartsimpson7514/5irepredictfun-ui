import React from "react";
import IconLive from "@Public/assets/svgs/icon-live.svg";
import Card from "./card";
import CardHeader from "./card-header";
import InfoCardBody from "./info-card-body";

const InfoCard = ({ ...props }) => {
    return (
        <>
            <Card isNext>
                <CardHeader
                    epoch={props.roundId}
                    icon={<IconLive />}
                    textIcon="Going to Live"
                    status="soon"
                />
                <div className="mb-40" style={{ marginTop: "110px" }}>
                    <div className="flex items-center justify-center">
                        <InfoCardBody
                            asset={props.selectedAsset}
                            status="soon"
                            time="2.30"
                            endTime={props.round.roundEndTimestamp}
                            roundId={props.round.roundId}
                            startTime={props.round.roundStartTimestamp}
                            roundTime={props.roundTime}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
};

export default InfoCard;
