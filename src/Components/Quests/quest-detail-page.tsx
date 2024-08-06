/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import QuestDetailBlock from "@Components/Quests/quest-detail-block";
import MarketResolution from "@Public/svgs/quest/market-resolution.svg";
import SettlementSvg from "@Public/svgs/quest/settlement.svg";
import SourceIcon from "@Public/svgs/quest/source.svg";

import StyledLabelForCategory from "@Components/Quests/label";

import { useWeb3React } from "@web3-react/core";
import { getOutComeValue } from "@Utils/quest";
import { useGetMarket } from "@Hooks/useGetMarket";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import {
    formatQuestion,
    formatValue,
    fromWei,
    getCompleteDate,
} from "./questhelpers";
import QuestProgressBlock from "./quest-progress-block";

interface IQuestDetailPage {
    marketId: number;
    onBetSuccess: boolean;
}

const QuestDetailPage: React.FC<IQuestDetailPage> = ({
    marketId,
    onBetSuccess,
}) => {
    const { library } = useWeb3React();
    const [, setOutcomeVal] = useState([]);
    const { questData, refetch } = useGetMarket(marketId);
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const [totalVolume, setTotalVolume] = useState("");
    const { t } = useTranslation();
    const getValue = async (outcomeid: number) => {
        try {
            const val = await getOutComeValue(
                library,
                marketId,
                outcomeid,
                predictableToken
            );
            setOutcomeVal(prevState => [...prevState, val]);
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        refetch({});
    }, [onBetSuccess, refetch]);

    useEffect(() => {
        if (questData) {
            const getVolume = fromWei(questData.balance, library);
            const formatted = formatValue(Number(getVolume));
            setTotalVolume(formatted);
            questData.outcomes.forEach((_otcme, idx) => getValue(idx));
        }
    }, [questData, marketId]);
    return (
        <div>
            {questData && (
                <div className="  flex flex-col gap-4">
                    <StyledLabelForCategory style="cursor-pointer w-fit px-2 py-1 rounded-md text-base font-medium bg-primary-400 bg-opacity-20">
                        <p className="text-primary-200 text-xs">
                            {questData.category}
                        </p>
                    </StyledLabelForCategory>
                    <div>
                        <p className="text-primary-100 text-sm font-semibold">
                            {formatQuestion(questData.question)}
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="">
                            <p className="text-primary-100 text-sm font-medium">
                                {totalVolume}
                            </p>
                            <p className="text-xs text-primary-300 ">
                                {t("Total Volume")}
                            </p>
                        </div>
                        <div className="">
                            <p>
                                <img
                                    src="/images/currency/bhavish-lossless-chip.png"
                                    alt="lossless"
                                    className="h-6 w-6"
                                />
                            </p>
                            <p className="text-xs text-primary-300 ">
                                {t("Currency")}
                            </p>
                        </div>
                        {/* {questData &&
                            questData.outcomes.map((outcome, index) => {
                                return (
                                    <div key={outcome}>
                                        <div className="">
                                            <p className="text-primary-white flex">
                                                {`${outComeVal[index] / 100}%`}
                                            </p>
                                            <p className="text-gray-800">
                                                {outcome}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })} */}
                    </div>
                    <div>
                        <QuestProgressBlock
                            markets={questData}
                            predictableToken={predictableToken}
                        />
                    </div>
                    <QuestDetailBlock
                        Icon={MarketResolution}
                        title="Market Resolution"
                        description={questData?.description}
                    />

                    {/* <div className="flex gap-10">
                        <QuestDetailBlock
                            Icon={CalendarPlusSvg}
                            title="Start Date & Time"
                            description={getCompleteDate(
                                Number(questData.opensAtTimestamp)
                            )}
                        />
                        <QuestDetailBlock
                            Icon={calendarCloseSvg}
                            title="Close Date & Time"
                            description={getCompleteDate(
                                Number(questData.closesAtTimestamp)
                            )}
                        />
                    </div> */}
                    <div className="flex lg:flex-row flex-col gap-10">
                        <QuestDetailBlock
                            Icon={SettlementSvg}
                            title="Expiration"
                            description={getCompleteDate(
                                Number(questData.closesAtTimestamp)
                            )}
                        />
                        <QuestDetailBlock
                            Icon={SourceIcon}
                            title="Source of settlement"
                            description={questData.resolutionSource}
                            type="link"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestDetailPage;
