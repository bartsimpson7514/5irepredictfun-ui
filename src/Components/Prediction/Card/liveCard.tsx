import React, { useEffect, useState } from "react";
import IconLive from "public/assets/svgs/icon-live.svg";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import { CARD_STATUS, INDICATOR_STATUS } from "@Constants";
import Card from "./card";
import CardHeader from "./card-header";
import { CardProps } from "./consts";
import RoundIndicatorUp from "./roundIndicatorUp";
import RoundIndicatorDown from "./roundIndicatorDown";
import LiveCardbody from "./live-card-body";
import EnterTag from "./enter-tag";

const LiveCard: React.FC<CardProps> = ({ ...props }) => {
    const [option, setOption] = useState("");
    const { selectedAsset } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();

    useEffect(() => {
        const movement = () => {
            if (Number(props.currentPrice) - Number(props.startPrice) > 0) {
                return INDICATOR_STATUS.UP;
            }
            if (Number(props.currentPrice) - Number(props.startPrice) === 0) {
                return INDICATOR_STATUS.TIE;
            }
            return INDICATOR_STATUS.DOWN;
        };
        const move = movement();
        setOption(move);
    }, [props.currentPrice, selectedAsset, props.startPrice]);

    return (
        <>
            <Card isLive option={option}>
                <EnterTag
                    upPredictAmount={Number(props.userUpPredictAmt)}
                    downPredictAmount={Number(props.userDownPredictAmt)}
                    cardType="live"
                />
                <CardHeader
                    epoch={props.roundId}
                    icon={<IconLive />}
                    text={t("Closes in")}
                    textIcon={CARD_STATUS.LIVE}
                    time={props.endTime}
                    status="live"
                />
                <div className="px-[18px] mt-4 mb-6 z-100">
                    <RoundIndicatorUp payout={props.upPayout} option={option} />
                    <LiveCardbody
                        closedPrice={props.closedPrice}
                        prizePool={props.prizePool}
                        startPrice={props.startPrice}
                        currentPrice={props.currentPrice}
                        totalUpPredictAmount={props.upPredictAmount}
                        totalDownPredictAmount={props.downPredictAmount}
                        upPredictAmount={props.userUpPredictAmt}
                        downPredictAmount={props.userDownPredictAmt}
                    />
                    <RoundIndicatorDown
                        payout={props.downPayout}
                        option={option}
                    />
                </div>
            </Card>
        </>
    );
};

export default LiveCard;
