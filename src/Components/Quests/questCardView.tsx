import HeartIcon from "@Public/svgs/heart.svg";
import ShareIcon from "@Public/svgs/share.svg";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { useUserMarkets } from "@Hooks/useUserMarkets";
import { shortenName, toDecimals } from "@Utils";
import InfoIconLight from "public/animations/InfoIconLight.json";
import { handleGaEvent } from "@Utils/googleanalytics";
import ArrowQuestRight from "@Public/svgs/ArrowQuestRight.svg";
import ReactTooltip from "react-tooltip";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import resolveConfig from "tailwindcss/resolveConfig";
import InfoIconDark from "public/animations/InfoIconDark.json";
import { INTEGRATIONS } from "@Constants";
import { checkBlackListInprogressQuest } from "@Constants/blackListedQuest";
import { formatDate, fromWei, getTotalBetUserAmount } from "./questhelpers";
import { QuestState } from "./constants";
import ClaimOnQuestCards from "./claim-on-quest-card";
import {
    categoryRender,
    renderer,
    returnMarketState,
    returnStateText,
    tagRender,
    tagStatus,
} from "./questUtils";
import tailwindConfig from "../../../tailwind.config";

const QuestCardView = ({
    market,
    onFavorited,
    favorites,
    predictionEndtimeStamp,
}) => {
    const { account, library } = useWeb3React();
    const fullConfig = resolveConfig(tailwindConfig);

    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    const [isFavorited, setIsFavorited] = useState(false);

    const { userMarketData } = useUserMarkets();
    const toggleWalletModal = useWalletModalToggle();

    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const userData = userMarketData.filter(data => data.quest.id === market.id);

    const totalUserBetAmount = userData.length
        ? getTotalBetUserAmount(market.questId, userData[0])
        : 0;

    const singleDayTimeStamp = 86400;
    const Tokens = [
        {
            label: "MATIC",
            description: "MATIC",
            subDescription: "",
            icon: "MATIC.png",
            isNew: false,
        },

        // {
        //     label: "BGL",
        //     description: "BGL",
        //     icon: "bhavish-lossless-chip.png",
        // },

        {
            label: "BGN",
            description: "BGN",
            subDescription: "Capital Protected",
            icon: "bhavish-lossless-chip.png",
            isNew: true,
        },
        {
            label: "BNB",
            description: "BNB",
            subDescription: "",
            icon: "BNB.png",
            isNew: false,
        },
    ];
    const selectedToken = Tokens.filter(
        token => token.label === predictableToken
    );

    const state = returnStateText(market);
    const expiry = formatDate(Number(predictionEndtimeStamp));

    const data = {
        tag: tagStatus(userData),
        category: market.category,
        isFavourite: true,
        state,
        title: market.title,
        image: market.image,
        fundingPool: market.balance,
        commitAmt: userData.length ? userData[0]?.betAmount : 0,
        expiry,
        currency: predictableToken,
        noQuestion: market.markets.length,
        marketState: returnMarketState(market),
        participants: market?.users?.length,
        totalBetAmont: userData.length ? totalUserBetAmount : 0,
    };

    const setFavorite = (event: any) => {
        event.stopPropagation();
        if (!account) {
            toggleWalletModal();
        } else {
            setIsFavorited(prevState => !prevState);
            onFavorited(!isFavorited, market);
        }
    };

    const ToolTipRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={InfoIconDark}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );
            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );
        }
    };

    return (
        <div className="bg-vault-card relative cursor-pointer rounded-[10px] border border-vault-card-border h-min-[304px] w-full sm:w-[376px]">
            <Link
                href={{
                    pathname: `/quests/${market.id}}`,
                    query: {
                        marketid: market.id,
                        inresolution:
                            formatDate(Number(market.closesAtTimestamp)) ===
                                "-" && market.resolved === null,
                        ended: data.marketState.text === QuestState.ENDED,
                        expired: market.resolved,
                        startsin:
                            currentTimestamp <
                                market.predictionStartTimestamp &&
                            !market.resolved,
                        answered: data.tag === "ENTERED",
                    },
                }}
                onClick={() => {
                    handleGaEvent(`market ${data.marketState.text}`);
                }}
                key={market.id}
            >
                <div className=" w-full h-min-[304px]">
                    {data.tag && tagRender(data.tag, t)}
                    <div className="px-4">
                        {!(
                            data.marketState.text === QuestState.LIVE ||
                            data.marketState.text === QuestState.UPCOMING
                        ) && (
                            <div
                                className={`absolute ${
                                    data.marketState.text ===
                                        QuestState.INRESOLUTION ||
                                    QuestState.EXPIRED
                                        ? "top-0 right-0"
                                        : "top-0 left-0"
                                } text-primary-300 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium`}
                            >
                                <span
                                    className={`text-xs font-normal ${data.marketState.color}`}
                                >
                                    {t(data.marketState.text)}
                                </span>
                                {data.marketState.text === QuestState.ENDED && (
                                    <div className="text-primary-warning text-sm font-medium">
                                        <Countdown
                                            key={market.closesAtTimestamp}
                                            date={
                                                market.closesAtTimestamp * 1000
                                            }
                                            renderer={renderer}
                                        />
                                    </div>
                                )}
                                {data.marketState.text ===
                                    QuestState.INRESOLUTION && (
                                    <>
                                        {currentTimestamp >
                                        Number(market.closesAtTimestamp) +
                                            Number(singleDayTimeStamp) ? (
                                            <div>
                                                <div
                                                    data-tip="The team is working to resolve the Quest"
                                                    data-for="toolTipClosedPrice"
                                                    data-place="bottom"
                                                >
                                                    {ToolTipRender()}
                                                </div>
                                                <div>
                                                    <ReactTooltip
                                                        id="toolTipClosedPrice"
                                                        effect="solid"
                                                        class="text-center w-36 text-sm justify-center absolute z-100"
                                                        backgroundColor={
                                                            fullConfig.theme
                                                                .colors[
                                                                "tooltip-background"
                                                            ]
                                                        }
                                                        textColor={
                                                            fullConfig.theme
                                                                .colors[
                                                                "tooltip-text"
                                                            ]
                                                        }
                                                        multiline
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-primary-300 text-sm font-medium">
                                                <Countdown
                                                    key={
                                                        market.closesAtTimestamp
                                                    }
                                                    date={
                                                        (Number(
                                                            market.closesAtTimestamp
                                                        ) +
                                                            Number(
                                                                singleDayTimeStamp
                                                            )) *
                                                        1000
                                                    }
                                                    renderer={renderer}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        <div className="absolute gap-1 top-0 right-0 flex items-center my-1 mx-4">
                            {checkBlackListInprogressQuest(
                                predictableToken,
                                Number(market.id)
                            ) ? null : (
                                <>
                                    <div
                                        className={`text-xs  ${data.state.color}`}
                                    >
                                        {t(data.state.text)}
                                    </div>
                                    {data.state.text === "Starts in" && (
                                        <div className="text-primary-warning text-sm font-medium">
                                            <Countdown
                                                key={
                                                    market.predictionStartTimestamp
                                                }
                                                date={
                                                    market.predictionStartTimestamp *
                                                    1000
                                                }
                                                renderer={renderer}
                                            />
                                        </div>
                                    )}
                                    {data.state.text === "Ends in" && (
                                        <span className="text-primary-warning text-sm font-medium">
                                            {t("expiry", {
                                                dataExpiry: data.expiry,
                                            })}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex gap-4 mt-8 mb-4">
                            <div className="w-fit">
                                <div className="w-[88px] h-[96px] rounded-lg">
                                    <img
                                        className="w-[88px] h-[96px] rounded-lg"
                                        src={
                                            market.image.indexOf("://") === -1
                                                ? `http://${market.image}`
                                                : market.image
                                        }
                                        alt={market.id}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 justify-start items-start">
                                <div className="flex gap-2 items-center">
                                    <div
                                        className="text-xs font-medium"
                                        style={{
                                            color: categoryRender(market)
                                                .baseColor,
                                        }}
                                    >
                                        {t(data.category)}
                                    </div>
                                    <div className="h-[16px] w-[1.5px] bg-primary-200 opacity-50" />
                                    <div className="flex gap-3 items-center justify-center">
                                        <HeartIcon
                                            onClick={event =>
                                                setFavorite(event)
                                            }
                                            className={`${
                                                favorites.includes(market.id)
                                                    ? "fill-heart-selected stroke-heart-stroke-selected"
                                                    : "fill-heart-unselected stroke-heart-stroke-unselected hover:fill-heart-hover hover:stroke-heart-stroke-hover"
                                            } cursor-pointer`}
                                        />

                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                `Explore this quest: ${data.title}`
                                            )}%0A%0A${encodeURIComponent(
                                                `Place your prediction on @NexterDotFi:  ${window.location.href}/${market.id}?marketid=${market.id}`
                                            )}`}
                                            target="_blank"
                                            onClick={event =>
                                                event.stopPropagation()
                                            }
                                            className="text-primary-100 "
                                            rel="noreferrer"
                                        >
                                            <ShareIcon className="cursor-pointer stroke-primary-200 hover:stroke-primary-100" />
                                        </a>
                                    </div>
                                </div>
                                <div className="text-primary-100 text-sm">
                                    {shortenName(data.title, 100)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="px-4 py-6 border-t-[2px] cursor-pointer border-opacity-20 border-quest-card-divider">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex-col flex items-start gap-[1px]">
                                        <h1 className=" font-medium text-sm text-primary-100">
                                            {`${
                                                data.fundingPool
                                                    ? `${fromWei(
                                                          data.fundingPool,
                                                          library
                                                      )} ${predictableToken}`
                                                    : "---"
                                            } `}
                                        </h1>
                                        <p className=" text-xs text-primary-300 whitespace-nowrap">
                                            {t("Funding Pool")}
                                        </p>
                                    </div>
                                    <div className="flex-col flex items-center gap-[1px]">
                                        <h1 className=" font-medium text-sm text-primary-100">
                                            {`${
                                                data.commitAmt
                                                    ? `${toDecimals(
                                                          fromWei(
                                                              data.commitAmt,
                                                              library
                                                          ),
                                                          2
                                                      )} ${predictableToken}`
                                                    : "---"
                                            } `}
                                        </h1>
                                        <p className="font-normal text-xs text-primary-300">
                                            {t("Your Commit Amt")}
                                        </p>
                                    </div>
                                    <div className="flex-col flex items-end  gap-[1px]">
                                        <div className="flex flex-row gap-1">
                                            <span className="mt-[3px]">
                                                <img
                                                    src={`/svgs/onboarding/${selectedToken[0].icon}`}
                                                    alt={selectedToken[0].label}
                                                    className="h-4 w-4"
                                                />
                                            </span>
                                            <h1 className="font-medium text-sm text-primary-100">
                                                {data.currency}
                                            </h1>
                                        </div>

                                        <p className="font-normal text-xs text-primary-300">
                                            {t("Currency")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-[9px] flex justify-between cursor-pointer rounded-b-[10px] items-center flex-row w-full bg-quest-card">
                        <h1 className=" text-sm font-medium text-quest-card-text">
                            {t("question", { questionNo: data.noQuestion })}
                        </h1>
                        <div className="flex gap-4 items-center justify-between">
                            {data.participants > 0 && (
                                <div className="text-quest-card-text opacity-60 text-xs font-medium">
                                    {" "}
                                    {t("Questparticipants", {
                                        No: data.participants,
                                    })}
                                </div>
                            )}
                            <ArrowQuestRight className="stroke-entered-text" />
                        </div>
                    </div>
                </div>
            </Link>
            <ClaimOnQuestCards
                questId={market.questId}
                commitAmt={data.totalBetAmont}
                noQuestion={data.noQuestion}
                page="CARD"
                betAmount={data.commitAmt}
            />
        </div>
    );
};

export default QuestCardView;
