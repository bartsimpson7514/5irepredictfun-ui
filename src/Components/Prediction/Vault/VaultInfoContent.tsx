import { ODDZ_HISTORY_GRAPH_API } from "@Constants";
import { AppState } from "@Redux";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import React from "react";
import { useSelector } from "react-redux";
import VaultInfoActivities from "./VaultInfo/VaultInfoActivities";
import VaultInfoOtherInfo from "./VaultInfo/VaultInfoOtherInfo";
import VaultInfoPerformance from "./VaultInfo/VaultInfoPerformance";
import VaultInfoStrategy from "./VaultInfo/VaultInfoStrategy";
import VaultYourDeposit from "./VaultInfo/VaultYourDeposit";
import { SelectedOption } from "./VaultInfoOptions";

interface VaultInfoContentProps {
    option: number;
    strategyInfo: String;
    imageUrl: any;
    contractAddress: string;
    currencySupported: any;
    vaultGraphData: any;
    apy: number;
    startTimestamp: number;
}

const VaultInfoContent: React.FC<VaultInfoContentProps> = ({ ...props }) => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: ODDZ_HISTORY_GRAPH_API[predictableToken][selectedChainId],
    });
    return (
        <div className="w-full mt-6 sm:px-0 sm:mt-8" data-aos="aos">
            <div
                className={`${
                    props.option === SelectedOption.VAULT ? "block" : "hidden"
                } flex gap-8 flex-col`}
            >
                <VaultInfoStrategy
                    strategyInfo={props.strategyInfo}
                    // imageUrl={props.imageUrl}
                />
                <VaultInfoPerformance
                    vaultGraphData={props.vaultGraphData}
                    contractAddress={props.contractAddress}
                    apy={props.apy}
                    startTimestamp={props.startTimestamp}
                />
                <ClientContext.Provider value={client}>
                    <VaultInfoActivities
                        contractAddress={props.contractAddress}
                        currencySupported={props.currencySupported}
                    />
                </ClientContext.Provider>
                <VaultInfoOtherInfo />
            </div>
            <div
                className={`${
                    props.option === SelectedOption.YOURDEPOSIT
                        ? "block"
                        : "hidden"
                }`}
            >
                <VaultYourDeposit contractAddress={props.contractAddress} />
            </div>
        </div>
    );
};

export default VaultInfoContent;
