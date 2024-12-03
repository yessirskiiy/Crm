import {createSlice} from '@reduxjs/toolkit'
import {fetchAllUsersReducers, loginReducers, registerReducers} from "./userReducer.js";


const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    users: [],
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            state.user = null
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        loginReducers(builder)
        registerReducers(builder)
        fetchAllUsersReducers(builder)
    }
})


export const {
    logOut
} = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer