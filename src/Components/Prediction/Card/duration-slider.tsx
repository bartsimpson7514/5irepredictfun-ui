import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const CustomSlider = withStyles({
    root: {
        color: "#4998ff",
        height: 3,
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#A4CAE7",
        border: "4px solid #1C7EFF",
        marginTop: -9,
        marginLeft: -11,
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#4998ff",
    },
})(Slider);

const DurationSlider = ({ percentage, setPercentage }) => {
    const minDays: number = 0;
    const maxDays: number = 100;

    return (
        <div>
            <CustomSlider
                defaultValue={percentage}
                step={0.1}
                min={minDays}
                max={maxDays}
                className="swiper-no-swiping"
                value={typeof percentage === "number" ? percentage : 0}
                onChange={(event, value) =>
                    value ? setPercentage(value) : setPercentage(0)
                }
            />
        </div>
    );
};

export default DurationSlider;
