import { Platform } from 'react-native'
import { createAsyncThunk } from '@reduxjs/toolkit'
import VKLogin from 'react-native-vkontakte-login'
// import {
// 	AccessToken,
// 	AuthenticationToken,
// 	LoginManager,
// } from 'react-native-fbsdk-next'
import { removeFromStorage, saveToStorage } from '../../core/utils/Storage.service'
import NavigationService from '../../core/utils/Navigation.service'
import { IResponse } from '../../core/interfaces/IResponse'
import { IUser } from '../../core/interfaces/IUser'
import { $host } from '../../core/utils/ApiClient'
import { REST_END } from '../../config'
import { LoginData, RegisterData } from './types'

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

				return NavigationService.navigate('Profile')

			} else if (res.data.status == -99) {
				return thunkAPI.rejectWithValue('Неверный логин или пароль')
			}

		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка авторизации')
		}
	}
)

export const doRegister = createAsyncThunk(
	'auth/regiser',
	async ({ name, email, password }: RegisterData, thunkAPI) => {
		try {

			const res = await $host.post(REST_END.signup, {
				name,
				email,
				password,
				password_confirmation: password
			})

			if (res.data.status === 1) {
				const accessToken = res.data.array[0]!.oauth!.access_token
				const refreshToken = res.data.array[0]!.oauth!.refresh_token

				await saveToStorage('accessToken', accessToken)
				await saveToStorage('refreshToken', refreshToken)

				return NavigationService.navigate('Profile')

			} else if (res.data.status === -1) {
				return thunkAPI.rejectWithValue('Такой пользователь уже существует')
			}

		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка регистрации')
		}
	}
)

export const doAuthWithVK = createAsyncThunk(
	'auth/withVK',
	async (_, thunkAPI) => {
		try {

			const auth = await VKLogin.login(['email'])
			console.log('vkAuth:auth ', auth)

			if (!auth.access_token) {
				return thunkAPI.rejectWithValue('Ошибка авторизации!')
			}

			const data: any = {
				token: auth.access_token
			}

			if (auth.email) {
				data.email = auth.email
			}

			const res = await $host.post<IResponse<IUser>>(REST_END.authVK, data)

			if (res.data.status === 1) {
				const user = res.data.array[0]
				const accessToken = user!.oauth!.access_token
				const refreshToken = user!.oauth!.refresh_token


				await saveToStorage('accessToken', accessToken)
				await saveToStorage('refreshToken', refreshToken)

				return NavigationService.navigate('Profile')

			} else {
				return thunkAPI.rejectWithValue('Непредвиденная ошибка!')
			}

		} catch (e) {
			return thunkAPI.rejectWithValue('Ошибка авторизации через ВКонтакте')
		}
	}
)

export const doAuthWithFB = createAsyncThunk(
	'auth/withFB',
	async (_, thunkAPI) => {
		// try {
		//
		// 	let accessTokenFB = null
		//
		// 	await LoginManager.logInWithPermissions(
		// 		['email'],
		// 		'limited',
		// 		'my_nonce'
		// 	)
		//
		// 	if (Platform.OS === 'ios') {
		// 		const res = await AuthenticationToken.getAuthenticationTokenIOS()
		// 		accessTokenFB = res?.authenticationToken
		// 	} else {
		// 		const res = await AccessToken.getCurrentAccessToken()
		// 		accessTokenFB = res?.accessToken
		// 	}
		//
		// 	if (!accessTokenFB) {
		// 		return
		// 	}
		//
		// 	const data: any = {
		// 		token: accessTokenFB
		// 	}
		//
		// 	const res = await $host.post<IResponse<IUser>>(REST_END.authFB, data)
		//
		// 	if (res.data.status === 1) {
		// 		const user = res.data.array[0]
		// 		const accessToken = user!.oauth!.access_token
		// 		const refreshToken = user!.oauth!.refresh_token
		//
		// 		await saveToStorage('accessToken', accessToken)
		// 		await saveToStorage('refreshToken', refreshToken)
		//
		// 		return NavigationService.navigate('Profile')
		//
		// 	} else {
		// 		return thunkAPI.rejectWithValue('Непредвиденная ошибка!')
		// 	}
		// } catch (e) {
		// 	return thunkAPI.rejectWithValue('Ошибка авторизации через Facebook')
		// }
	}
)

export const doLogout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		await removeFromStorage('accessToken')
		await removeFromStorage('refreshToken')

		return NavigationService.navigate('Login')
	}
)
