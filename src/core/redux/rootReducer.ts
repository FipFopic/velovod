import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '../../store/auth/AuthSlice'
import {userAPI} from '../../services/user/UserService'
import {routeAPI} from '../../services/route/RouteService'

export const rootReducer = combineReducers({
	auth: authReducer,
	[userAPI.reducerPath]: userAPI.reducer,
	[routeAPI.reducerPath]: routeAPI.reducer
})

export type RootState = ReturnType<typeof rootReducer>
