import React, { createRef, useEffect } from "react";

interface WidgetProps {
    scriptHTML: any;
    scriptSRC: string;
    containerId?: string;
    type?: "Widget" | "MediumWidget";
}

declare const TradingView: any;

const Widget: React.FC<WidgetProps> = ({
    scriptHTML,
    scriptSRC,
    containerId,
    type,
}) => {
    const ref: { current: HTMLDivElement | null } = createRef();

    useEffect(() => {
        let refValue: any;

        if (ref.current) {
            const script = document.createElement("script");
            script.src = scriptSRC;
            script.async = true;
            script.type = "text/javascript";

            if (type === "Widget" || type === "MediumWidget") {
                // eslint-disable-next-line valid-typeof
                if (typeof TradingView !== undefined) {
                    script.onload = () => {
                        script.innerHTML = JSON.stringify(
                            // eslint-disable-next-line no-nested-ternary
                            type === "Widget"
                                ? // eslint-disable-next-line new-cap
                                  new TradingView.widget(scriptHTML)
                                : type === "MediumWidget"
                                ? new TradingView.MediumWidget(scriptHTML)
                                : undefined
                        );
                    };
                }
            } else {
                script.innerHTML = JSON.stringify(scriptHTML);
            }
            ref.current.appendChild(script);
            refValue = ref.current;
        }
        return () => {
            if (refValue) {
                while (refValue.firstChild) {
                    refValue.removeChild(refValue.firstChild);
                }
            }
        };
    }, [scriptHTML.symbol, scriptHTML.colorTheme]);

    return <div ref={ref} id={containerId} />;
};

export default Widget;
