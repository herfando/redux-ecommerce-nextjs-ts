import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    email: string;
}

interface UserState {
    currentUser: User | null;
    loggedIn: boolean;
}

const initialState: UserState = {
    currentUser: null,
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
            state.loggedIn = true;
        },
        logout(state) {
            state.currentUser = null;
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
