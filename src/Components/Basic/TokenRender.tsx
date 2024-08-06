import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import React from "react";

const TokenRender = ({ tokenList }) => {
    return (
        <div className="flex flex-row">
            {React.Children.toArray(
                tokenList?.map((token, index) => {
                    return (
                        <div className={`translate-y-[${index}rem]`}>
                            <CurrencyIcon label={token} className="h-5 w-5" />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TokenRender;
