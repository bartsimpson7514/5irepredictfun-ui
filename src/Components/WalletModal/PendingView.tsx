/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { metamaskinjected } from "@Connectors";
import Option from "@Components/WalletModal/Option";
import Spinner from "@Components/WalletModal/spinner";
import { useTranslation } from "react-i18next";
import { SUPPORTED_WALLETS } from "./consts";

interface IPendingView {
    connector?: AbstractConnector;
    error?: boolean;
    setPendingError: (error: boolean) => void;
    tryActivation: (connector: AbstractConnector) => void;
}

const PendingView: FC<IPendingView> = ({
    connector,
    error = false,
    setPendingError,
    tryActivation,
}) => {
    const isMetamask = window?.ethereum?.isMetaMask;
    const { t } = useTranslation();
    return (
        <div>
            <section>
                {error ? (
                    <div className="w-full flex items-center h-14 border border-red-500 mb-4 px-4 rounded-lg">
                        <span className="text-red-500 mr-4">
                            {t("Connecting Error")}
                        </span>
                        <button
                            type="button"
                            className="bg-gray-300 dark:bg-gray-300 rounded-lg text-sm px-2 py-1 outline-none focus:outline-none transition-all duration-300 hover:bg-gray-100 hover:text-gray-50"
                            onClick={() => {
                                setPendingError(false);
                                if (connector) {
                                    tryActivation(connector);
                                }
                            }}
                        >
                            {t("TryAgain")}
                        </button>
                    </div>
                ) : (
                    <div className="w-full flex items-center h-14 border border-gray-300 mb-4 px-4 rounded-lg">
                        <Spinner />
                        <span className="ml-4">{t("Initializing")}</span>
                    </div>
                )}
            </section>
            {Object.keys(SUPPORTED_WALLETS).map(key => {
                const option = SUPPORTED_WALLETS[key];
                const icon = option.iconName
                    ? `/images/wallets/${option.iconName}`
                    : null;

                if (option.connector === connector) {
                    if (option.connector === metamaskinjected) {
                        if (isMetamask && option.name !== "MetaMask") {
                            return null;
                        }
                        if (!isMetamask && option.name === "MetaMask") {
                            return null;
                        }
                    }
                    return (
                        <Option
                            key={key}
                            header={option.name}
                            subheader={option.description}
                            icon={icon || ""}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default PendingView;
