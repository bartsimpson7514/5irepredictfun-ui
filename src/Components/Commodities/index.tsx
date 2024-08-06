/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PredictionSkeleton from "@Components/Prediction";
import { ASSET_TYPES_COMMODITY, FEATURE_SUPPORTED } from "@Constants";
import { assetsIconRender } from "@Utils/iconRender";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";

const PredictionCommodityAssets = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]
                ?.commodities ? (
                <PredictionSkeleton
                    title="Commodities"
                    assetsIconRender={assetsIconRender}
                    assets={ASSET_TYPES_COMMODITY}
                />
            ) : (
                <BGNNotSupportedSection title="Commodity Markets" />
            )}
        </>
    );
};

export default PredictionCommodityAssets;
