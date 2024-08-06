import React from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { appWithTranslation } from "next-i18next";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "@Utils/getLibrary";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import { makeStore } from "@Redux";
import App, { AppInitialProps, AppContext } from "next/app";
import { AppWithStore } from "@Interfaces";
import "@Static/css/main.scss";
import "tailwindcss/tailwind.css";
import "@Styled/global.css";
import "@Styled/TimePicker.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "@Components/Basic/AlertTemplate";
import Layout from "@Components/Layout";
import { hotjar } from "react-hotjar";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import {
    updateMagicNetworkChanged,
    updateSelectedAsset,
    updateSelectedChainId,
} from "@Reducers/trade";
import { withRouter } from "next/router";
import { GTAG_MAPPING, WALLET_NAME, symbolToAssetMapping } from "@Constants";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { setupNetwork } from "@Utils";

const options = {
    position: positions.TOP_RIGHT,
    timeout: 8000,
    offset: "70px 17px",
    transition: transitions.FADE,
    containerStyle: {
        zIndex: 100,
    },
};

class WebApp extends App<AppWithStore> {
    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return { pageProps };
    }

    state = {
        selectedNetworkID: 0,
        isConnected: null,
    };

    componentDidMount() {
        hotjar.initialize(3065769, 6);
        AOS.init();

        const asset = String(this.props.router.query.asset);
        const network = Number(this.props.router.query.network);
        const isConnected = this.props.store.getState().prediction
            .walletConnected;

        if (symbolToAssetMapping[asset]) {
            this.props.store.dispatch(
                updateSelectedAsset(symbolToAssetMapping[asset].asset)
            );
        }
        if (network) {
            const supportedNetworks =
                SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
                    process.env.NEXT_PUBLIC_NETWORK_TYPE
                ];
            if (
                network &&
                supportedNetworks.some(
                    ({ chainId, isActive }) => chainId === network && isActive
                )
            ) {
                if (isConnected === WALLET_NAME.Magiclink) {
                    this.props.store.dispatch(
                        updateSelectedChainId(Number(network))
                    );
                    this.props.store.dispatch(updateMagicNetworkChanged(true));
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else if (isConnected) {
                    setupNetwork(Number(network), id => {
                        this.props.store.dispatch(
                            updateSelectedChainId(Number(id))
                        );
                    });
                } else {
                    this.props.store.dispatch(updateSelectedChainId(network));
                }
            }
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const fullConfig = resolveConfig(tailwindConfig);
        return (
            <>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${
                        // @ts-ignore
                        GTAG_MAPPING[this.props.selectedNetworkID]
                    }`}
                />

                <Script id="gtag" strategy="lazyOnload">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){
                        dataLayer.push(arguments);
                      }
                      gtag('js', new Date());
                      gtag('config', '${
                          // @ts-ignore
                          GTAG_MAPPING[this.props.selectedNetworkID]
                      }', {
                        page_path: window.location.pathname,
                      });
                    `}
                </Script>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Provider store={store}>
                        <AlertProvider template={AlertTemplate} {...options}>
                            <Layout>
                                <NextNProgress
                                    color={fullConfig.theme.colors.primary}
                                />
                                <Component {...pageProps} />
                            </Layout>
                        </AlertProvider>
                    </Provider>
                </Web3ReactProvider>
            </>
        );
    }
}

const mapStateToProps = state => ({
    selectedNetworkID: state.prediction.selectedChainId,
});

export default withRouter(
    withRedux(makeStore)(connect(mapStateToProps)(appWithTranslation(WebApp)))
);
