/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Logo from "public/svgs/Onyx/onyx-logo.svg";
import LogoName from "public/svgs/Onyx/onyx-logo-name.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { Dialog } from "@headlessui/react";
import CloseIcon from "public/svgs/close-icon.svg";
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
    updateBalance,
    updateInvalidNetwork,
    updateMagicEmail,
    updateSelectedChainId,
    updateWalletConnected,
    updateBalanceLoader,
    updateMagicNetworkChanged,
} from "@Redux/Reducers/trade";
import {
    useModalOpen,
    useTradeSettingModalToggle,
    useBGDepositModalToggle,
    useBGWithdrawModalToggle,
    useBGReinvestModalToggle,
    useBGClaimModalToggle,
} from "@Redux/Reducers/trade/hooks";
import WalletModal from "@Components/WalletModal";
import UnsupportedNetworkModal from "@Components/Prediction/Card/switchNetworkModal";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import useBalance from "@Hooks/useBalance";
import { BGDepositModal } from "@Components/BGDepositModal";
import { BGWithdrawModal } from "@Components/WithdrawModal";
import { BGClaimModal } from "@Components/BGClaimModal";
import { BGReinvestModal } from "@Components/BGReinvestModal";
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
import { useRouter } from "next/router";
import WrongNetwork from "./wrong-network";
import Alert from "./alert";
import OnyxSettingModal from "./settings-modal";

const LogoHeader = () => {
    return (
        <a
            href="https://www.onyxdao.finance/"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
                handleGaEvent("BHAVISH LANDING PAGE CLICKED");
            }}
        >
            <Logo className="w-24 h-[30px] block sm:hidden" />

            <LogoName className="hidden sm:block" />
        </a>
    );
};

