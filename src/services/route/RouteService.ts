import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getFromStorage } from '../../core/utils/Storage.service'
import { IResponse } from '../../core/interfaces/IResponse'
import { IRoute } from '../../core/interfaces/IRoute'
import { REST_API, REST_END } from '../../config'
import { IFetchRoutesData } from './types'

const FETCH_LIMIT = 10

export const routeAPI = createApi({
	reducerPath: 'routeAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: REST_API,
		prepareHeaders: (async headers => {
			const accessToken = await getFromStorage('accessToken')
			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`)
			}
			headers.set('Content-Type', 'application/json')

			return headers
		})
	}),
	tagTypes: ['Route'],
	endpoints: (build) => ({
		fetchRoutes: build.mutation<IRoute[], IFetchRoutesData>({
			query: ({ page = 1, limit = FETCH_LIMIT }) => ({
				url: REST_END.routes,
				method: 'POST',
				body: {
					offset: page === 1 ? 0 : FETCH_LIMIT * page,
					limit
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array
			},
		}),
		fetchQuests: build.mutation<IRoute[], IFetchRoutesData>({
			query: ({ page = 1, limit = FETCH_LIMIT }) => ({
				url: REST_END.quests,
				method: 'POST',
				body: {
					offset: page === 1 ? 0 : FETCH_LIMIT * page,
					limit
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array
			}
		}),
		getRoute: build.mutation<IRoute, number>({
			query: (id) => ({
				url: REST_END.routeDetails,
				method: 'POST',
				body: {
					item_id: id
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array[0]
			}
		}),
		getQuest: build.mutation<IRoute, number>({
			query: (id) => ({
				url: REST_END.questDetails,
				method: 'POST',
				body: {
					item_id: id
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array[0]
			}
		})
	})
})
