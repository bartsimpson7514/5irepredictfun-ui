import OptionButton from "@Components/History/optionbutton";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import React from "react";

interface VaultInfoHeaderProps {
    option: number;
    setOption: (k: any) => void;
}

const VaultInfoHeader: React.FC<VaultInfoHeaderProps> = ({
    option,
    setOption,
}) => {
    const options = ["Vault", "Your Deposit"];
    return (
        <div className="flex items-start justify-start w-full">
            <div className="flex flex-row sm:justify-start justify-center w-full">
                <OptionButton
                    styleParent="w-full text-sm leading-4 bg-toggle h-10 text-potential-text sm:w-80 w-full rounded-md"
                    styleButton=" font-medium text-sm leading-4 rounded-md h-full "
                    styleSelected="bg-footer-text text-primary-white"
                    labels={options}
                    selected={option}
                    onChange={type => {
                        setOption(type);
                        handleGaEvent(upperCase(`${options[type]} clicked`));
                    }}
                />
            </div>
            {/* <div className="block sm:hidden">
                <DropdownSelect
                    value={option}
                    options={{
                        0: "Strategy",
                        1: "Performance",
                        2: "Other Information",
                        3: "Activities",
                    }}
                    variant="px-4 py-3 rounded dark:bg-gray-300 text-left  sm:text-sm "
                    onChange={type => setOption(Number(type))}
                    showIcon={false}
                />
            </div> */}
        </div>
    );
};

export default VaultInfoHeader;
