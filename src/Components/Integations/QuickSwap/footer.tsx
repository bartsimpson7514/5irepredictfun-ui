/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useTranslation } from "react-i18next";
// import CoingeckoIcon from "public/svgs/QuickSwap/social/Coingecko.svg";
// import DiscordIcon from "public/svgs/QuickSwap/social/Discord.svg";
// import MediumIcon from "public/svgs/QuickSwap/social/Medium.svg";
// import RedditIcon from "public/svgs/QuickSwap/social/Reddit.svg";
// import TelegramIcon from "public/svgs/QuickSwap/social/Telegram.svg";
// import TwitterIcon from "public/svgs/QuickSwap/social/Twitter.svg";
// import YouTubeIcon from "public/svgs/QuickSwap/social/YouTube.svg";

// const socialLink = [
//     {
//         link: "https://www.reddit.com/r/QuickSwap/",
//         Icon: RedditIcon,
//         title: "Reddit",
//     },
//     {
//         link: "invite/XJTM7FV88Y",
//         Icon: DiscordIcon,
//         title: "Discord",
//     },
//     {
//         link: "https://twitter.com/QuickswapDEX",
//         Icon: TwitterIcon,
//         title: "Twitter",
//     },
//     {
//         link: "https://quickswap-layer2.medium.com/",
//         Icon: MediumIcon,
//         title: "Medium",
//     },
//     {
//         link: "https://www.youtube.com/channel/UCrPlF-DBwD-UzLFDzJ4Z5Fw",
//         Icon: YouTubeIcon,
//         title: "Youtube",
//     },
//     {
//         link: "https://t.me/QuickSwapDEX",
//         Icon: TelegramIcon,
//         title: "Telegram",
//     },
//     {
//         link: "https://www.coingecko.com/en/exchanges/quickswap",
//         Icon: CoingeckoIcon,
//         title: "CoinGecko",
//     },
// ];

const footerInfo = [
    {
        name: "Terms & Polices",
        url: "",
    },
    {
        name: "Privacy Policy",
        url: "",
    },
];

const FooterTitle = () => {
    const { t } = useTranslation();
    return (
        <p className="text-primary-200 text-sm text-left">
            {t("Bhavish Finance")}
        </p>
    );
};

const QuickSwapFooter = () => {
    const { t } = useTranslation();
    return (
        <div className="px-4 bottom-4 w-full sm:mb-24 mb-40 max-w-[1376px] mlgh:box-content w-full mx-auto">
            <div className="border-t border-gray-400 py-6 flex items-start sm:items-center dark:border-gray-400 justify-between flex-col md:flex-row">
                <FooterTitle />

                <div className="flex md:order-2 mt-6 md:mt-0 flex-wrap items-center gap-2">
                    <div className="w-full sm:w-fit justify-around flex space-x-6">
                        {React.Children.toArray(
                            footerInfo.map(info => (
                                <a
                                    target="_blank"
                                    className="text-primary-100 text-left text-sm underline-offset-2 underline"
                                    href={info.url}
                                    rel="noreferrer"
                                >
                                    {t(info.name)}
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickSwapFooter;
