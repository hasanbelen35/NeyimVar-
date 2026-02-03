import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: unknown, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.errors?.[0]?.message || data.message || 'Login failed';
                return rejectWithValue(errorMessage);
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || 'An error occurred during login');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: unknown, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.errors?.[0]?.message || data.message || 'Registration failed';
                return rejectWithValue(errorMessage);
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "An error occurred");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null as string | null,
        success: false,
    },
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.success = false;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;