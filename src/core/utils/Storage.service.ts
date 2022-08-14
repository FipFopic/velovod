import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../interfaces/IUser'
import RNFetchBlob from 'rn-fetch-blob'

const savedRouteListStorage = 'savedRouteListStorage'

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

export const saveRouteToStorage = (routeId: string, imageSrc: string, routeData: any, pointList: any, audioList: any): Promise<void> => {
	return AsyncStorage.setItem(routeId, JSON.stringify({routeId, imageSrc, routeData, pointList, audioList})).then(() => {
		getFromStorage(savedRouteListStorage).then(res => {
			if (res) {
				const temp = [...new Set([...JSON.parse(res), routeId])]
				AsyncStorage.setItem(savedRouteListStorage, JSON.stringify(temp))
				console.log('res true', res)
			} else {
				AsyncStorage.setItem(savedRouteListStorage, JSON.stringify([routeId]))
				console.log('res false', res)
			}
		})
	})
}

export const getRouteFromStorage = async (routeId: string): Promise<object | null> => {
	const json = await getFromStorage(routeId)
	if (!json) {
		return null
	}
	return JSON.parse(json)
}

export const removeRouteFromStorage = (routeId: string): Promise<void> => {
	AsyncStorage.getItem(savedRouteListStorage).then(res => {
		AsyncStorage.mergeItem(savedRouteListStorage, JSON.stringify((JSON.parse(res)).filter(id => id !== routeId)))
	})
	return removeFromStorage(routeId)
}

export const removeAllRoutesFromStorage = async(): Promise<boolean> => {
	const keys = await AsyncStorage.getAllKeys()
	for (let key of keys) {
		if (key !== 'user' && key !== 'accessToken' && key !== 'refreshToken') {
			await RNFetchBlob.session(key).dispose().catch((e) => {return e})
			await removeRouteFromStorage(key)
		}
	}
	await AsyncStorage.removeItem(savedRouteListStorage)
	return true
}

export const getSavedRouteListStorage = async (): Promise<object | null> => {
	const json = await getFromStorage(savedRouteListStorage)
	if (!json) {
		return null
	}
	return JSON.parse(json)
}


