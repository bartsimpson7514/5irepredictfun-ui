import { Switch } from "@headlessui/react";
import React from "react";

const ToggleSwitch = ({ showChart, setShowChart }) => {
    return (
        <Switch
            checked={showChart}
            onChange={() => {
                setShowChart(!showChart);
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
    );
};

export default ToggleSwitch;
