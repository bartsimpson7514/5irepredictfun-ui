import React, { useEffect, useState } from "react";
import IconNext from "public/assets/svgs/icon-next.svg";
import ReactCardFlip from "react-card-flip";
import IconBack from "public/assets/svgs/icon-back.svg";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { t } from "i18next";
import LoadingIcon from "@Public/svgs/loading.svg";
import IconLive from "@Public/assets/svgs/icon-live.svg";
import { useWeb3React } from "@web3-react/core";
import { getLastPrice } from "@Utils/priceFeed";
import { initialPredictableToken } from "@Utils";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import Card from "./card";
import CardHeader from "./card-header";
import CardBuyHeader from "./card-buy-header";
import CardBuybody from "./card-buy-body-quickswap";
import CardBuyButton from "./card-buy-button";
import { CardProps } from "./consts";
import RoundIndicatorUp from "./roundIndicatorUp";
import RoundIndicatorDown from "./roundIndicatorDown";
import EnterTag from "./enter-tag";
import UpcomingCardbody from "./card-body-upcoming";

const UpcomingCard: React.FC<CardProps> = ({ ...props }) => {
    const { library } = useWeb3React();
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState("UP");
    const [value, setValue] = useState("");
    const fullConfig = resolveConfig(tailwindConfig);

    const handleFlip = (move: any) => {
        setIsFlipped(!isFlipped);
        setDirection(move);
    };
    const { isPredicted, showCalculating, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const onChange = commitedAmount => {
        setValue(commitedAmount);
    };

    const [currentMaticPrice, setCurrentMaticPrice] = useState(0);
    const getCurrentPrice = async () => {
        const result: any = await getLastPrice(
            initialPredictableToken(selectedChainId),
            selectedChainId,
            library
        );
        if (!result) return 0;
        setCurrentMaticPrice(result.toFixed(2));
    };

    useEffect(() => {
        if (isFlipped) {
            setIsFlipped(!isFlipped);
        }
    }, [isPredicted, showCalculating]);

    useEffect(() => {
        getCurrentPrice();
        return () => {
            setCurrentMaticPrice(0);
        };
    }, []);

    return (
        <div className="">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card isNext>
                    <EnterTag
                        upPredictAmount={Number(props.userUpPredictAmt)}
                        downPredictAmount={Number(props.userDownPredictAmt)}
                        cardType="upcoming"
                    />

                    <CardHeader
                        epoch={props.roundId}
                        icon={
                            props.isNextCardActive ? (
                                <IconNext
                                    color={
                                        fullConfig.theme.colors[
                                            "cards-live-border"
                                        ]
                                    }
                                />
                            ) : (
                                <IconLive />
                            )
                        }
                        textIcon={
                            props.isNextCardActive
                                ? t("Next")
                                : t("Going to Live")
                        }
                        text={props.isNextCardActive ? t("Starts in") : ""}
                        time={props.startTime}
                        currentRoundId={props.currentRoundId}
                        isNextCardActive={props.isNextCardActive}
                    />
                    <div
                        className={`mx-4 mt-4  z-100 ${
                            props.isNextCardActive ? "mb-5" : "opacity-30 mb-4"
                        }`}
                    >
                        <RoundIndicatorUp payout={props.upPayout} />
                        <UpcomingCardbody
                            status="expired"
                            asset={props.selectedAsset}
                            prizePool={props.prizePool}
                            handleFlip={handleFlip}
                            totalUpPredictAmount={props.upPredictAmount}
                            totalDownPredictAmount={props.downPredictAmount}
                            upPredictAmount={props.userUpPredictAmt}
                            downPredictAmount={props.userDownPredictAmt}
                            isNextCardActive={props.isNextCardActive}
                            currentPrice={props.currentPrice}
                        />
                        <RoundIndicatorDown payout={props.downPayout} />
                        {!props.isNextCardActive && (
                            <div className="flex flex-row justify-center w-full mt-6">
                                <LoadingIcon className="animate-spin origin-center animate h-10 w-10" />
                            </div>
                        )}
                    </div>
                </Card>
                <Card isNext>
                    <CardBuyHeader
                        indicator={direction}
                        icon={
                            <IconBack className="text-primary-100 fill-primary-100" />
                        }
                        title={t("Set Position")}
                        setIsFlipped={setIsFlipped}
                        isFlipped={isFlipped}
                    />

                    <CardBuybody
                        onChange={onChange}
                        indicator={direction}
                        totalUpPredictAmount={props.upPredictAmount}
                        totalDownPredictAmount={props.downPredictAmount}
                        currentMaticPrice={currentMaticPrice}
                    />
                    <CardBuyButton
                        endTime={props.endTime}
                        indicator={direction}
                        predictvalue={value}
                        roundId={props.roundId}
                        currentMaticPrice={currentMaticPrice}
                    />
                </Card>
            </ReactCardFlip>
        </div>
    );
};

export default UpcomingCard;
