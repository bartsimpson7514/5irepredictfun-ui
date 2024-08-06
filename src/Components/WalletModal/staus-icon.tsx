import React, { FC } from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { MagicConnector } from "@Connectors/magic";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { MagicConnectorSocial } from "@Connectors/magicOAuth";
import {
    fortmatic,
    metamaskinjected,
    frontierinjected,
    portis,
    // walletconnect,
    walletlink,
} from "@Connectors/index";

interface IStatusIcon {
    connector: any;
}

export const StatusText: FC<IStatusIcon> = ({ connector }) => {
    if (connector === metamaskinjected) {
        return <span>Metamask</span>;
    }
    if (connector === frontierinjected) {
        return <span>Frontier</span>;
    }
    if (connector instanceof WalletConnectConnector) {
        return <span>Wallet Connect</span>;
    }
    if (connector === walletlink) {
        return <span>Coinbase Wallet</span>;
    }
    if (connector === fortmatic) {
        return <span>Fortmatic</span>;
    }
    if (connector instanceof MagicConnector) {
        return <span>Magic Link</span>;
    }
    if (connector instanceof MagicConnectorSocial) {
        return <span>Magic Link</span>;
    }
    if (connector === portis) {
        return <span>Portis</span>;
    }
    return null;
};

declare global {
    interface Window {
        frontier: any;
    }
}

export const StatusIcon: FC<IStatusIcon> = ({ connector }) => {
    if (connector === frontierinjected) {
        return (
            <img
                src="/images/wallets/frontier.png"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector === metamaskinjected) {
        return (
            <img
                src="/images/wallets/metamask.svg"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector instanceof WalletConnectConnector) {
        return (
            <img
                src="/images/wallets/walletConnection.svg"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector === walletlink) {
        return (
            <img
                src="/images/wallets/coinbaseWalletIcon.svg"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector === fortmatic) {
        return (
            <img
                src="/images/wallets/fomaticIcon.png"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector instanceof MagicConnector) {
        return (
            <img
                src="/images/wallets/fortmaticIcon.png"
                alt="Icon"
                className="w-4 h-auto"
            />
        );
    }
    if (connector instanceof MagicConnectorSocial) {
        return (
            <img
                src="/images/wallets/fortmaticIcon.png"
                alt="Icon"
                // className="w-4 h-auto"
            />
        );
    }
    if (connector === portis) {
        return (
            <img
                src="/images/wallets/portisicon.png"
                alt="Icon"
                // className="w-4 h-auto"
            />
        );
    }
    return null;
};
