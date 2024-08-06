import React from "react";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import { BHAVISH_VAULT_GRAPH_API } from "@Constants";
import VaultCard from "@Components/Prediction/Vault/VaultCard";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";

const Vaults = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const client = new GraphQLClient({
        url: BHAVISH_VAULT_GRAPH_API[predictableToken][selectedChainId],
    });

    return (
        <ClientContext.Provider value={client}>
            <VaultCard />
        </ClientContext.Provider>
    );
};

export default Vaults;
