import React from "react";
import LeftArrow from "@Public/svgs/left-arrow.svg";
import { useRouter } from "next/router";
// import { shortenName } from "@Utils";

const BackToIndex = ({ title = "Fun Predictions", link = "/" }) => {
    const router = useRouter();
    return (
        <div
            className="flex gap-2 items-center cursor-pointer w-fit px-2 sm:px-0"
            onClick={() => router.push(link)}
            role="presentation"
        >
            <LeftArrow className="stroke-cards-live-border cursor-pointer" />
            <h1 className="text-base font-medium text-primary-200 leading-4 flex items-center">
                <span className="  text-primary-100">{title}</span>
            </h1>
        </div>
    );
};

export default BackToIndex;
