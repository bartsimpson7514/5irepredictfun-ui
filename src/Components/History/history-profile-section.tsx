import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WrongConnectWalletModal from "@Components/WalletModal/WrongConnectWalletModal";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { PREDICT_TOKENS } from "@Constants";
import { validNetwork } from "@Utils";
import { useTranslation } from "react-i18next";
import { useUserInfoProfile } from "@Hooks/useUserInfoProfile";
import HistoryNav from "./history-nav";
import HistoryPnL from "./history-pnl";
import HistoryBalance from "./history-balance";
import HistoryLossy from "./history-lossy";

enum SelectedOption {
    BALANCE = "Balance",
    PNL = "Profit and Loss",
    ACTIVITIES = "Activities",
}

const HistoryProfileSection = ({ balances }) => {
    const [loader, setLoader] = useState(true); // loader
    const { account, chainId } = useWeb3React();

    const { userInfos } = useUserInfoProfile(account?.toLowerCase());

    // const { data: userInfos } = useQuery(userInfo(account?.toLowerCase()));

    const [current, setCurrent] = useState("Balance");
    const { t } = useTranslation();
    const tabs = [
        { name: "Balance", icon: "" },
        { name: "Profit and Loss", icon: "" },
        // { name: "Activities", icon: "" },
    ];
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, [userInfos]);

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="flex flex-col gap-9">
                <HistoryNav title="Portfolio" />
                {account && !validNetwork(chainId) ? (
                    <div className=" flex items-center justify-center h-96 mx-4">
                        <WrongConnectWalletModal />
                    </div>
                ) : (
                    <>
                        {loader && (
                            <div className="w-full h-28">
                                <QuickSwapLoader />
                            </div>
                        )}
                        {!loader && (
                            <>
                                <div className="border-b-[0.5px] border-[#444444] ml-3">
                                    <nav
                                        className="-mb-px flex space-x-8"
                                        aria-label="Tabs"
                                    >
                                        {tabs.map(tab => (
                                            <button
                                                type="button"
                                                key={tab.name}
                                                className={`
                                                    ${
                                                        current === tab.name
                                                            ? "border-b-2 border-primary text-primary-white"
                                                            : "border-transparent text-primary-200 hover:text-primary-100 hover:border-primary"
                                                    }
                                                    group inline-flex items-center py-2 px-0.5 border-b-2 font-medium text-sm group`}
                                                onClick={() => {
                                                    setCurrent(tab.name);
                                                    handleGaEvent(
                                                        upperCase(
                                                            `Portfolio ${tab.name}`
                                                        )
                                                    );
                                                }}
                                            >
                                                <span
                                                    className={`${
                                                        current === tab.name
                                                            ? "gradient-text bg-dropdown-text-selected fill-asset-text"
                                                            : "text-primary-200 fill-primary-200"
                                                    }`}
                                                >
                                                    {t(tab.name)}
                                                </span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div
                                    className={`${
                                        current === SelectedOption.PNL
                                            ? "px-0 py-0 md:px-4 md:py-4 lg:px-36 lg:py-[80px] flex sm:flex-row flex-col "
                                            : // "flex gap-10 sm:flex-row flex-col sm:gap-20"
                                              "hidden"
                                    }`}
                                >
                                    <HistoryPnL userInfos={userInfos} />
                                </div>
                                {predictableToken === PREDICT_TOKENS.BGN ? (
                                    <>
                                        <div
                                            className={`${
                                                current ===
                                                SelectedOption.BALANCE
                                                    ? "block"
                                                    : "hidden"
                                            }`}
                                        >
                                            <HistoryBalance
                                                balances={balances}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className={`${
                                            current === SelectedOption.BALANCE
                                                ? "block"
                                                : "hidden"
                                        }`}
                                    >
                                        <HistoryLossy />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HistoryProfileSection;
