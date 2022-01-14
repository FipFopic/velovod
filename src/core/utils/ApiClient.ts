import axios, { AxiosRequestConfig } from 'axios'
import { REST_API } from '../../config'
import { getFromStorage } from './Storage.service'

const $host = axios.create({ baseURL: REST_API })
const $authHost = axios.create({ baseURL: REST_API, withCredentials: true })

const authInterceptor = async (config: AxiosRequestConfig) => {
	const accessToken = await getFromStorage('accessToken')

	if (config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
