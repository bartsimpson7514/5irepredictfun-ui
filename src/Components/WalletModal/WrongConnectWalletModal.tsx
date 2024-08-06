import React from "react";
import { useNetworkChangeModal } from "@Reducers/trade/hooks";
import { useTranslation } from "react-i18next";
import IntegrationButton from "@Basic/IntegrationButton";

const WrongConnectWalletModal = () => {
    const toggleNetworkModal = useNetworkChangeModal();
    const { t } = useTranslation();

    return (
        <div className="flex items-center w-25 justify-center">
            <div className="flex flex-col bg-card-background rounded-xl py-8 px-5">
                <div className="flex gap-4">
                    <div className=" flex-col gap-2 flex  items-center justify-center">
                        <div>
                            <img
                                className="my-auto  pt-3 h-14 items-center justify-center"
                                src="/images/wallet-icons.png"
                                alt=""
                            />
                        </div>

                        <div className="text-primary-100 font-bold text-lg text-center">
                            {t("Switch Network")}
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center mt-6">
                    <IntegrationButton
                        onClick={() => {
                            toggleNetworkModal();
                        }}
                        content={() => t("Switch Network")}
                        className="w-[152px] h-9 flex items-center justify-center rounded-[20px] text-sm text-primary-white relative cursor-pointer font-semibold bg-footer-text "
                    />
                </div>
            </div>
        </div>
    );
};

export default WrongConnectWalletModal;
