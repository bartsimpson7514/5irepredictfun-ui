import { ConnectorUpdate } from "@web3-react/types";
import { AbstractConnector } from "@web3-react/abstract-connector";
import invariant from "tiny-invariant";
import { Magic, RPCError, RPCErrorCode } from "magic-sdk";
import { ODDZ_NETWORK } from "@Constants";

const chainIdToNetwork = {
    [ODDZ_NETWORK.ARBITRUM_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_42161,
        chainId: ODDZ_NETWORK.ARBITRUM_MAINNET,
    },
    [ODDZ_NETWORK.MATIC_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_137,
        chainId: ODDZ_NETWORK.MATIC_MAINNET,
    },
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_324,
        chainId: ODDZ_NETWORK.ZKSYNC_MAINNET,
    },
    [ODDZ_NETWORK.POLYGON_ZKEVM]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_1101,
        chainId: ODDZ_NETWORK.POLYGON_ZKEVM,
    },
    [ODDZ_NETWORK.ZKSYNC_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_324,
        chainId: ODDZ_NETWORK.ZKSYNC_MAINNET,
    },
    [ODDZ_NETWORK.MANTLE_TESTNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_5001,
        chainId: ODDZ_NETWORK.MANTLE_TESTNET,
    },
    [ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_91002,
        chainId: ODDZ_NETWORK.NAUTILUS_TRITON_TESTNET,
    },
    [ODDZ_NETWORK.NAUTILUS]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_22222,
        chainId: ODDZ_NETWORK.NAUTILUS,
    },
    [ODDZ_NETWORK.MANTLE_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_5000,
        chainId: ODDZ_NETWORK.MANTLE_MAINNET,
    },
    [ODDZ_NETWORK.OPBNB_TESTNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_5611,
        chainId: ODDZ_NETWORK.OPBNB_TESTNET,
    },
    [ODDZ_NETWORK.TELOS_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_40,
        chainId: ODDZ_NETWORK.TELOS_MAINNET,
    },
    [ODDZ_NETWORK.ROLLUX_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_570,
        chainId: ODDZ_NETWORK.ROLLUX_MAINNET,
    },
    [ODDZ_NETWORK.MANTA_MAINNET]: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_169,
        chainId: ODDZ_NETWORK.MANTA_MAINNET,
    },
};

interface MagicConnectorArguments {
    apiKey: string;
    chainId: number;
    email: string;
    cancelCallback: () => void;
}

export class UserRejectedRequestError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The user rejected the request.";
    }
}

export class FailedVerificationError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The email verification failed.";
    }
}

export class MagicLinkRateLimitError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The Magic rate limit has been reached.";
    }
}

export class MagicLinkExpiredError extends Error {
    public constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "The Magic link has expired.";
    }
}

export class MagicConnector extends AbstractConnector {
    private readonly apiKey: string;

    private readonly chainId: number;

    private readonly email: string;

    public magic: any;

    private readonly cancelCallback: () => void;

    constructor({
        apiKey,
        chainId,
        email,
        cancelCallback,
    }: MagicConnectorArguments) {
        invariant(
            Object.keys(chainIdToNetwork).includes(chainId.toString()),
            `Unsupported chainId ${chainId}`
        );
        invariant(email && email.includes("@"), `Invalid email: ${email}`);
        super({ supportedChainIds: [chainId] });
        this.apiKey = apiKey;
        this.chainId = chainId;
        this.email = email;
        this.cancelCallback = cancelCallback;
    }

    public async activate(): Promise<ConnectorUpdate> {
        if (!this.magic) {
            this.magic = new Magic(this.apiKey, {
                network: chainIdToNetwork[this.chainId],
            });
        }

        const isLoggedIn = await this.magic.user.isLoggedIn();
        // const loggedInEmail = isLoggedIn
        //     ? (await this.magic.user.getMetadata()).email
        //     : null;

        // if (isLoggedIn && loggedInEmail !== this.email) {
        //     await this.magic.user.logout();
        // }

        if (!isLoggedIn) {
            try {
                await this.magic.auth.loginWithMagicLink({ email: this.email });
            } catch (err) {
                this.cancelCallback();

                if (!(err instanceof RPCError)) {
                    throw err;
                }
                if (err.code === RPCErrorCode.MagicLinkFailedVerification) {
                    throw new FailedVerificationError();
                }
                if (err.code === RPCErrorCode.MagicLinkExpired) {
                    throw new MagicLinkExpiredError();
                }
                if (err.code === RPCErrorCode.MagicLinkRateLimited) {
                    throw new MagicLinkRateLimitError();
                }
                // This error gets thrown when users close the login window.
                // -32603 = JSON-RPC InternalError
                if (err.code === -32603) {
                    throw new UserRejectedRequestError();
                }
            }
        }

        const provider = this.magic.rpcProvider;
        const account = await provider
            .enable()
            .then((accounts: string[]): string => accounts[0]);

        return { provider, chainId: this.chainId, account };
    }

    public async getProvider(): Promise<any> {
        return this.magic.rpcProvider;
    }

    public async getChainId(): Promise<number | string> {
        return this.chainId;
    }

    public async getAccount(): Promise<null | string> {
        return this.magic.rpcProvider
            .send("eth_accounts")
            .then((accounts: string[]): string => accounts[0]);
    }

    public async deactivate() {
        await this.magic.user.logout();
        this.emitDeactivate();
    }

    public async close() {
        await this.magic.user.logout();
        this.emitDeactivate();
    }
}
