import React from "react";
import { INDICATOR_STATUS } from "@Constants";
import Tag from "@Components/Prediction/Card/tag";
import WonTag from "@Public/svgs/won-tag.svg";
import LostTag from "@Public/svgs/lost-tag.svg";
import TieTag from "@Public/svgs/tie-tag.svg";

const WinTag = ({
    closedPrice,
    lastPrice,
    userDownPredictAmt,
    userUpPredictAmt,
}) => {
    const option = () => {
        if (Number(closedPrice) - Number(lastPrice) > 0) {
            return INDICATOR_STATUS.UP;
        }
        if (Number(closedPrice) - Number(lastPrice) === 0) {
            return INDICATOR_STATUS.TIE;
        }
        return INDICATOR_STATUS.DOWN;
    };

    return (
        <>
            {Boolean(
                Number(userUpPredictAmt) || Number(userDownPredictAmt)
            ) && (
                <>
                    {(option() === INDICATOR_STATUS.UP &&
                        Number(userUpPredictAmt)) ||
                    (option() === INDICATOR_STATUS.DOWN &&
                        Number(userDownPredictAmt)) ||
                    option() === INDICATOR_STATUS.TIE ? (
                        <div className="flex items-center justify-center w-full mt-0.5 absolute top-0 left-0 right-0 mx-auto border-primary   ">
                            {option() === INDICATOR_STATUS.TIE ? (
                                <Tag
                                    icon={<TieTag />}
                                    cssstyle="bg-primary-card-200 text-primary-white"
                                    text="Tie"
                                />
                            ) : (
                                <Tag
                                    icon={<WonTag />}
                                    cssstyle="bg-up-100 text-up"
                                    text="You Won"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full mt-0.5 absolute top-0 left-0 right-0 mx-auto border-primary ">
                            <Tag
                                icon={<LostTag />}
                                cssstyle="bg-down-100 text-down"
                                text="You Lost"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default WinTag;
