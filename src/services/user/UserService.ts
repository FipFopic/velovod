import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getFromStorage } from '../../core/utils/Storage.service'
import { IResponse } from '../../core/interfaces/IResponse'
import { IUser } from '../../core/interfaces/IUser'
import { REST_API, REST_END } from '../../config'
import { IProfileUpdateData } from './types'

export const userAPI = createApi({
	reducerPath: 'userAPI',
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
	tagTypes: ['Profile'],
	endpoints: (build) => ({
		getProfile: build.mutation<IUser, void>({
			query: () => ({
				url: REST_END.userProfile,
				method: 'POST'
			}),
			transformResponse: (response: IResponse<IUser>) => {
				return response.array[0]
			},
			// invalidatesTags: ['Profile']
		}),
		updateProfile: build.mutation<IResponse<IUser>, IProfileUpdateData>({
			query: ({ name, email, id }) => ({
				url: REST_END.updateUserProfile,
				method: 'POST',
				body: {
					name,
					email,
					item_id: id
				}
			}),
			invalidatesTags: ['Profile']
		})
	})
})
