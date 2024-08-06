import { useMarkets } from "@Hooks/useMarkets";
import { useQuestFavorites } from "@Hooks/useQuestFavorites";
import React, { useEffect, useState } from "react";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useTranslation } from "react-i18next";
import { formatDate } from "./questhelpers";
import QuestCardView from "./questCardView";
import QuestSortBar from "./questSortbar";

const QuestLayout: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Trending");
    const [onShowFavoriteMarkets, setOnShowFavoriteMarkets] = useState(false);
    const [showResolution, setShowResolution] = useState(false);
    const [showExpiry, setShowExpiry] = useState(false);
    const [data, setData] = useState([]);
    const { t } = useTranslation();
    const {
        marketsByCategory: marketByCategory,
        loading: marketByCategoryLoading,
    } = useMarkets(selectedCategory, true);
    const {
        favoriteMarkets,
        addFavoriteMarket,
        removeFavoriteMarket,
    } = useQuestFavorites();

    const showFavorites = () => {
        setOnShowFavoriteMarkets(prevState => !prevState);
    };

    useEffect(() => {
        if (onShowFavoriteMarkets) {
            let favoriteFiltered = marketByCategory.filter(market =>
                Object.keys(favoriteMarkets).some(key => key === market.id)
            );
            if (showResolution && showExpiry) {
                favoriteFiltered = favoriteFiltered.filter(market => {
                    return (
                        (formatDate(Number(market.closesAtTimestamp)) === "-" &&
                            market.resolved === null) ||
                        market.resolved
                    );
                });
            } else {
                if (showResolution) {
                    favoriteFiltered = favoriteFiltered.filter(market => {
                        return (
                            formatDate(Number(market.closesAtTimestamp)) ===
                                "-" && market.resolved === null
                        );
                    });
                }
                if (showExpiry) {
                    favoriteFiltered = favoriteFiltered.filter(market => {
                        return market.resolved;
                    });
                }
            }
            setData(favoriteFiltered);
        } else {
            let temp = marketByCategory.filter(
                market => formatDate(Number(market.closesAtTimestamp)) !== "-"
            );
            if (showResolution) {
                temp = marketByCategory.filter(market => {
                    return (
                        formatDate(Number(market.closesAtTimestamp)) === "-" &&
                        market.resolved === null
                    );
                });
            }
            if (showExpiry) {
                temp = marketByCategory.filter(market => {
                    return market.resolved;
                });
            }
            if (showResolution && showExpiry) {
                temp = marketByCategory.filter(market => {
                    return (
                        (formatDate(Number(market.closesAtTimestamp)) === "-" &&
                            market.resolved === null) ||
                        market.resolved
                    );
                });
            }
            setData(temp);
        }
    }, [onShowFavoriteMarkets, showResolution, showExpiry, marketByCategory]);

    return (
        <>
            <div className="p-2 sm:p-0">
                <QuestSortBar
                    onSelectedCategory={category =>
                        setSelectedCategory(category)
                    }
                    onShowFavorites={() => showFavorites()}
                    onShowExpired={resolution => {
                        setShowExpiry(resolution);
                    }}
                    onShowResolution={resolution => {
                        setShowResolution(resolution);
                    }}
                />

                {/* * *Cards View */}
                <ul className="flex sm:flex-row sm:flex-wrap  flex-col items-center w-full gap-5  mt-8">
                    <>
                        {marketByCategoryLoading ? (
                            React.Children.toArray(
                                [...Array(5)].map(() => (
                                    <div className="w-full sm:w-[376px] h-[279px]">
                                        <QuickSwapLoader />
                                    </div>
                                ))
                            )
                        ) : (
                            <>
                                {data.length === 0 && (
                                    <div className="flex w-full h-full justify-center my-56 flex-col">
                                        <div className="text-center flex justify-center">
                                            <img
                                                src="/images/noactivequests.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="text-primary-100 font-medium text-center mt-6 text-lg">
                                            {t("No Active Quests")}
                                        </div>
                                        <div className="w-full text-primary-200 font-normal text-center mt-6 text-sm flex justify-center">
                                            <div className="w-[343px]">
                                                <p className="inline">
                                                    {t("NoActiveQuests")}
                                                </p>
                                                <p className="inline">
                                                    {t(
                                                        "checkout_quest_markets"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data?.map(market =>
                                    React.Children.toArray(
                                        <QuestCardView
                                            market={market}
                                            predictionEndtimeStamp={
                                                market.opensAtTimestamp
                                            }
                                            onFavorited={(isFav, cat) => {
                                                isFav
                                                    ? addFavoriteMarket(
                                                          cat.id,
                                                          cat
                                                      )
                                                    : removeFavoriteMarket(
                                                          cat.id
                                                      );
                                            }}
                                            favorites={Object.keys(
                                                favoriteMarkets
                                            )}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </>
                </ul>
                {data.length !== 0 && (
                    <div className="text-primary-200 text-xs italic font-medium mt-6">
                        {t("QuestImagesNote ")}
                        <a
                            className="text-primary-100 underline underline-offset-1"
                            href=""
                            target="_blank"
                            rel="noreferrer"
                        >
                            {t("Privacy Policy")}
                        </a>
                        {` ${t("for more information")}`}
                    </div>
                )}
            </div>
        </>
    );
};

export default QuestLayout;
