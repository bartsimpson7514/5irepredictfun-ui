import React, { useState } from "react";
import DatePicker from "@Basic/DatePicker";
import FormInput from "@Basic/FormInput";
import DropdownSelect from "@Basic/option-dropdown";
import { useWeb3React } from "@web3-react/core";
import { createNativeQuest, createQuest } from "@Utils/quest";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { useAlert } from "react-alert";
import { fetchGas } from "@Utils";
import { TransactionSpeed } from "@Components/Constants";
import question from "@reality.eth/reality-eth-lib/formatters/question";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { PREDICT_TOKENS } from "@Constants";
import { useTranslation } from "react-i18next";
import { getEpochFromDate } from "./questhelpers";
import AddRemoveQuestionModal from "./Dashboard/AddRemoveQuestionModal";
import ToggleSwitch from "./Dashboard/ToggleSwitch";

const optionTypes = ["single-select", "multiple-select"];

const AddMultipleQuestionForm = () => {
    const { library, account } = useWeb3React();
    const [startTime, onStartTimeChange] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    );
    const [endTime, onEndTimeChange] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    );

    const [predicitionStartTime, onPredictionStartTimeChange] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    );
    const alert = useAlert();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const [mode, setMode] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const { t } = useTranslation();

    const options = {
        Crypto: "Crypto",
        Sports: "Sports",
        Politics: "Politics",
        Others: "Others",
        IPL: "IPL",
    };
    const [formValues, setFormValues] = useState({
        title: "",
        category: "Crypto",
        predictionStartAt: "", // passed as start time to contract
        startDate: "", // passed as predictionStartAt to contract
        endDate: "", // passed as end time to contract
        about: "",
        source: "",
        imageURL: "",
    });
    // const [isArbirator, setIsArbitrator] = useState(false);
    const [outcomes, setOutcomes] = useState([]);

    const updateOption = val => {
        setOutcomes(val);
    };

    const resetStates = () => {
        setFormValues({
            title: "",
            category: "Crypto",
            predictionStartAt: "",
            startDate: "",
            endDate: "",
            about: "",
            source: "",
            imageURL: "",
        });
        setOutcomes([]);
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
            const questionList = [];
            // eslint-disable-next-line array-callback-return
            outcomes.map(val => {
                const formattedQuestion = question.encodeText(
                    optionTypes[0],
                    val.question,
                    val.outcomes,
                    formValues.category
                );
                const marketQuestion = {
                    question: formattedQuestion,
                    category: formValues.category,
                    description: formValues.about,
                    resolutionSource: formValues.source,
                    outcomes: val.outcomes,
                };
                questionList.push(marketQuestion);
            });

            const gasFeed = await fetchGas(
                library,
                TransactionSpeed.Fast,
                selectedChainId
            );

            if (predictableToken === PREDICT_TOKENS.BNB) {
                await createNativeQuest(
                    account,
                    library,
                    questionList,
                    getEpochFromDate(
                        formValues.predictionStartAt,
                        predicitionStartTime
                    ),
                    getEpochFromDate(formValues.startDate, startTime),
                    getEpochFromDate(formValues.endDate, endTime),
                    formValues.category,
                    formValues.title,
                    formValues.about,
                    formValues.imageURL,
                    false,
                    success,
                    errorHandler,
                    gasFeed,
                    predictableToken
                );
            } else {
                await createQuest(
                    account,
                    library,
                    questionList,
                    getEpochFromDate(
                        formValues.predictionStartAt,
                        predicitionStartTime
                    ),
                    getEpochFromDate(formValues.startDate, startTime),
                    getEpochFromDate(formValues.endDate, endTime),
                    formValues.category,
                    formValues.title,
                    formValues.about,
                    formValues.imageURL,
                    mode,
                    false,
                    success,
                    errorHandler,
                    gasFeed,
                    predictableToken
                );
            }
        } catch (err) {
            alert.error("Failed to create market");
        }
    };

    return (
        <div className="flex text-primary-100 sm:pb-4 flex-col gap-4">
            <div className="flex gap-2">
                <div className=" text-primary-200 text-xs">
                    {t("Both lossy and lossless")}
                </div>
                <ToggleSwitch setShowChart={setMode} showChart={mode} />
            </div>
            <div className="flex gap-2 justify-between flex-col sm:flex-row">
                <div className="flex flex-col gap-1 w-full">
                    <div className=" text-primary-200 text-xs">
                        {t("Title")}
                    </div>
                    <FormInput
                        type="text"
                        label=""
                        name="title"
                        defaultValue=""
                        variant=""
                        value={formValues.title}
                        placeHolder="Enter Title"
                        onChange={e => {
                            if (e.target.value.length < 20) {
                                setTitleError(true);
                            } else {
                                setTitleError(false);
                            }
                            setFormValues({
                                ...formValues,
                                title: `${e.target.value}`,
                            });
                        }}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                    />
                    {titleError && (
                        <span className="text-xs text-primary-error">
                            {t("Should be atleast 20 characters long")}
                        </span>
                    )}
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
            <div className=" text-primary-200 text-xs">{t("Questions")}</div>
            <AddRemoveQuestionModal setNewFormValues={updateOption} />
            <div className="flex gap-8 flex-col sm:flex-row">
                <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">
                        {t("Prediction Start At")}
                    </div>
                    <DatePicker
                        name="startdate"
                        onChange={ev =>
                            setFormValues({
                                ...formValues,
                                predictionStartAt: ev.target.value,
                            })
                        }
                        min="1/1/22"
                        max="1/2/22"
                        value={formValues.predictionStartAt}
                        inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm mb-2"
                    />
                    <TimePicker
                        format="hh:mm a"
                        onChange={onPredictionStartTimeChange}
                        value={predicitionStartTime}
                        disableClock
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className=" text-primary-200 text-xs">
                        {t("Prediction End Date")}
                    </div>
                    <DatePicker
                        name="enddate"
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
                        {" "}
                        {t("Event Ends At")}
                    </div>
                    <DatePicker
                        name="startdate"
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
                            onChange={ev => {
                                if (ev.target.value.length < 50) {
                                    setDescriptionError(true);
                                } else {
                                    setDescriptionError(false);
                                }
                                setFormValues({
                                    ...formValues,
                                    about: ev.target.value,
                                });
                            }}
                        />
                        {descriptionError && (
                            <span className="text-xs text-primary-error">
                                {t("Should be atleast 50 characters long")}
                            </span>
                        )}
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
            <div className="flex flex-col gap-1 w-full">
                <div className=" text-primary-200 text-xs">
                    {t("Image URL")}
                </div>
                <FormInput
                    type="text"
                    label=""
                    name="resolutionSource"
                    defaultValue=""
                    variant=""
                    value={formValues.imageURL}
                    placeHolder={t("Enter image URL")}
                    onChange={e => {
                        setFormValues({
                            ...formValues,
                            imageURL: `${e.target.value}`,
                        });
                    }}
                    inputStyle="p-2 rounded dark:bg-gray-200 text-left  sm:text-sm "
                />
            </div>

            <div>
                <div className="flex flex-row space-x-2 justify-end">
                    <button
                        type="submit"
                        className={`justify-center py-2.5 px-4 ${
                            descriptionError || titleError
                                ? "bg-footer-text opacity-50"
                                : "bg-footer-text"
                        }   text-primary-100 rounded  text-sm font-medium `}
                        onClick={() => onCreatemarket()}
                        disabled={descriptionError || titleError}
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

export default AddMultipleQuestionForm;
