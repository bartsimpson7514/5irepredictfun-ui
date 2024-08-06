import React, { useState, useEffect, useRef } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { useSelector } from "react-redux";
import { useQuery } from "graphql-hooks";
import {
    initialPredictableToken,
    shortenAddressWithLessCharacters,
    toDecimals,
} from "@Utils";
import { useWeb3React } from "@web3-react/core";
import { NETWORK_ASSET, TRANSACTION_URI, USDC_DECIMAL } from "@Constants";
import { useTranslation } from "react-i18next";
import ArrowUp from "@Public/svgs/ArrowUp.svg";
import { getLastPrice } from "@Utils/priceFeed";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import HistoryNav from "@Components/History/history-nav";
import resolveConfig from "tailwindcss/resolveConfig";
import { AppState } from "../../Redux";
import { leaderboard } from "./query";
import tailwindConfig from "../../../tailwind.config";

export enum LeaderboardTab {
    BETTEDAMOUNT = "Betted Amount (MATIC)",
    NETWINNINGS = "Net Winnings (MATIC)",
    WINRATES = "Win Rates",
    ROUNDSWON = "Rounds Won",
    ROUNDSPLAYED = "Rounds Played",
}

const LeaderBoard = () => {
    const fullConfig = resolveConfig(tailwindConfig);

    const { isDarkMode, selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const [sortValue, setSortValue] = useState("netWinnings");
    const [direction, setSortDirection] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [endScroll, setEndScroll] = useState(false);

    const { library } = useWeb3React();
    const [activeTab, setActiveTab] = useState("");
    const token = initialPredictableToken(selectedChainId);
    const getCurrentPrice = async () => {
        const result: any = await getLastPrice(
            NETWORK_ASSET[selectedChainId],
            selectedChainId,
            library
        );
        if (!result) return;
        setCurrentPrice(result.toFixed(4));
    };

    useEffect(() => {
        getCurrentPrice();
        return () => {
            setCurrentPrice(0);
        };
    }, []);

    const infoReff = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        infoReff?.current?.goToAndStop(24, true);
    }, [isDarkMode]);

    const { data: userInfos, refetch } = useQuery(
        leaderboard(sortValue, direction ? "asc" : "desc")
    );

    useEffect(() => {
        refetch();
    }, [selectedChainId]);

    const scrollEnd = e => {
        if (
            e.target.offsetHeight + e.target.scrollTop >=
            e.target.scrollHeight
        ) {
            setEndScroll(true);
        } else {
            setEndScroll(false);
        }
    };

    return (
        <>
            <HistoryNav title="Leaderboard" />
            <div style={{ height: "456px" }} className=" relative pt-9">
                <StickyTable
                    borderWidth="0px"
                    leftStickyColumnCount={1}
                    borderColor="#252833"
                    className="rounded-xl overflow-hidden"
                    onScroll={e => scrollEnd(e)}
                >
                    <Row className="uppercase w-full text-left ">
                        <Cell
                            className="flex items-center font-normal text-sm text-primary-200 rounded-l-[10px]"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                                width: "87px",
                            }}
                        >
                            {t("ID")}
                        </Cell>
                        <Cell
                            className="flex items-center font-normal text-sm text-primary-200"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            {t("User")}
                        </Cell>
                        <Cell
                            className="text-primary-200 text-sm font-medium"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            <div
                                className="flex items-center font-normal text-sm text-primary-200"
                                role="none"
                                onClick={() => {
                                    setSortValue("bettedAmount");
                                    setSortDirection(!direction);
                                    setActiveTab(
                                        LeaderboardTab.BETTEDAMOUNT.replace(
                                            "MATIC",
                                            token
                                        )
                                    );
                                }}
                            >
                                {`${t("Bet Amount ")} (${predictableToken})`}
                                <span className="pt-0.5 pl-0.5 fill-primary-200">
                                    <ArrowUp
                                        className={`${
                                            activeTab ===
                                            LeaderboardTab.BETTEDAMOUNT
                                                ? `fill-asset-text ${
                                                      direction === true
                                                          ? "rotate-180"
                                                          : ""
                                                  }`
                                                : "fill-primary-200"
                                        }`}
                                    />
                                </span>
                            </div>
                        </Cell>
                        <Cell
                            className="text-primary-200 text-sm font-medium"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            <div
                                className="flex items-center font-normal text-sm text-primary-200"
                                role="none"
                                onClick={() => {
                                    setSortValue("netWinnings");
                                    setSortDirection(!direction);
                                    setActiveTab(LeaderboardTab.NETWINNINGS);
                                }}
                            >
                                {`${t("Net Winnings ")} (${predictableToken})`}
                                <span className="pt-0.5 pl-0.5 fill-primary-200">
                                    <ArrowUp
                                        className={`${
                                            activeTab ===
                                            LeaderboardTab.NETWINNINGS
                                                ? `fill-asset-text ${
                                                      direction === true
                                                          ? "rotate-180"
                                                          : ""
                                                  }`
                                                : "fill-primary-200"
                                        }  }`}
                                    />
                                </span>
                            </div>
                        </Cell>
                        <Cell
                            className="text-primary-200 text-sm font-medium"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            <div
                                className="flex items-center font-normal text-sm text-primary-200"
                                role="none"
                                onClick={() => {
                                    setSortValue("winRate");
                                    setSortDirection(!direction);
                                    setActiveTab(LeaderboardTab.WINRATES);
                                }}
                            >
                                {t("Win Rates")}
                                <span className="pt-0.5 pl-0.5 fill-primary-200">
                                    <ArrowUp
                                        className={`${
                                            activeTab ===
                                            LeaderboardTab.WINRATES
                                                ? `fill-asset-text ${
                                                      direction === true
                                                          ? "rotate-180"
                                                          : ""
                                                  }`
                                                : "fill-primary-200"
                                        } `}
                                    />
                                </span>
                            </div>
                        </Cell>
                        <Cell
                            className="text-primary-200 text-sm font-medium"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            <div
                                className="flex items-center font-normal text-sm text-primary-200"
                                role="none"
                                onClick={() => {
                                    setSortValue("roundsWon");
                                    setSortDirection(!direction);
                                    setActiveTab(LeaderboardTab.ROUNDSWON);
                                }}
                            >
                                {t("Rounds Won")}
                                <span className="pt-0.5 pl-0.5 fill-primary-200">
                                    <ArrowUp
                                        className={`${
                                            activeTab ===
                                            LeaderboardTab.ROUNDSWON
                                                ? `fill-asset-text ${
                                                      direction === true
                                                          ? "rotate-180"
                                                          : ""
                                                  }`
                                                : "fill-primary-200"
                                        }`}
                                    />
                                </span>
                            </div>
                        </Cell>
                        <Cell
                            className="  py-5 hidden md:table-cell text-primary-200 text-sm font-medium rounded-r-[10px]"
                            style={{
                                backgroundColor:
                                    fullConfig.theme.colors["history-section"],
                                paddingTop: "16px",
                                paddingBottom: "16px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                            }}
                        >
                            <div
                                className="flex items-center font-normal text-sm text-primary-200"
                                role="none"
                                onClick={() => {
                                    setSortValue("roundsPlayed");
                                    setSortDirection(!direction);
                                    setActiveTab(LeaderboardTab.ROUNDSPLAYED);
                                }}
                            >
                                {t("Rounds Played")}
                                <span className="pt-0.5 pl-0.5 fill-primary-200">
                                    <ArrowUp
                                        className={`${
                                            activeTab ===
                                            LeaderboardTab.ROUNDSPLAYED
                                                ? `fill-asset-text ${
                                                      direction === true
                                                          ? "rotate-180"
                                                          : ""
                                                  }`
                                                : "fill-primary-200"
                                        }`}
                                    />
                                </span>
                            </div>
                        </Cell>
                    </Row>

                    {!userInfos && (
                        <Row className="block py-5 text-primary-200">
                            <Cell
                                className="hidden !bg-content-background md:table-cell"
                                style={{
                                    paddingTop: "20px",
                                    width: "87px",
                                }}
                            >
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                            <Cell className="hidden !bg-content-background md:table-cell">
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            </Cell>
                        </Row>
                    )}
                    {userInfos &&
                        userInfos?.userInfos?.map((user: any, index) => {
                            const netWinnings = Number(
                                user.netWinnings / USDC_DECIMAL
                            );

                            return (
                                <Row key={user.address}>
                                    <Cell
                                        className="text-primary-200 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                            width: "87px",
                                        }}
                                    >
                                        <small className="text-xs">
                                            {`#${index + 1}`}
                                        </small>
                                    </Cell>
                                    <Cell
                                        className="hidden p-6 md:table-cell !bg-content-background dark:text-primary-100 font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <a
                                            href={`${TRANSACTION_URI[selectedChainId]}${user.address}`}
                                            className="text-primary-blue text-sm"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {shortenAddressWithLessCharacters(
                                                user.address
                                            )}
                                        </a>

                                        <small className="text-xs text-primary-200" />
                                    </Cell>
                                    <Cell
                                        className="text-primary-100 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="leading-4 text-primary-100">
                                                {toDecimals(
                                                    user.bettedAmount / 1e18,
                                                    6
                                                )}
                                            </div>

                                            <div className="text-xs text-primary-200 ">
                                                {currentPrice ? (
                                                    `~$${(
                                                        (user.bettedAmount /
                                                            1e18) *
                                                        currentPrice
                                                    ).toFixed(2)}`
                                                ) : (
                                                    <div className="w-40 h-2">
                                                        <QuickSwapLoader />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Cell>
                                    <Cell
                                        className="py-5 text-primary-100 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="leading-4">
                                                {netWinnings.toFixed(5)}
                                            </div>

                                            <div className="text-xs text-primary-200 ">
                                                {currentPrice ? (
                                                    `~$${(
                                                        netWinnings *
                                                        currentPrice
                                                    ).toFixed(2)}`
                                                ) : (
                                                    <div className="w-40 h-2">
                                                        <QuickSwapLoader />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Cell>
                                    <Cell
                                        className="py-5 text-primary-100 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <div>
                                            {toDecimals(
                                                (user.roundsWon /
                                                    user.roundsPlayed) *
                                                    100,
                                                2
                                            )}
                                        </div>
                                    </Cell>
                                    <Cell
                                        className="py-5 text-primary-100 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <div>
                                            {user.roundsWon
                                                ? user.roundsWon
                                                : 0}
                                        </div>
                                    </Cell>
                                    <Cell
                                        className="py-5 text-primary-100 !bg-content-background font-medium text-sm"
                                        style={{
                                            paddingTop: "16px",
                                            paddingBottom: "16px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                        }}
                                    >
                                        <div>{user.roundsPlayed}</div>
                                    </Cell>
                                </Row>
                            );
                        })}
                </StickyTable>
                {!endScroll && (
                    <div className="h-10 w-full absolute bottom-0 bg-terms-condition-background-dark  z-[1000] opacity-70 rounded-b-xl" />
                )}
            </div>
        </>
    );
};

export default LeaderBoard;
