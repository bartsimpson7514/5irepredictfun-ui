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
                id="Group_13609"
                data-name="Group 13609"
                transform="translate(7 7)"
            >
                <path
                    id="original"
                    d="M12.652,43.141c14.126,0,21.85-11.7,21.85-21.85,0-.332,0-.664-.021-.993a15.626,15.626,0,0,0,3.831-3.976,15.33,15.33,0,0,1-4.409,1.21,7.709,7.709,0,0,0,3.374-4.249A15.389,15.389,0,0,1,32.4,15.147a7.686,7.686,0,0,0-13.085,7A21.8,21.8,0,0,1,3.486,14.127,7.686,7.686,0,0,0,5.858,24.381a7.623,7.623,0,0,1-3.46-.964q0,.049,0,.1a7.683,7.683,0,0,0,6.148,7.529,7.668,7.668,0,0,1-3.47.13,7.689,7.689,0,0,0,7.176,5.337A15.419,15.419,0,0,1,2.712,39.79,15.631,15.631,0,0,1,.88,39.684a21.74,21.74,0,0,0,11.772,3.448"
                    transform="translate(5.357 -3.369)"
                    fill={props.fill}
                />
                <rect
                    id="Rectangle_17858"
                    data-name="Rectangle 17858"
                    width="64"
                    height="64"
                    transform="translate(-7 -7)"
                    fill="none"
                />
            </g>
        </svg>
    );
}

export default Icon;
