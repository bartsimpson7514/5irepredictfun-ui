import React, { useState } from "react";

const ScrollEffect = ({ children, variant }) => {
    const [endScroll, setEndScroll] = useState(false);

    const scrollEnd = e => {
        if (
            e.target.offsetHeight + e.target.scrollTop >=
            e.target.scrollHeight
        ) {
            setEndScroll(true);
        } else {
            setEndScroll(false);
        }
    };

    return (
        <>
            <div
                className={`${variant} overflow-x-auto`}
                onScroll={e => scrollEnd(e)}
            >
                {children}
            </div>
            {!endScroll && (
                <div className="h-10 w-full absolute bottom-0 dark:bg-terms-condition-background-dark bg-terms-condition-background-light z-[1000]" />
            )}
        </>
    );
};

export default ScrollEffect;
