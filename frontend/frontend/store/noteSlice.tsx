import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface ApiError {
    message?: string;
    errors?: { message: string }[];
}

export interface Note {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

interface NoteState {
    notes: Note[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: NoteState = {
    notes: [],
    loading: false,
    error: null,
    success: false,
};

const API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/notes`;

// GET ALL NOTES
export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/get-all-notes`, {
                withCredentials: true,
            });
            return response.data.data; 
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes');
        }
    }
);

// CREATE NEW NOTE
export const createNote = createAsyncThunk(
    'notes/createNote',
    async (noteData: { title: string; content: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/create-new-note`, noteData, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || 'Failed to create note');
        }
    }
);

// DELETE NOTE
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/delete-note/${noteId}`, {
                withCredentials: true,
            });
            return noteId;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || 'Failed to delete note');
        }
    }
);

// UPDATE NOTE
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, data }: { id: string; data: Partial<Note> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/update-note/${id}`, data, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || 'Failed to update note');
        }
    }
);

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetNoteStatus: (state) => {
            state.error = null;
            state.success = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Notes
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Note
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.notes.unshift(action.payload); // Yeni notu en başa ekle
                state.success = true;
            })
            // Delete Note
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
                state.notes = state.notes.filter((note) => note.id !== action.payload);
            })
            // Update Note
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                const index = state.notes.findIndex((n) => n.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
                state.success = true;
            });
    },
});

export const { resetNoteStatus } = noteSlice.actions;
export default noteSlice.reducer;