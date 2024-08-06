import { upperCase } from "@Utils/common";
import { gaEvent } from "@Utils/googleanalytics";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./language-dropdown";

const LanguageSection = ({ footer, header, language }) => {
    const { i18n } = useTranslation();
    const storedLanguage = localStorage.getItem("language");

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
        en: "English | EN",
        // gr: "German | GER",
        // indo: "Indonesian | IDN",
        // portugal: "Portugese | BRA",
        // Vietnam: "Vietnamese | VN",
        sp: "Spanish | SPN",
    };

    useEffect(() => {
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

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
                i18n.changeLanguage(lang);
                localStorage.setItem("language", lang);
                gaEvent({
                    action: upperCase(`${language} language clicked`),
                    params: {},
                });
            }}
            allOptions={isMobile ? options : allOptionsWeb}
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

export default LanguageSection;
