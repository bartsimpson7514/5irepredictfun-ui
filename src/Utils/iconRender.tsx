import React from "react";
import AppleIcon from "@Public/svgs/stocks/apple-icon.svg";
import TeslaIcon from "@Public/svgs/stocks/tesla-icon.svg";
import AmazonIcon from "@Public/svgs/stocks/amazon-icon.svg";
import GoldIcon from "@Public/svgs/stocks/gold-icon.svg";
import SilverIcon from "@Public/svgs/stocks/silver-icon.svg";
import { ASSETS } from "@Constants";

export const assetsIconRender = (option, style) => {
    const ICONS = [
        {
            name: ASSETS.BTC,
            src: "bitcoin.png",
        },
        {
            name: ASSETS.ETH,
            src: "ethereum.png",
        },
        {
            name: ASSETS.MATIC,
            src: "polygon-matic-new.png",
        },
        {
            name: ASSETS.BNB,
            src: "bnb.png",
        },
        {
            name: ASSETS.ARB,
            src: "arbitrum.png",
        },
        {
            name: ASSETS.TLOS,
            src: "telos.png",
        },
        {
            name: ASSETS.ZBC,
            src: "ZBC.png",
        },
    ];

    return (
        <>
            <>
                {ICONS.map(
                    icon =>
                        option === icon.name && (
                            <img
                                className={style}
                                key={icon.name}
                                alt={icon.name}
                                src={`/images/${icon.src}`}
                            />
                        )
                )}

                {option === "XAU" && <GoldIcon className={style} />}
                {option === "XAG" && <SilverIcon className={style} />}
                {option === "TSLA" && <TeslaIcon className={style} />}
                {option === "AMZN" && <AmazonIcon className={style} />}
                {option === "APPL" && <AppleIcon className={style} />}
            </>
        </>
    );
};
