import React from "react";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import VaultDisplay from "@Components/Prediction/Vault/VaultDisplay";
import { BHAVISH_VAULT_GRAPH_API } from "@Constants";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";

const Vault = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: BHAVISH_VAULT_GRAPH_API[predictableToken][selectedChainId],
    });

    return (
        <ClientContext.Provider value={client}>
            <VaultDisplay />
        </ClientContext.Provider>
    );
};

export default Vault;
