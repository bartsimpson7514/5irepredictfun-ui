/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-prototype-builtins */
import { AbstractConnectorArguments, ConnectorUpdate } from "@web3-react/types";
import { AbstractConnector } from "@web3-react/abstract-connector";
import warning from "tiny-warning";

import { SendReturnResult, SendReturn, Send, SendOld } from "./types";

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
    return sendReturn.hasOwnProperty("result") ? sendReturn.result : sendReturn;
}

export class NoEthereumProviderError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message =
            "No Ethereum provider was found on window.frontier.ethereum.";
    }
}

export class UserRejectedRequestError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The user rejected the request.";
    }
}

export class InjectedConnector extends AbstractConnector {
    constructor(kwargs: AbstractConnectorArguments) {
        super(kwargs);

        this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
        this.handleChainChanged = this.handleChainChanged.bind(this);
        this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    private handleChainChanged(chainId: string | number): void {
        this.emitUpdate({ chainId, provider: window.frontier.ethereum });
    }

    private handleAccountsChanged(accounts: string[]): void {
        if (accounts.length === 0) {
            this.emitDeactivate();
        } else {
            this.emitUpdate({ account: accounts[0] });
        }
    }

    private handleClose(code: number, reason: string): void {
        this.emitDeactivate();
    }

    private handleNetworkChanged(networkId: string | number): void {
        this.emitUpdate({
            chainId: networkId,
            provider: window.frontier.ethereum,
        });
    }

    public async activate(): Promise<ConnectorUpdate> {
        if (!window.frontier.ethereum) {
            throw new NoEthereumProviderError();
        }

        if (window.frontier.ethereum.on) {
            window.frontier.ethereum.on(
                "chainChanged",
                this.handleChainChanged
            );
            window.frontier.ethereum.on(
                "accountsChanged",
                this.handleAccountsChanged
            );
            window.frontier.ethereum.on("close", this.handleClose);
            window.frontier.ethereum.on(
                "networkChanged",
                this.handleNetworkChanged
            );
        }

        if ((window.frontier.ethereum as any).isMetaMask) {
            (window.frontier
                .ethereum as any).autoRefreshOnNetworkChange = false;
        }

        // try to activate + get account via eth_requestAccounts
        let account;
        try {
            account = await (window.frontier.ethereum.send as Send)(
                "eth_requestAccounts"
            ).then(sendReturn => parseSendReturn(sendReturn)[0]);
        } catch (error) {
            if ((error as any).code === 4001) {
                throw new UserRejectedRequestError();
            }
            warning(
                false,
                "eth_requestAccounts was unsuccessful, falling back to enable"
            );
        }

        // if unsuccessful, try enable
        if (!account) {
            // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
            account = await window.frontier.ethereum
                .enable()
                .then(
                    sendReturn => sendReturn && parseSendReturn(sendReturn)[0]
                );
        }

        return {
            provider: window.frontier.ethereum,
            ...(account ? { account } : {}),
        };
    }

    public async getProvider(): Promise<any> {
        return window.frontier.ethereum;
    }

    public async getChainId(): Promise<number | string> {
        if (!window.frontier.ethereum) {
            throw new NoEthereumProviderError();
        }

        let chainId;
        try {
            chainId = await (window.frontier.ethereum.send as Send)(
                "eth_chainId"
            ).then(parseSendReturn);
        } catch {
            warning(
                false,
                "eth_chainId was unsuccessful, falling back to net_version"
            );
        }

        if (!chainId) {
            try {
                chainId = await (window.frontier.ethereum.send as Send)(
                    "net_version"
                ).then(parseSendReturn);
            } catch {
                warning(
                    false,
                    "net_version was unsuccessful, falling back to net version v2"
                );
            }
        }

        if (!chainId) {
            try {
                chainId = parseSendReturn(
                    (window.frontier.ethereum.send as SendOld)({
                        method: "net_version",
                    })
                );
            } catch {
                warning(
                    false,
                    "net_version v2 was unsuccessful, falling back to manual matches and static properties"
                );
            }
        }

        if (!chainId) {
            if ((window.frontier.ethereum as any).isDapper) {
                chainId = parseSendReturn(
                    (window.frontier.ethereum as any).cachedResults.net_version
                );
            } else {
                chainId =
                    (window.frontier.ethereum as any).chainId ||
                    (window.frontier.ethereum as any).netVersion ||
                    (window.frontier.ethereum as any).networkVersion ||
                    (window.frontier.ethereum as any)._chainId;
            }
        }

        return chainId;
    }

    public async getAccount(): Promise<null | string> {
        if (!window.frontier.ethereum) {
            throw new NoEthereumProviderError();
        }

        let account;
        try {
            account = await (window.frontier.ethereum.send as Send)(
                "eth_accounts"
            ).then(sendReturn => parseSendReturn(sendReturn)[0]);
        } catch {
            warning(
                false,
                "eth_accounts was unsuccessful, falling back to enable"
            );
        }

        if (!account) {
            try {
                account = await window.frontier.ethereum
                    .enable()
                    .then(sendReturn => parseSendReturn(sendReturn)[0]);
            } catch {
                warning(
                    false,
                    "enable was unsuccessful, falling back to eth_accounts v2"
                );
            }
        }

        if (!account) {
            account = parseSendReturn(
                (window.frontier.ethereum.send as SendOld)({
                    method: "eth_accounts",
                })
            )[0];
        }

        return account;
    }

    public deactivate() {
        if (
            window.frontier.ethereum &&
            window.frontier.ethereum.removeListener
        ) {
            window.frontier.ethereum.removeListener(
                "chainChanged",
                this.handleChainChanged
            );
            window.frontier.ethereum.removeListener(
                "accountsChanged",
                this.handleAccountsChanged
            );
            window.frontier.ethereum.removeListener("close", this.handleClose);
            window.frontier.ethereum.removeListener(
                "networkChanged",
                this.handleNetworkChanged
            );
        }
    }

    public async isAuthorized(): Promise<boolean> {
        if (!window.frontier.ethereum) {
            return false;
        }

        try {
            return await (window.frontier.ethereum.send as Send)(
                "eth_accounts"
            ).then(sendReturn => {
                if (parseSendReturn(sendReturn).length > 0) {
                    return true;
                } else {
                    return false;
                }
            });
        } catch {
            return false;
        }
    }
}
