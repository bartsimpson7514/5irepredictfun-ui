import UserHistoryIcon from "@Public/svgs/user-history.svg";
import UserLeaderboardIcon from "@Public/svgs/user-leaderboard.svg";
import UserPortfolioIcon from "@Public/svgs/user-portfolio.svg";
import React from "react";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import resolveConfig from "tailwindcss/resolveConfig";
import { useTranslation } from "react-i18next";
import tailwindConfig from "../../../tailwind.config";

const userSections = [
    {
        label: "Your Portfolio",
        description: "Your Portfolio",
        link: "profile",
    },

    {
        label: "History",
        description: "History",
        link: "history",
    },

    {
        label: "Leaderboard",
        description: "Leaderboard",
        link: "leaderboard",
    },
];

const getInfoTabIcon = link => {
    const fullConfig = resolveConfig(tailwindConfig);

    const strokeColor =
        link.toLowerCase() === window.location.pathname.substring(1)
            ? fullConfig.theme.colors["sidebar-selected-icon"]
            : fullConfig.theme.colors["sidebar-icon"];
    switch (link) {
        case "portfolio":
            return <UserPortfolioIcon stroke={strokeColor} />;
        case "history":
            return <UserHistoryIcon stroke={strokeColor} />;
        case "leaderboard":
            return <UserLeaderboardIcon stroke={strokeColor} />;

        default:
            return <UserPortfolioIcon stroke={strokeColor} />;
    }
};

const ListItem = ({ onSelect, label, link }) => {
    const fullConfig = resolveConfig(tailwindConfig);

    const { t } = useTranslation();
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className={`flex items-center justify-center w-10 h-10 cursor-pointer text-primary-100 select-none relative rounded-small border border-sidebar-border hover:bg-button-hover ${
                link.toLowerCase() === window.location.pathname.substring(1)
                    ? `bg-sidebar-selected`
                    : `bg-sidebar`
            }  ${link}`}
            onClick={() => {
                onSelect();
            }}
            data-tip={t(label)}
            data-for={label}
        >
            <div className="flex items-center">{getInfoTabIcon(link)}</div>
            <ReactTooltip
                effect="solid"
                id={label}
                place="bottom"
                className="text-center w-40 text-sm justify-center absolute z-100 rounded-md"
                backgroundColor={fullConfig.theme.colors["tooltip-background"]}
                textColor={fullConfig.theme.colors["tooltip-text"]}
            />
        </li>
    );
};

const UserInfoTab = () => {
    const router = useRouter();

    return (
        <div className="sm:flex gap-3 hidden">
            {React.Children.toArray(
                userSections.map(item => (
                    <ListItem
                        {...item}
                        onSelect={() => {
                            router.push(`/${item.link}`);
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default UserInfoTab;
