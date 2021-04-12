import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/login");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            console.log(errors);
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

