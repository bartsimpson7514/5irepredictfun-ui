/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React from "react";
import { useNetworkChangeModal } from "@Reducers/trade/hooks";
import WrongNetworkIcon from "@Public/svgs/wallet/wrong-network.svg";
import { useTranslation } from "react-i18next";

const WrongNetwork = ({ text }) => {
    const toggleNetworkModal = useNetworkChangeModal();
    const { t } = useTranslation();
    return (
        <button
            type="button"
            onClick={() => toggleNetworkModal()}
            className="flex py-[7px] gap-2  items-center justify-center rounded-lg sm:text-sm text-xs px-2 border-2 border-sidebar-border"
        >
            <WrongNetworkIcon />
            <span className="text-primary-warning text-sm font-normal whitespace-nowrap">
                {t(text)}
            </span>
        </button>
    );
};

export default WrongNetwork;
