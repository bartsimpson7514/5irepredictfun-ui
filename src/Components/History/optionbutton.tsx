import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface IOptionButton {
    labels: string[];
    selected: number;
    onChange: (index: number) => void;
    styleParent: string;
    styleButton: string;
    styleSelected: string;
}

const OptionButton: FC<IOptionButton> = ({
    labels,
    selected,
    onChange,
    styleParent,
    styleButton,
    styleSelected,
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={`flex flex-row items-center  box-content  ${styleParent}`}
        >
            {labels.map((label, index) => (
                <button
                    type="button"
                    key={label}
                    className={` flex-1 text-center justify-center w-full  transition-all duration-300 flex items-center  w-1/${
                        labels.length
                    }   outline-none focus:outline-none ${selected === index &&
                        styleSelected}  ${styleButton}`}
                    onClick={() => {
                        onChange(index);
                    }}
                >
                    {t(label)}
                </button>
            ))}
        </div>
    );
};

export default OptionButton;
