import {fetchAllUsers, loginUser, registerUser} from "./asyncActions";

export const loginReducers = (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
};

export const registerReducers = (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
};


export const fetchAllUsersReducers = (builder) => {
    builder
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
};
