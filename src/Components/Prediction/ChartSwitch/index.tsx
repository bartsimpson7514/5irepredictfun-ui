import React from "react";
import { Switch } from "@headlessui/react";
import { updateShowChart } from "@Reducers/trade";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";

const BhavishChartSwitch = () => {
    const { showChart } = useSelector((state: AppState) => state.prediction);
    const dispatch = useDispatch();
    return (
        <div className="flex items-center w-full py-2 text-sm font-medium gap-4">
            <div
                className="flex items-center justify-center p-2 border rounded-md border-primary-200 dark:bg-gray-300 bg-gray-200"
                style={{
                    borderWidth: "1.5px",
                }}
            >
                <Switch
                    checked={showChart}
                    onChange={() => {
                        dispatch(updateShowChart(!showChart));

                        !showChart
                            ? handleGaEvent("CHART OPENED")
                            : handleGaEvent("CHART CLOSED");
                    }}
                    className={`relative w-6 h-4 inline-flex flex-shrink-0  border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                        showChart ? "bg-footer-text" : "bg-primary-200"
                    }`}
                >
                    <span
                        className={`pointer-events-none relative  inline-block h-3 w-3 rounded-full shadow transform ring-0 transition ease-in-out duration-200 ${
                            showChart
                                ? "translate-x-0 bg-white"
                                : "translate-x-2 bg-primary-100"
                        }`}
                    />
                </Switch>
                <div className="dark:text-primary-100 pl-1 text-sm font-medium leading-4 text-highlight ">
                    Chart
                </div>
            </div>
        </div>
    );
};

export default BhavishChartSwitch;
