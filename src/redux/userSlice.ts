import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from '../interfaces';
import { AuthServices } from '../services';
import { RootState } from './store';

export enum StatusTypes {
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

export const getCurrentUserAsync = createAsyncThunk(
    '/users/me',
    async (
        user: { username: string; password: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await AuthServices.login(
                user.username,
                user.password
            );
            return response.data;
        } catch (error: any) {
            throw rejectWithValue(error.message);
        }
    }
);

export interface AuthState {
    user: AuthUser | null;
    isLoggedIn: boolean;
    status?: StatusTypes;
    error?: string;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserAsync.pending, (state) => {
            state.status = StatusTypes.LOADING;
        });
        builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isLoggedIn = true;
            state.status = StatusTypes.SUCCESS;
        });
        builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
    },
});

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
