import PoweredByBhavish from "@Basic/PoweredByBhavish";
import Title from "@Basic/Title";
import {
    BHAVISH_REWARD_TOKEN,
    INTEGRATIONS,
    PREDICT_TOKENS,
    QUEST_POOL,
} from "@Constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import GameTokenSelect from "@Components/Header/gameToken-DropDown";
import useBalance from "@Hooks/useBalance";
import {
    updateBgnBalance,
    updateBgrBalance,
    updatenativeBalance,
} from "@Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import UserInfoSection from "@Components/Header/user-info-select";
import UserInfoTab from "@Components/Header/user-info-tabs";
import ReactCoachPoints from "@Components/Quests/react-coachpoints";
import { AppState } from "@Redux";
import { useWeb3React } from "@web3-react/core";
import { validNetwork } from "@Utils";
import { isUserInfoPage } from "@Components/Quests/questhelpers";
import BackToIndex from "@Basic/BackToIndex";
import WrongNetwork from "@Components/Integations/Bhavish/wrong-network";
import tokenBalanceFetch from "@Hooks/tokenBalanceFetch";
import NexterTabs from "@Components/Integations/Bhavish/tabs";
import QuickSwapTabs from "@Components/Integations/QuickSwap/tabs";
import ZeroSwapTabs from "@Components/Integations/ZeroSwap/tabs";
import { useTranslation } from "next-i18next";
import OnyxTabs from "@Components/Integations/Onyx/tabs";
import ZebecTabs from "@Components/Integations/Zebec/tabs";

const ContentSection = ({ inactiveFlag, childrenContent }) => {
    return (
        <section className=" ">
            {inactiveFlag && (
                <div className="items-center align-center flex flex-col justify-between h-full">
                    <div className="w-full h-full">
                        <div
                            className={`flex flex-col h-full justify-center bg-content-background shadow-content rounded-3xl ${
                                isUserInfoPage()
                                    ? "mb-4 sm:p-6 px-4 py-6"
                                    : "mb-4 sm:p-6 px-2 py-4"
                            }`}
                        >
                            {childrenContent}
                        </div>
                        {process.env.NEXT_PUBLIC_INTEGRATION !==
                            INTEGRATIONS.BHAVISH && (
                            <div className="flex w-full items-center justify-end">
                                <PoweredByBhavish />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

const Content = ({ inactiveFlag, childrenContent }) => {
    const router = useRouter();
    const { pathname } = router;
    const dispatch = useDispatch();
    const { chainId, account } = useWeb3React();
    const nativeBalance: any = useBalance();
    const bgnbalance: any = tokenBalanceFetch(
        QUEST_POOL[PREDICT_TOKENS.BGN][chainId]
    );
    const { t } = useTranslation();
    const brBalance = tokenBalanceFetch(BHAVISH_REWARD_TOKEN[chainId]);
    const { coachPoints, selectedAsset } = useSelector(
        (state: AppState) => state.prediction
    );

    useEffect(() => {
        dispatch(updateBgnBalance(Number(bgnbalance)));
    }, [bgnbalance]);

    useEffect(() => {
        dispatch(updatenativeBalance(Number(nativeBalance)));
    }, [nativeBalance]);

    useEffect(() => {
        dispatch(updateBgrBalance(Number(brBalance)));
    }, [brBalance]);

    const tabMapping = {
        "/vaults": "Vaults",
        "/vaults/[vault]": "Vaults",
        "/quests": "Quests",
        "/commodities": "Commodities",
        "/profile": "Profile",
        "/": "Fun Predictions",
        "/stocks": "Stocks",
        "/leaderboard": "Leaderboard",
        "/history": "History",
    };

    const TabsRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return <NexterTabs />;
            case INTEGRATIONS.QUICKSWAP:
                return <QuickSwapTabs />;
            case INTEGRATIONS.ZEROSWAP:
                return <ZeroSwapTabs />;
            case INTEGRATIONS.ZEBEC:
                return <ZebecTabs />;
            case INTEGRATIONS.ONYX:
                return <OnyxTabs />;
            default:
                return <NexterTabs />;
        }
    };

    return (
        <div className="sm:px-8 px-3 z-10 max-w-[1366px] mlgh:box-content w-full mlgh:mx-auto">
            <div className="flex justify-between mt-8 mb-6 sm:mb-8">
                {!isUserInfoPage() ? (
                    <Title
                        title={t(tabMapping[pathname])}
                        selectedAsset={selectedAsset}
                    />
                ) : (
                    <BackToIndex title="Crypto" link="/" />
                )}
                <UserInfoTab />
                <UserInfoSection />
            </div>

            {!isUserInfoPage() && (
                // <div className="flex justify-between">
                <div className="flex justify-between items-center pb-6">
                    {TabsRender()}
                    <div className="flex flex-row items-center">
                        <div>
                            {account && !validNetwork(chainId) ? (
                                <WrongNetwork text="Network" />
                            ) : (
                                <GameTokenSelect />
                            )}
                        </div>

                        {isUserInfoPage() && <UserInfoSection />}
                    </div>
                </div>
            )}
            {account && coachPoints && !coachPoints.mainSection && (
                <ReactCoachPoints page="main" />
            )}
            <ContentSection
                inactiveFlag={inactiveFlag}
                childrenContent={childrenContent}
            />
        </div>
    );
};

export default Content;
