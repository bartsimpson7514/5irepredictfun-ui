import { ODDZ_PREDICTION, USDC_DECIMAL } from "@Constants";
import { AppState } from "@Redux";
import { toDecimals } from "@Utils";
import { getUserRewardAmount } from "@Utils/rounds";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userHistory } from "../Components/History/queries";

export default function useVaultGraphDetails(
    vaultAddress: string,
    currencySupported: any
) {
    const { account, chainId, library } = useWeb3React();
    const [data, setData] = useState<any>();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const [arr, setArr] = useState([]);

    const { data: userHistories } = useQuery(
        userHistory(vaultAddress?.toLowerCase(), arr)
    );

    useEffect(() => {
        let address = [];

        if (currencySupported)
            address = ODDZ_PREDICTION[currencySupported[0]][selectedChainId];
        const tokenContracts = [];
        Object.keys(address).forEach(k => tokenContracts.push(address[k]));
        setArr(tokenContracts);
    }, [currencySupported]);

    const returnWinStatus = (upAmount, downAmount, status) => {
        let winStatus = "NOT STARTED";
        if (status) {
            if (status === "TIE") {
                winStatus = "DRAW";
            } else if (
                (upAmount > 0 && status === "UP") ||
                (downAmount > 0 && status === "DOWN")
            ) {
                winStatus = "WON";
            } else {
                winStatus = "LOST";
            }
        }
        return winStatus;
    };

    const returnRewards = (rewardReceived, rewardAmount, history) => {
        if (rewardReceived || rewardAmount) {
            return rewardReceived > 0
                ? Number(rewardReceived / 1e18).toFixed(4)
                : Number(rewardAmount).toFixed(4);
        }
        return String(
            toDecimals(
                history.upPredictAmount / USDC_DECIMAL +
                    history.downPredictAmount / USDC_DECIMAL
            )
        );
    };

    const getRewardAmount = async (asset, roundId, address, market) => {
        try {
            const reward: any = await getUserRewardAmount(
                asset,
                roundId,
                address,
                chainId,
                library,
                predictableToken,
                market
            );
            return reward / USDC_DECIMAL;
        } catch (err) {
            return 0;
        }
    };

    const vaultDetail = async () => {
        if (userHistories) {
            const details = await Promise.all(
                userHistories?.userHistories?.map(async history => {
                    const winStatus = returnWinStatus(
                        history.upPredictAmount,
                        history.downPredictAmount,
                        history.roundId.winStatus
                    );
                    const direction: boolean =
                        Number(history.upPredictAmount) > 0;
                    const commitAmt =
                        Number(history.upPredictAmount) / USDC_DECIMAL +
                        Number(history.downPredictAmount) / USDC_DECIMAL;
                    const rewardReceived = Number(history.rewardReceived);
                    const asset = history.roundId.asset.split("/")[0];
                    const roundId = history.roundId.id.split("-")[1];
                    const rewardAmount = await getRewardAmount(
                        asset,
                        history.roundId.roundId,
                        vaultAddress,
                        history.market
                    );
                    const reward = await returnRewards(
                        rewardReceived,
                        rewardAmount,
                        history
                    );
                    return {
                        assetType: asset,
                        roundId,
                        commitType: direction ? "UP" : "DOWN",
                        commitAmount: commitAmt,
                        results: winStatus,
                        earnings: reward,
                    };
                })
            );
            setData(details);
        }
    };

    useEffect(() => {
        vaultDetail();
    }, [userHistories, account, chainId, currencySupported]);

    return data;
}
