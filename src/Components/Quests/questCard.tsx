/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import IconFavorite from "@Public/svgs/quest/icon-favorite.svg";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import StyledLabelForCategory from "@Components/Quests/label";
import Card from "@Basic/Card";
import { useRouter } from "next/router";
import IconCrypto from "@Public/svgs/quest/placeholders/logo-btc.svg";
import IconCric from "@Public/svgs/quest/placeholders/logo-cricket.svg";
import IconPolitics from "@Public/svgs/quest/placeholders/logo-politics.svg";
import StackedQuestion from "@Public/svgs/quest/quest-stacked-question.svg";
import { formatDate, formatValue, fromWei } from "./questhelpers";
import { Quest, QuestState } from "./constants";

interface IQuestCard {
    marketId: number;
    market: Quest;
    onFavorited?: (isFav: boolean, category: Quest) => void;
    favorited?: boolean;
    showResolution: boolean;
    quesLength: number;
    // onSelect?: (marketId: number) => void;
}

const QuestCard: React.FC<IQuestCard> = ({
    marketId,
    market,
    onFavorited,
    favorited,
    showResolution,
    quesLength,
}) => {
    const { t } = useTranslation();
    const [isFavorited, setIsFavorited] = useState(false);
    const [totalVolume, setTotalVolume] = useState("");
    const { account, library } = useWeb3React();
    const toggleWalletModal = useWalletModalToggle();
    const router = useRouter();

    const IconRenderer = (category: string) => {
        switch (category) {
            case "crypto":
                return <IconCrypto className="h-8 w-8" />;
            case "sports":
                return <IconCric className="h-8 w-8" />;
            case "politics":
                return <IconPolitics className="h-8 w-8" />;
            default:
                return <IconCrypto className="h-8 w-8" />;
        }
    };

    useEffect(() => {
        if (account) {
            if (favorited) {
                setIsFavorited(true);
            }
        }
    }, [favorited]);

    useEffect(() => {
        if (market) {
            const getVolume = market.balance
                ? fromWei(market.balance, library)
                : 0;
            const formatted = formatValue(Number(getVolume));
            setTotalVolume(formatted);
        }
    }, [market]);

    const setFavorite = (event: any) => {
        event.stopPropagation();
        if (!account) {
            toggleWalletModal();
        } else {
            setIsFavorited(prevState => !prevState);
            onFavorited(!isFavorited, market);
        }
    };

    const renderCardHeader = () => {
        return (
            <div className="flex flex-row justify-between items-center">
                {IconRenderer(market.category)}
                <div className="flex flex-row items-center gap-1 text-primary-100">
                    <StyledLabelForCategory style="cursor-pointer w-fit px-2 py-1 rounded-md text-base font-medium bg-primary-400 bg-opacity-20">
                        <p className="text-primary-100 text-xs font-medium">
                            {market.category.charAt(0).toUpperCase() +
                                market.category.slice(1)}
                        </p>
                    </StyledLabelForCategory>
                    <button type="button" onClick={event => setFavorite(event)}>
                        <IconFavorite
                            className={`${
                                isFavorited
                                    ? "fill-asset-text"
                                    : "fill-primary-200"
                            }`}
                        />
                    </button>
                </div>
            </div>
        );
    };

    const renderQuestDetails = () => {
        return (
            <>
                <ul className="space-y-6 grid grid-cols-3 gap-6 space-y-0 lg:grid-cols-3 mt-6">
                    <li className="flex flex-col">
                        <span className="text-sm text-primary-100 font-medium ">
                            {totalVolume}
                        </span>
                        <span className="text-xs text-primary-400">
                            {t("Total vol")}
                        </span>
                    </li>
                    <li className="flex flex-col">
                        <span className="py-[2px]">
                            <img
                                src="/images/currency/bhavish-lossless-chip.png"
                                alt="lossless"
                                className="h-5 w-5"
                            />
                        </span>
                        <span className="text-xs text-primary-400 ">
                            {t("Currency")}
                        </span>
                    </li>
                    <li className="flex flex-col items-center">
                        <span className="text-sm text-primary-100 font-medium">
                            {`${formatDate(Number(market.closesAtTimestamp))}`}
                        </span>
                        <span className="text-xs text-primary-400">
                            {formatDate(Number(market.closesAtTimestamp)) !==
                            "-"
                                ? t("Expiration")
                                : QuestState.EXPIRED}
                        </span>
                    </li>
                </ul>
                <li className="flex gap-1 items-center">
                    <span>
                        <StackedQuestion />
                    </span>
                    <span className="text-sm text-primary-100 font-medium">
                        {t("QuestQuestion", { quesLength })}
                    </span>
                </li>
            </>
        );
    };

    return (
        // <Link href={`/quests/${marketId}`} key={marketId}>
        <>
            {showResolution ? (
                formatDate(Number(market.closesAtTimestamp)) === "-" && (
                    <div
                        className="max-w-[23rem] w-full relative  h-[239px]"
                        onClick={() => {
                            router.push({
                                pathname: `/quests/${marketId}`,
                            });
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <Card>
                            {formatDate(Number(market.closesAtTimestamp)) ===
                                "-" && (
                                <div className="absolute top-0 right-0 text-primary-warning px-2 py-[0.5px] rounded-bl-lg rounded-tr-lg text-xs font-medium">
                                    {QuestState.INRESOLUTION}
                                </div>
                            )}
                            <div
                                className="flex gap-4 flex-col h-full justify-between"
                                key={marketId}
                            >
                                {renderCardHeader()}

                                <span className="text-sm font-medium text-primary-100">
                                    {market.description}
                                </span>

                                {renderQuestDetails()}
                            </div>
                        </Card>
                    </div>
                )
            ) : (
                <div
                    className="max-w-[23rem] w-full relative h-[239px]"
                    onClick={() => {
                        router.push({
                            pathname: `/quests/${marketId}`,
                        });
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <Card>
                        {formatDate(Number(market.closesAtTimestamp)) ===
                            "-" && (
                            <div className="absolute top-0 right-0 text-primary-warning px-2 py-[0.5px] rounded-bl-lg rounded-tr-lg text-xs font-medium">
                                {QuestState.INRESOLUTION}
                            </div>
                        )}
                        <div
                            className="flex gap-4 flex-col h-full justify-between"
                            key={marketId}
                        >
                            {renderCardHeader()}

                            <span className="text-sm font-medium text-primary-100">
                                {market.description}
                            </span>

                            {renderQuestDetails()}
                        </div>
                    </Card>
                </div>
            )}
        </>
        // </Link>
    );
};

export default QuestCard;
