import {IUser} from './IUser';

export type RouteType = 'route' | 'quest'

export interface IRoute {
	id: number
	title: string
	description: string
	polyline: string
	create_user: number
	distance: string
	duration: string
	count_point: number
	cover: IMedia
	comments: string[]
	media?: IMedia[]
	points?: IPoint[]
	author: IUser
	resource?: {
		rating: string
	}
	for_one?: number
	for_group?: number
	option_random_point?: number
}

export interface IMedia {
	id: number
	media_dict: number
	media_format: string
	order_id: number
	create_user: number
	parent_id: number
	r_read: number
	r_write: number
	r_delete: number
	r_right: number
	title: string
}

export interface IPoint {
	duration: string
	distance: string
	radius: number
	point: {
		id: number
		title: string
		description: string
		longitude: string
		latitude: string
		media: IMedia[]
	}
	// point_state?: string
	// questions?: IQuestion[]
	// where?: IWherePoint[]
}

export interface IQuestion {
	question: string
	media?: IMedia[]
}

export interface IWherePoint {
	title: string
	media?: IMedia[]
}

export interface IQuestUser {
	latitude: number
	longitude: number
	user: IUser
}

export interface ILocation {
	index: number
	latitude: number
	longitude: number
}
