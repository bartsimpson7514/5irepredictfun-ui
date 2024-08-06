import React from "react";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import VaultCardGrid from "./VaultCardGrid";

interface VaultCardViewProps {
    data: any;
    allVaultsDataLoading: boolean;
}
const VaultCardView: React.FC<VaultCardViewProps> = ({ ...props }) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {props.allVaultsDataLoading ? (
                    React.Children.toArray(
                        [...Array(5)].map(() => (
                            <div className=" w-full lg:w-[362px] h-[268px]">
                                <QuickSwapLoader />
                            </div>
                        ))
                    )
                ) : (
                    <>
                        {React.Children.toArray(
                            props.data.map((item, index) => (
                                <VaultCardGrid
                                    id={index}
                                    assetType={item.assetType}
                                    apy={item.apy}
                                    currentDeposit={Number(item.currentDeposit)}
                                    maxCapacity={Number(item.maxCapacity)}
                                    icon={`/images/${item.icon}`}
                                    currencySupported={item.currencySupported}
                                    vaultName={item.vaultName}
                                    strategy={item.strategy}
                                    description={item.description}
                                    startTimestamp={item.startTimestamp}
                                    assetName={item.assetName}
                                    color={item.color}
                                />
                            ))
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default VaultCardView;
