/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import {
    walletconnect,
    walletlink,
    portis,
    metamaskinjected,
    magicSetter,
    frontierinjected,
} from "@Connectors/index";

import {
    ApplicationModal,
    setOpenModal,
    updateInvalidNetwork,
    updateMagicEmail,
    updateSelectedChainId,
    updateWalletConnected,
} from "@Redux/Reducers/trade";
import { BGDepositModal } from "@Components/BGDepositModal";
import { BGWithdrawModal } from "@Components/WithdrawModal";
import { BGClaimModal } from "@Components/BGClaimModal";
import { BGReinvestModal } from "@Components/BGReinvestModal";
import {
    useModalOpen,
    useNetworkChangeModal,
    useTradeSettingModalToggle,
    useWalletModalToggle,
    useBGDepositModalToggle,
    useBGWithdrawModalToggle,
    useBGReinvestModalToggle,
    useBGClaimModalToggle,
} from "@Redux/Reducers/trade/hooks";
import WalletModal from "@Components/WalletModal";
import UnsupportedNetworkModal from "@Components/Prediction/Card/switchNetworkModal";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import Link from "next/link";
import ThreeDotIcon from "public/svgs/QuickSwap/ThreeDotIcon.svg";
import ChartSlideBar from "@Components/ChartSlideBar";
import { isMobile } from "react-device-detect";
import { upperCase } from "@Utils/common";
import { useTranslation } from "react-i18next";
import { getRoundInterval } from "@Utils/rounds";
import QuickSwapNetworkSection from "./network-section";
import QuickSwapSettingModal from "./settings-modal";

