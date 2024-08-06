import React from "react";

const Title = ({ title, selectedAsset }) => {
    return (
        <div className="flex flex-col">
            <h2 className=" font-medium text-primary-100 text-lg sm:text-xl flex items-center">
                {title}
            </h2>
            {title === "Fun Predictions" ? (
                <p className="my-1 text-sm text-primary-200">
                    Predict the price of
                    <span className="font-medium mx-1">{selectedAsset}</span>
                    within the specified timeframe and win big
                </p>
            ) : null}
        </div>
    );
};

export default Title;
