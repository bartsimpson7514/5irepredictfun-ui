import HistoryProfileSection from "@Components/History/history-profile-section";
import ConnectWalletModal from "@Components/WalletModal/ConnectWalletModal";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";

const PortfolioPage = () => {
    const { bgnBalance, bglBalance, bgrBalance } = useSelector(
        (state: AppState) => state.prediction
    );

    const balances = {
        BGN: bgnBalance,
        BGR: bgrBalance,
        BGL: bglBalance,
    };
    const { account } = useWeb3React();
    const Message = () => {
        return (
            <>
                <div className=" text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs">
                    Please connect your wallet to experience the magic of
                    prediction
                </div>
            </>
        );
    };

    useEffect(() => {
        handleGaEvent(upperCase(`profile page visit`));
    }, []);

    return (
        <div className="text-primary-100 w-full flex items-center justify-center">
            {account ? (
                <HistoryProfileSection balances={balances} />
            ) : (
                <div className="sm:my-40">
                    <ConnectWalletModal Message={Message} />
                </div>
            )}
        </div>
    );
};

export default PortfolioPage;
