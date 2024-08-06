import React from "react";
import { useTranslation } from "react-i18next";

interface IMarketCategory {
    title: string;
    onSelected: (title: string) => void;
    selectedCategory: string;
}

const Category: React.FC<IMarketCategory> = ({
    title,
    onSelected,
    selectedCategory,
}) => {
    const handleClick = () => {
        onSelected(title);
    };
    const { t } = useTranslation();
    return (
        <div>
            <button
                type="button"
                className={`flex flex-row whitespace-nowrap justify-center items-center gap-6
                ${
                    title === selectedCategory
                        ? " text-primary-blue font-semibold gradient-text bg-footer-text"
                        : "text-primary-200 "
                }
                `}
                onClick={() => handleClick()}
            >
                <span className="text-sm font-medium">{t(title)}</span>
            </button>
        </div>
    );
};

export default Category;
