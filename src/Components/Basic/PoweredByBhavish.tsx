import React from "react";
import LogoName from "@Public/svgs/nexter-footer-logo.svg";
import Link from "next/link";
import { handleGaEvent } from "@Utils/googleanalytics";
import Telegram from "public/svgs/telegram.svg";
import Discord from "public/svgs/discord.svg";
import Github from "public/svgs/github.svg";
import Twitter from "public/svgs/twitter.svg";
import { upperCase } from "@Utils/common";
import { useTranslation } from "react-i18next";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import Image from "next/image";
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
    {
        name: "Github",
        url: "",
        eventName: "GITHUB ICON CLICKED",
        Icon: Github,
    },
    // {
    //     name: "Medium",
    //     url: "https://medium.com/bhavish-finance",
    //     eventName: "MEDIUM ICON CLICKED",
    //     Icon: Medium,
    // },
    {
        name: "Discord",
        url: "",
        eventName: "DISCORD ICON CLICKED",
        Icon: Discord,
    },
];

const PoweredByBhavish = () => {
    const fullConfig = resolveConfig(tailwindConfig);

    const { t } = useTranslation();
    return (
        <div className="flex flex-col sm:gap-4 gap-5 w-full mb-6">
            <div className="flex gap-4 sm:gap-0 justify-between w-full">
                <div className="flex gap-1 items-center">
                    <Link href="https://5ire.org/" passHref>
                        <button
                            type="button"
                            onClick={() =>
                                handleGaEvent(upperCase("route to landingpage"))
                            }
                            className="flex items-center"
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                            >
                                <Image
                                    src="/images/logo_dark_fun.png"
                                    width="20"
                                    height="20"
                                />
                            </a>
                            <span className="font-medium text-16 ml-1">
                                5irepredict.fun
                            </span>
                        </button>
                    </Link>
                </div>

                <div className="flex space-x-4">
                    {React.Children.toArray(
                        socialLink.map(({ url, eventName, name, Icon }) => (
                            <a
                                href={url}
                                className="text-ternary hover:text-ternary h-6 w-6 items-center flex justify-center bg-footer-icons rounded-full"
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => handleGaEvent(eventName)}
                            >
                                <span className="sr-only">{name}</span>
                                <Icon className="fill-asset-text" />
                            </a>
                        ))
                    )}
                </div>
            </div>
            <div className="text-footer-message-text text-xs max-w-[400px]">
                {t("Powered_By_BhavishFinance")}
            </div>
        </div>
    );
};

export default PoweredByBhavish;
