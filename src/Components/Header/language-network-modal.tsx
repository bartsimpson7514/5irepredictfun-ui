import React, { FC } from "react";
import Modal from "@Basic/BasicModal";
import { useTranslation } from "react-i18next";
import LanguageSection from "./language-section";

interface ILanguageNetworkModal {
    open: boolean;
    onClose: () => void;
}

const LanguageNetworkModal: FC<ILanguageNetworkModal> = ({ open, onClose }) => {
    const { t } = useTranslation();
    return (
        <Modal
            showBack={false}
            onBack={() => {}}
            title="Language"
            open={open}
            onClose={() => {
                onClose();
            }}
            variant="dark"
        >
            <div className="text-sm text-primary-100 font-normal my-4 ml-2">
                {t("Select an option")}
            </div>
            <span className="text-xs">
                <LanguageSection header footer={false} language />
            </span>
        </Modal>
    );
};

export default LanguageNetworkModal;
