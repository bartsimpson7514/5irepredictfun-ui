import React, { useCallback, useEffect, useRef, useState } from "react";
import Crypto from "@Public/svgs/sidebar/Crypto.svg";
import Vaults from "@Public/svgs/sidebar/Vaults.svg";
// import Stocks from "@Public/svgs/sidebar/Stocks.svg";
// import Sports from "@Public/svgs/sidebar/Sports.svg";
// import Commodities from "@Public/svgs/sidebar/Commodities.svg";
// import RealEvents from "@Public/svgs/sidebar/RealEvents.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Quest from "@Public/svgs/sidebar/Quest.svg";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "lodash";
// import Quest from "@Public/svgs/sidebar/Quest.svg";
import { getFormattedShallowPath } from "@Utils";
import { useTranslation } from "react-i18next";

const tabs = [
    // {
    //     name: "Profile",
    //     Icon: Portfolio,
    //     link: "/profile",
    // },
    {
        name: "Crypto",
        Icon: Crypto,
        link: "/",
    },
    // { name: "Stocks", Icon: Stocks, link: "/stocks", current: false },
    // {
    //     name: "Commodities",
    //     Icon: Commodities,
    //     link: "/commodities",
    // },
    // { name: "Sports", Icon: Sports, link: "/sports" },
    { name: "Vaults", Icon: Vaults, link: "/vaults" },
    // { name: "Stocks", Icon: Stocks, link: "/stocks" },
    { name: "Quests", Icon: Quest, link: "/quests" },
    // { name: "Leaderboard", Icon: Leaderboard, link: "/leaderboard" },
];

const DropdownSelect = ({ options }) => {
    const router = useRouter();

    const [expanded, setExpanded] = useState(false);
    const [rectStyle, setRectStyle] = useState({});
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

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
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();

        setRectStyle({
            width: `${rect.width}px`,
            zIndex: "1000",
        });
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    const otherTabs = [
        {
            name: "Profile",
            link: "/profile",
        },
        { name: "History", link: "/history" },
        { name: "Leaderboard", link: "/leaderboard" },
    ];

    return (
        <div className="relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className="relative items-center flex justify-between gap-2 bg-[#1C1F29] rounded-[48px] outline-none transition-all duration-300 cursor-pointer focus:outline-none px-4 py-3 w-[150px]  text-left  text-base"
                ref={buttonRef}
                onClick={() => setExpanded(!expanded)}
            >
                <span className="flex items-center justify-center gap-2">
                    <span
                        className="truncate text-[#FFFFFF] flex flex-row items-center"
                        data-testid="selected-option"
                    >
                        <span>
                            {
                                tabs.find(
                                    tab =>
                                        getFormattedShallowPath(
                                            router.pathname
                                        ) === tab.link
                                )?.name
                            }
                            {
                                otherTabs.find(
                                    tab =>
                                        getFormattedShallowPath(
                                            router.pathname
                                        ) === tab.link
                                )?.name
                            }
                        </span>
                    </span>
                </span>
                <span className="absolute right-3 inset-y-0  flex items-center cursor-pointer">
                    <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.4625 0.806253C11.4242 0.715252 11.3599 0.63761 11.2776 0.58311C11.1953 0.528611 11.0987 0.499694 11 0.500002H0.999976C0.901263 0.499694 0.804668 0.528611 0.722363 0.58311C0.640058 0.63761 0.575727 0.715252 0.537476 0.806253C0.501453 0.898608 0.492315 0.999275 0.511117 1.09661C0.52992 1.19394 0.575896 1.28396 0.643726 1.35625L5.64373 6.35625C5.7393 6.44866 5.86704 6.50032 5.99998 6.50032C6.13292 6.50032 6.26066 6.44866 6.35623 6.35625L11.3562 1.35625C11.4241 1.28396 11.47 1.19394 11.4888 1.09661C11.5076 0.999275 11.4985 0.898608 11.4625 0.806253Z"
                            fill="white"
                        />
                    </svg>
                </span>
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md shadow-lg transition-all duration-100 ${
                    expanded
                        ? "pointer-events-auto opacity-100"
                        : "opacity-0 pointer-events-none"
                }
                  `}
                style={rectStyle}
                ref={popupRef}
            >
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="max-h-56 bg-gray-200  rounded-md  text-xs  py-4 overflow-auto focus:outline-none sm:text-sm"
                >
                    {React.Children.toArray(
                        options.map(option => (
                            <>
                                {option.name !== "History" && (
                                    <li
                                        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                        role="option"
                                        key={option.name}
                                        className="text-primary-100  cursor-default select-none relative px-4 py-2 hover:bg-gray-100 transition-all duration-300 li-option"
                                        onClick={() => {
                                            handleGaEvent(
                                                upperCase(
                                                    `${option.name} nav path selected`
                                                )
                                            );
                                            router.push({
                                                pathname: tabs.find(
                                                    tab =>
                                                        option.name === tab.name
                                                ).link,
                                            });
                                            setExpanded(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="flex flex-row items-center font-normal truncate "
                                                data-testid="select-option"
                                            >
                                                {`${option.name}`}
                                            </span>
                                        </div>
                                        {option.name ===
                                            tabs.find(
                                                tab =>
                                                    getFormattedShallowPath(
                                                        router.pathname
                                                    ) === tab.link
                                            )?.name && (
                                            <span className="absolute inset-y-0 right-4 flex items-center">
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </li>
                                )}
                            </>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

const OnyxTabs = () => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div>
            <div className="sm:hidden">
                <DropdownSelect options={tabs} />
            </div>
            <div className="hidden sm:block cursor-pointer">
                <nav
                    className="flex bg-[#1C1F29] p-1 rounded-[48px] shadow cursor-pointer"
                    aria-label="Tabs"
                >
                    {React.Children.toArray(
                        tabs.map(tab => (
                            <>
                                {tab.name !== "History" && (
                                    <Link href={tab.link} key={tab.name}>
                                        <div
                                            role="button"
                                            tabIndex={-1}
                                            key={tab.name}
                                            onClick={() => {
                                                handleGaEvent(
                                                    upperCase(
                                                        `${tab.name} nav path selected`
                                                    )
                                                );
                                            }}
                                            className={`
                                            flex flex-row items-center
                                        ${
                                            getFormattedShallowPath(
                                                router.pathname
                                            ) === tab.link
                                                ? "text-[#FFFFFF] bg-[#217BF4]"
                                                : "text-[#FFFFFF] "
                                        }
                    
                                        rounded-[48px]
                                        group  relative min-w-0 overflow-hidden  py-2  px-4 font-normal text-center text-base focus:z-10
                                    `}
                                        >
                                            <span className="cursor-pointer flex flex-row items-center">
                                                {t(tab.name)}
                                            </span>
                                        </div>
                                    </Link>
                                )}
                            </>
                        ))
                    )}
                </nav>
            </div>
        </div>
    );
};

export default OnyxTabs;
