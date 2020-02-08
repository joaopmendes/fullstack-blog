import {initialState} from "./auth.initialState";
import {AuthActionTypes} from "./auth.types";


export const AuthReducer = (state=initialState, action  ) => {
    switch ( action.type ) {
        case AuthActionTypes.LOGIN_USER:
            return {    user: {...action.payload}, userLoggedIn: true};
        case AuthActionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
};