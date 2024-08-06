import React from "react";
import Loader from "react-spinners/ClipLoader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";

const Spinner = () => {
    const fullConfig = resolveConfig(tailwindConfig);
    return (
        <Loader
            color={fullConfig.theme.colors["primary-200"]}
            loading
            size={24}
        />
    );
};

export default Spinner;
