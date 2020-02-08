import {AuthActionTypes} from "./auth.types";


export const login = (payload) => {
    return {
        type: AuthActionTypes.LOGIN_USER,
        payload
    }
};
export const logout = () => {
    return {
        type: AuthActionTypes.LOGIN_USER,
    }
};

