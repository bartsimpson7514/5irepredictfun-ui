import React, { FC } from "react";
import Portal from "@reach/portal";

interface IModalComponent {
    children?: any;
    open?: boolean;
    modalRef?: any;
    cssstyle?: any;
    width?: string;
}

const ModalComponent: FC<IModalComponent> = ({
    children,
    open,
    modalRef,
    cssstyle = "sm:px-6 sm:py-8 px-4 py-6 ",
    width = "max-w-[502px]",
}) => {
    return (
        <Portal>
            <div
                id="confirm-modal"
                data-testid="confirm-modal"
                className={`fixed z-[1000] m-2 inset-0 overflow-y-auto transition-all duration-300 text-primary-100  ${
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex items-center justify-center h-full w-full sm:px-4 text-center sm:block p-0">
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-900 opacity-80" />
                    </div>
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <div
                        className={`inline-block ${width} bg-content-background rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle text-highligt ${cssstyle}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        ref={modalRef}
                    >
                        <div className="flex flex-col justify-center gap-2">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ModalComponent;
