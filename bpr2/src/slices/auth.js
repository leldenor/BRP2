import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
import { message } from "antd";

const user = JSON.parse(localStorage.getItem("user"));
//look at the thunk thing
export const register = createAsyncThunk(
    "auth/register",
    async (userr, thunkAPI) => {
        try {
            console.log(user);
            const response = await fetch(`https://localhost:5001/User/${userr.username}&&${userr.avatar}`, { method: 'POST' })
            console.log(response);
            const res = await response.json()
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res));

            return { user: res };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const outcome = createAsyncThunk("auth/results", async (userId, thunkAPI) => {
    try {
        const response = await fetch(`https://localhost:5001/Question/results/${userId}`, { method: "GET" })
        if (!res.ok) {
            return { error: "Something went wrong" }
        }
        const res = await response.json()
        let localUser = user
        localUser.result = res
        localStorage.setItem("user", JSON.stringify(localUser))

        return { result: res }
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
}
)


export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("result")
});

const initialState = user
    ? { isLoggedIn: true, user, }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null
        },
        [outcome.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;