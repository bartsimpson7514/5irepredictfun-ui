import React from "react";
import { useTranslation } from "react-i18next";

const QuestDetailBlock = ({ Icon, title, description, type = "" }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="p-3 bg-gray-300 rounded w-fit mb-4">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="text-primary-100 text-sm font-medium mb-2">
                {t(title)}
            </h3>
            {type === "link" ? (
                <a
                    href={description}
                    className="text-primary-blue opacity-75 underline text-sm text-ellipsis"
                    target="_blank"
                    rel="noreferrer"
                >
                    {description}
                </a>
            ) : (
                <p className="text-primary-200 text-sm text-ellipsis">
                    {description}
                </p>
            )}
        </div>
    );
};
export default QuestDetailBlock;
