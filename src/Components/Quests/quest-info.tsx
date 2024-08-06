import React from "react";
import { useTranslation } from "react-i18next";

const QuestInfo = ({ Icon, title, info }) => {
    const { t } = useTranslation();
    return (
        <div className="border rounded-[10px] border-primary-100 border-opacity-10">
            <div className="bg-quest-info-header px-6 py-4 flex gap-4 items-center">
                <div className="bg-quest-info p-2 rounded">
                    <Icon />
                </div>
                <div className="text-primary-100 text-base font-medium">
                    {t(title)}
                </div>
            </div>
            <div className="px-6 py-4 break-words text-justify">
                <span className="text-primary-200 text-sm">{info()}</span>
            </div>
        </div>
    );
};

export default QuestInfo;
