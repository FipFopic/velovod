import React, { FC, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useStyleSheet } from '@ui-kitten/components'
import { ICoords, IPoint } from '../../../core/interfaces/IRoute'
import { userAPI } from '../../../services/user/UserService'
import {
	getPointsCoords,
	getPointsToPass,
	PointPass,
} from '../RoutePassing.helper'
import themedStyles from '../RoutePassing.style'

interface SimpleRoutePassingProps {
	points: IPoint[]
	// soundList: Sound[]
}

const SimpleRoutePassing: FC<SimpleRoutePassingProps> = ({ points }) => {
	const styles = useStyleSheet(themedStyles)

	const POINTS_TO_PASS = useMemo(() => getPointsToPass(points), [])
	const POINTS_COORDS = useMemo(() => getPointsCoords(POINTS_TO_PASS), [])

	const [getProfile, { data: user }] = userAPI.useGetProfileMutation()

	const [currentLocation, setLocation] = useState<ICoords | null>(null)
	const [pointList, setPointList] = useState<PointPass[]>(POINTS_TO_PASS)
	const [nextPoint, setNextPoint] = useState<PointPass>(POINTS_TO_PASS[0])
	const [isEnd, setEnd] = useState(false)



	useEffect(() => {
		getProfile()
	}, [])

	return (
			<>
			</>
	)
}

export default SimpleRoutePassing
