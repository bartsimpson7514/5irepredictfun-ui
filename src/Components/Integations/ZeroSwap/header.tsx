import React, { useEffect, useState, Fragment, useRef } from "react";
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
import Link from "next/link";
import Image from "next/image";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { isMobile } from "react-device-detect";

import {
    ApplicationModal,
    setOpenModal,
    updateBalance,
    updateInvalidNetwork,
    updateMagicEmail,
    updateSelectedChainId,
    updateWalletConnected,
    updateBalanceLoader,
    updateMagicNetworkChanged,
} from "@Redux/Reducers/trade";
import {
    useBGClaimModalToggle,
    useBGDepositModalToggle,
    useBGReinvestModalToggle,
    useBGWithdrawModalToggle,
    useModalOpen,
    useTradeSettingModalToggle,
    useNetworkChangeModal,
} from "@Redux/Reducers/trade/hooks";
import WalletModal from "@Components/WalletModal";
import UnsupportedNetworkModal from "@Components/Prediction/Card/switchNetworkModal";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import useBalance from "@Hooks/useBalance";
import { PREDICT_TOKENS, WALLET_NAME } from "@Constants";
import tokenBalance from "@Hooks/tokenBalance";
import { formatUnits } from "@ethersproject/units";
import {
    getTokenDecimal,
    setupNetwork,
    toDecimals,
    validNetwork,
} from "@Utils";
import { getChainId, returnTokenAddress } from "@Utils/common";
import TokenSection from "@Components/Header/token-section";
import NetworkSelect from "@Components/Header/network-dropdown";

import { BGDepositModal } from "@Components/BGDepositModal";
import { BGWithdrawModal } from "@Components/WithdrawModal";
import { BGClaimModal } from "@Components/BGClaimModal";
import { BGReinvestModal } from "@Components/BGReinvestModal";
import ChartSlideBar from "@Components/ChartSlideBar";
import { getRoundInterval } from "@Utils/rounds";
import { useRouter } from "next/router";
import ZeroSwapSettingModal from "./settings-modal";
import WrongNetwork from "./wrong-network";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const LogoHeader = () => {
    return (
        <a
            className="flex items-center"
            href="https://5ire.org/"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
                handleGaEvent("ZEROSWAP LANDING PAGE CLICKED");
            }}
        >
            {/* <Logo className="w-8 h-8 block sm:hidden" /> */}
            <Image src="/images/logo_predict_fun.png" height="50" width="50" />
            {` `}
            <span className="font-bold text-[24px]">5irepredict.fun</span>
        </a>
    );
};

