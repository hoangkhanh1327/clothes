import { createSlice } from '@reduxjs/toolkit'
import { RootState, StatusTypes } from '../store'
import { AppState } from '../../interfaces'

const initialState: AppState = {
  isMobile: false,
  mobileNavVisible: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBreakpoint: (state, action) => {
      state.currentBreakpoint = action.payload.currentBreakpoint
      state.isMobile = action.payload.isMobileView
    },
    toggleMobileSiderVisible: (state, action) => {
      state.mobileNavVisible = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const appState = (state: RootState) => state.app
export const { setBreakpoint, toggleMobileSiderVisible } = appSlice.actions

export default appSlice.reducer
