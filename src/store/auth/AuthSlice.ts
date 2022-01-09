import {AuthState} from './types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {doLogin} from './ActionCreators';

const initialState: AuthState = {
	isAuth: false,
	isLoading: false,
	error: ''
}

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[doLogin.pending.type]: (state) => {
			state.isLoading = true
		},
		[doLogin.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
			state.error = ''
			state.isLoading = false
		},
		[doLogin.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		}
	}
})

export default { authReducer: AuthSlice.reducer }
