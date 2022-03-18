import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {
	getFromStorage,
	removeFromStorage,
	saveToStorage, saveUserToStorage
} from '../../core/utils/Storage.service'
import { IResponse } from '../../core/interfaces/IResponse'
import { IToken, IUser } from '../../core/interfaces/IUser'
import { REST_API, REST_END } from '../../config'
import { ILoginData, IOauth, IProfileUpdateData, IRegisterData, IAuthWithVKData } from './types'

const CACHING_TIME = 60 * 10

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: REST_API,
		prepareHeaders: async headers => {
			const accessToken = await getFromStorage('accessToken')
			if (accessToken) {
				headers.set('Authorization', `Bearer ${accessToken}`)
			}
			headers.set('Content-Type', 'application/json')

			return headers
		}
	}),
	tagTypes: ['Profile'],
	endpoints: (build) => ({

		doLogin: build.mutation<IUser | any, ILoginData>({
			query: ({ email, password }) => ({
				url: REST_END.login,
				method: 'POST',
				body: { email, password }
			}),
			transformResponse: async (response: IResponse<IUser>)	=> {
				if (response.status !== 1) {
					return { error: 'Неверный логин или пароль' }
				}

				const user = response.array[0]
				const accessToken = user!.oauth!.access_token
				const refreshToken = user!.oauth!.refresh_token

				await saveToStorage('accessToken', accessToken)
				await saveToStorage('refreshToken', refreshToken)
				await saveUserToStorage(user)

				return user
			},
			invalidatesTags: ['Profile']
		}),

		doRegister: build.mutation<IToken | any, IRegisterData>({
			query: ({ name, email, password }) => ({
				url: REST_END.signup,
				method: 'POST',
				body: {
					name,
					email,
					password,
					password_confirmation: password
				}
			}),
			transformResponse: async (response: IResponse<IOauth>) => {
				if (response.status !== 1) {
					return { error: 'Этот email уже занят' }
				}

				const accessToken = response.array[0]!.oauth!.access_token
				const refreshToken = response.array[0]!.oauth!.refresh_token

				await saveToStorage('accessToken', accessToken)
				await saveToStorage('refreshToken', refreshToken)

				return response.array[0]!.oauth
			}
		}),

		doAuthWithVK: build.mutation<any, IAuthWithVKData>({
			query: ({ accessToken, email }) => {
				const body: any = {
					token: accessToken
				}

				if (email) {
					body.email = email
				}

				return {
					url: REST_END.authFB,
					method: 'POST',
					body
				}
			},
			transformResponse: async (response) => {
				console.log('\n\n\n\n\n\n\n\n\nn\n\n\n\n\n\n =================response====================: ', response)

				return true
			}
		}),

		doLogout: build.mutation<boolean, void>({
			query: () => ({
				url: REST_END.logout,
				method: 'POST'
			}),
			transformResponse: async () => {
				await removeFromStorage('accessToken')
				await removeFromStorage('refreshToken')
				await removeFromStorage('user')

				return true
			},
			invalidatesTags: ['Profile']
		}),

		getProfile: build.query<IUser, void>({
			query: () => ({
				url: REST_END.userProfile,
				method: 'POST'
			}),
			transformResponse: (response: IResponse<IUser>) => {
				return response.array[0]
			},
			keepUnusedDataFor: CACHING_TIME,
			providesTags: ['Profile']
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
