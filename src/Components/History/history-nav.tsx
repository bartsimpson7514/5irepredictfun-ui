/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { validNetwork } from "@Utils";
import { useNetworkChangeModal } from "@Reducers/trade/hooks";
import GTokenSelect from "@Components/Header/tokens-DropDown";
import { useTranslation } from "react-i18next";
import WrongNetworkIcon from "@Public/svgs/wallet/wrong-network.svg";

const HistoryNav = ({ title }) => {
    const { account, chainId } = useWeb3React();
    const toggleNetworkModal = useNetworkChangeModal();
    const { t } = useTranslation();

    return (
        <div className="flex justify-between">
            <div className="text-primary-100 text-lg">{t(title)}</div>
            <div>
                {account && !validNetwork(chainId) ? (
                    <button
                        type="button"
                        onClick={() => toggleNetworkModal()}
                        className="flex py-[7px] gap-2  items-center justify-center rounded-lg sm:text-sm text-xs px-2 border-2 border-card-background"
                    >
                        <WrongNetworkIcon />
                        <span className="text-primary-warning text-sm font-normal">
                            {t("Wrong Network")}
                        </span>
                    </button>
                ) : (
                    <GTokenSelect />
                )}
            </div>
        </div>
    );
};

export default HistoryNav;
