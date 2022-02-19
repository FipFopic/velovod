import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getFromStorage } from '../../core/utils/Storage.service'
import { IResponse } from '../../core/interfaces/IResponse'
import { IRoute } from '../../core/interfaces/IRoute'
import { REST_API, REST_END } from '../../config'
import {
	ICompleteRouteParams,
	IFetchRoutesParams
} from './types'

const FETCH_LIMIT = 10
const CACHING_TIME = 60 * 10

export const routeAPI = createApi({
	reducerPath: 'routeAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: REST_API,
		prepareHeaders: async headers => {
			const accessToken = await getFromStorage('accessToken')
			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`)
				console.log('accessToken', accessToken)
			}
			headers.set('Content-Type', 'application/json')

			return headers
		}
	}),
	tagTypes: ['Route', 'Quest'],
	endpoints: (build) => ({
		fetchRoutes: build.query<IRoute[], IFetchRoutesParams>({
			query: ({ latitude, longitude, page = 1, limit = FETCH_LIMIT }) => {
				const body = {
					offset: page === 1 ? 0 : FETCH_LIMIT * page,
					limit
				} as IFetchRoutesParams

				if (latitude && longitude) {
					body.latitude = latitude
					body.longitude = longitude
				}

				return {
					url: REST_END.routes,
					method: 'POST',
					body
				}
			},
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array
			},
			keepUnusedDataFor: CACHING_TIME,
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'Route' as const, id })), 'Route']
					: ['Route']
		}),
		fetchQuests: build.query<IRoute[], IFetchRoutesParams>({
			query: ({ latitude, longitude, page = 1, limit = FETCH_LIMIT }) => {
				const body = {
					offset: page === 1 ? 0 : FETCH_LIMIT * page,
					limit
				} as IFetchRoutesParams

				if (latitude && longitude) {
					body.latitude = latitude
					body.longitude = longitude
				}

				return {
					url: REST_END.quests,
					method: 'POST',
					body
				}
			},
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array
			},
			keepUnusedDataFor: CACHING_TIME,
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'Quest' as const, id })), 'Quest']
					: ['Quest']
		}),
		getRoute: build.query<IRoute, number>({
			query: (id) => ({
				url: REST_END.routeDetails,
				method: 'POST',
				body: {
					item_id: id
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array[0]
			},
			keepUnusedDataFor: CACHING_TIME,
			providesTags: ['Route']
		}),
		getQuest: build.query<IRoute, number>({
			query: (id) => ({
				url: REST_END.questDetails,
				method: 'POST',
				body: {
					item_id: id
				}
			}),
			transformResponse: (response: IResponse<IRoute>) => {
				return response.array[0]
			},
			keepUnusedDataFor: CACHING_TIME,
			providesTags: ['Quest']
		}),
		completeRoute: build.mutation<any, ICompleteRouteParams>({
			query: ({ routeId, polyline, countPoints, distance }) => ({
				url: REST_END.routeComplete,
				method: 'POST',
				body: {
					item_id: routeId,
					polyline,
					count_points: countPoints,
					distance
				}
			}),
			transformResponse: (response: any) => {
				return response
			}
		})
	})
})
