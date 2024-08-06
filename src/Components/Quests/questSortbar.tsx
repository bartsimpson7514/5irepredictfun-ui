import React, { useCallback, useEffect, useRef, useState } from "react";
import Filter from "public/svgs/quest/Filter";
import CheckBox from "@Basic/CheckBox";
import { useTranslation } from "react-i18next";
import Category from "./category";
import { categories } from "./constants";

interface IQuestSortBar {
    onSelectedCategory: (category: string) => void;
    onShowFavorites: (isFavShown: boolean) => void;
    onShowExpired: (isexpiredShown: boolean) => void;
    onShowResolution: (isResolutionShown: boolean) => void;
}
const QuestSortBar: React.FC<IQuestSortBar> = ({
    onSelectedCategory,
    onShowFavorites,
    onShowResolution,
    onShowExpired,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("Trending");
    const [viewFavorites, setViewFavorites] = useState(false);
    const [viewResolution, setViewResolution] = useState(false);
    const [viewExpired, setViewExpired] = useState(false);
    const [openDetailMenu, setOpenDetailMenu] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { t } = useTranslation();

    const onCategorySelected = (title: string) => {
        setSelectedCategory(title);
        onSelectedCategory(title);
    };

    const onSelecteFavorites = () => {
        setViewFavorites(prevState => !prevState);
        onShowFavorites(viewFavorites);
    };

    const onSelecteResolution = () => {
        onShowResolution(!viewResolution);
        setViewResolution(prevState => !prevState);
    };

    const onSelecteExpired = () => {
        onShowExpired(!viewExpired);
        setViewExpired(prevState => !prevState);
    };

    const handleClickOutside = useCallback(
        (event: any) => {
            if (
                openDetailMenu &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpenDetailMenu(false);
            }
        },
        [openDetailMenu]
    );
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setOpenDetailMenu(false));
        window.addEventListener("scroll", () => setOpenDetailMenu(false));
    }, [handleClickOutside]);

    return (
        <div className="flex flex-row justify-between items-center ">
            <div className="block overflow-x-auto w-[90%] scroll-hide sm:w-fit">
                <div
                    className="flex flex-row justify-start items-center gap-6
"
                >
                    {React.Children.toArray(
                        Object.keys(categories).map(key => {
                            return (
                                <Category
                                    title={categories[key]}
                                    selectedCategory={selectedCategory}
                                    onSelected={title =>
                                        onCategorySelected(title)
                                    }
                                />
                            );
                        })
                    )}
                </div>
            </div>
            <button
                type="button"
                className="flex rounded-[10px] cursor-pointer relative"
                ref={buttonRef}
            >
                <Filter
                    className={`${
                        viewExpired || viewFavorites || viewResolution
                            ? "stroke-primary-100"
                            : "stroke-primary-200"
                    } `}
                    onClick={() => {
                        setOpenDetailMenu(!openDetailMenu);
                    }}
                />

                {openDetailMenu && (
                    <button
                        type="button"
                        className="absolute top-7 z-50 right-px w-[154px] bg-token-dropdown-section rounded-[10px] p-2 border border-token-dropdown-border"
                    >
                        <button
                            type="button"
                            className={`flex gap-3 text-sm items-center font-medium py-[9px] pl-[14px] w-full ${
                                viewFavorites
                                    ? "text-primary-100 bg-card-background rounded w-full"
                                    : "text-primary-200"
                            }`}
                            onClick={() => {
                                setOpenDetailMenu(false);
                                onSelecteFavorites();
                            }}
                        >
                            <CheckBox isTrue={viewFavorites} />
                            {t("Favorites")}
                        </button>
                        <button
                            type="button"
                            className={`flex gap-3 items-center text-sm font-medium py-2 pl-[14px] w-full ${
                                viewResolution
                                    ? "text-primary-100 bg-card-background rounded w-full"
                                    : "text-primary-200"
                            }`}
                            onClick={() => {
                                onSelecteResolution();
                                setOpenDetailMenu(false);
                            }}
                        >
                            <CheckBox isTrue={viewResolution} />
                            {t("In_Resolution")}
                        </button>
                        <button
                            type="button"
                            className={`flex gap-3 items-center text-sm font-medium pl-[14px] py-2  ${
                                viewExpired
                                    ? "text-primary-100 bg-card-background rounded w-full"
                                    : "text-primary-200"
                            }`}
                            onClick={() => {
                                onSelecteExpired();
                                setOpenDetailMenu(false);
                            }}
                        >
                            <CheckBox isTrue={viewExpired} />
                            {t("Expired")}
                        </button>
                    </button>
                )}
            </button>
            {/* <div className=" flex-row gap-[14.18px] items-center hidden sm:flex">
                <button
                    type="button"
                    className={`flex gap-1 items-center text-sm font-medium ${
                        viewFavorites ? "text-tooltip-text" : "text-primary-200"
                    }`}
                    onClick={() => onSelecteFavorites()}
                >
                    <CheckBox isTrue={viewFavorites} />
                    {t("Favorites")}
                </button>
                <button
                    type="button"
                    className={`flex gap-1 items-center text-sm font-medium ${
                        viewResolution ? "text-tooltip-text" : "text-primary-200"
                    }`}
                    onClick={() => onSelecteResolution()}
                >
                    <CheckBox isTrue={viewResolution} />
                    {t("In_Resolution")}
                </button>
                <button
                    type="button"
                    className={`flex gap-1 items-center text-sm font-medium ${
                        viewExpired ? "text-tooltip-text" : "text-primary-200"
                    }`}
                    onClick={() => onSelecteExpired()}
                >
                    <CheckBox isTrue={viewExpired} />
                    {t("Expired")}
                </button>
            </div> */}
        </div>
    );
};

export default QuestSortBar;
