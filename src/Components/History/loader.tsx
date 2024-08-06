import React from "react";
import ContentLoader from "react-content-loader";

const PositionsLoader = props => (
    <ContentLoader
        speed={2}
        width={50}
        height={20}
        viewBox="0 0 50 20"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="3" ry="3" width="50" height="6" />
    </ContentLoader>
);

export default PositionsLoader;
