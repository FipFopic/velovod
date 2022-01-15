import { ICoords, IPoint } from '../../core/interfaces/IRoute'

export interface PointPass {
	data: IPoint
	isPassed: boolean
	index: number
}

// export const getPointsCoords = (points: PointPass[]): LatLng[] => {
	export const getPointsCoords = (points: PointPass[]): any[] => {
		const res: any[] = []
		// const res: LatLng[] = []

	points.forEach(point => {
		res.push({
			latitude: +point.data.point.latitude,
			longitude: +point.data.point.longitude
		})
	})

	return res
}

export const getPointsToPass = (points: IPoint[]): PointPass[] => {
	const res: PointPass[] = points
		.map((point, index) => ({
			data: { ...point },
			isPassed: false,
			index
		}))

	return res
}

export const isPointRadius = (coords: ICoords, pointCoords: ICoords, radius: number): boolean => {
	return getDistanceToPoint(coords, pointCoords) <= radius
}

export const getDistanceToPoint = (coords: ICoords, pointCoords: ICoords): number => {
	const toRad = (num: number) => num * Math.PI / 180
	const R = 6371 // km

	const dLat = toRad(pointCoords.latitude - coords.latitude)
	const dLong = toRad(pointCoords.longitude - coords.longitude)

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(coords.latitude)) * Math.cos(toRad(pointCoords.latitude)) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c

	return Math.round(d * 1000) // metrs
}
