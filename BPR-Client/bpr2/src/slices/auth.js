import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from 'lodash'

const user = JSON.parse(localStorage.getItem("user"));
const result = JSON.parse(localStorage.getItem("result"))

export const register = createAsyncThunk(
    "auth/register",
    async (userr, thunkAPI) => {
        try {
            const response = await fetch(`https://localhost:5001/User/${userr.username}&&${userr.avatar}&&${userr.gdpr}`, { method: 'POST' })
            const res = await response.json()
            localStorage.setItem("user", JSON.stringify(res));
            return { user: res };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue();
        }
    }
);

export const outcome = createAsyncThunk("auth/outcome", async (userId, thunkAPI) => {
    try {
        const response = await fetch(`https://localhost:5001/User/outcome/${userId}`, { method: "GET" })
        if (!response.ok) {
            return { error: "Something went wrong" }
        }
        const res = await response.json()
        localStorage.setItem("result", JSON.stringify(res))
        return { result: res }
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue()
    }
}
)


export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("result")
});

const initialState = user
    ? { isLoggedIn: true, user, result }
    : { isLoggedIn: false, user: null, result: null };

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
            state.result = action.payload.result
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.result = null
        },
    },
});

const { reducer } = authSlice;
export default reducer;