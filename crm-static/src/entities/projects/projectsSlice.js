import {createSlice} from '@reduxjs/toolkit'
import {projectReducer, projectsCreateReducer, projectsReducer} from "entities/projects/projectsReducer.js";



const initialState = {
    projects: [],
    project: null,
    loading: '',
    error: null,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProject(state, action) {
            state.projects = action.payload
        }
    },
    extraReducers: (builder) => {
        projectsReducer(builder)
        projectsCreateReducer(builder)
        projectReducer(builder)
    }
})


export const selectProjects = (state) => state.projects


export const {
    setProject
} = projectsSlice.actions

export default projectsSlice.reducer