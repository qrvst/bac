import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        return true;
    } catch (err) {
        dispatch(loginFailure());
        throw err;
    }
};

export const register = async (userData) => {
    try {
        const res = await publicRequest.post("/auth/register", userData);
        return res.data;
    } catch (err) {
        throw err;
    }
};
