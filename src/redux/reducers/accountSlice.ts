import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { AccountSerivces } from '../../services';
import { RootState, StatusTypes } from '../store';
import {
    AccountType,
    AccountTypeType,
    CreateAccountParamsType,
    CreateAccountTypeParamsType,
    UpdateAccountParamsType,
} from '../../interfaces';
import { ListParams } from '../../interfaces/common.interfaces';

export const getAccountTypeListAsync = createAsyncThunk(
    'accountType',
    async (params: ListParams) => {
        const response = await AccountSerivces.getAccountTypeList(params);
        return response.data;
    }
);

export const createAccountTypeAsync = createAsyncThunk(
    'createAccountType',
    async (prams: CreateAccountTypeParamsType) => {
        const response = await AccountSerivces.createAccountType(prams);
        return response.data;
    }
);

export const updateAccountTypeAsync = createAsyncThunk(
    'updateAccountType',
    async (params: UpdateAccountParamsType) => {
        const response = await AccountSerivces.updateAccountType(params);
        return response.data;
    }
);

export const deleteAccountTypeAsync = createAsyncThunk(
    'deleteAccountType',
    async (params: string | number) => {
        const response = await AccountSerivces.deleteAccountType(params);
        return response.data;
    }
);

export const getAccountListAsync = createAsyncThunk(
    'account',
    async (params: ListParams) => {
        const response = await AccountSerivces.getAccountList(params);
        return response.data;
    }
);

export const createAccountAsync = createAsyncThunk(
    'createAccount',
    async (params: CreateAccountParamsType) => {
        const response = await AccountSerivces.createAccount(params);
        return response.data;
    }
);

export const updateAccountAsync = createAsyncThunk(
    'updateAccount',
    async (params: UpdateAccountParamsType) => {
        const response = await AccountSerivces.updateAccount(params);
        return response.data;
    }
);

export const deleteAccountAsync = createAsyncThunk(
    'deleteAccount',
    async (id: string | number) => {
        const response = await AccountSerivces.deleteAccount(id);
        return response.data;
    }
);

export interface AccountState {
    accounts: AccountType[];
    accountTypes: AccountTypeType[];
    total: number;
    totalAccountType: number;
    status?: StatusTypes;
    error?: string;
    filters?: any;
    isFormVisible: boolean;
    formData?: any;
    isTypeFormVisible: boolean;
    typeFormData?: any;
}

const initialState: AccountState = {
    accounts: [],
    accountTypes: [],
    total: 0,
    totalAccountType: 0,
    filters: undefined,
    isFormVisible: false,
    isTypeFormVisible: false,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        toggleFormVisible: (state, action) => {
            const { visible, formData }: { visible: boolean; formData?: any } =
                action.payload;
            if (visible) {
                state.isFormVisible = visible;
                state.formData = formData;
            } else {
                state.isFormVisible = false;
                state.formData = null;
            }
        },
        toggleTypeFormVisible: (state, action) => {
            const { visible, formData }: { visible: boolean; formData?: any } =
                action.payload;
            if (visible) {
                state.isTypeFormVisible = visible;
                state.typeFormData = formData;
            } else {
                state.isTypeFormVisible = false;
                state.typeFormData = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccountListAsync.pending, (state) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(getAccountListAsync.fulfilled, (state, action) => {
            state.accounts = action.payload.data;
            state.total = action.payload.total;
            state.status = StatusTypes.SUCCESS;
        });
        builder.addCase(getAccountListAsync.rejected, (state, action) => {
            state.accounts = [];
            state.total = 0;
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });

        builder.addCase(createAccountAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(createAccountAsync.fulfilled, (state, action) => {
            state.accounts.unshift(action.payload.data);
            state.total += 1;
            state.status = StatusTypes.SUCCESS;
            state.isFormVisible = false;
        });
        builder.addCase(createAccountAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(updateAccountAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(updateAccountAsync.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.status = StatusTypes.SUCCESS;
            state.accounts = [...state.accounts].map((account) => {
                if (account.id === data.id) {
                    return {
                        ...account,
                        ...data,
                    };
                } else {
                    return account;
                }
            });
            state.isFormVisible = false;
        });
        builder.addCase(updateAccountAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(deleteAccountAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(deleteAccountAsync.fulfilled, (state, action) => {
            state.status = StatusTypes.SUCCESS;
            state.accounts = state.accounts.filter(
                (account) => account.id !== action.payload.data
            );
            state.total -= 1;
        });
        builder.addCase(deleteAccountAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(getAccountTypeListAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(getAccountTypeListAsync.fulfilled, (state, action) => {
            state.accountTypes = action.payload.data;
            state.totalAccountType = action.payload.total;
            state.status = StatusTypes.SUCCESS;
        });
        builder.addCase(getAccountTypeListAsync.rejected, (state, action) => {
            state.accountTypes = [];
            state.totalAccountType = 0;
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(createAccountTypeAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(createAccountTypeAsync.fulfilled, (state, action) => {
            state.accountTypes.unshift(action.payload.data);
            state.status = StatusTypes.SUCCESS;
            state.isTypeFormVisible = false;
        });
        builder.addCase(createAccountTypeAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(updateAccountTypeAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(updateAccountTypeAsync.fulfilled, (state, action) => {
            state.status = StatusTypes.SUCCESS;
            state.accountTypes = [...state.accountTypes].map((accountType) => {
                const { data } = action.payload;
                if (accountType.id === data.id) {
                    return {
                        ...accountType,
                        ...data,
                    };
                } else {
                    return accountType;
                }
            });
            state.isTypeFormVisible = false;
        });
        builder.addCase(updateAccountTypeAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
        builder.addCase(deleteAccountTypeAsync.pending, (state, action) => {
            state.status = StatusTypes.LOADING;
            state.error = undefined;
        });
        builder.addCase(deleteAccountTypeAsync.fulfilled, (state, action) => {
            state.status = StatusTypes.SUCCESS;
            state.accountTypes = state.accountTypes.filter(
                (accountType) => accountType.id !== action.payload.data
            );
        });
        builder.addCase(deleteAccountTypeAsync.rejected, (state, action) => {
            state.status = StatusTypes.ERROR;
            state.error = action.error.message;
        });
    },
});

export const accountState = (state: RootState) => state.account;
export const { setFilters, toggleFormVisible, toggleTypeFormVisible } =
    accountSlice.actions;

export default accountSlice.reducer;
