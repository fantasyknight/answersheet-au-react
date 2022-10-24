import { useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const useAuth = () => {
    const { data: session, status } = useSession();

    return useMemo(
        () => ({
            session,
            status,
            signIn,
            signOut,
        }),
        [session, status]
    );
};

export default useAuth;
