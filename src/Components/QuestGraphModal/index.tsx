import React, { FC } from "react";
import Portal from "@reach/portal";
import CloseIcon from "public/svgs/close.svg";
import { Quest } from "@Components/Quests/constants";
import QuestGraphSection from "@Components/Quests/quest-graph-section";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

interface IQuestGraphModal {
    open: boolean;
    onClose: () => void;
    questData: Quest;
    questionIndex?: number;
    currentQuestion?: number;
}
export const QuestGraphModal: FC<IQuestGraphModal> = ({
    open,
    onClose,
    questData,
    questionIndex,
    currentQuestion,
}) => {
    const { t } = useTranslation();
    return (
        <Portal>
            <div
                className={`w-full h-full inset-0 fixed bg-black  bg-opacity-30 z-50 text-primary-100 flex items-center justify-center transition-all duration-300  ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-80" />
                </div>
                <div
                    className={`${
                        isMobile ? "w-[343px]" : "w-[656px]"
                    } h-auto bg-content-background rounded-2xl z-50 text-primary-100 shadow-sm transition-all duration-300`}
                    style={{ maxWidth: "700px" }}
                >
                    <section className="w-full px-6 pt-6 text-primary-100 flex items-center justify-between shadow-sm">
                        <div className="text-base text-primary-100 leading-7 font-medium	">
                            {t("Graph")}
                        </div>

                        <button
                            type="button"
                            className="text-lg outline-none focus:outline-none hover:text-gray-400 text-[#696C80] font-extrabold transition-all duration-300"
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </button>
                    </section>
                    <section className="h-full text-primary-200 rounded-b-2xl">
                        <QuestGraphSection
                            questData={questData}
                            questionIndex={questionIndex}
                            currentQuestion={currentQuestion}
                        />
                    </section>
                </div>
            </div>
        </Portal>
    );
};
