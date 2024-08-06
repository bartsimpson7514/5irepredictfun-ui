import React from "react";
import { Switch } from "@headlessui/react";
import { updateShowChart } from "@Reducers/trade";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";

const ChartSwitch = () => {
    const { showChart } = useSelector((state: AppState) => state.prediction);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <div className="flex items-center w-full py-2 text-sm font-medium gap-2">
            <div className="text-show-chart text-sm leading-[22px] font-semibold text-highlight ">
                {showChart ? t("Hide Chart") : t("Show Chart")}
            </div>
            <Switch
                checked={showChart}
                onChange={() => {
                    dispatch(updateShowChart(!showChart));

                    !showChart
                        ? handleGaEvent("CHART OPENED")
                        : handleGaEvent("CHART CLOSED");
                }}
                className={`relative w-10 h-5 inline-flex flex-shrink-0 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                    showChart
                        ? "bg-show-chart-enable"
                        : " border border-primary-300"
                }`}
            >
                <span
                    className={`pointer-events-none relative  inline-block h-[14px] w-[14px] rounded-full shadow transform ring-0 transition ease-in-out duration-200 ${
                        showChart
                            ? "translate-x-[22px] bg-show-chart-enable-button top-[3px]"
                            : "translate-x-[2px] bg-primary-200 top-[2px]"
                    }`}
                />
            </Switch>
        </div>
    );
};

export default ChartSwitch;
