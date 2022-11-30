import BottomSheet from '@gorhom/bottom-sheet'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Text, useStyleSheet } from '@ui-kitten/components'
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
import Sound from 'react-native-sound'
import { routeAPI } from '../../../services/route/RouteService'
import MyLocationButton from '../../../components/MyLocationButton/MyLocationButton'
import {removeProgress, saveProgress} from "../../../core/utils/Progress.service";

interface SimpleRoutePassingProps {
	routeId: number
	points: IPoint[]
	navigation: any
	soundList: Sound[]
}

const SimpleRoutePassing: FC<SimpleRoutePassingProps> = ({ routeId, points, navigation, soundList }) => {
	const styles = useStyleSheet(themedStyles)
	const fromProgress =  navigation?.params?.fromProgress as boolean

	const POINTS_TO_PASS = useMemo(() => {
		if (!fromProgress) {
			return getPointsToPass(points)
		}
		return points
	}, [])
	const POINTS_COORDS = useMemo(() => getPointsCoords(POINTS_TO_PASS), [])

	const { data: user } = userAPI.useGetProfileQuery()
	const [completeRoute, { data, error, isLoading }] = routeAPI.useCompleteRouteMutation()

	const [currentLocation, setLocation] = useState<ICoords | null>(null)
	const [pointList, setPointList] = useState<PointPass[]>(POINTS_TO_PASS)
	const [nextPoint, setNextPoint] = useState<PointPass>(POINTS_TO_PASS.find((elem) => !elem.isPassed))
	const [isEnd, setEnd] = useState(false)
	const [mapEventService, setMapEventService] = useState<any>()

	saveProgress({routeId: routeId.toString(), pointList})

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

	const [isAudioPlaying, setAudioPlaying] = useState(false)
	const [actualAudioIndex, setActualAudioIndex] = useState(-1)

	const _playAudio = (index: number) => {
		if (isAudioPlaying && actualAudioIndex !== index) {
			soundList[actualAudioIndex].pause()
		}

		if (!soundList[index].isPlaying()) {
			soundList[index].play(() => {
				setAudioPlaying(false)
			})
			setAudioPlaying(true)
			setActualAudioIndex(index)
			return
		}

		soundList[index].pause()
		setAudioPlaying(false)
		setActualAudioIndex(-1)
	}

	useEffect(() => {
		if (data && !error && !isLoading) navigation.goBack()
	}, [data])

	const initialRegion = {
		latitude: +pointList[0].data.point.latitude,
		longitude: +pointList[0].data.point.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	}

	const moveToUserLocation = () => {
		mapEventService.animateToRegion({ ...currentLocation, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 500)
	}

	const pointPassed = (idx: number) => {
		const tempList = pointList
		tempList[idx] = { ...pointList[idx], isPassed: true }
		setPointList(tempList)
	}

	const onPressBack = () => {
		Alert.alert(
			'Завершить маршрут?',
			'Весь прогресс будет утерян!',
			[
				{
					text: 'Покинуть',
					style: 'destructive',
					onPress: handleBackButtonClick
				},
				{
					text: 'Отмена'
				}
			]
		)
		return false
	}

	function handleBackButtonClick() {
		removeProgress().then(() => {
			navigation.goBack()
		})
	}

	const onPressEnd = () => {
		completeRoute({ routeId: routeId, polyline: '', countPoints: pointList.length, distance: 10 })
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
		_playAudio(nextPoint.index)
		setNextPoint(pointList[nextPoint.index + 1])
		saveProgress({routeId: routeId.toString(), pointList})
	}, [currentLocation])

	useEffect(() => {
		// console.log('nextPoint.data.point.latitude', nextPoint.data.point.latitude)
		// console.log('nextPoint.data.point.long', nextPoint.data.point.longitude)
		// setTimeout( () => {
		// 	setLocation({
		// 		latitude: 55.738983,
		// 		longitude: 37.611004
		// 	})
		// }, 5000)
	})

	useEffect(() => {
		console.log('isAudioPlaying', isAudioPlaying)
		console.log('soundList', soundList)
		console.log('soundList[]', soundList[nextPoint-1])
		soundList[0].play()
		setTimeout(() => {
			console.log('soundList[0].isPlaying()', soundList[0].isPlaying())
		}, 5000)
	}, [isAudioPlaying])

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
						// showsMyLocationButton={true}
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
							origin={currentLocation || ''}
							waypoints={ POINTS_COORDS.length > 2 ? POINTS_COORDS.slice(nextPoint.index, -1) : undefined }
							mode={'WALKING'}
							precision={'high'}
							destination={ POINTS_COORDS[POINTS_COORDS.length - 1] }
							strokeWidth={4}
							strokeColor="red"
						/>

					</MapView>
				</View>
				<TouchableOpacity style={styles.locationButton} onPress={moveToUserLocation}>
					<MyLocationButton />
				</TouchableOpacity>
				<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
				>
					{
						!pointList[pointList.length - 1].isPassed &&
						<Icon
							style={styles.exitButton}
							fill='#000'
							name='close-outline'
							onPress={onPressBack}/>
					}
					{
						pointList[pointList.length - 1].isPassed &&
						<Button
							style={styles.endButton}
							size={'small'}
							onPress={onPressEnd}
						>
							Завершить прохождение
						</Button>
					}
					<ScrollView>
						<PointsPassingList
							points={pointList}
							soundList={soundList}
							actualAudioIndex={actualAudioIndex}
							playAudio={_playAudio}
						/>
					</ScrollView>
				</BottomSheet>
			</View>
		</>
	)
}

export default SimpleRoutePassing
