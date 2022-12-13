import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from 'lodash'

const user = JSON.parse(localStorage.getItem("user"));
const result = JSON.parse(localStorage.getItem("result"))
//look at the thunk thing
export const register = createAsyncThunk(
    "auth/register",
    async (userr, thunkAPI) => {
        try {
            console.log(user);
            const response = await fetch(`https://tricapptest.azurewebsites.net/User/${userr.username}&&${userr.avatar}&&${userr.gdpr}`, { method: 'POST' })
            console.log(response);
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
        console.log(userId);
        const response = await fetch(`https://tricapptest.azurewebsites.net/User/outcome/${userId}`, { method: "GET" })
        console.log(response.ok);
        if (!response.ok) {
            console.log(!response.ok);
            return { error: "Something went wrong" }
        }
        const res = await response.json()
        console.log(res);
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
    // localStorage.removeItem("result")
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
            // state.user = action.payload.user
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