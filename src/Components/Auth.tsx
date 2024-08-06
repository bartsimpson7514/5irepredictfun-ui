import { useRouter } from "next/router";

const Authcheck = ({ children, account }) => {
    const router = useRouter();

    const isAccountAdmin = process.env.NEXT_PUBLIC_ADMIN === account;
    if (!isAccountAdmin) {
        router.push("/");
        return null;
    }

    return children;
};

export default Authcheck;
