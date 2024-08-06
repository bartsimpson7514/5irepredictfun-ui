import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QuestionModalSection from "../questionModalSection";

const AddRemoveQuestionModal = ({ setNewFormValues }) => {
    const { t } = useTranslation();
    const [formValues, setFormValues] = useState([
        {
            question: "",
            outcomes: [""],
        },
    ]);

    const addFormFields = () => {
        setFormValues([
            ...formValues,
            {
                question: "",
                outcomes: [""],
            },
        ]);
    };

    const removeFormFields = i => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    useEffect(() => {
        setNewFormValues(formValues);
    }, [formValues]);

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                {formValues.map((element, index) => (
                    <div>
                        <QuestionModalSection
                            index={index}
                            newFormValues={formValues}
                            setnewFormValues={setFormValues}
                        />

                        {index >= 0 ? (
                            <button
                                type="button"
                                className=" text-primary-error opacity-90 text-xs ml-2"
                                onClick={() => removeFormFields(index)}
                            >
                                {t("Remove")}
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 text-primary-200 text-base font-semibold">
                <button
                    type="button"
                    className="font-medium"
                    onClick={() => addFormFields()}
                >
                    {t("Add")}
                </button>
            </div>
        </>
    );
};

export default AddRemoveQuestionModal;
