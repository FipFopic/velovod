import { IToken } from '../../core/interfaces/IUser'

export interface AuthState {
	isAuth: boolean
	isLoading: boolean
	error: string
}

export interface LoginData {
	email: string
	password: string
}

export interface RegisterData {
	name: string
	email: string
	password: string
}

export interface IOauth {
	oauth: IToken
}
