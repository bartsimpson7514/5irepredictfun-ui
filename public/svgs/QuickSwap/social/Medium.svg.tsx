import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            {...props}
        >
            <g
                id="Group_14424"
                data-name="Group 14424"
                transform="translate(-32 -32)"
            >
                <path
                    id="Subtraction_6"
                    data-name="Subtraction 6"
                    d="M35.934,28.578H21.812v-.605l2.91-2.82c.285-.29.285-.369.285-.809V7.982L16.926,28.515h-1.1L6.419,7.982v13.76a1.882,1.882,0,0,0,.522,1.578l3.779,4.59v.6H0v-.6l3.781-4.59a1.85,1.85,0,0,0,.488-1.578V5.83a1.4,1.4,0,0,0-.453-1.176L.453.605V0H10.888l8.071,17.69L26.052,0H36V.605L33.128,3.358a.838.838,0,0,0-.321.805V24.411a.841.841,0,0,0,.321.809l2.806,2.753v.6Z"
                    transform="translate(46 50)"
                    fill={props.fill}
                />
                <rect
                    id="Rectangle_17858"
                    data-name="Rectangle 17858"
                    width="64"
                    height="64"
                    transform="translate(32 32)"
                    fill="none"
                />
            </g>
        </svg>
    );
}

export default Icon;
