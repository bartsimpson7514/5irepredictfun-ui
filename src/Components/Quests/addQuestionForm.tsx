import React, { useState } from "react";
import DatePicker from "@Basic/DatePicker";
import FormInput from "@Basic/FormInput";
import DropdownSelect from "@Basic/option-dropdown";
import { useWeb3React } from "@web3-react/core";
import { createMarket } from "@Utils/quest";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { useAlert } from "react-alert";
import { fetchGas } from "@Utils";
import { TransactionSpeed } from "@Components/Constants";
import question from "@reality.eth/reality-eth-lib/formatters/question";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddRemoveFields from "./Dashboard/AddRemoveFields";
import ToggleSwitch from "./Dashboard/ToggleSwitch";
import { getEpochFromDate } from "./questhelpers";
import { MarketQuestion } from "./constants";

const optionTypes = ["single-select", "multiple-select"];

const AddQuestionForm = () => {
    const { library, account } = useWeb3React();
    const [startTime, onStartTimeChange] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    );
    const [endTime, onEndTimeChange] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    );
    const alert = useAlert();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    const options = {
        Crypto: "Crypto",
        Sports: "Sports",
        Politics: "Politics",
        Others: "Others",
        IPL: "IPL",
    };
    const [formValues, setFormValues] = useState({
        question: "",
        category: "Crypto",
        startDate: "",
        endDate: "",
        about: "",
        source: "",
    });
    const [showChart, setShowChart] = useState(false);
    // const [isArbirator, setIsArbitrator] = useState(false);
    const [outcomes, setOutcomes] = useState([]);

    const updateOption = (val: string[]) => {
        setOutcomes(val);
    };

    const resetStates = () => {
        setFormValues({
            question: "",
            category: "Crypto",
            startDate: "",
            endDate: "",
            about: "",
            source: "",
        });
        setOutcomes([]);
        setShowChart(false);
    };

    const success = () => {
        alert.show(t("Successfully created market"));
        resetStates();
    };

    const errorHandler = () => {
        alert.error(t("Failed to create market"));
    };

    const onCreatemarket = async () => {
        /** follows template: https://realitio.¯.io/docs/html/contracts.html#templates
         * example: Who will win ind vs wi?␟"ind","wi","none"␟sports␟en',
         */
        try {
            const formattedQuestion = question.encodeText(
                optionTypes[0],
                formValues.question,
                outcomes,
                formValues.category
            );
            const marketQuestion: MarketQuestion = {
                question: formattedQuestion,
                category: formValues.category,
                description: formValues.about,
                resolutionSource: formValues.source,
                outcomes,
            };

            const gasFeed = await fetchGas(
                library,
                TransactionSpeed.Fast,
                selectedChainId
            );

            await createMarket(
                account,
                library,
                marketQuestion,
                getEpochFromDate(formValues.startDate, startTime),
                getEpochFromDate(formValues.endDate, endTime),
                true,
                true,
                success,
                errorHandler,
                gasFeed,
                predictableToken
            );
        } catch (err) {
            alert.error(t("Failed to create market"));
        }
    };

    return (
        <div className="flex text-primary-100 sm:pb-4 flex-col gap-4">
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
                        placeHolder={t("Enter Question")}
                        onChange={e => {
                            setFormValues({
                                ...formValues,
                                question: `${e.target.value}?`,
                            });
                        }}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">{t("Tag")}</div>
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
                </div>
            </div>
            <div className="flex gap-8 flex-col sm:flex-row">
                <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">
                        {t("Start Date")}
                    </div>
                    <DatePicker
                        name="startdate"
                        onChange={ev =>
                            setFormValues({
                                ...formValues,
                                startDate: ev.target.value,
                            })
                        }
                        min="1/1/22"
                        max="1/2/22"
                        value={formValues.startDate}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm mb-2"
                    />
                    <TimePicker
                        format="hh:mm a"
                        onChange={onStartTimeChange}
                        value={startTime}
                        disableClock
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">
                        {t("End Date")}
                    </div>
                    <DatePicker
                        name="enddate"
                        onChange={ev =>
                            setFormValues({
                                ...formValues,
                                endDate: ev.target.value,
                            })
                        }
                        min="1/1/22"
                        max="1/2/22"
                        value={formValues.endDate}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm mb-2"
                    />
                    <TimePicker
                        format="hh:mm a"
                        onChange={onEndTimeChange}
                        value={endTime}
                        disableClock
                    />
                </div>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row mb-2">
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
                    <AddRemoveFields
                        onAdd={val => {
                            updateOption(val);
                        }}
                        onRemove={val => updateOption(val)}
                    />
                </div>
            </div>

            <div className="flex gap-1 flex-col w-full justify-between">
                <label htmlFor="about" className=" text-primary-200 text-xs">
                    {t("Description")}
                    <div className="mt-1">
                        <textarea
                            id="about"
                            name="about"
                            rows={5}
                            className="shadow-sm block w-full outline-none text-primary-100 dark:bg-gray-200 text-left px-4 py-3 sm:text-sm rounded-md"
                            placeholder={t("Enter description of the event")}
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
                    {t("Resolution Source")}
                </div>
                <FormInput
                    type="text"
                    label=""
                    name="resolutionSource"
                    defaultValue=""
                    variant=""
                    value={formValues.source}
                    placeHolder={t("Enter Resolution Source")}
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            source: `${e.target.value}`,
                        });
                    }}
                    inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                />
            </div>

            <div>
                <div className="flex flex-row space-x-2 justify-end">
                    <button
                        type="submit"
                        className="justify-center py-2.5 px-4 bg-footer-text text-primary-100 rounded  text-sm font-medium "
                        onClick={() => onCreatemarket()}
                    >
                        {t("Submit")}
                    </button>
                    <button
                        type="submit"
                        className="justify-center py-2.5 px-4 bg-footer-text text-primary-100 rounded  text-sm font-medium "
                        onClick={() => resetStates()}
                    >
                        {t("Cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionForm;
