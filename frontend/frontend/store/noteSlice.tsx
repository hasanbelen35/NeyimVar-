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
    isPublic: boolean;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
    user?: {
        id: string;
        name: string;
        surname: string;
        profile: {
            username: string;
            avatarUrl: string;
            university: string;
            department: string;
        };
    };
}

interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
}

interface NoteState {
    // Kişiye özel notlar (get-all-notes)
    myNotes: Note[];
    myNotesLoading: boolean;

    // Feed notları (paginated - herkese açık)
    feedNotes: Note[];
    feedLoading: boolean;
    feedPagination: PaginationMeta;

    error: string | null;
    success: boolean;
    loading: boolean;
}

const initialState: NoteState = {
    myNotes: [],
    myNotesLoading: false,

    feedNotes: [],
    feedLoading: false,
    feedPagination: {
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
    },

    error: null,
    success: false,
    loading: false,
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

// GET PAGINATED NOTES (feed - herkese açık)
export const fetchFeedNotes = createAsyncThunk(
    'notes/fetchFeedNotes',
    async (page: number = 1, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/feed`, {
                params: { page, limit: 10 },
                withCredentials: true,
            });
            return response.data.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch feed');
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
        resetFeed: (state) => {
            state.feedNotes = [];
            state.feedPagination = initialState.feedPagination;
        },
    },
    extraReducers: (builder) => {
        builder
            // MY NOTES
            .addCase(fetchNotes.pending, (state) => {
                state.myNotesLoading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.myNotesLoading = false;
                state.myNotes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.myNotesLoading = false;
                state.error = action.payload as string;
            })

            // FEED NOTES
            .addCase(fetchFeedNotes.pending, (state) => {
                state.feedLoading = true;
                state.error = null;
            })
            .addCase(fetchFeedNotes.fulfilled, (state, action: PayloadAction<{
                notes: Note[];
                totalPages: number;
                currentPage: number;
                hasMore: boolean;
            }>) => {
                state.feedLoading = false;
                if (action.payload.currentPage === 1) {
                    state.feedNotes = action.payload.notes;
                } else {
                    state.feedNotes = [...state.feedNotes, ...action.payload.notes];
                }
                state.feedPagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    hasMore: action.payload.hasMore,
                };
            })
            .addCase(fetchFeedNotes.rejected, (state, action) => {
                state.feedLoading = false;
                state.error = action.payload as string;
            })

            // CREATE NOTE — ikisine de ekle
            .addCase(createNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                state.myNotes.unshift(action.payload);   // kişisel listeye ekle
                state.feedNotes.unshift(action.payload); // feed'e de ekle
                state.success = true;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE NOTE — ikisinden de sil
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
                state.myNotes = state.myNotes.filter((n) => n.id !== action.payload);
                state.feedNotes = state.feedNotes.filter((n) => n.id !== action.payload);
            })

            // UPDATE NOTE — ikisinde de güncelle
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                const myIdx = state.myNotes.findIndex((n) => n.id === action.payload.id);
                if (myIdx !== -1) state.myNotes[myIdx] = action.payload;

                const feedIdx = state.feedNotes.findIndex((n) => n.id === action.payload.id);
                if (feedIdx !== -1) state.feedNotes[feedIdx] = action.payload;

                state.success = true;
            });
    },
});

export const { resetNoteStatus, resetFeed } = noteSlice.actions;
export default noteSlice.reducer;