/* eslint-disable import/no-extraneous-dependencies */
import RestrictedIcon from "@Public/svgs/restricted-icon.svg";
import React from "react";

const RestrictedInfo = () => {
    return (
        <div className="text-sm p-2 rounded-md align-center sm:h-full m-auto justify-center">
            <div
                className="w-full flex items-center justify-center flex-col"
                style={{ height: "360px" }}
            >
                <div>
                    <RestrictedIcon />
                </div>

                <span className="text-[14px] text-primary-100 font-medium text-highlight mt-4">
                    Access Restricted!
                </span>
                <span className="text-primary-100 opacity-70 text-sm text-highlight mt-2 text-center break-normal m-w-[355px]">
                    {`You are not allowed to access Bhavish prediction market
                    since your region falls in the restricted territories. Refer
                    to “Section 3.4” in the T&C to `}
                    <a
                        target="_blank"
                        className="text-primary-blue underline"
                        href="/"
                        rel="noreferrer"
                    >
                        know more
                    </a>
                    {` about restricted territories.`}
                </span>
            </div>
        </div>
    );
};

export default RestrictedInfo;
