/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import Telegram from "public/svgs/telegram.svg";
import Twitter from "public/svgs/twitter.svg";
import Github from "public/svgs/github.svg";
import { isMobile } from "react-device-detect";
import { handleGaEvent } from "@Utils/googleanalytics";
import TokenSection from "@Components/Header/token-section";
import LogoName from "public/svgs/oddz-logo-name.svg";
import LogoNameMweb from "public/svgs/oddz-logo-name-mweb.svg";

import LanguageSection from "@Components/Header/language-section";
// import LanguageSection from "@Components/Header/language-section";
import { useWeb3React } from "@web3-react/core";
import LanguageSectionFooter from "@Components/Header/LanguageSectionFooter";

import { useTranslation } from "react-i18next";
import PythNetwork from "public/svgs/powered/pyth-network.svg";
import Gelato from "public/svgs/powered/gelato.svg";
import TheGraph from "public/svgs/powered/the-graph-grt-logo.svg";

const footerInfo = [
    {
        name: "FAQs",
        url: "",
    },
    {
        name: "Terms and Policies",
        url: "",
    },
    {
        name: "Privacy Policy",
        url: "",
    },
];

const socialLink = [
    {
        name: "Twitter",
        url: "",
        eventName: "TWITTER ICON CLICKED",
        Icon: Twitter,
    },
    {
        name: "Telegram",
        url: "",
        eventName: "TELEGRAM ICON CLICKED",
        Icon: Telegram,
    },
    // {
    //     name: "Medium",
    //     url: "https://medium.com/bhavish-finance",
    //     eventName: "MEDIUM ICON CLICKED",
    //     Icon: Medium,
    // },
    {
        name: "Github",
        url: "https://github.com/bhavish-finance",
        eventName: "GITHUB ICON CLICKED",
        Icon: Github,
    },
];

const FooterTitle = () => {
    const { t } = useTranslation();
    return (
        <p className="text-primary-200 text-left text-sm font-normal leading-[22px] md:order-1 mt-4 md:mt-0">
            {isMobile ? t("footerTitleMweb") : t("footerTitleWeb")}
        </p>
    );
};
const LogoHeader = () => {
    return (
        <>
            <a
                href=""
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                    handleGaEvent("BHAVISH LANDING PAGE CLICKED");
                }}
            >
                <LogoNameMweb className="h-5 sm:hidden" />

                <LogoName className="h-5 sm:block hidden" />
            </a>
        </>
    );
};
const BhavishFooter = () => {
    const { account } = useWeb3React();
    const [connecting, setConnecting] = useState(false);

    useEffect(() => {
        if (account) {
            setConnecting(false);
        }
    }, [account]);

    return (
        <>
            <>
                <div className="px-6 flex items-center justify-between flex-row">
                    <div className="flex items-center justify-start">
                        <LogoHeader />
                    </div>
                    <div className="flex space-x-5 w-full sm:w-fit justify-end">
                        {React.Children.toArray(
                            socialLink.map(({ url, eventName, name, Icon }) => (
                                <a
                                    href={url}
                                    className="text-ternary hover:text-ternary h-6 w-6 items-center flex justify-center dark:bg-gray-400 rounded-full bg-footer-text"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => handleGaEvent(eventName)}
                                >
                                    <span className="sr-only">{name}</span>
                                    <Icon />
                                </a>
                            ))
                        )}
                    </div>
                </div>
                <div className=" py-2 space-x-6 sm:py-6 flex sm:items-center items-start justify-between flex-col md:flex-row">
                    <p className="text-primary-200  px-6 text-sm leading-5 relative top-8 sm:top-0 flex items-center">
                        <h3 className="font-bold text-lg">Partners:</h3>
                        <span className="flex items-center ml-2">
                            <PythNetwork className="h-12 w-12" />
                            <span className="ml-1">Pyth network</span>
                        </span>
                        <span className="flex items-center ml-2">
                            <TheGraph className="h-12 w-12" />
                            <span className="ml-1">The graph</span>
                        </span>
                        <span className="flex items-center ml-2">
                            <Gelato className="h-16 w-16" />
                        </span>
                    </p>

                    <div className="flex justify-between items-center gap-x-3 sm:gap-0 relative top-14 sm:top-0">
                        <div className="flex md:order-2 sm:order-2 sm:mt-4  md:mt-0 flex-wrap items-start sm:items-center">
                            {isMobile ? (
                                <LanguageSectionFooter footer header={false} />
                            ) : (
                                <LanguageSection
                                    footer
                                    header={false}
                                    language
                                />
                            )}
                        </div>
                        <div className="order-3">
                            <TokenSection connecting={connecting} />
                        </div>
                    </div>
                </div>
            </>
            <div className="px-6 bottom-4 w-full pb-16 mb-[250px] sm:mb-0 relative top-[76px] sm:top-0">
                <div className="border-t border-gray-400 py-2 sm:py-6 flex sm:items-center items-start dark:border-gray-400 justify-between flex-col md:flex-row">
                    <FooterTitle />

                    <div className="flex md:order-2 sm:mt-4 md:mt-0 flex-wrap items-start sm:items-center mt-2 gap-2">
                        <div className="w-full sm:w-fit justify-around flex space-x-6">
                            {React.Children.toArray(
                                footerInfo.map(info => (
                                    <a
                                        target="_blank"
                                        className="text-primary-100 text-left text-sm leading-29 dark:text-primary-100 underline underline-offset-4"
                                        href={info.url}
                                        rel="noreferrer"
                                    >
                                        {info.name}
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BhavishFooter;
