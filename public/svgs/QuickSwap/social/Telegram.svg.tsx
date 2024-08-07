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
                id="Group_14426"
                data-name="Group 14426"
                transform="translate(-32 -32)"
            >
                <path
                    id="telegram-1"
                    d="M29.734,34.99a1.923,1.923,0,0,0,1.79.235A1.877,1.877,0,0,0,32.7,33.866C34.1,27.261,37.511,10.542,38.79,4.533a1.263,1.263,0,0,0-.421-1.226,1.3,1.3,0,0,0-1.289-.226C30.3,5.591,9.413,13.427.877,16.586a1.33,1.33,0,0,0,.082,2.528c3.828,1.145,8.854,2.738,8.854,2.738s2.348,7.092,3.573,10.7a1.417,1.417,0,0,0,.975.932,1.4,1.4,0,0,0,1.312-.335l5.007-4.728s5.777,4.236,9.054,6.57ZM11.927,20.956l2.716,8.957.6-5.672L31.719,9.384a.449.449,0,0,0,.053-.61.46.46,0,0,0-.608-.1L11.927,20.956Z"
                    transform="translate(44.592 45.057)"
                    fill={props.fill}
                    fillRule="evenodd"
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
