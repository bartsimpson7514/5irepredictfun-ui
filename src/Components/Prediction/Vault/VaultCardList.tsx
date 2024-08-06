import TokenRender from "@Basic/TokenRender";
import RightArrow from "@Public/svgs/right-arrow";
import { AppState } from "@Redux";
import React from "react";
import { useSelector } from "react-redux";

interface VaultCardListProps {
    icon: string;
    assetType: string;
    currencySupported: string;
    maxCapacity: string;
    currentDeposit: string;
    apy: number;
    style: string;
}

const VaultCardList: React.FC<VaultCardListProps> = ({ ...props }) => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    return (
        <div
            className={`w-full group hover:bg-section-blue cursor-pointer ${props.style}`}
        >
            <div className="px-10 py-4 rounded-lg justify-between items-center flex">
                <div className="flex items-center justify-between  gap-[6.5rem]">
                    <div className=" w-[6.75rem]">
                        <img
                            src={props.icon}
                            alt="Icon"
                            className="w-8 h-auto"
                        />
                    </div>
                    <div className=" text-primary-100text-sm leading-[0.875rem] font-medium w-[6.75rem]">
                        {props.assetType}
                    </div>
                    <div className="w-[6.75rem] flex flex-col gap-1">
                        <div className=" text-primary-200 text-sm leading-[0.875rem]">
                            {` Current: `}
                            <span className=" text-primary-100 font-bold">
                                {props.currentDeposit
                                    ? props.currentDeposit
                                    : "---"}
                            </span>
                        </div>
                        <div className=" text-primary-200 text-sm leading-[0.875rem]">
                            {`Max : `}
                            <span className="text-gray-100">
                                {`${
                                    props.maxCapacity
                                        ? props.maxCapacity
                                        : "---"
                                } ${predictableToken}`}
                            </span>
                        </div>
                    </div>
                    <div className=" text-primary-100leading-[1.125rem] font-bold w-[6.75rem] text-lg">
                        {`${props.apy}% `}
                    </div>
                    <TokenRender tokenList={props.currencySupported} />
                </div>

                <div className="flex items-center justify-between">
                    <RightArrow className="fill-primary-100 group-hover:fill-primary-blue" />
                </div>
            </div>
        </div>
    );
};

export default VaultCardList;
