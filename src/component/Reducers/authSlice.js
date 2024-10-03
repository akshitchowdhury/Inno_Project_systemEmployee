import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    users: []
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('/users', { method: 'GET' });
    const data = await response.json();
    return data;
});

// Async thunk to handle login
export const loggedInUSer = createAsyncThunk('users/loggedInUSer', async ({ email, password, isLoggedIn }, { rejectWithValue }) => {
    try {
        const response = await fetch('/users/login', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, isLoggedIn })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        return { email, password, isLoggedIn, data };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Creating the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(loggedInUSer.fulfilled, (state, action) => {
                const loggedUser = state.users.find(
                    (user) => user.email === action.payload.email && user.password === action.payload.password
                );
                if (loggedUser) {
                    state.isAuthenticated = true;
                    state.user = loggedUser;
                    state.user.isLoggedIn = true;
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Setting up the store with the auth reducer
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
