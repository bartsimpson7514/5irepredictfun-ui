import { AppState } from "@Redux";
import { getUserMarkets } from "@Utils/quest";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useQuestHistoryDetails() {
    const { library, account } = useWeb3React();
    const [userHistory, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const getQuestHistory = async () => {
        setLoading(true);
        const history = await getUserMarkets(
            library,
            account,
            predictableToken
        );
        setHistory(history);
        setLoading(false);
    };

    useEffect(() => {
        getQuestHistory();
    }, []);

    return { userHistory, loading };
}
