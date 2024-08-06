import React from "react";
import IconCalculating from "public/assets/svgs/icon-calculating.svg";
import Lottie from "lottie-react";
import Calculating from "public/animations/Calculating.json";
import IconLive from "@Public/assets/svgs/icon-live.svg";
import { useTranslation } from "react-i18next";
import Card from "./card";
import CardHeader from "./card-header";
import { CardProps } from "./consts";

const CalculatingCard: React.FC<CardProps> = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <>
            <Card>
                <CardHeader
                    epoch={props.roundId}
                    icon={
                        props.isNextCardActive ? (
                            <IconCalculating />
                        ) : (
                            <IconLive />
                        )
                    }
                    textIcon={
                        props.isNextCardActive
                            ? t("CALCULATING")
                            : t("Going to Live")
                    }
                    status="soon"
                />
                <div className="mb-40" style={{ marginTop: "110px" }}>
                    <div className="flex items-center justify-center">
                        <Lottie
                            animationData={Calculating}
                            autoPlay
                            loop
                            style={{
                                width: "60px",
                            }}
                        />
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CalculatingCard;