const OnyxHeader = ({ setMagicLoading }) => {
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
    const networkOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const isModalOpen = useModalOpen(ApplicationModal.NETWORKCHANGE);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const settingReff = useRef(null);
    const {
        selectedChainId,
        isPredicted,
        magicEmail,
        isSocial,
        walletConnected,
        predictableToken,
        showAlert,
    } = useSelector((state: AppState) => state.prediction);
    const balanceFromFetcher: any =
        predictableToken.toUpperCase() !== PREDICT_TOKENS.MATIC && library
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

    // const handleMagicConnection = async networkId => {
    //     dispatch(updateSelectedChainId(Number(networkId)));
    //     dispatch(updateMagicNetworkChanged(true));
    //     window.location.reload();
    // };

    const networks = {};
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].forEach(element => {
        if (element.isActive) {
            networks[`${element.chainId.toString()}`] = [element.networkName];
        }
    });

    useEffect(() => {
        if (balanceFromFetcher) {
            if (predictableToken.toUpperCase() !== PREDICT_TOKENS.MATIC) {
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
                // if (!isModalOpen) {
                //     toggleNetworkModal();
                // }
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

    const headerOptions = [
        {
            name: "Pools",
            link: "https://app.onyxdao.finance/",
            isRedirect: false,
            isActive: false,
        },
        {
            name: "Farms",
            link: "https://app.onyxdao.finance/farms",
            isRedirect: false,
            isActive: false,
        },
        {
            name: "Buy ONYX",
            link:
                "https://apeswap.finance/swap?outputCurrency=0xb7cd6c8c4600aed9985d2c0eb174e0bee56e8854",
            isRedirect: true,
            isActive: false,
        },
        {
            name: "Docs",
            link: "https://onyx-dao.gitbook.io/onyx-dao/welcome/usdonyx-token",
            isRedirect: true,
            isActive: false,
        },
        // {
        //     name: "Bonds",
        //     link: "https://apeswap.finance/bonds",
        //     isRedirect: true,
        //     isActive: false,
        // },
        {
            name: "Fun Predictions",
            link: "/",
            isRedirect: false,
            isActive: true,
        },
    ];

    const handleMagicConnection = async networkId => {
        dispatch(updateSelectedChainId(Number(networkId)));
        dispatch(updateMagicNetworkChanged(true));
        window.location.reload();
    };

    return (
        <>
            <div>
                <div className="z-50   mlgh:box-content w-full mx-auto">
                    {showAlert && <Alert />}
                </div>
                <div className="py-4 px-4 md:px-[6vw] flex gap-8 bg-[#12131A] border-b border-[#24293880] mx-auto w-full">
                    <nav className="w-full relative z-20 flex sm:gap-12 items-center justify-between  text-white">
                        <LogoHeader />
                        <ul className="hidden lg:flex w-full font-semibold whitespace-nowrap items-center gap-5">
                            {headerOptions.map(
                                ({ name, link, isRedirect, isActive }) => (
                                    <li className="group">
                                        <a
                                            className={`${
                                                isActive
                                                    ? "cursor-default pointer-events-none"
                                                    : ""
                                            } flex items-center gap-1 mt-[2px]`}
                                            href={link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span
                                                className={`${
                                                    !isActive
                                                        ? "text-[#FFFFFF]"
                                                        : "text-[#217BF4] cursor-default pointer-events-none"
                                                } text-sm leading-[22px] font-semibold`}
                                            >
                                                {name}
                                            </span>
                                            {isRedirect ? (
                                                <svg
                                                    stroke="#FFFFFF"
                                                    fill="none"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    className="text-[120%]"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                                                        fill="#FFFFFF"
                                                    />
                                                    <path
                                                        d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                                                        fill="#FFFFFF"
                                                    />
                                                </svg>
                                            ) : null}
                                        </a>
                                        <div className="h-[2px] transition-all bg-gradient-to-tr to-[#217bf4] from-[#7f56d9] w-[0%] group-hover:w-[85%] group-hover:opacity-60" />
                                    </li>
                                )
                            )}
                        </ul>
                        <div className="w-full flex justify-end items-center gap-0 md:gap-6">
                            <dl className="flex items-center gap-1 ">
                                <div className="sm:flex hidden">
                                    {account && !validNetwork(chainId) ? (
                                        <WrongNetwork text="Wrong Network" />
                                    ) : (
                                        <>
                                            {account ? (
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
                                            ) : null}
                                        </>
                                    )}
                                </div>

                                <TokenSection connecting={connecting} />
                            </dl>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="flex lg:hidden relative p-2 flex-col transform items-center justify-center gap-[.2rem] h-10 w-10"
                            >
                                <div className="w-[80%] h-[2px] bg-white rounded-full origin-center transition-all false" />
                                <div className="duration-300 w-[80%] h-[2px] bg-white rounded-full origin-center transition-all opacity-100 scale-x-100" />
                                <div className="w-[80%] h-[2px] bg-white rounded-full origin-center transition-all false" />
                            </button>
                            <Dialog
                                as="div"
                                className="lg:hidden"
                                open={mobileMenuOpen}
                                onClose={setMobileMenuOpen}
                            >
                                <div className="fixed inset-0 z-10" />
                                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#12131A] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                                    <div className="flex items-center justify-between">
                                        <LogoHeader />

                                        <button
                                            type="button"
                                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className="mt-10 flow-root">
                                        <div className="flex sm:hidden mb-10">
                                            {account &&
                                            !validNetwork(chainId) ? (
                                                <WrongNetwork text="Wrong Network" />
                                            ) : (
                                                <>
                                                    {account ? (
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
                                                    ) : null}
                                                </>
                                            )}
                                        </div>
                                        <div className="-my-6 divide-y divide-gray-500/25">
                                            <ul className="space-y-10 py-6">
                                                {headerOptions.map(
                                                    ({
                                                        name,
                                                        link,
                                                        isRedirect,
                                                        isActive,
                                                    }) => (
                                                        <li className="group">
                                                            <a
                                                                className="flex items-center gap-1 mt-[2px]"
                                                                href={link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <span
                                                                    className={`${
                                                                        !isActive
                                                                            ? "text-[#FFFFFF]"
                                                                            : "text-[#217BF4]"
                                                                    } text-sm leading-[22px] font-semibold`}
                                                                >
                                                                    {name}
                                                                </span>
                                                                {isRedirect ? (
                                                                    <svg
                                                                        stroke="#FFFFFF"
                                                                        fill="none"
                                                                        strokeWidth="0"
                                                                        viewBox="0 0 24 24"
                                                                        className="text-[120%]"
                                                                        height="1em"
                                                                        width="1em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                                                                            fill="#FFFFFF"
                                                                        />
                                                                        <path
                                                                            d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                                                                            fill="#FFFFFF"
                                                                        />
                                                                    </svg>
                                                                ) : null}
                                                            </a>
                                                            <div className="h-[2px] transition-all bg-gradient-to-tr from-onyx-purple to-onyx-blue w-[0%] group-hover:w-[85%] group-hover:opacity-60" />
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </nav>
                </div>
                <WalletModal setMagicLoading={setMagicLoading} />
                <OnyxSettingModal open={open} onClose={toggleSettingModal} />
                <BGDepositModal
                    open={openBGdeposit}
                    onClose={toggleBGDeposit}
                />

                <BGWithdrawModal
                    open={openBGWithdraw}
                    onClose={toggleBGWithdraw}
                />
                <BGWithdrawModal
                    open={openBGWithdraw}
                    onClose={toggleBGWithdraw}
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
            </div>
        </>
    );
};

export default OnyxHeader;
