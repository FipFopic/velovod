import { createAsyncThunk } from '@reduxjs/toolkit'
import { REST_END } from '../../config'
import { $host } from '../../core/utils/ApiClient'
import { IResponse } from '../../core/interfaces/IResponse'
import { IUser } from '../../core/interfaces/IUser'
import { LoginData } from './types'
import { saveToStorage } from '../../core/utils/Storage.service'

// export const setIsAuth =

export const doLogin = createAsyncThunk(
	'auth/login',
	async ({ email, password }: LoginData, thunkAPI) => {
		try {

			const res = await $host.post<IResponse<IUser>>(REST_END.login, { email, password })

			if (res.data.status === 1) {
				const user = res.data.array[0]
				const accessToken = user!.oauth!.access_token
				const refreshToken = user!.oauth!.refresh_token

				await saveToStorage('accessToken', accessToken)
				await saveToStorage('refreshToken', refreshToken)

				return true
			} else if (res.data.status == -99) {
				return thunkAPI.rejectWithValue('Неверный логин или пароль')
			}

		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка авторизации')
		}
	}
)
