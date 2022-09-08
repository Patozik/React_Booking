import { useContext, useDebugValue } from "react";
import AuthContext from "../context/authContext";

export default function useAuth() {
    const authContext = useContext(AuthContext);

    const auth = authContext.isAuthenticated;

    useDebugValue(auth ? 'Zalogowany' : 'Wylogowany');

    const setAuth = (value) => {
        if (value) {
            authContext.login();
        } else {
            authContext.logout();
        }
    }

    return [auth, setAuth];
}