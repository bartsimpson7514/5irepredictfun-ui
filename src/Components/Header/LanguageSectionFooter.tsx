import { upperCase } from "@Utils/common";
import { gaEvent } from "@Utils/googleanalytics";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./language-dropdown";

const LanguageSectionFooter = ({ footer, header }) => {
    const [language, setLanguage] = useState("en");
    const { i18n } = useTranslation();

    const allOptionsWeb = {
        en: "EN",
        "en-UK": "EN",
        // "en-US": "EN",
        // gr: "GR",
        // indo: "IDN",
        // portugal: "BRA",
        // Vietnam: "VN",
        sp: "SPN",
    };
    const options = {
        en: "ENGLISH | EN",
        // gr: "GERMAN | GER",
        // indo: "Indonesian | IDN",
        // portugal: "Portugese | BRA",
        // Vietnam: "Vietnamese | VN",
        sp: "Spanish | SPN",
    };

    return (
        <LanguageSelect
            language={language}
            footer={footer}
            header={header}
            heading="Language"
            value={i18n.language}
            options={options}
            variant="border-2 text-primary-100"
            onChange={(lang: any) => {
                setLanguage(lang);
                i18n.changeLanguage(lang);
                gaEvent({
                    action: upperCase(`${lang} language clicked`),
                    params: {},
                });
            }}
            allOptions={allOptionsWeb}
            iconRender={lang => {
                const isEnglish =
                    lang === "en" || lang === "en-UK" || lang === "en-US";
                // const isGerman = lang === "gr";
                // const isIndonesia = lang === "indo";
                // const isPortugal = lang === "portugal";
                // const isVietnam = lang === "Vietnam";
                const isSpanish = lang === "sp";
                return (
                    <span>
                        {isEnglish && (
                            <img
                                className="h-4 w-4"
                                src="/images/english.png"
                                alt="english"
                            />
                        )}
                        {isSpanish && (
                            <img
                                className="h-4 w-4"
                                src="/images/spanish.png"
                                alt="spanish"
                            />
                        )}
                        {/* {isGerman && (
                            <img
                                className="h-4 w-4"
                                src="/images/German.png"
                                alt="german"
                            />
                        )}
                        {isIndonesia && (
                            <img
                                className="h-4 w-4"
                                src="/images/Indonesia.png"
                                alt="indonesia"
                            />
                        )}
                        {isPortugal && (
                            <img
                                className="h-4 w-4"
                                src="/images/portugal.png"
                                alt="portugal"
                            />
                        )}
                        {isVietnam && (
                            <img
                                className="h-4 w-4"
                                src="/images/Vietnam.png"
                                alt="vietnam"
                            />
                        )} */}
                    </span>
                );
            }}
        />
    );
};

export default LanguageSectionFooter;
