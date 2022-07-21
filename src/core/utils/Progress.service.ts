import {getFromStorage, removeFromStorage, saveToStorage} from "./Storage.service";

export interface IProgressData {
	routeId: string
	pointList: Array<any>
}
const storageName = 'userProgress'

export const getProgress = (): Promise<string | null> => {
	return getFromStorage(storageName)
}

export const saveProgress = async (data: IProgressData) => {
	if (!!(await getFromStorage(storageName))) await removeFromStorage(storageName)

	return await saveToStorage(storageName, JSON.stringify(data))
}

export const removeProgress = async () => {
	return await removeFromStorage(storageName)
}
