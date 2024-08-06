import HeadingSelect from "@Components/Header/Heading-dropdown";
import React from "react";

const AssetsDropdown = ({ value, options, onChange, iconRender }) => {
    return (
        <HeadingSelect
            value={value}
            style={{
                widthBar: "w-14",
                dropDownWidth: "w-10",
            }}
            options={options}
            variant=""
            showText
            onChange={onChange}
            iconRender={iconRender}
        />
    );
};

export default AssetsDropdown;
