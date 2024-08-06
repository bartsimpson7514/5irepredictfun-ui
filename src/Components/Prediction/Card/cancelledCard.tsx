import React from "react";
import { INDICATOR_STATUS, USDC_DECIMAL } from "@Constants";
import IconCancelled from "@Public/assets/svgs/icon-cancelled.svg";
import RoundIndicatorDown from "./roundIndicatorDown";
import RoundIndicatorUp from "./roundIndicatorUp";
import { CardProps } from "./consts";
import CardHeader from "./card-header";
import Card from "./card";
import CancelledCardbody from "./cancelled-card-body";
import RefundUsers from "./refund-section";

const CancelledCard: React.FC<CardProps> = ({ ...props }) => {
    const committedAmount =
        props.userUpPredictAmt / USDC_DECIMAL +
        props.userDownPredictAmt / USDC_DECIMAL;

    return (
        <>
            <Card isCancelled rewardAmount={props.rewardGeneratedAmount}>
                <CardHeader
                    epoch={props.roundId}
                    icon={<IconCancelled />}
                    textIcon="Cancelled"
                    status="soon"
                />
                <div className="mx-4 mt-4 mb-4 z-100">
                    <RoundIndicatorUp
                        payout={props.upPayout}
                        option={INDICATOR_STATUS.LATER}
                    />
                    <CancelledCardbody
                        upPredictAmount={props.userUpPredictAmt}
                        downPredictAmount={props.downPredictAmount}
                    />
                    <RoundIndicatorDown
                        payout={props.downPayout}
                        option={INDICATOR_STATUS.LATER}
                    />
                </div>
                <RefundUsers
                    committedAmount={committedAmount}
                    roundId={props.roundId}
                />
            </Card>
        </>
    );
};

export default CancelledCard;
