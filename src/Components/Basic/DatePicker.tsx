import React, { ChangeEvent, FC, Ref } from "react";
import { DatepickerContainer } from "@Styled/Options";

export interface IDatePicker {
    value?: string | number;
    defaultValue?: string | number;
    type?: "date";
    min: string | number;
    max: string | number;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
    variant?: string;
    ref?: Ref<HTMLInputElement>;
    inputStyle?: string;
}

const DatePicker: FC<IDatePicker> = ({
    value,
    defaultValue,
    min,
    max,
    onChange,
    label,
    type = "date",
    name,
    variant,
    inputStyle,
    ...restProps
}) => {
    // consider both uncontrolled & controlled controls
    const valueProps = defaultValue ? { defaultValue } : { value };

    return (
        <div className={`relative dark:text-primary-100 ${variant}`}>
            {label && (
                <span className="w-full mb-1 left-6 top-3 text-medium font-bold text-xs absolute">
                    {label}
                </span>
            )}
            <DatepickerContainer>
                <input
                    type={type}
                    name={name}
                    min={min}
                    max={max}
                    onChange={onChange}
                    data-testid="oddz-date-input"
                    aria-label="form-input-date"
                    placeholder="dd-mm-yyyy"
                    {...valueProps}
                    {...restProps}
                    className={`w-full outline-none transition-all cursor-default focus:outline-none duration-300 ${inputStyle}`}
                />
            </DatepickerContainer>
        </div>
    );
};

export default DatePicker;
