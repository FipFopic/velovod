import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doLogin, doRegister } from './ActionCreators'
import { AuthState } from './types'

const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	error: ''
}

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		},
		resetStore: (state) => {
			state.error = ''
			state.isLoading = false
		}
	},
	extraReducers: {

		[doLogin.pending.type]: (state) => {
			state.isLoading = true
		},
		[doLogin.fulfilled.type]: (state) => {
			state.isAuth = true
			state.error = ''
			state.isLoading = false
		},
		[doLogin.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload
			state.isLoading = false
		},

		[doRegister.pending.type]: (state) => {
			state.isLoading = true
		},
		[doRegister.fulfilled.type]: (state) => {
			state.isAuth = true
			state.error = ''
			state.isLoading = false
		},
		[doRegister.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload
			state.isLoading = false
		}

	}
})

export const authActions = AuthSlice.actions
export const authReducer = AuthSlice.reducer
