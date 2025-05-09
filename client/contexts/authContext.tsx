import { createContext, ReactNode} from "react";
import * as userService from '../services/userService';
import usePersistedState from "../hooks/usePersistedState";

interface AuthContextType {
    loginSubmitHandler: (userData: any) => Promise<void>;
    registerSubmitHandler: (userData: any) => Promise<void>;
    logoutHandler: () => void;
    userId: string;
    isAuthenticated: boolean;
    name: string;
    accessToken: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = usePersistedState('user', {});
 

    const loginSubmitHandler = async (userData: any) => {
        const result = await userService.login(userData);
        setAuth(result);
    };

    const registerSubmitHandler = async (userData: any) => {
        const result = await userService.register(userData);
        setAuth(result);
    };

    const logoutHandler = () => {
        setAuth(null);
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        userId: auth._id,
        isAuthenticated: !!auth._id,
        name: auth.name,
        accessToken: auth.accessToken
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;