const QuickSwapHeader = ({ setMagicLoading }) => {
    const {
        active,
        account,
        chainId,
        library,
        active: networkActive,
        error: networkError,
        activate: activateNetwork,
    } = useWeb3React();
    const dispatch = useDispatch();
    const [tried, setTried] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [showChart, setShowCart] = useState(false);
    const open = useModalOpen(ApplicationModal.TRADE_SETTING);
    const networkOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const toggleNetworkModal = useNetworkChangeModal();
    const openBGdeposit = useModalOpen(ApplicationModal.DEPOSIT_BGN);
    const openBGWithdraw = useModalOpen(ApplicationModal.WITHDRAW_BGN);
    const openBGReinvest = useModalOpen(ApplicationModal.REINVEST_BGN);
    const openBGClaim = useModalOpen(ApplicationModal.CLAIM_BGN);
    const toggleBGDeposit = useBGDepositModalToggle();
    const toggleBGWithdraw = useBGWithdrawModalToggle();
    const toggleBGClaim = useBGClaimModalToggle();
    const toggleBGReinvest = useBGReinvestModalToggle();
    const toggleSettingModal = useTradeSettingModalToggle();
    const toggleWalletModal = useWalletModalToggle();
    const isModalOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const [openDetailMenu, setOpenDetailMenu] = useState(false);
    const [roundTime, setRoundtime] = useState(0);

    const settingReff = useRef(null);
    const {
        selectedChainId,
        isPredicted,
        magicEmail,
        isSocial,
        walletConnected,
        isInvalidNetwork,
        selectedAsset,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);

    const getRoundtime = async () => {
        const result: any = await getRoundInterval(
            selectedAsset,
            selectedChainId,
            library,
            predictableToken
        );
        return result;
    };

    useEffect(() => {
        if (selectedAsset) {
            (async () => {
                const rountTime = await getRoundtime();
                setRoundtime(rountTime);
            })();
        }
        return () => {
            setRoundtime(0);
        };
    }, [account, selectedAsset, selectedChainId]);

    const getConnectorInstance = wallet => {
        switch (wallet) {
            case "MetaMask":
                return metamaskinjected;
            case "Frontier":
                return frontierinjected;
            case "Wallet Connect":
                return walletconnect;
            case "Coinbase":
                return walletlink;
            case "Portis":
                return portis;
            default:
        }
    };

    useEffect(() => {
        handleGaEvent(upperCase("QUICKSWAP LANDING PAGE LOADED"));
    }, []);

    useEffect(() => {
        const tryConnecting = async () => {
            try {
                if (
                    !networkActive &&
                    !networkError &&
                    !active &&
                    !tried &&
                    walletConnected
                ) {
                    setConnecting(true);
                    // TODO: need to cross check on the triedconnect
                    if (walletConnected === "Magiclink" && magicEmail) {
                        const magicLinkConnector = magicSetter(
                            magicEmail,
                            isSocial,
                            magicEmail,
                            () => {
                                dispatch(updateWalletConnected(null));
                                dispatch(updateMagicEmail(null));
                                setMagicLoading(false);
                                handleGaEvent(
                                    magicEmail === "google"
                                        ? "GOOGLE CONNECTION FAIL"
                                        : "TWITTER CONNECTION FAIL"
                                );
                            },
                            selectedChainId
                        );
                        await activateNetwork(magicLinkConnector);
                    } else {
                        const connect = getConnectorInstance(walletConnected);
                        if (connect)
                            await activateNetwork(
                                connect,
                                undefined,
                                true
                            ).catch(() => {
                                dispatch(updateWalletConnected(null));
                            });
                        setConnecting(false);
                    }
                    setTried(true);
                }
            } catch (err) {
                dispatch(updateWalletConnected(null));
                dispatch(updateMagicEmail(null));
            }
        };
        tryConnecting();
    }, [
        // triedEager,
        networkActive,
        networkError,
        active,
        chainId,
        activateNetwork,
    ]);

    const wallet = walletConnected;

    useEffect(() => {
        if (account || !walletConnected) {
            setMagicLoading(false);
            setConnecting(false);
        }
    }, [account, walletConnected]);

    useEffect(() => {
        if (chainId && account) {
            const validChainId = SUPPORTED_NETWORKS[
                process.env.NEXT_PUBLIC_INTEGRATION
            ][process.env.NEXT_PUBLIC_NETWORK_TYPE].filter(sn => {
                return chainId === sn.chainId && sn.isActive;
            });

            if (
                Number(selectedChainId) !== Number(chainId) &&
                Number(chainId) > 0 &&
                validChainId.length > 0
            ) {
                dispatch(updateSelectedChainId(Number(chainId)));
            }

            if (validChainId.length <= 0) {
                if (!isModalOpen) {
                    toggleNetworkModal();
                }
                dispatch(updateInvalidNetwork(true));
            } else {
                dispatch(setOpenModal(null));
                dispatch(updateInvalidNetwork(false));
            }
            if (account && validChainId.length >= 0 && isModalOpen) {
                dispatch(setOpenModal(null));
                dispatch(updateInvalidNetwork(false));
            }
        }
    }, [account, chainId, selectedChainId]);

    useEffect(() => {
        settingReff?.current?.goToAndStop(0, true);
    }, [account, chainId, wallet, isPredicted]);

    useEffect(() => {
        const isMetamask =
            typeof window !== "undefined" &&
            window.ethereum &&
            window.ethereum.isMetaMask;
        if (!account && isMetamask) {
            toggleWalletModal();
        }
    }, [isInvalidNetwork]);

    const sparkleHeaders = ["Fun Predictions", "GameHub"];

    const menuItems = [
        {
            link: "https://quickswap.exchange/#/swap",
            text: "Swap",
            id: "swap-page-link",
        },
        {
            link: "https://quickswap.exchange/#/pools",
            text: "Pool",
            id: "pools-page-link",
        },
        {
            link: "https://quickswap.exchange/#/farm",
            text: "Farm",
            id: "farm-page-link",
        },
        {
            link: "https://quickswap.exchange/#/dragons",
            text: "Dragon_Lair",
            id: "dragons-page-link",
        },
        {
            link: "/",
            text: "Fun Predictions",
            id: "prdt-page-link",
        },
        {
            link: "https://versagames.io/quickswap-gaming-hub",
            text: "GameHub",
            id: "gamehub-page-link",
        },
        {
            link: "https://quickswap.exchange/#/convert",
            text: "Convert",
            id: "convert-quick",
        },
        {
            link: "https://quickswap.exchange/#/analytics",
            text: "Analytics",
            id: "analytics-page-link",
        },
    ];

    const imagePrediction = [
        {
            src: "/images/QuickSwap/SparkleBottom.png",
            alt: "SparkleBottom",
            styleClass: "-ml-[12px] absolute transition-all  bottom-0",
        },
        {
            src: "/images/QuickSwap/SparkleLeft.png",
            alt: "SparkleLeft",
            styleClass:
                "absolute transition-all hover:translate-x-0 hover:translate-y-0 left-0",
        },
        {
            src: "/images/QuickSwap/SparkleRight.png",
            alt: "SparkleRight",
            styleClass:
                "absolute transition-all hover:translate-x-0 hover:translate-y-0 right-0",
        },
        {
            src: "/images/QuickSwap/SparkleTop.png",
            alt: "SparkleTop",
            styleClass:
                "-ml-[10px] absolute transition-all hover:translate-x-0 hover:translate-y-0 top-0",
        },
    ];

    const MobileFooterOption = () => {
        const { t } = useTranslation();
        return (
            <>
                {isMobile && (
                    <div className="sm:hidden z-[100]">
                        <ChartSlideBar
                            showChart={showChart}
                            setShowCart={setShowCart}
                            timeFrame={roundTime}
                        />
                    </div>
                )}
                {!showChart && (
                    <div className="fixed left-0 bottom-0 h-16 z-[160] w-full rounded-t-[20px] px-4 justify-center bg-[#252833] flex items-center mdw:hidden">
                        <div className="flex items-center justify-between max-w-[375px] w-full">
                            {React.Children.toArray(
                                menuItems.slice(0, 4).map(val => (
                                    <Link
                                        href={val.link}
                                        key={val.link}
                                        id={val.id}
                                        passHref
                                    >
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <small className=" no-underline  text-[#696c80] px-3 py-2 font-bold flex text-sm">
                                                {t(val.text)}
                                            </small>
                                        </a>
                                    </Link>
                                ))
                            )}

                            <div className="flex rounded-[10px] cursor-pointer relative">
                                <ThreeDotIcon
                                    onClick={() =>
                                        setOpenDetailMenu(!openDetailMenu)
                                    }
                                />

                                {openDetailMenu && (
                                    <div className="absolute bottom-[72px] z-[10000] right-3 width-[209px] bg-gray-200 rounded-[10px] py-2 border border-[#82b1ff14] w-[209px]">
                                        <div className="">
                                            {React.Children.toArray(
                                                menuItems
                                                    .slice(4, menuItems.length)
                                                    .map(val => (
                                                        <Link
                                                            href={val.link}
                                                            className="menuItem"
                                                            onClick={() =>
                                                                setOpenDetailMenu(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <small className=" no-underline  text-[#696c80] px-3 py-2 font-bold flex hover:text-primary-100 text-sm">
                                                                    {val.text}
                                                                </small>
                                                            </a>
                                                        </Link>
                                                    ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    const WebFooterOption = () => {
        const { t } = useTranslation();
        return (
            <div className="items-center z-20 h-full mdw:flex hidden mx-3">
                {React.Children.toArray(
                    menuItems.slice(0, 7).map(val => (
                        <>
                            {sparkleHeaders.includes(val.text) ? (
                                <div
                                    className={` rounded-[10px] group cursor-pointer relative h-9 px-6 flex items-center mr-3 overflow-hidden text-primary-200 hover:text-primary-100 hover:bg-gray-300 text-sm font-inter ${
                                        val.text === "Predictions"
                                            ? "bg-gray-300"
                                            : ""
                                    }`}
                                >
                                    {val.text === "Predictions" ? (
                                        <>
                                            <span className="text-primary-100">
                                                {val.text}
                                            </span>
                                            {React.Children.toArray(
                                                imagePrediction.map(
                                                    ({
                                                        src,
                                                        alt,
                                                        styleClass,
                                                    }) => (
                                                        <img
                                                            src={src}
                                                            alt={alt}
                                                            className={
                                                                styleClass
                                                            }
                                                        />
                                                    )
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={val.link}
                                                key={val.link}
                                                id={val.id}
                                                passHref
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {val.text}
                                                </a>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={val.link}
                                    key={val.link}
                                    id={val.id}
                                    passHref
                                >
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mr-2"
                                    >
                                        <div
                                            className={`rounded-[10px] group justify-center cursor-pointer relative h-9 px-6 overflow-hidden flex items-center   hover:bg-gray-300 text-[0.875rem] leading-[1.43rem] font-normal ${
                                                val.text === "Predictions"
                                                    ? "bg-gray-300"
                                                    : ""
                                            }`}
                                        >
                                            <span className=" whitespace-nowrap text-primary-200 hover:text-primary-100">
                                                {t(val.text)}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            )}
                        </>
                    ))
                )}
                <div className="relative z-[1000]">
                    <ThreeDotIcon
                        className={`z-[1000] relative hover:bg-gray-200 ${openDetailMenu &&
                            "bg-gray-200"} rounded-[10px]`}
                        onClick={() => setOpenDetailMenu(!openDetailMenu)}
                    />

                    <div
                        className={` ${
                            openDetailMenu ? "visible" : "invisible"
                        } absolute  left-0 w-[209px] top-10 z-[1000] rounded-[10px] bg-gray-200`}
                    >
                        {React.Children.toArray(
                            menuItems.slice(7, menuItems.length).map(val => (
                                <Link
                                    href={val.link}
                                    className="menuItem"
                                    onClick={() => setOpenDetailMenu(false)}
                                    passHref
                                >
                                    <a
                                        target="_blank"
                                        rel="noopener cursor-pointer noreferrer"
                                    >
                                        <small className=" no-underline cursor-pointer  text-primary-200 hover:text-primary-100 px-6 py-[10px] font-bold flex">
                                            {t(val.text)}
                                        </small>
                                    </a>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="px-6 flex min-h-[71px] items-center justify-between bg-primary-background z-[1000] border-b-[1px] border-[#24293880] ">
                <div>
                    <Link href="/">
                        <img
                            src="/images/quickIcon.svg"
                            alt="QuickLogo"
                            height={60}
                            className="sm:hidden block h-[60px]"
                        />
                    </Link>
                    <Link href="/">
                        <img
                            src="/images/quickLogo.png"
                            alt="QuickLogo"
                            height={60}
                            className="hidden sm:block h-[60px]"
                        />
                    </Link>
                </div>

                <WebFooterOption />

                <div className="flex items-center z-20">
                    <QuickSwapNetworkSection connecting={connecting} />
                </div>
                <MobileFooterOption />
            </div>
            <WalletModal setMagicLoading={setMagicLoading} />
            <BGDepositModal open={openBGdeposit} onClose={toggleBGDeposit} />

            <BGWithdrawModal open={openBGWithdraw} onClose={toggleBGWithdraw} />
            <BGClaimModal open={openBGClaim} onClose={toggleBGClaim} />
            <BGReinvestModal open={openBGReinvest} onClose={toggleBGReinvest} />
            <UnsupportedNetworkModal open={networkOpen} />
            <QuickSwapSettingModal open={open} onClose={toggleSettingModal} />
        </>
    );
};

export default QuickSwapHeader;
