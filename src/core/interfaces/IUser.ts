import { IMedia } from './IRoute'

export interface IToken {
	token_type: string
	access_token: string
	refresh_token: string
	expires_in: number
}

export interface IUser {
	id: number
	name: string
	email: string
	birthday: string
	created_at: string
	updated_at: string
	firebase_id: string
	count_velocoin: number
	statistic?: IStatistic
	media?: IMedia[]
	avatar: IMedia
	oauth?: IToken
}

// export interface IUser {
// 	id: number
// 	email?: string
// 	avatar?: IAvatar
// 	count_velocoin: number
// 	facebook_page?: string | null
// 	media?: IMedia[]
// 	name: string
// 	oauth?: IToken
// 	resource_id: number
// 	statistic?: IStatistic
// 	vk_page?: string | null
// }

// interface IAvatar {
// 	id?: number
// 	media_dict?: number
// 	media_format?: string
// 	resource_id?: number
// 	order_id?: number
// 	create_user?: number
// 	parent_id?: number
// 	title?: string
// 	description?: string
// 	body?: null | any
// }

interface IStatistic {
	count_create_routes: number
	count_go_km: number
	count_create_points: number
	level?: {
		value?: number
		level?: ILevel
		max: number
	}
	medals?: any[]
}

interface ILevel {
	id?: number
	min?: number
	max?: number
	title?: string
	description?: string
}
