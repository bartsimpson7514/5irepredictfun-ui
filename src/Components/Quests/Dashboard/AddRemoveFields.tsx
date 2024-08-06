import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AddRemoveFields = ({ onAdd, onRemove }) => {
    const [formValues, setFormValues] = useState([""]);
    const { t } = useTranslation();
    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i] = e.target.value;
        setFormValues(newFormValues);
        const formOptions = newFormValues.filter(val => val.length > 0);
        onAdd(formOptions);
    };

    const addFormFields = () => {
        setFormValues([...formValues, ""]);
    };

    // const submitFormFields = () => {
    //     setFormValues([...formValues]);
    //     const formOptions = formValues.filter(val => val.length > 0);
    //     onAdd(formOptions);
    // };

    const removeFormFields = i => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
        const formOptions = newFormValues.filter(val => val.length > 0);
        onRemove(formOptions);
    };
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                {React.Children.toArray(
                    formValues.map((element, index) => (
                        <div>
                            <input
                                type="text"
                                name="name"
                                className="px-3 py-3 rounded dark:bg-gray-200 text-left  sm:text-sm outline-none w-full"
                                value={element || ""}
                                onChange={e => handleChange(index, e)}
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
                    ))
                )}
            </div>
            <div className="flex gap-2 text-primary-200 text-base font-semibold">
                <button
                    type="button"
                    className="font-medium"
                    onClick={() => addFormFields()}
                >
                    {t("Add")}
                </button>
                {/* <button
                    className="text-primary-blue font-medium"
                    type="button"
                    onClick={() => submitFormFields()}
                >
                    Submit
                </button> */}
            </div>
        </>
    );
};

export default AddRemoveFields;
