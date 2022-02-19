
export interface IFetchRoutesParams {
	latitude?: number
	longitude?: number
	page?: number
	limit?: number
}

export interface ICompleteRouteParams {
	routeId?: number
	polyline?: string
	countPoints?: number
	distance?: number
}
