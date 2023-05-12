import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
// import { AccountSerivces } from '../../services';
import { RootState, StatusTypes } from '../store'
import {
  AccountType,
  AccountTypeType,
  CreateAccountParamsType,
  CreateAccountTypeParamsType,
  UpdateAccountParamsType
} from '../../interfaces'
import { ListParams } from '../../interfaces/common.interfaces'

export interface AccountState {
  accounts: AccountType[]
  accountTypes: AccountTypeType[]
  total: number
  totalAccountType: number
  status?: StatusTypes
  error?: string
  filters?: any
  isFormVisible: boolean
  formData?: any
  isTypeFormVisible: boolean
  typeFormData?: any
}

const initialState: AccountState = {
  accounts: [],
  accountTypes: [],
  total: 0,
  totalAccountType: 0,
  filters: undefined,
  isFormVisible: false,
  isTypeFormVisible: false
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    toggleFormVisible: (state, action) => {
      const { visible, formData }: { visible: boolean; formData?: any } = action.payload
      if (visible) {
        state.isFormVisible = visible
        state.formData = formData
      } else {
        state.isFormVisible = false
        state.formData = null
      }
    },
    toggleTypeFormVisible: (state, action) => {
      const { visible, formData }: { visible: boolean; formData?: any } = action.payload
      if (visible) {
        state.isTypeFormVisible = visible
        state.typeFormData = formData
      } else {
        state.isTypeFormVisible = false
        state.typeFormData = null
      }
    }
  }
})

export const accountState = (state: RootState) => state.account
export const { setFilters, toggleFormVisible, toggleTypeFormVisible } = accountSlice.actions

export default accountSlice.reducer
