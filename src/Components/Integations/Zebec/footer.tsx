import React from "react";
import { useTranslation } from "react-i18next";

const footerInfo = [
    {
        name: "Terms & Polices",
        url: "",
    },
    {
        name: "Privacy Policy",
        url: "",
    },
];

const FooterTitle = () => {
    const { t } = useTranslation();
    return (
        <p className="text-primary-200 text-sm text-left">
            {t("Bhavish Finance")}
        </p>
    );
};

const ZebecFooter = () => {
    const { t } = useTranslation();
    return (
        <div className="px-4 bottom-4 w-full sm:mb-32 mb-[250px] max-w-[1376px]  mlgh:box-content mx-auto">
            <div className=" py-6 flex items-start sm:items-center border-t border-[#696C804D]  justify-between flex-col md:flex-row">
                <FooterTitle />

                <div className="flex md:order-2 mt-6 md:mt-0 flex-wrap items-center gap-2">
                    <div className="w-full sm:w-fit justify-around flex space-x-6">
                        {React.Children.toArray(
                            footerInfo.map(info => (
                                <a
                                    target="_blank"
                                    className="gradient-text bg-footer-text  text-left text-sm underline-offset-2 underline"
                                    href={info.url}
                                    rel="noreferrer"
                                >
                                    {t(info.name)}
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZebecFooter;
