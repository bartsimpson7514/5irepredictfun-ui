/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { INTEGRATIONS } from "@Constants";
import BhavishNetworkSelect from "@Components/Integations/Bhavish/network-dropdown";
import ZeroSwapNetworkSelect from "@Components/Integations/ZeroSwap/network-dropdown";
import QuickSwapNetworkSelect from "@Components/Integations/QuickSwap/network-dropdown";
import OnyxNetworkSelect from "@Components/Integations/Onyx/network-dropdown";
import ZebecNetworkSelect from "@Components/Integations/Zebec/network-dropdown";

interface IOptions {
    [key: string]: string | ReactNode;
}

interface ISelect {
    options: IOptions;
    value: string;
    label?: string;
    onChange: (value: string) => void;
    variant?: string;
    margin?: boolean;
}

const NetworkSelect: FC<ISelect> = ({
    options,
    value,
    onChange,
    label,
    variant,
    margin = true,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [rectStyle, setRectStyle] = useState({});
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const handleChange = useCallback(
        (key: string) => {
            if (Number(key) === Number(value)) return;
            onChange(key);
            setExpanded(false);
        },
        [onChange]
    );

    const handleClickOutside = useCallback(
        (event: any) => {
            if (
                expanded &&
                buttonRef.current &&
                popupRef.current &&
                !buttonRef.current.contains(event.target) &&
                !popupRef.current.contains(event.target)
            ) {
                setExpanded(false);
            }
        },
        [expanded]
    );

    useEffect(() => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();

        setRectStyle({
            width: `${rect.width}px`,
            zIndex: 100,
        });
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    const renderTokenSection = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return (
                    <BhavishNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <QuickSwapNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
            default:
                return (
                    <BhavishNetworkSelect
                        margin={margin}
                        options={options}
                        expanded={expanded}
                        buttonRef={buttonRef}
                        label={label}
                        setExpanded={setExpanded}
                        value={value}
                        rectStyle={rectStyle}
                        popupRef={popupRef}
                        handleChange={handleChange}
                        variant={variant}
                    />
                );
        }
    };

    return <>{renderTokenSection()}</>;
};

export default NetworkSelect;
