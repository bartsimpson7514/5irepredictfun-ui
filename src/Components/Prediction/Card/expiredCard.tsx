import React from "react";
import IconExpired from "public/assets/svgs/icon-expired.svg";
import { CARD_STATUS, INDICATOR_STATUS } from "@Constants";
import { QuestState } from "@Components/Quests/constants";
import Card from "./card";
import CardHeader from "./card-header";
import { CardProps } from "./consts";
import RoundIndicatorUp from "./roundIndicatorUp";
import RoundIndicatorDown from "./roundIndicatorDown";
import ClaimOnCards from "./claim-on-cards";
import WinTag from "./winTag";
import ExpiredCardbody from "./expired-card-body";

const ExpiredCard: React.FC<CardProps> = ({ ...props }) => {
    const option = () => {
        if (Number(props.closedPrice) - Number(props.lastPrice) > 0) {
            return INDICATOR_STATUS.UP;
        }
        if (Number(props.closedPrice) - Number(props.lastPrice) === 0) {
            return INDICATOR_STATUS.TIE;
        }
        return INDICATOR_STATUS.DOWN;
    };

    return (
        <>
            <Card
                isExpired
                option={option()}
                rewardAmount={props.rewardGeneratedAmount}
            >
                <WinTag
                    closedPrice={props.closedPrice}
                    lastPrice={props.lastPrice}
                    userDownPredictAmt={props.userDownPredictAmt}
                    userUpPredictAmt={props.userUpPredictAmt}
                />
                <CardHeader
                    epoch={props.roundId}
                    icon={<IconExpired />}
                    textIcon={QuestState.EXPIRED}
                    status="soon"
                    currentRoundId={props.currentRoundId}
                />
                <div className="mx-4 mt-4 mb-4 z-100">
                    <RoundIndicatorUp
                        payout={props.upPayout}
                        option={option()}
                    />
                    <ExpiredCardbody
                        status={CARD_STATUS.EXPIRED}
                        closedPrice={props.closedPrice}
                        prizePool={props.prizePool}
                        currentPrice={props.currentPrice}
                        upPredictAmount={props.upPredictAmount}
                        downPredictAmount={props.downPredictAmount}
                        totalUpPredictAmount={props.upPredictAmount}
                        totalDownPredictAmount={props.downPredictAmount}
                        startPrice={props.lastPrice}
                    />
                    <RoundIndicatorDown
                        payout={props.downPayout}
                        option={option()}
                    />
                </div>
                <ClaimOnCards
                    rewardAmount={props.rewardGeneratedAmount}
                    roundId={props.roundId}
                />
            </Card>
        </>
    );
};

export default ExpiredCard;
