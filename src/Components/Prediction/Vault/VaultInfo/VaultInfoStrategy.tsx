// import Carousel from "@Basic/Carousel";
import React from "react";
import { useTranslation } from "react-i18next";

interface VaultInfoStrategyProps {
    strategyInfo: String;
    // imageUrl: any;
}

const VaultInfoStrategy: React.FC<VaultInfoStrategyProps> = ({
    strategyInfo,
    // imageUrl,
}) => {
    // const [selectedOption, setSelectedOption] = React.useState(0);
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col gap-4">
            <div className=" text-base font-medium text-primary-100">
                {t("Strategy")}
            </div>
            <div className="text-sm leading-6  text-primary-200 ">
                {strategyInfo}
            </div>
            {/* <div className="text-lg leading-6  text-primary-200 ">
                <Carousel
                    imageUrl={imageUrl}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </div> */}
        </div>
    );
};

export default VaultInfoStrategy;
