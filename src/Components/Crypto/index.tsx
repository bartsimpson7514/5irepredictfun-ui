/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PredictionSkeleton from "@Components/Prediction";
import { ASSET_TYPES, FEATURE_SUPPORTED } from "@Constants";
import { assetsIconRender } from "@Utils/iconRender";
import { useSelector } from "react-redux";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";
import { AppState } from "@Redux";

const PredictionCryptoAssets = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]?.crypto ? (
                <PredictionSkeleton
                    title="Crypto currencies"
                    assetsIconRender={assetsIconRender}
                    assets={ASSET_TYPES}
                />
            ) : (
                <BGNNotSupportedSection title="Crypto Markets" />
            )}
        </>
    );
};

export default PredictionCryptoAssets;
