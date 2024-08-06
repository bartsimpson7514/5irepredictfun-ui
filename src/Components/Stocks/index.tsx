import React from "react";
import PredictionSkeleton from "@Components/Prediction";
import { ASSET_TYPES_STOCKS, FEATURE_SUPPORTED } from "@Constants";
import { assetsIconRender } from "@Utils/iconRender";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";

const PredictionStocksAssets = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]?.stocks ? (
                <PredictionSkeleton
                    title="Stocks"
                    assetsIconRender={assetsIconRender}
                    assets={ASSET_TYPES_STOCKS}
                />
            ) : (
                <BGNNotSupportedSection title="Stocks Markets" />
            )}
        </>
    );
};

export default PredictionStocksAssets;
