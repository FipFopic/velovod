import BottomSheet from '@gorhom/bottom-sheet'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import MapView, { EventUserLocation, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import PointsPassingList
	from '../../../components/PointsPassingList/PointPassingList'
import { KEYS } from '../../../config'
import { ICoords, IPoint } from '../../../core/interfaces/IRoute'
import { userAPI } from '../../../services/user/UserService'
import {
	getPointsCoords,
	getPointsToPass,
	isPointRadius,
	PointPass
} from '../RoutePassing.helper'
import themedStyles from '../RoutePassing.style'

interface SimpleRoutePassingProps {
	points: IPoint[]
	navigation: any
	// soundList: Sound[]
}

const SimpleRoutePassing: FC<SimpleRoutePassingProps> = ({ points, navigation }) => {
	const styles = useStyleSheet(themedStyles)

	const POINTS_TO_PASS = useMemo(() => getPointsToPass(points), [])
	const POINTS_COORDS = useMemo(() => getPointsCoords(POINTS_TO_PASS), [])

	const { data: user } = userAPI.useGetProfileQuery()

	const [currentLocation, setLocation] = useState<ICoords | null>(null)
	const [pointList, setPointList] = useState<PointPass[]>(POINTS_TO_PASS)
	const [nextPoint, setNextPoint] = useState<PointPass>(POINTS_TO_PASS[0])
	const [isEnd, setEnd] = useState(false)
	const [mapEventService, setMapEventService] = useState<any>()

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => ['5%', '50%', '90%'], [])

	const initialRegion = {
		latitude: +pointList[0].data.point.latitude,
		longitude: +pointList[0].data.point.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	}

	const pointPassed = (idx: number) => {
		pointList[idx] = { ...pointList[idx], isPassed: true }
	}

	const onPressBack = () => {
		Alert.alert(
			'Завершить маршрут?',
			'Весь прогресс будет утерян!',
			[
				{
					text: 'Покинуть',
					style: 'destructive',
					onPress: navigation.goBack
				},
				{
					text: 'Отмена'
				}
			]
		)
		return false
	}

	const onUserLocationChange = (e: EventUserLocation) => {
		setLocation(e.nativeEvent.coordinate)
	}

	useEffect(() => {
		if (!currentLocation) {
			return
		}

		const radius = nextPoint.data.radius
		const pointCoords: ICoords = {
			latitude: +(nextPoint.data.point.latitude),
			longitude: +(nextPoint.data.point.longitude)
		}

		if (!isPointRadius(currentLocation, pointCoords, radius)) {
			return
		}

		pointPassed(nextPoint.index)
		setNextPoint(pointList[nextPoint.index + 1])
	}, [currentLocation])

	return (
		<>
			<View>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						provider={PROVIDER_GOOGLE}
						initialRegion={initialRegion}
						zoomEnabled={true}
						showsUserLocation={true}
						showsMyLocationButton={true}
						onUserLocationChange={onUserLocationChange}
						ref={setMapEventService}
						// onRegionChange={onRegionChangeComplete}
					>
						{
							pointList &&
							pointList.map(point =>
								<Marker
									key={point.index}
									coordinate={{
										latitude: +point.data.point.latitude,
										longitude: +point.data.point.longitude
									}}
									title={point.data.point.title}
									description={point.data.point.description}
								/>
							)
						}

						<MapViewDirections
							apikey={KEYS.GOOGLE.key}
							optimizeWaypoints={false}
							origin={POINTS_COORDS[0]}
							waypoints={ POINTS_COORDS.length > 2 ? POINTS_COORDS.slice(1, -1) : undefined }
							mode={'WALKING'}
							precision={'high'}
							destination={ POINTS_COORDS[POINTS_COORDS.length - 1] }
							strokeWidth={4}
							strokeColor="red"
						/>

					</MapView>
				</View>
				<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
				>
					<Button onPress={onPressBack}>Завершить</Button>
					<ScrollView>
						<PointsPassingList
							points={pointList}
						/>
					</ScrollView>
				</BottomSheet>
			</View>
		</>
	)
}

export default SimpleRoutePassing
