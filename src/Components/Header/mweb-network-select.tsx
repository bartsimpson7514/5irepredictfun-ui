import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import MwebThreeDotsIcon from "@Public/svgs/horizontal-three-dots.svg";
import { useToggleLanguageNetworkModalToggle } from "@Reducers/trade/hooks";
import { useTranslation } from "react-i18next";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { upperCase } from "@Utils/common";
import { validNetwork } from "@Utils";
import { FAUCET_URL } from "@Constants";

const ListItem = ({ description, value, onSelect, isMore, isValue }) => {
    const returnTextColor = () => {
        if (value === "Wrong Network") {
            return "text-primary-warning";
        }
        return "text-gray-500";
    };
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className={`flex flex-col cursor-pointer justify-center ${"text-primary-200 "}`}
            onClick={onSelect}
        >
            <div className="flex flex-row items-center justify-between cursor-pointer  relative px-4 py-2 ">
                <div className="text-xs text-primary-100 ">
                    <span>{description}</span>
                </div>
                {isValue ? (
                    <div className="flex gap-2">
                        <span
                            className={`text-xs whitespace-nowrap ${returnTextColor()}`}
                        >
                            {value}
                        </span>

                        <span
                            className={`pt-0.5 ${isMore ? "block" : "hidden"}`}
                        >
                            <svg
                                width="6"
                                height="12"
                                viewBox="0 0 6 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.750305 1.50003L5.25031 6.00003L0.750305 10.5"
                                    stroke="#C7CAD9"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                ) : null}
            </div>
        </li>
    );
};

const MwebNetworkSection = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const { selectedChainId, isInvalidNetwork } = useSelector(
        (state: AppState) => state.prediction
    );
    const toggleLanguageModal = useToggleLanguageNetworkModalToggle();
    const { i18n } = useTranslation();
    const network = SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].filter(val => {
        return val.chainId === selectedChainId;
    });
    const networkName =
        network && network.length > 0 ? network[0].networkName : "";
    const userSections = [
        {
            label: "Language",
            description: "Language",
            value: `${upperCase(i18n.language)}`,
            isMore: true,
            isValue: true,
        },

        {
            label: "Network",
            description: "Network",
            value: validNetwork(selectedChainId)
                ? networkName
                : "Wrong Network",
            isMore: false,
            isValue: true,
        },
        process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
            ? {
                  label: "Faucet",
                  description: "Faucet",
                  value: "Faucet",
                  isMore: false,
                  isValue: false,
              }
            : null,
    ];

    const handleClickOutside = useCallback(
        (event: any) => {
            if (
                expanded &&
                buttonRef.current &&
                popupRef.current &&
                !buttonRef.current.contains(event.target) &&
                !popupRef.current.contains(event.target)
            ) {
                setExpanded(false);
            }
        },
        [expanded]
    );
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    return (
        <div className="oddz-select relative sm:hidden block">
            <div>
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    className="w-8 h-8 flex items-center cursor-pointer self-end"
                    ref={buttonRef}
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="inline-block relative">
                        <MwebThreeDotsIcon />
                        {isInvalidNetwork && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full circle-2 ring-primary-warning bg-primary-warning" />
                        )}
                    </div>
                </button>
            </div>
            <div
                className={`absolute right-0 rounded-md w-[202px] shadow-lg transition-all duration-100  oddz-select-list mt-1
             ${
                 expanded
                     ? "pointer-events-auto opacity-100"
                     : "opacity-0 pointer-events-none"
             }
                  `}
                ref={popupRef}
                style={{ zIndex: "1000" }}
            >
                <div className="text-primary-100 text-xs px-4 py-1 bg-gray-400 rounded-t-md">
                    More Actions
                </div>
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="max-h-56 bg-gray-300 border-[1.5px] border-gray-400  rounded-b-md p-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {React.Children.toArray(
                        userSections.map(item => (
                            <ListItem
                                {...item}
                                onSelect={() => {
                                    setExpanded(false);
                                    if (item.description === "Language") {
                                        toggleLanguageModal();
                                    }
                                    if (item.description === "Faucet") {
                                        window.open(
                                            FAUCET_URL[selectedChainId],
                                            "_blank"
                                        );
                                    }
                                }}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MwebNetworkSection;
