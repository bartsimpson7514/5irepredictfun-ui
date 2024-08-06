import React, { ChangeEvent, Ref } from "react";
import { TurnOffInputSpinner } from "@Styled/Options";

export interface IFormInput {
    value?: string | number;
    defaultValue?: string | number;
    type?: "text" | "password" | "number" | "email";
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
    variant?: string;
    maxlength?: number | 100;
    ref?: Ref<HTMLInputElement>;
    placeHolder?: string;
    inputStyle: string;
}

const FormInput = ({
    value,
    onChange,
    label,
    type,
    name,
    variant,
    placeHolder,
    defaultValue,
    inputStyle,
}) => {
    const valueProps = defaultValue ? { defaultValue } : { value };

    return (
        <div className={`relative dark:text-primary-100 ${variant}`}>
            {label && (
                <span className="mb-1 left-6 top-2 text-medium font-bold text-xs absolute">
                    {label}
                </span>
            )}
            <TurnOffInputSpinner>
                <input
                    type={type}
                    name={name}
                    placeholder={placeHolder}
                    onChange={onChange}
                    {...valueProps}
                    data-testid="oddz-input"
                    aria-label="form-input"
                    step="any"
                    className={`w-full outline-none transition-all cursor-default focus:outline-none duration-300 ${inputStyle}`}
                />
            </TurnOffInputSpinner>
        </div>
    );
};

export default FormInput;
