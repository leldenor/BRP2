import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
        try {
            const data = await fetch(`https://tricapptest.azurewebsites.net/User/${username}&&${password}`)
            const res = await data.json()
            if (res)
                localStorage.setItem("user", JSON.stringify({ username, password }));
            return { user: { username, password, type: "Manager" } };
        } catch (error) {
            const messages =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            message.error(messages)
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;