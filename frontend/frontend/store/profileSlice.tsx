import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UpdateProfilePayload } from '@/types/profile.type';

interface ApiError {
    message?: string;
    errors?: { message: string }[];
}

interface ProfileState {
    username: string | null;
    university: string | null;
    department: string | null;
    avatarUrl: string | null;
    bio: string | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    hasFetched: boolean;
}

const initialState: ProfileState = {
    username: null,
    university: null,
    department: null,
    avatarUrl: null,
    bio: null,
    loading: false,
    error: null,
    success: false,
    hasFetched: false,
};

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData: UpdateProfilePayload, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile/edit-profile`,
                profileData,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || error.message || 'Profile update failed');
        }
    }
);

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile/me`,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch profile');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfileStatus: (state) => {
            state.error = null;
            state.loading = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
                state.loading = false;
                state.username = action.payload.username;
                state.university = action.payload.university;
                state.department = action.payload.department;
                state.avatarUrl = action.payload.avatarUrl;
                state.bio = action.payload.bio;
                state.success = true;
                state.hasFetched = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.hasFetched = true;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
                state.loading = false;
                state.username = action.payload.username;
                state.university = action.payload.university;
                state.department = action.payload.department;
                state.avatarUrl = action.payload.avatarUrl;
                state.bio = action.payload.bio;
                state.success = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;