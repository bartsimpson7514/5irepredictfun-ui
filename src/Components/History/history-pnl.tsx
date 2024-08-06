/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
import { NETWORK_ASSET, PREDICT_TOKENS, USDC_DECIMAL } from "@Constants";
import { useWeb3React } from "@web3-react/core";

import React, { useEffect, useState } from "react";
import useInterval from "@Utils/useInterval";
import { getLastPrice } from "@Utils/priceFeed";
import {
    buildStyles,
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getMatic, toDecimals } from "@Utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { AppState } from "../../Redux";
import ProfileNotFound from "./empty-profile";

const HistoryPnL = ({ userInfos }) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const { chainId, account, library } = useWeb3React();
    let wontext;
    let wonperc;
    let roundsWon;
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const { t } = useTranslation();

    const getCurrentPrice = async () => {
        const result: any = await getLastPrice(
            NETWORK_ASSET[chainId],
            selectedChainId,
            library
        );
        if (!result) return;
        setCurrentPrice(result.toFixed(4));
    };

    // const getMaticVal = async (val: number) => {
    //     // setLoading(true);
    //     const result: any = await getMatic(
    //         val,
    //         PREDICT_TOKENS.BGN,
    //         library,
    //         account
    //     );

    //     if (!result) return 0;
    // };

    useInterval(() => {
        if (predictableToken) {
            getCurrentPrice();
        }
    }, 30000);

    useEffect(() => {
        if (predictableToken) {
            getCurrentPrice();
        }
        return () => {
            setCurrentPrice(0);
        };
    }, []);

    userInfos?.userInfos?.forEach(user => {
        roundsWon = user.roundsWon ? user.roundsWon : 0;
        wontext = `${roundsWon}/${Number(user.roundsWon) +
            Number(user.roundsLost)}`;
        const noOfUserRounds = Number(user.roundsWon) + Number(user.roundsLost);
        if (noOfUserRounds > 0) {
            wonperc = Number(
                (Number(roundsWon) /
                    (Number(user.roundsWon) + Number(user.roundsLost))) *
                    100
            ).toFixed(2);
        } else {
            wonperc = 0;
        }
    });

    return (
        <>
            {userInfos?.userInfos?.length <= 0 ? (
                <ProfileNotFound />
            ) : (
                <>
                    <div className="items-center justify-center flex relative">
                        <div className="absolute">
                            <div className="flex items-center justify-between flex-col">
                                <div className=" text-tooltip-text text-xl font-bold">
                                    {t("WON")}
                                </div>
                                <div className="text-potential-text font-bold mt-4 mb-1 text-lg">
                                    {wontext}
                                </div>
                                <div className="text-tooltip-text text-lg  font-medium">
                                    {wonperc ? `${wonperc} %` : "0%"}
                                </div>
                            </div>
                        </div>
                        <CircularProgressbarWithChildren
                            className="sm:h-64 h-52"
                            value={Number(wonperc)}
                            styles={buildStyles({
                                backgroundColor: "#FF5252",
                                textColor: "#FF5252",
                                pathColor: "#0FC679",
                                trailColor: "#FF5252",
                                strokeLinecap: "10px",
                                // trailColor: "transparent",
                            })}
                        />
                    </div>

                    {userInfos &&
                        userInfos?.userInfos?.map((user: any) => {
                            const noOfRoundsPlayed =
                                Number(user.roundsWon) +
                                Number(user.roundsLost);

                            const netWinnings =
                                (user.netWinnings - user.netLosses) /
                                USDC_DECIMAL;

                            const bettedAmount =
                                Number(user.bettedAmount) / USDC_DECIMAL;
                            const averageReturnRound =
                                noOfRoundsPlayed > 0
                                    ? netWinnings / noOfRoundsPlayed
                                    : 0;
                            const averageReturnRoundInDollar =
                                (netWinnings * currentPrice) /
                                (Number(user.roundsWon) +
                                    Number(user.roundsLost));
                            const averagePositionEntered =
                                noOfRoundsPlayed > 0
                                    ? bettedAmount / noOfRoundsPlayed
                                    : 0;
                            const averagePositionEnteredInDollar =
                                (bettedAmount * currentPrice) /
                                (Number(user.roundsWon) +
                                    Number(user.roundsLost));
                            const userRoundsWon = user.roundsWon
                                ? user.roundsWon
                                : 0;

                            return (
                                <div key={user}>
                                    <div className="flex flex-row flex-wrap overflow-hidden ml-[30px] sm:ml-[70px]">
                                        <dl className="mt-10  grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-2 content-evenly sm:h-[200px]">
                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm">
                                                    {t("Net Results")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div
                                                        className={`${
                                                            Number(
                                                                netWinnings
                                                            ) > 0
                                                                ? "text-primary-success"
                                                                : "text-primary-error"
                                                        } leading-4 text-sm font-medium mb-2`}
                                                    >
                                                        {`${toDecimals(
                                                            netWinnings
                                                        )}  ${predictableToken}`}
                                                    </div>
                                                    <div className="text-xs font-medium text-primary-200 tracking-wide leading-4">
                                                        {predictableToken ===
                                                            PREDICT_TOKENS.MATIC &&
                                                        currentPrice ? (
                                                            `~$${toDecimals(
                                                                netWinnings *
                                                                    currentPrice,
                                                                2
                                                            )}`
                                                        ) : (
                                                            <div className="h-2 w-10">
                                                                {predictableToken ===
                                                                PREDICT_TOKENS.MATIC ? (
                                                                    <QuickSwapLoader />
                                                                ) : null}
                                                            </div>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm">
                                                    {t("Average Return")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div
                                                        className={`${
                                                            Number(
                                                                averageReturnRound
                                                            ) > 0
                                                                ? "text-primary-success"
                                                                : "text-primary-error"
                                                        } leading-4 text-sm font-medium mb-2`}
                                                    >
                                                        {`${
                                                            averageReturnRound
                                                                ? toDecimals(
                                                                      averageReturnRound
                                                                  )
                                                                : 0
                                                        }  ${predictableToken}`}
                                                    </div>
                                                    <div className="text-xs font-medium text-primary-200 tracking-wide leading-4">
                                                        {predictableToken ===
                                                            PREDICT_TOKENS.MATIC &&
                                                        currentPrice ? (
                                                            `~$${toDecimals(
                                                                averageReturnRound *
                                                                    currentPrice
                                                            )}`
                                                        ) : (
                                                            <div className="h-2 w-10">
                                                                {predictableToken ===
                                                                PREDICT_TOKENS.MATIC ? (
                                                                    <QuickSwapLoader />
                                                                ) : null}
                                                            </div>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm break-words">
                                                    {t("Average Position")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div className="text-primary-200 leading-4 text-sm font-medium mb-2 dark:text-primary-100">
                                                        {`${toDecimals(
                                                            averagePositionEntered
                                                        )}  ${predictableToken}`}
                                                    </div>
                                                    <div className="text-xs font-medium text-primary-200 tracking-wide leading-4">
                                                        {predictableToken ===
                                                            PREDICT_TOKENS.MATIC &&
                                                        currentPrice ? (
                                                            `~$${toDecimals(
                                                                averagePositionEntered *
                                                                    currentPrice,
                                                                2
                                                            )}`
                                                        ) : (
                                                            <div className="h-2 w-10">
                                                                {predictableToken ===
                                                                PREDICT_TOKENS.MATIC ? (
                                                                    <QuickSwapLoader />
                                                                ) : null}
                                                            </div>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm">
                                                    {t("Won")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div className="flex flex-row gap-6">
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-primary-success font-medium text-sm mb-2 leading-4">
                                                                {`${roundsWon} ${t(
                                                                    "rounds"
                                                                )}`}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {`${
                                                                    Number(
                                                                        noOfRoundsPlayed
                                                                    ) > 0
                                                                        ? (
                                                                              (roundsWon /
                                                                                  (Number(
                                                                                      user.roundsWon
                                                                                  ) +
                                                                                      Number(
                                                                                          user.roundsLost
                                                                                      ))) *
                                                                              100
                                                                          ).toFixed(
                                                                              2
                                                                          )
                                                                        : 0
                                                                }%`}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-primary-success font-medium text-sm mb-2 leading-4">
                                                                {`${toDecimals(
                                                                    user.netWinnings /
                                                                        1e18
                                                                )}  ${predictableToken}`}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {predictableToken ===
                                                                    PREDICT_TOKENS.MATIC &&
                                                                currentPrice ? (
                                                                    `~$${(
                                                                        (user.netWinnings /
                                                                            1e18) *
                                                                        currentPrice
                                                                    ).toFixed(
                                                                        2
                                                                    )}`
                                                                ) : (
                                                                    <div className="h-2 w-10">
                                                                        {predictableToken ===
                                                                        PREDICT_TOKENS.MATIC ? (
                                                                            <QuickSwapLoader />
                                                                        ) : null}
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm">
                                                    {t("Lost")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div className="flex flex-row gap-6">
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-down font-medium text-sm mb-2 leading-4">
                                                                {`${Number(
                                                                    user.roundsLost
                                                                )} ${t(
                                                                    "rounds"
                                                                )}`}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {`${
                                                                    Number(
                                                                        noOfRoundsPlayed
                                                                    ) > 0
                                                                        ? Number(
                                                                              (Number(
                                                                                  user.roundsLost
                                                                              ) /
                                                                                  (Number(
                                                                                      user.roundsWon
                                                                                  ) +
                                                                                      Number(
                                                                                          user.roundsLost
                                                                                      ))) *
                                                                                  100
                                                                          ).toFixed(
                                                                              2
                                                                          )
                                                                        : 0
                                                                }%`}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-down font-medium text-sm mb-2 leading-4">
                                                                {`${toDecimals(
                                                                    user.netLosses /
                                                                        1e18
                                                                )}  ${predictableToken}`}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {predictableToken ===
                                                                    PREDICT_TOKENS.MATIC &&
                                                                currentPrice ? (
                                                                    `~$${(
                                                                        (user.netLosses /
                                                                            1e18) *
                                                                        currentPrice
                                                                    ).toFixed(
                                                                        2
                                                                    )}`
                                                                ) : (
                                                                    <div className="h-2 w-10">
                                                                        {predictableToken ===
                                                                        PREDICT_TOKENS.MATIC ? (
                                                                            <QuickSwapLoader />
                                                                        ) : null}
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="overflow-hidden transition ease-in duration-300">
                                                <dt className="font-medium text-primary-100 text-sm">
                                                    {t("Entered")}
                                                </dt>
                                                <dd className="mt-4 text-3xl font-semibold tracking-tight ">
                                                    <div className="flex flex-row gap-6">
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-primary-200  font-medium leading-4 text-sm mb-2 ">
                                                                {`${Number(
                                                                    user.roundsPlayed
                                                                )} ${t(
                                                                    "rounds"
                                                                )}`}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {t("total")}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col items-center sm:items-start">
                                                            <span className="text-primary-200 font-medium text-sm mb-2 leading-4">
                                                                {`${(
                                                                    user.bettedAmount /
                                                                    1e18
                                                                ).toFixed(
                                                                    2
                                                                )} ${predictableToken}
                                                                    `}
                                                            </span>
                                                            <span className="text-primary-200 text-xs font-medium leading-4">
                                                                {predictableToken ===
                                                                    PREDICT_TOKENS.MATIC &&
                                                                currentPrice ? (
                                                                    `~$${(
                                                                        (user.bettedAmount /
                                                                            1e18) *
                                                                        currentPrice
                                                                    ).toFixed(
                                                                        2
                                                                    )}`
                                                                ) : (
                                                                    <div className="h-2 w-10">
                                                                        {predictableToken ===
                                                                        PREDICT_TOKENS.MATIC ? (
                                                                            <QuickSwapLoader />
                                                                        ) : null}
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            );
                        })}
                </>
            )}
        </>
    );
};

export default HistoryPnL;
