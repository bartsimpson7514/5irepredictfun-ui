import Dashboard from "@Components/Quests/dashboard";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";

const Admin = () => {
    const { account } = useWeb3React();
    // const router = useRouter();
    useEffect(() => {
        if (!account) {
            // eslint-disable-next-line no-alert
            alert("Connect wallet with Admin account to continue!");
        }
    }, [account]);
    return (
        <>
            {account && (
                // <Auth account={account}>
                <Dashboard />
                // </Auth>
            )}
        </>
    );
};
export default Admin;
