import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    'user/fetch',
    async () => {
        const {data} = await axios.get('https://66f1303e41537919154fe5b3.mockapi.io/users')

        return data
    }
)


export const loginUser = createAsyncThunk(
    'user/login',
    async ({email, password}) => {
        const {data} = await axios.get('https://66f1303e41537919154fe5b3.mockapi.io/users')
        const user = data.find((user) => user.email === email)

        if (!user) {
            throw new Error('Ну удалось войти')
        }

        return user
    }
)


export const registerUser = createAsyncThunk(
    'user/register',
    async ({name, email, password_hash, avatar_url, role}) => {
        const {data} = await axios.post('https://66f1303e41537919154fe5b3.mockapi.io/users', {
            name,
            email,
            password_hash,
            avatar_url: null,
            role: null
        })
        return data
    }
)