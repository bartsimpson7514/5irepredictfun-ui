import { AppState } from "@Redux";
import { getAllMarketData } from "@Utils/quest";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useGetAllMarketDetails() {
    const [allMarketData, setAllMarketData] = useState<any[]>();
    const { library } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    // set state to re render the hook, on update;
    const [shouldRefetch, refetch] = useState({});

    useEffect(() => {
        (async () => {
            const data = await getAllMarketData(library, predictableToken);
            setAllMarketData(data);
        })();
    }, [shouldRefetch]);

    return { allMarketData, refetch };
}
