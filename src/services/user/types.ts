import { IToken } from '../../core/interfaces/IUser'

export interface IProfileUpdateData {
	name?: string
	email?: string
	id: number
}

export interface ILoginData {
	email: string
	password: string
}

export interface IRegisterData {
	name: string
	email: string
	password: string
}

export interface IOauth {
	oauth: IToken
}

export interface IAuthWithVKData {
	accessToken: string
	email?: string
}
