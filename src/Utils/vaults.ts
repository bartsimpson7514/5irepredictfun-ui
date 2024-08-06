import Web3 from "web3";
import ERC20ABI from "@Contracts/erc-20.json";
import { ethers } from "ethers";
import BHAVISHVAULTSNATIVE from "@Contracts/BhavishVaultNative.json";
import BHAVISHVAULTSNATIVEBNB from "@Contracts/BhavishVaultNativeBNB.json";
import BHAVISHVAULTSLOSSY from "@Contracts/BhavishVaultLossy.json";
import { RPC_URLS } from "@Connectors";
import { QUEST_POOL } from "@Constants";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const depositToVault = async (
    library: any,
    _amount: number,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress: string,
    predictableToken
) => {
    try {
        if (!NETWORK_URL) return {};
        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const chainId = await web3.eth.getChainId();
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSLOSSY as any,
            contractAddress
        );
        const calcedAmount = ethers.utils.parseUnits(_amount.toString(), 18);

        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            QUEST_POOL[predictableToken][chainId]
        );

        const allowance = await tokenContract.methods
            .allowance(user, contractAddress)
            .call();

        const totalSupply = await tokenContract.methods.totalSupply().call();

        if (
            web3.utils
                .toBN(allowance)
                .sub(web3.utils.toBN(calcedAmount.toString()))
                .isNeg()
        ) {
            await tokenContract.methods
                .approve(contractAddress, totalSupply)
                .send({
                    from: user,
                });
        }

        const gasLimit = await predictManager.methods
            .depositAsset(_amount)
            .estimateGas({ from: user });

        const predictmethod = await predictManager.methods
            .depositAsset(calcedAmount)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return predictmethod;
    } catch (err) {
        throw err;
    }
};

export const depositToVaultNative = async (
    library: any,
    _amount: number,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress: string
    // strike?: number
) => {
    try {
        if (!NETWORK_URL) return {};

        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const calcedAmount = ethers.utils.parseUnits(_amount.toString(), 18);

        const gasLimit = await predictManager.methods
            .deposit()
            .estimateGas({ from: user, value: calcedAmount });

        const predictmethod = await predictManager.methods
            .deposit()
            .send({
                from: user,
                value: calcedAmount,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return predictmethod;
    } catch (err) {
        throw err;
    }
};

export const depositToVaultNativeBNB = async (
    library: any,
    _amount: number,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress: string

    // strike?: number
) => {
    try {
        if (!NETWORK_URL) return {};

        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSNATIVEBNB as any,
            contractAddress
        );
        const calcedAmount = ethers.utils.parseUnits(_amount.toString(), 18);

        const gasLimit = await predictManager.methods
            .deposit(user, process.env.NEXT_PUBLIC_PROVIDER_ADDRESS)
            .estimateGas({ from: user, value: calcedAmount });

        const predictmethod = await predictManager.methods
            .deposit(user, process.env.NEXT_PUBLIC_PROVIDER_ADDRESS)
            .send({
                from: user,
                value: calcedAmount,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return predictmethod;
    } catch (err) {
        throw err;
    }
};

export const removeDepositFromVault = async (
    library: any,
    _percent: string,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress: string,
    predictableToken: string
    // strike?: number
) => {
    try {
        if (!NETWORK_URL) return {};
        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const chainId = await web3.eth.getChainId();
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSLOSSY as any,
            contractAddress
        );
        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            QUEST_POOL[predictableToken][chainId]
        );
        const decimals = await tokenContract.methods.decimals().call();

        const calcedAmount = ethers.utils.parseUnits(
            _percent.toString(),
            decimals
        );

        const allowance = await tokenContract.methods
            .allowance(user, contractAddress)
            .call();
        const totalSupply = await tokenContract.methods.totalSupply().call();
        if (
            web3.utils
                .toBN(allowance)
                .sub(web3.utils.toBN(calcedAmount.toString()))
                .isNeg()
        ) {
            const approvalGasLimit = await tokenContract.methods
                .approve(contractAddress, totalSupply)
                .estimateGas({ from: user });

            await tokenContract.methods
                .approve(contractAddress, totalSupply)
                .send({
                    from: user,
                    gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                    gas: Math.round(approvalGasLimit * 1.5),
                });
        }
        const gasLimit = await predictManager.methods
            .withdrawAsset(calcedAmount)
            .estimateGas({ from: user });

        const predictmethod = await predictManager.methods
            .withdrawAsset(calcedAmount)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return predictmethod;
    } catch (err) {
        throw err;
    }
};

export const removeDepositFromVaultNative = async (
    library: any,
    _percent: string,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress
    // strike?: number
) => {
    try {
        if (!NETWORK_URL) return {};

        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const calcedAmount = ethers.utils.parseUnits(_percent.toString(), 18);

        const gasLimit = await predictManager.methods
            .withdraw(calcedAmount)
            .estimateGas({ from: user });

        const predictmethod = await predictManager.methods
            .withdraw(calcedAmount)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return predictmethod;
    } catch (err) {
        throw err;
    }
};

export const removeDepositFromVaultNativeBNB = async (
    library: any,
    _percent: string,
    user = "",
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    contractAddress
    // strike?: number
) => {
    try {
        if (!NETWORK_URL) return {};

        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const predictManager = new web3.eth.Contract(
            BHAVISHVAULTSNATIVEBNB as any,
            contractAddress
        );
        const calcedAmount = ethers.utils.parseUnits(_percent.toString(), 18);

        const gasLimit = await predictManager.methods
            .withdraw(user, calcedAmount)
            .estimateGas({ from: user });

        const predictmethod = await predictManager.methods
            .withdraw(user, calcedAmount)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return predictmethod;
    } catch (err) {
        throw err;
    }
};

// export const getVaultName = async (
//     library: any,
//     address: string,
//     chainId: number
// ) => {
//     if (!NETWORK_URL) return {};
//     const web3 = new Web3(
//         library?.provider ||
//             Web3.givenProvider ||
//             new Web3.providers.HttpProvider(NETWORK_URL)
//     );
//     const currentChain = await web3.eth.getChainId();

//     if (!validNetwork(currentChain)) {
//         web3.setProvider(RPC_URLS[chainId]);
//     }
//     try {
//         const vaultContract = new web3.eth.Contract(
//             BHAVISHVAULTSNATIVE as any,
//             address
//         );
//         const name = await vaultContract.methods.name().call();
//         return name;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getVaultAllUsers = async (
//     library: any,
//     contractAddress: string
// ) => {
//     if (!NETWORK_URL) return {};
//     const web3 = new Web3(
//         library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
//     );
//     try {
//         const vaultContract = new web3.eth.Contract(
//             BHAVISHVAULTSNATIVE as any,
//             contractAddress
//         );
//         const users = await vaultContract.methods.getAllUsers().call();
//         return users;
//     } catch (error) {
//         throw error;
//     }
// };

export const getVaultUserCount = async (
    library: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const count = await vaultContract.methods.getUserCount().call();
        return Number(count);
    } catch (error) {
        throw error;
    }
};

