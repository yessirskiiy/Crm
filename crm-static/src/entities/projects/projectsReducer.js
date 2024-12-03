import {createProject, fetchProjects, getProject} from "entities/projects/asyncActions.js";


export const projectsReducer = (builder) => {
    builder
        .addCase(fetchProjects.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = 'success';
            state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};

export const projectReducer = (builder) => {
    builder
        .addCase(getProject.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(getProject.fulfilled, (state, action) => {
            state.loading = 'success';
            state.project = action.payload;
        })
        .addCase(getProject.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};

export const projectsCreateReducer = (builder) => {
    builder
        .addCase(createProject.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(createProject.fulfilled, (state, action) => {
            state.loading = 'success';
            state.projects = action.payload;
        })
        .addCase(createProject.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};