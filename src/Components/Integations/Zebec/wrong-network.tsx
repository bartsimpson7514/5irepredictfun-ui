import React from "react";
import { useNetworkChangeModal } from "@Reducers/trade/hooks";
import WrongNetworkIcon from "@Public/svgs/wallet/wrong-network.svg";

const WrongNetwork = ({ text }) => {
    const toggleNetworkModal = useNetworkChangeModal();

    return (
        <button
            type="button"
            onClick={() => toggleNetworkModal()}
            className="flex py-[7px] gap-2  items-center justify-center rounded-lg sm:text-sm text-xs px-2 border-2 border-sidebar-border"
        >
            <WrongNetworkIcon />
            <span className="text-primary-warning text-sm font-normal">
                {text}
            </span>
        </button>
    );
};

export default WrongNetwork;
