import React from "react";
import Tag from "@Components/Prediction/Card/tag";
import EnteredTag from "@Public/svgs/entered-tag.svg";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

const EnterTag = ({ upPredictAmount, downPredictAmount, cardType }) => {
    const fullConfig = resolveConfig(tailwindConfig);

    return (
        <>
            {Boolean(Number(upPredictAmount) || Number(downPredictAmount)) && (
                <div className="flex items-center justify-center w-full  absolute top-0 left-0 right-0 mx-auto border-primary">
                    <Tag
                        icon={() => (
                            <EnteredTag
                                color={fullConfig.theme.colors["entered-text"]}
                            />
                        )}
                        cssstyle={`bg-entered text-primary-100 ${
                            cardType === "upcoming" ? "" : "mt-[0.6rem]"
                        }`}
                        text="Entered"
                    />
                </div>
            )}
        </>
    );
};

export default EnterTag;
