import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
    'projects/fetch',
    async () => {
        const {data} = await axios.get('http://localhost/v1/projects')
        return data.data
    }
)

export const getProject = createAsyncThunk(
    'projects/get',
    async (Code) => {
        const {data} = await axios.get(`http://localhost/v1/projects/${Code}`)
        return data.data
    }
)


export const createProject = createAsyncThunk(
    'projects/create',
    async (newProject) => {
        const {data} = await axios.post('http://localhost/v1/projects', newProject)

        return data
    }
)