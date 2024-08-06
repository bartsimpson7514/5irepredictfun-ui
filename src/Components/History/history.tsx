/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import { useWeb3React } from "@web3-react/core";
import Crypto from "@Public/svgs/sidebar/Crypto.svg";
// import Commodities from "@Public/svgs/sidebar/Commodities.svg";
// import Stocks from "@Public/svgs/sidebar/Stocks.svg";
import Quest from "@Public/svgs/sidebar/Quest.svg";
import Vaults from "@Public/svgs/sidebar/Vaults.svg";
// import Quest from "@Public/svgs/sidebar/Quest.svg";
import CryptoHistory from "@Components/History/crypto-history";
import {
    ASSET_TYPES,
    ASSET_TYPES_COMMODITY,
    ASSET_TYPES_STOCKS,
    BHAVISH_QUEST_GRAPH_API,
    BHAVISH_VAULT_GRAPH_API,
    ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES,
    PREDICT_TOKENS,
} from "@Constants";
// import Vaults from "@Public/svgs/sidebar/Vaults.svg";
// import { useRouter } from "next/router";
// import { updateCurrentHistoryTab } from "@Redux/Reducers/trade";
import router from "next/router";
import ConnectWalletModal from "@Components/WalletModal/ConnectWalletModal";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import WrongConnectWalletModal from "@Components/WalletModal/WrongConnectWalletModal";
import { validNetwork } from "@Utils";
import { useTranslation } from "react-i18next";
import { useUserPredicitionHistory } from "@Hooks/useUserPredicitionHistory";
// import { userHistory } from "./queries";
import VaultHistory from "./vault-history";
import QuestHistory from "./quest-history";
import HistoryNav from "./history-nav";

export const WrongNetworkMessage = (message: string) => {
    return (
        <>
            <div className="text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs justify-center mb-16px">
                {message}
            </div>
        </>
    );
};
const tabs = [
    { name: "Crypto", icon: Crypto },
    // { name: "Commodities", icon: Commodities },
    // { name: "Stocks", icon: Stocks },
    { name: "Vaults", icon: Vaults },
    { name: "Quests", icon: Quest },
];

const Message = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs justify-center mb-16px">
                {t(
                    "Please connect your wallet to experience the magic of prediction"
                )}
            </div>
        </>
    );
};

const History = () => {
    const { account, chainId } = useWeb3React();
    const { t } = useTranslation();
    const {
        isPredicted,
        isRewardCollected,
        predictableToken,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [current, setCurrent] = useState("Crypto");

    const ASSETS_ARRAY_BY_TYPE = {
        Crypto: ASSET_TYPES[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        ),
        Stocks: ASSET_TYPES_STOCKS[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        ),
        Commodities: ASSET_TYPES_COMMODITY[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        ),
        // need to change this
        Quests: ASSET_TYPES_COMMODITY[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        ),
        // need to change this
        Vaults: ASSET_TYPES_COMMODITY[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        ),
    };
    const isNoLossy: boolean = predictableToken === String(PREDICT_TOKENS.BGN);

    // const { data: userHistories, refetch, loading } = useQuery(
    //     userHistory(
    //         account?.toLowerCase(),
    //         ASSETS_ARRAY_BY_TYPE[current],
    //         isNoLossy
    //     )
    // );

    const { userHistories, refetch, loading } = useUserPredicitionHistory(
        account?.toLowerCase(),
        ASSETS_ARRAY_BY_TYPE[current],
        isNoLossy
    );

    useEffect(() => {
        const historyTab = router.query.tab;
        if (historyTab) {
            setCurrent(String(historyTab));
        } else {
            setCurrent("Crypto");
        }
    }, [router.query.tab]);

    useEffect(() => {
        refetch();
    }, [isPredicted, account, selectedChainId, isRewardCollected]);

    const client = new GraphQLClient({
        url: BHAVISH_VAULT_GRAPH_API[predictableToken][selectedChainId],
    });

    const questClient = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    return (
        <div>
            <HistoryNav title="History" />
            <div className="pt-5 pl-[14px]">
                <div className="overflow-x-scroll scrollbar-hide">
                    <div className="border-b-[0.5px] border-history-divider">
                        <nav
                            className="-mb-px flex space-x-8"
                            aria-label="Tabs"
                        >
                            {tabs.map(tab => (
                                <button
                                    type="button"
                                    key={tab.name}
                                    className={`
                                        ${
                                            current === tab.name
                                                ? "border-b-2 border-potential-text text-primary-white"
                                                : "border-transparent text-gray-opacity-50"
                                        }
                                        group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm group`}
                                    onClick={() => {
                                        handleGaEvent(
                                            upperCase(`history ${tab.name}`)
                                        );
                                        router.push({
                                            pathname: "/history",
                                            query: {
                                                tab: tab.name,
                                            },
                                        });
                                    }}
                                >
                                    <span
                                        className={`
                                            ${
                                                current === tab.name
                                                    ? "gradient-text bg-dropdown-text-selected fill-potential-text"
                                                    : "text-gray-opacity-50 fill-primary-200"
                                            }
                                            `}
                                    >
                                        {t(tab.name)}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            {account ? (
                <>
                    {account && !validNetwork(chainId) ? (
                        <div className=" flex itsems-center justify-center h-96 mx-4">
                            <WrongConnectWalletModal />
                        </div>
                    ) : (
                        <>
                            {["Crypto", "Stocks", "Commodities"].includes(
                                current
                            ) && (
                                <CryptoHistory
                                    userHistories={userHistories}
                                    loading={loading}
                                    selectedTab={current}
                                />
                            )}
                            {current === "Vaults" && (
                                <ClientContext.Provider value={client}>
                                    <VaultHistory />
                                </ClientContext.Provider>
                            )}
                            {current === "Quests" && (
                                <ClientContext.Provider value={questClient}>
                                    <QuestHistory />
                                </ClientContext.Provider>
                            )}
                        </>
                    )}
                </>
            ) : (
                <div className=" flex itsems-center justify-center h-96">
                    <ConnectWalletModal Message={Message} />
                </div>
            )}
        </div>
    );
};

export default History;