// export const getVaultUserDeposits = async (
//     library: any,
//     user: string,
//     contractAddress: string
// ) => {
//     if (!NETWORK_URL) return {};
//     const web3 = new Web3(
//         library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
//     );
//     try {
//         const vaultContract = new web3.eth.Contract(
//             BHAVISHVAULTSNATIVE as any,
//             contractAddress
//         );
//         const count = await vaultContract.methods.getUserDeposit(user).call();

//         const ethVaule = ethers.utils.formatEther(count);
//         return Number(ethVaule);
//     } catch (error) {
//         throw error;
//     }
// };

export const getVaultDeposit = async (
    library: any,
    address: string,
    chainId: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]);

    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            address
        );
        const count = await vaultContract.methods.vaultDeposit().call();
        const data = {
            totalDeposit: ethers.utils.formatEther(count.totalDeposit),
            maxCapacity: ethers.utils.formatEther(count.maxCapacity),
        };
        return data;
    } catch (error) {
        throw error;
    }
};

export const getVaultTotalSupply = async (
    library: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const count = await vaultContract.methods.getMaxCapacity().call();
        const ethVaule = ethers.utils.formatEther(count);
        return Number(ethVaule);
    } catch (error) {
        throw error;
    }
};

export const getVaultPreviewWithdraw = async (
    library: any,
    shares: number,
    contractAddress: string,
    chainId
) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]);

    const calcedAmount = ethers.utils.parseUnits(shares.toString(), 18);

    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const count = await vaultContract.methods
            .convertToAssets(calcedAmount)
            .call();
        const ethVaule = ethers.utils.formatEther(count);

        return Number(ethVaule);
    } catch (error) {
        throw error;
    }
};

export const getVaultPreviewDeposit = async (
    library: any,
    amount: number,
    contractAddress: string
) => {
    try {
        if (!NETWORK_URL) return 0;
        const web3 = new Web3(
            library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const calcedAmount = ethers.utils.parseUnits(amount.toString(), 18);

        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const shares = await vaultContract.methods
            .convertToShares(calcedAmount)
            .call();

        const ethVaule: string = ethers.utils.formatEther(shares);

        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const getVaultWithdrawFees: any = async (
    library: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const fees = await vaultContract.methods.vaultConfig().call();
        return {
            performanceFeeRatio: fees?.performanceFeeRatio,
            withdrawFeeRatio: fees?.withdrawFeeRatio,
        };
    } catch (error) {
        throw error;
    }
};

export const getVaultUserShares = async (
    library: any,
    user: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const shares: string = await vaultContract.methods
            .getUserShares(user)
            .call();

        const ethVaule = ethers.utils.formatEther(shares);
        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const getVaultUserLastDeposit = async (
    library: any,
    user: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const count = await vaultContract.methods
            .getUserLastDepositTime(user)
            .call();
        return count;
    } catch (error) {
        throw error;
    }
};

export const getVaultLockPeriod = async (
    library: any,
    contractAddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    try {
        const vaultContract = new web3.eth.Contract(
            BHAVISHVAULTSNATIVE as any,
            contractAddress
        );
        const count = await vaultContract.methods.vaultConfig().call();
        return count?.lockPeriod;
    } catch (error) {
        throw error;
    }
};
