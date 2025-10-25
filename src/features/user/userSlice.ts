import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    username: string;
    password?: string;
}

interface UserState {
    currentUser: User | null;
    loggedIn: boolean;
    error?: string;
}

const initialState: UserState = { currentUser: null, loggedIn: false };

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string; password: string }) => {
        const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ username, password }: { username: string; password: string }) => {
        const res = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return res.json();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { logout(state) { state.currentUser = null; state.loggedIn = false; } },
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.loggedIn = true;
            })
            .addCase(loginUser.rejected, state => { state.error = 'Login failed'; })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.loggedIn = true;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
