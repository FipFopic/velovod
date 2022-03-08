import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../interfaces/IUser'

export const getFromStorage = (key: string): Promise<string | null> => {
	return AsyncStorage.getItem(key)
}

export const saveToStorage = (key: string, value: string): Promise<void> => {
	return AsyncStorage.setItem(key, value)
}

export const removeFromStorage = (key: string): Promise<void> => {
	return AsyncStorage.removeItem(key)
}

export const saveUserToStorage = (user: IUser): Promise<void> => {
	return AsyncStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromStorage = async (): Promise<IUser | null> => {
	const json = await getFromStorage('user')
	if (!json) {
		return null
	}
	return JSON.parse(json)
}

export const isAuthUser = async (): Promise<boolean> => {
	const data = [
		await getUserFromStorage(),
		await getFromStorage('accessToken'),
		await getFromStorage('refreshToken')
	]

	return Promise.all(data).then(data => data.every(value => !!value))
}

export const removeUserFromStorage = (): Promise<void> => {
	return removeFromStorage('user')
}
