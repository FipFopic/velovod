import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'
import { userAPI } from '../../services/user/UserService'
import { routeAPI } from '../../services/route/RouteService'

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware()
					.concat(logger)
					.concat(userAPI.middleware)
					.concat(routeAPI.middleware)
	})

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
