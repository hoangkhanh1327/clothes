import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accountReducer from './reducers/accountSlice';

export enum StatusTypes {
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
