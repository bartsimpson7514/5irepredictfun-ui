import React, { useEffect, useState } from "react";
import {
    INTEGRATIONS,
    ODDZ_HISTORY_GRAPH_API,
    ODDZ_NETWORK,
    PREDICT_TOKENS,
} from "@Constants";
import LoadingIcon from "@Public/svgs/loading.svg";
import { NextPage } from "next";
import "../../server/i18next";
import "tailwindcss/tailwind.css";
import SwiperProvider from "@Components/Prediction/context";
import { useDispatch, useSelector } from "react-redux";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import BhavishHeader from "@Components/Integations/Bhavish/header";
// import TermsAndConditionsModal from "@Components/TermsAndConditionsModal";
import { useRouter } from "next/router";
import { OnboardingModal } from "@Components/Onboarding";
import { updateOnboardingModal, updatePredictableToken } from "@Reducers/trade";
// import { OnboardingModal } from "@Components/Onboarding";
// import { updateOnboardingModal } from "@Reducers/trade";
import QuickSwapHeader from "@Components/Integations/QuickSwap/header";
import { QuickSwapContent } from "@Components/Integations/QuickSwap/content";
import { useWeb3React } from "@web3-react/core";
import { getChainId } from "@Utils/common";
import { initialPredictableToken } from "@Utils";
import { ChainId } from "@Components/Constants";
import { ZeroSwapContent } from "@Components/Integations/ZeroSwap/content";
import ZeroSwapHeader from "@Components/Integations/ZeroSwap/header";
import OnyxHeader from "@Components/Integations/Onyx/header";
import OnyxContent from "@Components/Integations/Onyx/content";
import ZebecHeader from "@Components/Integations/Zebec/header";
import { ZebecContent } from "@Components/Integations/Zebec/content";
import { AppState } from "../../Redux";
import BhavishContent from "../Integations/Bhavish/content";

const Loader = () => {
    return (
        <>
            <div className="w-full h-full inset-0 fixed px-4 bg-opacity-30 text-primary-100 flex items-center justify-center transition-all duration-300 dark opacity-100 z-50 bg-gray-100 dark:bg-gray-300" />
            <div
                className="w-full h-full inset-0 fixed z-50 flex items-center justify-center"
                style={{ zIndex: 150 }}
            >
                <LoadingIcon className="fixed animate-spin origin-center animate" />
            </div>
        </>
    );
};

const Layout: NextPage = ({ children }) => {
    const {
        selectedChainId,
        showTermsAndConditionsModal,
        showOnboardingModal,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const router = useRouter();
    const { account } = useWeb3React();

    // const alert = useAlert();

    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    const [magicLoading, setMagicLoading] = useState(false);
    const [inactiveFlag, setInactiveFlag] = useState(true);
    const [chainId, setChainId] = useState(0);

    const allowedPathRefresh = ["/", "/stocks", "/commodities"];

    const getChain = async () => {
        const chainIdVal = await getChainId();
        setChainId(chainIdVal);
    };
    useEffect(() => {
        setMounted(true);
        getChain();
    }, []);

    const initialToken = (token, chain) => {
        if (chain === ChainId.MaticMainnet) {
            if (token === PREDICT_TOKENS.BGN || token === PREDICT_TOKENS.MATIC)
                return token;
            return PREDICT_TOKENS.MATIC;
        }
        return initialPredictableToken(chain);
    };

    useEffect(() => {
        dispatch(
            updatePredictableToken(
                initialToken(predictableToken, selectedChainId)
            )
        );
    }, [selectedChainId, chainId]);

    const HeaderRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return <BhavishHeader setMagicLoading={setMagicLoading} />;
            case INTEGRATIONS.QUICKSWAP:
                return <QuickSwapHeader setMagicLoading={setMagicLoading} />;
            case INTEGRATIONS.ZEROSWAP:
                return <ZeroSwapHeader setMagicLoading={setMagicLoading} />;
            case INTEGRATIONS.ZEBEC:
                return <ZebecHeader setMagicLoading={setMagicLoading} />;
            case INTEGRATIONS.ONYX:
                return <OnyxHeader setMagicLoading={setMagicLoading} />;
            default:
                return <BhavishHeader setMagicLoading={setMagicLoading} />;
        }
    };

    const FontStyle = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return "font-inter";
            case INTEGRATIONS.ZEROSWAP:
                return "font-nunitoSans";
            case INTEGRATIONS.ZEBEC:
                return "font-nunitoSans";
            case INTEGRATIONS.ONYX:
                return "font-inter";
            default:
                return "font-inter";
        }
    };

    useEffect(() => {
        setInactiveFlag(false);
        setTimeout(() => {
            setInactiveFlag(true);
        }, 100);
    }, [predictableToken]);

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (
                document.hidden &&
                allowedPathRefresh.includes(router.pathname)
            ) {
                setInactiveFlag(false);
                // tab is now inactive
            } else {
                setInactiveFlag(true);
                // tab is active again
            }
        });
    }, []);

    const client = new GraphQLClient({
        url: ODDZ_HISTORY_GRAPH_API[predictableToken][selectedChainId],
    });

    const ContentRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return (
                    <BhavishContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <QuickSwapContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
            default:
                return (
                    <BhavishContent
                        inactiveFlag={inactiveFlag}
                        childrenContent={children}
                    />
                );
        }
    };

    return (
        <>
            <SwiperProvider>
                {mounted && (
                    <ClientContext.Provider value={client}>
                        <div
                            className={`h-screen  ${FontStyle()} flex bg-gray-100 relative overflow-hidden `}
                        >
                            {/* {showTermsAndConditionsModal && (
                                <TermsAndConditionsModal />
                            )}
                            {!showTermsAndConditionsModal &&
                            )} */}
                            {!showTermsAndConditionsModal &&
                                typeof account !== "undefined" &&
                                showOnboardingModal &&
                                selectedChainId !==
                                    ODDZ_NETWORK.BSC_MAINNET && (
                                    <OnboardingModal
                                        open={
                                            predictableToken ===
                                            PREDICT_TOKENS.BGN
                                        }
                                        onClose={() => {
                                            dispatch(
                                                updateOnboardingModal(false)
                                            );
                                        }}
                                    />
                                )}

                            <div className="flex flex-col w-0 flex-1 transition-all duration-300 transform overflow-hidden">
                                {magicLoading && <Loader />}
                                {HeaderRender()}
                                {ContentRender()}
                            </div>
                        </div>
                    </ClientContext.Provider>
                )}
            </SwiperProvider>
        </>
    );
};

export default Layout;