const ZeroswapHeader = ({ setMagicLoading }) => {
    const {
        active,
        account,
        chainId,
        active: networkActive,
        error: networkError,
        activate: activateNetwork,
        library,
    } = useWeb3React();
    const dispatch = useDispatch();
    const router = useRouter();
    const currentPathname = router.pathname;

    // const triedEager = useEagerConnect();
    const [tried, setTried] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const open = useModalOpen(ApplicationModal.TRADE_SETTING);
    const openBGdeposit = useModalOpen(ApplicationModal.DEPOSIT_BGN);
    const openBGWithdraw = useModalOpen(ApplicationModal.WITHDRAW_BGN);
    const openBGReinvest = useModalOpen(ApplicationModal.REINVEST_BGN);
    const openBGClaim = useModalOpen(ApplicationModal.CLAIM_BGN);
    const toggleSettingModal = useTradeSettingModalToggle();
    const toggleBGDeposit = useBGDepositModalToggle();
    const toggleBGWithdraw = useBGWithdrawModalToggle();
    const toggleBGClaim = useBGClaimModalToggle();
    const toggleBGReinvest = useBGReinvestModalToggle();
    const toggleNetworkModal = useNetworkChangeModal();
    const networkOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const isModalOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const [showChart, setShowCart] = useState(false);
    const [roundTime, setRoundtime] = useState(0);

    // const toggleLanguageModal = useToggleLanguageNetworkModalToggle();

    const settingReff = useRef(null);
    const {
        selectedChainId,
        isPredicted,
        magicEmail,
        isSocial,
        walletConnected,
        selectedAsset,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const balanceFromFetcher: any =
        (predictableToken.toUpperCase() !== PREDICT_TOKENS.MATIC ||
            predictableToken.toUpperCase() !== PREDICT_TOKENS.ETH) &&
        library
            ? tokenBalance(predictableToken, selectedChainId, library, account)
            : useBalance(5);

    const updateTokenBalanceWithDecimals = async () => {
        const tokenAddress = returnTokenAddress(
            predictableToken,
            selectedChainId
        );
        const decimals = await getTokenDecimal(tokenAddress, library);
        const tokenValue = toDecimals(
            formatUnits(balanceFromFetcher, decimals),
            4
        );
        dispatch(updateBalance(Number(tokenValue)));
        dispatch(updateBalanceLoader(false));
    };

    const handleMagicConnection = async networkId => {
        dispatch(updateSelectedChainId(Number(networkId)));
        dispatch(updateMagicNetworkChanged(true));
        window.location.reload();
    };

    const networks = {};
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].forEach(element => {
        if (element.isActive) {
            networks[`${element.chainId.toString()}`] = [element.networkName];
        }
    });

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

    useEffect(() => {
        if (balanceFromFetcher) {
            if (
                predictableToken.toUpperCase() !== PREDICT_TOKENS.MATIC ||
                predictableToken.toUpperCase() !== PREDICT_TOKENS.ETH
            ) {
                updateTokenBalanceWithDecimals();
            } else {
                dispatch(updateBalance(Number(balanceFromFetcher)));
                dispatch(updateBalanceLoader(false));
            }
        }
    }, [balanceFromFetcher]);

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

    const [switchChainId, setSwitchChainId] = useState(selectedChainId);

    const getChain = async () => {
        if (account) {
            const chainIdVal = await getChainId();
            if (chainIdVal !== selectedChainId && !validNetwork(chainIdVal)) {
                setSwitchChainId(selectedChainId);
            } else {
                setSwitchChainId(chainIdVal);
            }
        } else {
            setSwitchChainId(selectedChainId);
        }
    };

    useEffect(() => {
        dispatch(updateSelectedChainId(switchChainId));
    }, [switchChainId]);

    useEffect(() => {
        getChain();
    }, [selectedChainId]);

    useEffect(() => {
        settingReff?.current?.goToAndStop(0, true);
    }, [account, chainId, wallet, isPredicted]);

    const HeaderElements = [];

    const MobileFooterOption = () => {
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
            </>
        );
    };

    const headerSection = useRef(null);

    return (
        <>
            <>
                <section
                    className={`relative border-b-[1px] bg-[#FFFFFF] border-[#D7D6D6] flex-shrink-0 shadow justify-between
                    `}
                    style={{
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <header ref={headerSection} className="py-2 sm:px-6">
                        <Popover className="w-full">
                            <div className="mx-2 lg:container lg:mx-auto">
                                <div className="relative flex items-center w-full justify-between">
                                    <div className="flex flex-1 justify-start">
                                        <div className="justify-center flex items-center mr-2 -my-2 lg:hidden">
                                            <Popover.Button className="inline-flex p-2 rounded-md text-[##11142D]  hover:text-[#1f2937] hover:bg-[#6b7280] focus:outline-none">
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MenuIcon
                                                    className="w-6 h-6 text-[#11142D]"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                        </div>
                                        <Link
                                            href="https://app.zeroswap.io/"
                                            rel="noopener noreferrer"
                                        >
                                            <a>
                                                <span className="sr-only">
                                                    5ire
                                                </span>
                                                <LogoHeader />
                                            </a>
                                        </Link>
                                    </div>

                                    <Popover.Group
                                        as="nav"
                                        className="hidden space-x-12 items-end lg:flex lg:justify-center"
                                    >
                                        {HeaderElements.map((item: any) => (
                                            <Popover
                                                className="relative"
                                                key={item.name}
                                            >
                                                {() => (
                                                    <>
                                                        <Popover.Button className="inline-flex items-center z-[9999]   text-base font-normal rounded-md group text-[#808191] gradient-text-focus focus:text-transparent focus:bg-gradient-to-r from-[#087EE1] to-[#04C29C] ">
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                            <ChevronDownIcon
                                                                className="w-5 h-5 ml-2 text-[#808191] group-focus:text-[#04C29C]"
                                                                aria-hidden="true"
                                                            />
                                                        </Popover.Button>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0 translate-y-1"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 translate-y-1"
                                                        >
                                                            <Popover.Panel
                                                                className={classNames(
                                                                    item.width
                                                                        ? `${item.width}`
                                                                        : "max-w-md",
                                                                    "absolute z-[999] -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                                                                )}
                                                            >
                                                                <div className="shadow-2xl rounded-3xl p-0.5 overflow-hidden">
                                                                    <div className="relative grid rounded-3xl z-12 bg-[#F5F6FA] sm:gap-8 sm:p-6">
                                                                        {item.elements.map(
                                                                            (
                                                                                // eslint-disable-next-line no-shadow
                                                                                item: any
                                                                            ) => (
                                                                                <a
                                                                                    key={
                                                                                        item.name
                                                                                    }
                                                                                    href={
                                                                                        item.href
                                                                                    }
                                                                                    rel="noopener noreferrer"
                                                                                    target="_blank"
                                                                                    className="flex items-center justify-center py-3 -m-3 rounded-2xl text-[#0C111F] hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C] "
                                                                                >
                                                                                    <div className="inline-flex w-full p-3 -m-3 rounded-2xl group hover:bg-zee-header-bg">
                                                                                        <div className="relative inline-flex justify-center flex-shrink-0 w-6 h-6 group-hover:hidden">
                                                                                            <Image
                                                                                                src={
                                                                                                    item.icon
                                                                                                }
                                                                                                layout="fill"
                                                                                                priority
                                                                                            />
                                                                                        </div>
                                                                                        <div className="relative justify-center flex-shrink-0 hidden w-6 h-6 group-hover:inline-flex">
                                                                                            <Image
                                                                                                src={
                                                                                                    item.hoverIcon
                                                                                                }
                                                                                                layout="fill"
                                                                                                priority
                                                                                            />
                                                                                        </div>
                                                                                        <div className="ml-4">
                                                                                            <span className="text-base font-normal group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </span>
                                                                                            <p className="mt-1 text-sm text-[#4b5563] navbar-white">
                                                                                                {
                                                                                                    item.description
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}
                                        {/* <div className="cursor-default text-base font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                            Predictions
                                        </div>
                                        <a
                                            href="https://app.zeroswap.io/leaderboard"
                                            target="_blank"
                                            className="  text-base font-normal text-[#808191] hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]"
                                            rel="noreferrer"
                                        >
                                            Leaderboard
                                        </a> */}

                                        {/* <a
                                            href=""
                                            target="_blank"
                                            className="text-base font-normal mr-5 text-[#808191] hover:text-[#00a7dc]"
                                            rel="noreferrer"
                                        >
                                            Docs
                                        </a> */}
                                        {/* <a
                                            href="https://support.defiwizard.zeroswap.io/support/home"
                                            target="_blank"
                                            className="  text-base font-normal text-[#808191] hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]"
                                            rel="noreferrer"
                                        >
                                            Support
                                        </a> */}
                                    </Popover.Group>

                                    <MobileFooterOption />
                                    <div className="flex items-center gap-2">
                                        {account && !validNetwork(chainId) ? (
                                            <WrongNetwork text="Wrong Network" />
                                        ) : (
                                            <>
                                                <div className="hidden sm:flex" />
                                                <NetworkSelect
                                                    value={switchChainId?.toString()}
                                                    options={networks}
                                                    variant="border-2"
                                                    onChange={(
                                                        networkId: any
                                                    ) => {
                                                        if (
                                                            walletConnected ===
                                                            WALLET_NAME.Magiclink
                                                        ) {
                                                            handleMagicConnection(
                                                                networkId.trim()
                                                            );
                                                        } else {
                                                            account
                                                                ? setupNetwork(
                                                                      Number(
                                                                          networkId
                                                                      ),
                                                                      id => {
                                                                          dispatch(
                                                                              updateSelectedChainId(
                                                                                  Number(
                                                                                      id
                                                                                  )
                                                                              )
                                                                          );
                                                                      }
                                                                  )
                                                                : dispatch(
                                                                      updateSelectedChainId(
                                                                          Number(
                                                                              networkId
                                                                          )
                                                                      )
                                                                  );
                                                        }
                                                        router.push({
                                                            pathname: currentPathname,
                                                            query: {
                                                                network: Number(
                                                                    networkId
                                                                ),
                                                            },
                                                        });
                                                    }}
                                                    margin={false}
                                                />
                                            </>
                                        )}

                                        <TokenSection connecting={connecting} />
                                    </div>
                                </div>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="duration-200 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel
                                    focus
                                    className="absolute inset-x-0 z-[999] top-0 px-2 py-1 transition origin-top-right transform md:right-30 lg:hidden"
                                >
                                    <div className="bg-[#f3f4f6] divide-y-2 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 backdrop-blur-more divide-[#f9fafb]">
                                        <div className="pt-4 pb-6 pl-4 pr-6">
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href="/"
                                                    rel="noopener noreferrer"
                                                >
                                                    <a>
                                                        <span className="sr-only">
                                                            5irePredict.fun
                                                        </span>
                                                        <LogoHeader />
                                                    </a>
                                                </Link>
                                                <div className="-mr-2">
                                                    <Popover.Button className="inline-flex items-center justify-center p-2 text-[#11142D] rounded-md  hover:text-[#6b7280] hover:bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400">
                                                        <span className="sr-only">
                                                            Close menu
                                                        </span>
                                                        <XIcon
                                                            className="w-6 h-6 text-[#11142D]"
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <nav className="grid gap-y-8">
                                                    {HeaderElements.map(
                                                        (item: any) =>
                                                            item.name ===
                                                            "Products" ? (
                                                                item.elements.map(
                                                                    (
                                                                        subItem: any
                                                                    ) => (
                                                                        <a
                                                                            key={
                                                                                subItem.name
                                                                            }
                                                                            href={
                                                                                subItem.href
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center p-3 -m-3 rounded-md text-[#0C111F] hover:bg-zee-header-bg "
                                                                        >
                                                                            <div className="flex items-center w-full p-3 -m-3 group hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r to-[#04C29C] from-[#087EE1]">
                                                                                <div className="relative inline-flex justify-center flex-shrink-0 w-6 h-6 group-hover:hidden">
                                                                                    <Image
                                                                                        src={
                                                                                            subItem.icon
                                                                                        }
                                                                                        layout="fill"
                                                                                        priority
                                                                                    />
                                                                                </div>
                                                                                <div className="relative justify-center flex-shrink-0 hidden w-6 h-6 group-hover:inline-flex">
                                                                                    <Image
                                                                                        src={
                                                                                            subItem.hoverIcon
                                                                                        }
                                                                                        layout="fill"
                                                                                        priority
                                                                                    />
                                                                                </div>
                                                                                <span className="ml-3 text-base font-medium group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                                                    {
                                                                                        subItem.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    )
                                                                )
                                                            ) : (
                                                                <Disclosure
                                                                    as="div"
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="space-y-1"
                                                                >
                                                                    {({
                                                                        // eslint-disable-next-line no-shadow
                                                                        open,
                                                                    }) => (
                                                                        <>
                                                                            <Disclosure.Button
                                                                                className={classNames(
                                                                                    item.current
                                                                                        ? "bg-[#ffffff0a] text-[#0C111F]"
                                                                                        : " text-[#0C111F] ",
                                                                                    "group w-full flex items-center group hover:bg-zee-header-bg p-3 -m-3 text-left text-base font-medium rounded-md"
                                                                                )}
                                                                            >
                                                                                <span className="flex-1 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </span>
                                                                                <ChevronRightIcon
                                                                                    className={classNames(
                                                                                        open
                                                                                            ? "text-[#0C111F] rotate-90"
                                                                                            : "text-black",
                                                                                        "flex-shrink-0 -mr-1 ml-2 h-6 w-6 transform transition-colors ease-in-out duration-150"
                                                                                    )}
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="pt-2 space-y-1">
                                                                                {item.elements.map(
                                                                                    (
                                                                                        subItem: any
                                                                                    ) => (
                                                                                        <Disclosure.Button
                                                                                            key={
                                                                                                subItem.name
                                                                                            }
                                                                                            as="a"
                                                                                            href={
                                                                                                subItem.href
                                                                                            }
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="flex items-center w-full py-2 pt-2 pl-2 text-sm font-medium rounded-md group text-[#0C111F] hover:bg-zee-header-bg"
                                                                                        >
                                                                                            <div className="relative inline-flex justify-center flex-shrink-0 w-6 h-6 group-hover:hidden">
                                                                                                <Image
                                                                                                    src={
                                                                                                        subItem.icon
                                                                                                    }
                                                                                                    layout="fill"
                                                                                                    priority
                                                                                                />
                                                                                            </div>
                                                                                            <div className="relative justify-center flex-shrink-0 hidden w-6 h-6 group-hover:inline-flex">
                                                                                                <Image
                                                                                                    src={
                                                                                                        subItem.hoverIcon
                                                                                                    }
                                                                                                    layout="fill"
                                                                                                    priority
                                                                                                />
                                                                                            </div>
                                                                                            <div className="pl-4 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                                                                {
                                                                                                    subItem.name
                                                                                                }
                                                                                            </div>
                                                                                        </Disclosure.Button>
                                                                                    )
                                                                                )}
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            )
                                                    )}
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="px-5 py-6 space-y-6">
                                            <div className="grid grid-cols-3 ml-2 gap-y-4 gap-x-5">
                                                {/* <a
                                                    href=""
                                                    target="_blank"
                                                    className="text-base font-normal group text-[#0C111F] "
                                                    rel="noopener noreferrer"
                                                >
                                                    <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                        Docs
                                                    </span>
                                                </a> */}
                                                {/* <a
                                                    href="/"
                                                    target="_blank"
                                                    className="text-base font-normal text-[#0C111F] group"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-[#087EE1] to-[#04C29C]">
                                                        Support
                                                    </span>
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </header>

                    {/* <Header /> */}
                    {/* <div className="relative z-100 flex-shrink-0 flex  shadow justify-between p-4 sm:px-8 sm:py-[21px] ">
                        <div className="flex items-center">
                            <LogoHeader />
                        </div>
                        {/* <div className="flex items-center justify-between sm:mr-0 mr-4"> */}

                    {/* <LanguageNetworkModal
                            open={open}
                            onClose={toggleLanguageModal}
                        /> */}

                    {/* </div> */}

                    {/* <MwebNetworkSection /> */}
                    {/* </div> */}
                    <WalletModal setMagicLoading={setMagicLoading} />
                    <ZeroSwapSettingModal
                        open={open}
                        onClose={toggleSettingModal}
                    />
                    <BGDepositModal
                        open={openBGdeposit}
                        onClose={toggleBGDeposit}
                    />
                    <BGWithdrawModal
                        open={openBGWithdraw}
                        onClose={toggleBGWithdraw}
                    />
                    <BGClaimModal open={openBGClaim} onClose={toggleBGClaim} />
                    <BGReinvestModal
                        open={openBGReinvest}
                        onClose={toggleBGReinvest}
                    />
                    <UnsupportedNetworkModal open={networkOpen} />
                </section>
            </>
        </>
    );
};

export default ZeroswapHeader;
