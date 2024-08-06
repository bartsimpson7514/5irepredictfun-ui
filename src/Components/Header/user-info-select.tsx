import ThreeDotsIcon from "@Public/svgs/three-dots.svg";
import UserHistoryIcon from "@Public/svgs/user-history.svg";
import UserLeaderboardIcon from "@Public/svgs/user-leaderboard.svg";
import UserPortfolioIcon from "@Public/svgs/user-portfolio.svg";
import { updateSelectedUtility } from "@Reducers/trade";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const ListItem = ({ icon, description, onSelect, selectedutility }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className={`flex flex-col cursor-pointer justify-center ${
                selectedutility === description
                    ? "opacity-30 text-primary-200 "
                    : "text-primary-200 "
            }`}
            onClick={onSelect}
        >
            <div className="flex flex-row items-center justify-between cursor-pointer  relative px-3 py-2 ">
                <div className="flex flex-row items-center space-x-1 ">
                    {icon}
                    <span>{description}</span>
                </div>

                {selectedutility === description && (
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
                )}
            </div>
        </li>
    );
};

const UserInfoSection = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { selectedutility } = useSelector(
        (state: AppState) => state.prediction
    );

    const userSections = [
        {
            label: "Profile",
            description: "Profile",
            icon: <UserPortfolioIcon stroke="#696C80" />,
            link: "/profile",
        },

        {
            label: "Leaderboard",
            description: "Leaderboard",
            icon: <UserLeaderboardIcon stroke="#696C80" />,
            link: "/leaderboard",
        },

        {
            label: "History",
            description: "History",
            icon: <UserHistoryIcon stroke="#696C80" />,
            link: "/history",
        },
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

    const fullConfig = resolveConfig(tailwindConfig);

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
                    // className="relative cursor-pointer w-fit px-3 py-2 rounded-md border-[1px] border-gray-200 group bg-primary-background text-sm leading-6 font-normal  h-[38px]"
                    className="w-8 h-8 flex items-center bg-sidebar cursor-pointer justify-center rounded-[4px]"
                    ref={buttonRef}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ThreeDotsIcon
                        className="historymweb"
                        stroke={fullConfig.theme.colors["three-dot-stroke"]}
                        color={
                            expanded
                                ? fullConfig.theme.colors["live-card-border"]
                                : fullConfig.theme.colors["three-dot-stroke"]
                        }
                    />
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
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="max-h-56 bg-card-background border-[1.5px] border-token-dropdown-border  rounded-md p-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {React.Children.toArray(
                        userSections.map(item => (
                            <ListItem
                                {...item}
                                onSelect={() => {
                                    setExpanded(false);
                                    router.push(item.link);
                                    dispatch(
                                        updateSelectedUtility(item.description)
                                    );
                                }}
                                selectedutility={selectedutility}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserInfoSection;
