import {configureStore} from '@reduxjs/toolkit'
import user from '../user/userSlice.js'
import projects from '../projects/projectsSlice.js'
import tasks from '../tasks/tasksSlice.js'


export const store = configureStore({
    reducer: {
        user,
        projects,
        tasks,
    },
})

