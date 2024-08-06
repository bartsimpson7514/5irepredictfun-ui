import React, { FC, ReactNode } from "react";
import Portal from "@reach/portal";
import CloseIcon from "public/svgs/close.svg";
import BackArrow from "public/svgs/Backarrow.svg";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

interface IModal {
    title: string;
    children: ReactNode;
    onClose?: () => void;
    showBack: boolean;
    onBack?: () => void;
    open?: boolean;
    testid?: string;
    variant?: any;
    showClose?: boolean;
    maxWidth?: string;
}

const Modal: FC<IModal> = ({
    title,
    children,
    onClose,
    onBack,
    showBack,
    open,
    testid,
    variant,
    showClose = true,
    maxWidth = "440px",
}) => {
    const { t } = useTranslation();
    return (
        <Portal>
            <div
                className={`w-full h-full inset-0 fixed bg-black px-3 bg-opacity-30 z-50 text-primary-100 flex items-center justify-center transition-all duration-300 ${variant} ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                data-testid={testid}
            >
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-80" />
                </div>
                <div
                    className={`${
                        isMobile ? "w-96" : ""
                    } h-auto w-full bg-content-background rounded-2xl z-50 text-primary-100 shadow-sm transition-all duration-300`}
                    style={{ maxWidth: `${maxWidth}` }}
                >
                    <section className="w-full px-6 pt-6 h-12 pb-4 text-primary-100 flex items-center justify-between shadow-sm">
                        {showBack ? (
                            <button
                                type="button"
                                className="fill-asset-text outline-none focus:outline-none"
                                onClick={onBack}
                            >
                                <BackArrow className="fill-asset-text" />
                            </button>
                        ) : (
                            <div className="text-ls text-primary-100 font-normal leading-4">
                                {t(title)}
                            </div>
                        )}
                        {showClose && (
                            <button
                                type="button"
                                className="text-lg outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
                                onClick={onClose}
                            >
                                <CloseIcon className="fill-asset-text" />
                            </button>
                        )}
                    </section>
                    <section className="mx-4 lg:mx-6 my-8 h-full text-primary-200 rounded-b-2xl">
                        {children}
                    </section>
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
