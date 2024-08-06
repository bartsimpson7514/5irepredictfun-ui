/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { isMobile } from "react-device-detect";
import { metamaskinjected } from "../Connectors";

export function useEagerConnect() {
    const { activate, active } = useWeb3React(); // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false);

    useEffect(() => {
        metamaskinjected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(metamaskinjected, undefined, true).catch(() => {
                    setTried(true);
                });
            } else if (isMobile && window.ethereum) {
                activate(metamaskinjected, undefined, true).catch(() => {
                    setTried(true);
                });
            } else {
                setTried(true);
            }
        });
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);

    return tried;
}
