/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React from "react";
import DropdownArrow from "@Public/svgs/Zeroswap/zeroswap-dropdown-arrow.svg";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import NetworkIcon from "@Components/Header/network-icon";

const ZebecNetworkSelect = ({
    margin,
    options,
    expanded,
    buttonRef,
    label,
    setExpanded,
    value,
    rectStyle,
    popupRef,
    handleChange,
    variant,
}) => {
    const NetworkColor = {
        Polygon: "bg-polygon",
        "Arbitrum chain": "bg-arbitrum",
    };

    const NetworkGradientColor = {
        Polygon: "linear-gradient(270deg, #7542CA 0%, #B197DD 100%)",
        Arbitrum: "linear-gradient(270deg, #2D374B 0%, #5D6C89 100%)",
        "zkSync Era Mainnet":
            "linear-gradient(270deg, #7542CA 0%, #B197DD 100%)",
        "Mantle Testnet": "#E7EACC",
        "opBNB Testnet":
            "linear-gradient(102.15deg,#fce09f -40%,#ffb508 113.09%)",
    };

    return (
        <div className={`${margin ? "mt-3" : ""} relative oddz-select`}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                onClick={() => {
                    if (Object.keys(options).length > 1) setExpanded(!expanded);
                }}
                ref={buttonRef}
                className="  text-[#696C80] text-sm leading-6 border-[#2C2D31] border-[1.5px] px-2 py-[6px] gap-1 inline-flex items-center justify-center overflow-hidden rounded-lg group "
            >
                <div className="w-6 h-6  sm:mr-1 lg:mr-0 flex items-center justify-center sm:justify-between lg:h-[1.25rem] ">
                    <NetworkIcon chain={Number(value)} className="" />
                </div>
                <div className="flex items-center">
                    <span className=" text-sm font-semibold px-1.5 hidden tablet:hidden lg:flex">
                        {options[value]}
                    </span>
                    {Object.keys(options).length > 1 && (
                        <DropdownArrow className="w-3" />
                    )}
                </div>
            </button>
            {expanded ? (
                <div
                    ref={popupRef}
                    style={{ boxShadow: "2px 8px 40px rgba(17,20,45,.08)" }}
                    className="absolute z-[999] flex flex-col justify-center py-5 mt-2 text-center w-44 bg-[#ffffff] top-9 right-1 rounded-2xl"
                >
                    {Object.keys(options).map((key: string) => (
                        <button
                            onClick={() => {
                                handleChange(key);
                                handleGaEvent(
                                    upperCase(`network ${options[key]} clicked`)
                                );
                            }}
                            disabled={Number(key) === Number(value)}
                            type="button"
                            className="flex w-full py-3 pl-5 hover:bg-[#F6F6F7] disabled:opacity-40"
                        >
                            <div
                                className={`${
                                    NetworkColor[options[key]]
                                } w-5 h-5 rounded-full flex justify-center items-center`}
                            >
                                <NetworkIcon chain={Number(key)} className="" />
                            </div>
                            <div className="ml-3 font-extrabold">
                                <span className="flex text-sm font-normal text-[#0C111F] opacity-70 hover:opacity-100 hover:text-[#0C111F]">
                                    {options[key]}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ZebecNetworkSelect;
