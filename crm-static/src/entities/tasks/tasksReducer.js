import {addComment, createTask, deleteComment, fetchTask, fetchTasksByProject} from "entities/tasks/asyncActions.js";


export const tasksFetchReducer = (builder) => {
    builder
        .addCase(fetchTasksByProject.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(fetchTasksByProject.fulfilled, (state, action) => {
            state.loading = 'success';
            state.tasks = action.payload;
        })
        .addCase(fetchTasksByProject.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};

export const taskCreateReducer = (builder) => {
    builder
        .addCase(createTask.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.loading = 'success';
            state.tasks = action.payload
        })
        .addCase(createTask.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};


export const taskGetReducer = (builder) => {
    builder
        .addCase(fetchTask.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(fetchTask.fulfilled, (state, action) => {
            state.loading = 'success';
            state.selectedTask = {
                ...action.payload,
                comments: action.payload.comments || []
            }
        })
        .addCase(fetchTask.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};


export const commentAddReducer = (builder) => {
    builder
        .addCase(addComment.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.loading = 'success';
            state.selectedTask.comments = action.payload.comments
        })
        .addCase(addComment.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};


export const commentRemoveReducer = (builder) => {
    builder
        .addCase(deleteComment.pending, (state) => {
            state.loading = 'loading';
            state.error = null;
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = 'success';
            state.selectedTask.comments = action.payload.comments
        })
        .addCase(deleteComment.rejected, (state, action) => {
            state.loading = 'error';
            state.error = action.payload;
        });
};