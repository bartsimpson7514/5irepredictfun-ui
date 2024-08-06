import FormInput from "@Basic/FormInput";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MultiAddRemoveFields from "./Dashboard/MultiQuestionAddRemoveFields";
import ToggleSwitch from "./Dashboard/ToggleSwitch";

const QuestionModalSection = ({ newFormValues, index, setnewFormValues }) => {
    const [formValues, setFormValues] = useState(newFormValues[index]);

    const [showChart, setShowChart] = useState(false);
    const { t } = useTranslation();
    // const options = {
    //     Crypto: "Crypto",
    //     Sports: "Sports",
    //     Politics: "Politics",
    //     Others: "Others",
    // };

    const updateOption = (val: string[]) => {
        setFormValues({
            ...formValues,
            outcomes: val,
        });
    };

    useEffect(() => {
        setFormValues(newFormValues[index]);
        if (newFormValues[index].outcome) {
            setShowChart(true);
        }
    }, [newFormValues[index]]);

    useEffect(() => {
        if (formValues) {
            const newFormValue = [...newFormValues];
            newFormValue[index] = formValues;
            setnewFormValues(newFormValue);
        }
    }, [formValues]);

    return (
        <div className="border p-4 rounded-lg border-primary-200">
            <div className="flex gap-2 justify-between flex-col sm:flex-row">
                <div className="flex flex-col gap-1 w-full">
                    <div className=" text-primary-200 text-xs">
                        {t("Question")}
                    </div>
                    <FormInput
                        type="text"
                        label=""
                        name="question"
                        defaultValue=""
                        variant=""
                        value={formValues.question}
                        placeHolder="Enter Question"
                        onChange={e => {
                            setFormValues({
                                ...formValues,
                                question: `${e.target.value}`,
                            });
                        }}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                    />
                </div>
                {/* <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">Tag</div>
                    <DropdownSelect
                        value={formValues.category}
                        options={options}
                        variant="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm w-32"
                        onChange={(category: any) => {
                            setFormValues({
                                ...formValues,
                                category,
                            });
                        }}
                        showIcon={false}
                    />
                </div> */}
            </div>

            <div className="flex gap-2 flex-col sm:flex-row mb-2 mt-2">
                <div className="flex gap-2">
                    <div className=" text-primary-200 text-xs">
                        {t("Multi Select")}
                    </div>
                    <ToggleSwitch
                        setShowChart={setShowChart}
                        showChart={showChart}
                    />
                </div>
                <div
                    className={`${
                        showChart ? "block" : "hidden"
                    } flex gap-2 flex-col w-9/12`}
                >
                    <MultiAddRemoveFields
                        onAdd={val => {
                            updateOption(val);
                        }}
                        onRemove={val => updateOption(val)}
                        newFormValue={newFormValues[index]}
                    />
                </div>
            </div>
            {/* <div className="flex gap-1 flex-col w-full justify-between">
                <label htmlFor="about" className=" text-primary-200 text-xs">
                    Description
                    <div className="mt-1">
                        <textarea
                            id="about"
                            name="about"
                            rows={5}
                            className="shadow-sm block w-full outline-none text-primary-100 dark:bg-gray-200 text-left px-4 py-3 sm:text-sm rounded-md"
                            placeholder="Enter description of the event"
                            value={formValues.about}
                            onChange={ev =>
                                setFormValues({
                                    ...formValues,
                                    about: ev.target.value,
                                })
                            }
                        />
                    </div>
                </label>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className=" text-primary-200 text-xs">
                    Resolution Source
                </div>
                <FormInput
                    type="text"
                    label=""
                    name="resolutionSource"
                    defaultValue=""
                    variant=""
                    value={formValues.source}
                    placeHolder="Enter Resolution Source"
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            source: `${e.target.value}`,
                        });
                    }}
                    inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                />
            </div> */}
        </div>
    );
};

export default QuestionModalSection;
