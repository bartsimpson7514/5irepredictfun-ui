import React, { FC, MouseEvent } from "react";

interface IOption {
    active?: boolean;
    header: React.ReactNode;
    icon?: string;
    link?: string | null;
    onClick?: (ev: MouseEvent<HTMLElement>) => void;
    subheader: React.ReactNode | null;
}

const Option: FC<IOption> = ({
    link = null,
    onClick,
    header,
    subheader = null,
    icon,
    active = false,
}) => {
    const content = (
        <>
            <section className="flex flex-col items-start">
                <span className="flex flex-row items-center text-xs">
                    {header}
                </span>
                {subheader && (
                    <small className="text-xs text-gray-700 dark:text-primary-100 mt-1">
                        {subheader}
                    </small>
                )}
            </section>
            <section>
                {icon ? (
                    <img src={icon} alt="Icon" className="w-4 h-auto" />
                ) : null}
            </section>
        </>
    );
    if (link) {
        return (
            <a
                href={link}
                className="transition-all hover:border-primary cursor-pointer border duration-300 flex items-center justify-between w-full p-2 rounded-lg outline-none focus:outline-none"
                target="_blank"
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className={`border ${
                active
                    ? "bg-purple-100 cursor-default border-primary dark:bg-purple-500"
                    : "hover:border-primary cursor-pointer"
            } transition-all duration-300 flex items-center justify-between w-full p-2 rounded-lg outline-none focus:outline-none`}
        >
            {content}
        </button>
    );
};

export default Option;
