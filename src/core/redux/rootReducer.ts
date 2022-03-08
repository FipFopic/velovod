import { combineReducers } from '@reduxjs/toolkit'
import { userAPI } from '../../services/user/UserService'
import { routeAPI } from '../../services/route/RouteService'

export const rootReducer = combineReducers({
	[userAPI.reducerPath]: userAPI.reducer,
	[routeAPI.reducerPath]: routeAPI.reducer
})

export type RootState = ReturnType<typeof rootReducer>
