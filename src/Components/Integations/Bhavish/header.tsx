/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Logo from "public/svgs/bhavish-logo.svg";
import LogoName from "public/svgs/oddz-logo-name.svg";
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
    useToggleLanguageNetworkModalToggle,
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
import { FAUCET_URL, PREDICT_TOKENS, WALLET_NAME } from "@Constants";
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

import LanguageNetworkModal from "@Components/Header/language-network-modal";
// import LanguageSection from "@Components/Header/language-section";
import MwebNetworkSection from "@Components/Header/mweb-network-select";
import { useRouter } from "next/router";
import OddzSettingModal from "../../Header/settings-modal";
import WrongNetwork from "./wrong-network";

const LogoHeader = () => {
    return (
        <a
            href=""
            target="_blank"
            rel="noreferrer"
            onClick={() => {
                handleGaEvent("BHAVISH LANDING PAGE CLICKED");
            }}
        >
            <Logo className="w-8 h-8 block sm:hidden" />

            <LogoName className="hidden sm:block" />
        </a>
    );
};

const BhavishHeader = ({ setMagicLoading }) => {
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

    const toggleLanguageModal = useToggleLanguageNetworkModalToggle();

    const settingReff = useRef(null);
    const {
        selectedChainId,
        isPredicted,
        magicEmail,
        isSocial,
        walletConnected,
        predictableToken,
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

    const handleMagicConnection = async networkId => {
        dispatch(updateSelectedChainId(Number(networkId)));
        dispatch(updateMagicNetworkChanged(true));
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

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
    }, [account, chainId]);

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

    return (
        <>
            <section
                className={`relative  flex-shrink-0 shadow justify-between
                    `}
                style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                }}
            >
                <div className="relative z-100 flex-shrink-0 flex h-14  shadow justify-between  pl-4 sm:pl-6">
                    <div className="flex items-center">
                        <LogoHeader />
                    </div>
                    <div className="flex items-center justify-between sm:mr-0 mr-4">
                        <LanguageNetworkModal
                            open={open}
                            onClose={toggleLanguageModal}
                        />
                    </div>
                    <div className="flex items-center sm:gap-3 gap-2 sm:mr-6 mr-6">
                        {account && !validNetwork(chainId) ? (
                            <WrongNetwork text="Wrong Network" />
                        ) : (
                            <>
                                {/* <div className="hidden sm:flex">
                                    <LanguageSection
                                        header
                                        footer={false}
                                        language
                                    />
                                </div> */}
                                {process.env.NEXT_PUBLIC_NETWORK_TYPE ===
                                "testnet" ? (
                                    <a
                                        href={FAUCET_URL[selectedChainId]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className=" items-center sm:flex hidden border-light border-gray-700 rounded-lg  outline-none  transition-all duration-300 px-3 py-[6px] text-left cursor-pointer focus:outline-none sm:text-sm border-2   truncate font-medium text-primary-100 text-sm"
                                    >
                                        Faucet
                                    </a>
                                ) : null}
                                <NetworkSelect
                                    value={switchChainId?.toString()}
                                    options={networks}
                                    variant="border-2"
                                    onChange={(networkId: any) => {
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
                                                      Number(networkId),
                                                      id => {
                                                          dispatch(
                                                              updateSelectedChainId(
                                                                  Number(id)
                                                              )
                                                          );
                                                      }
                                                  )
                                                : dispatch(
                                                      updateSelectedChainId(
                                                          Number(networkId)
                                                      )
                                                  );
                                        }
                                        router.push({
                                            pathname: currentPathname,
                                            query: {
                                                network: Number(networkId),
                                            },
                                        });
                                    }}
                                    margin={false}
                                />
                            </>
                        )}

                        <TokenSection connecting={connecting} />
                        <MwebNetworkSection />
                    </div>
                    <WalletModal setMagicLoading={setMagicLoading} />
                    <OddzSettingModal
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
            </section>
        </>
    );
};

export default BhavishHeader;
