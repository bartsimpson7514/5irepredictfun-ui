import React, { ReactElement } from "react";
// import { Status } from "./consts";

interface ICardHeadingProps {
    time?: string;
    text?: string;
    icon?: ReactElement;
}

const CardHeading: React.FC<ICardHeadingProps> = ({ ...props }) => {
    return (
        <div className="flex flex-row justify-start mb-1">
            {props?.icon}
            <div className="text-primary-100 dark:text-primary-100 font-semibold text-xs ml-1">
                {`${props.text} ${props.time ? props?.time : ""}`}
            </div>
        </div>
    );
};

export default CardHeading;
