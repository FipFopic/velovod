import BottomSheet from '@gorhom/bottom-sheet'
import { Button, Icon, Input, Spinner, useStyleSheet } from '@ui-kitten/components'
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import {
	Alert,
	BackHandler,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { isAuthUser } from '../../core/utils/Storage.service'
import themedStyles from './Map.style'
import { StopWatch } from '../../core/utils/StopWatch.helper'
import Point from '../../../src/components/Point/Point'
import { getImageSrc } from '../../../src/core/utils/Main.helper'
import { KEYS } from '../../config'
import MapViewDirections from 'react-native-maps-directions'
import MyLocationButton from '../../components/MyLocationButton/MyLocationButton'
import { routeAPI } from '../../services/route/RouteService'
import NavigationService from '../../core/utils/Navigation.service'

// {"distance": "7.584",
// 	"duration": "00:25:27",
// 	"order_id": 0,
// 	"point":
// 		{
// 			"cover": null,
// 			"create_user": 113,
// 			"description": "fds",
// 			"id": 3215,
// 			"latitude": "55.738983",
// 			"longitude": "37.611004",
// 			"media": [[Object], [Object]],
// 			"place": {
// 				"city": "Москва",
// 				"city_district": null,
// 				"country": "Россия",
// 				"country_code": "ru",
// 				"county": null,
// 				"display_name": "069, 3-й Голутвинский переулок, Берсеневка, район Якиманка, Москва, Центральный федеральный округ, 119180, Россия"
// 				"house_number": null,
// 				"latitude": "55.73906",
// 				"longitude": null,
// 				"osm_id": 5736992621,
// 				"place_id": 65066725,
// 				"postcode": "119180",
// 				"road": "3-й Голутвинский переулок",
// 				"state": "Москва",
// 				"suburb": "Берсеневка"
// 				},
// 			"title": "Парк искусств Музеон"
// 		},
// 	"radius": 60}

// var dictionaryObject: Dictionary<String, Any> = [:]
// dictionaryObject["title"] = "unknown"
// dictionaryObject["polyline"] = "ololo"
// dictionaryObject["distance"] = distance / 1_000
// dictionaryObject["duration"] = durationString
// dictionaryObject["media"] = mediaArray
// dictionaryObject["points"] = pointsArray

interface INewRoute {
	title: string
	polyline: string
	distance: number
	duration: string
	media: Array<any>
	points: Array<any>
}

interface INewMedia {
	id: number
}

interface INewPoint {
	title: string
	description: string
	media?: Array<INewMedia>
	latitude?: string
	longitude?: string
}

const MapScreen = ({ navigation }: any) => {
	const styles = useStyleSheet(themedStyles)
	const EMPTY_POINT: INewPoint = {
		title: 'Новая точка',
		description: ''
	}

	const [isAddingRoute, setIsAddingRoute] = useState(false)
	const [newPoints, setNewPoints] = useState<Array<INewPoint>>([])

	const sheetPositions = ['25%', '50%', '90%']

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => sheetPositions, [])

	const stopWatch = new StopWatch()
	const [stopWatchData, setStopWatchData] = useState<string>('')
	const [editPointId, setEditPointId] = useState<number>(-1)
	const [isEditPoint, setIsEditPoint] = useState<boolean>(false)

	const [editTitle, setEditTitle] = useState<string>('')
	const [editDescription, setEditDescription] = useState<string>('')

	const [currentLocation, setCurrentLocation] = useState<any>({})
	const [routeDistance, setDistance] = useState<number>(0)
	const [mapEventService, setMapEventService] = useState<any>()

	const [addRoute, { data, error, isLoading }] = routeAPI.useAddRouteMutation()

	const onPressBack = () => {
		Alert.alert(
			'Завершить добавление маршрута?',
			'Весь прогресс будет утерян!',
			[
				{
					text: 'Покинуть',
					style: 'destructive',
					onPress: exitAddingRoute
				},
				{
					text: 'Отмена'
				}
			]
		)
		return false
	}

	//stopwatch
	useEffect(() => {
		if (!isAddingRoute) {
			stopWatch.stop()
			return
		}

		stopWatch.start()

		const stopWatchInterval = setInterval(() => {
			setStopWatchData(stopWatch.actualValue)
		}, 1000)

		return () => clearInterval(stopWatchInterval)
	}, [isAddingRoute])

	//navigation
	useEffect(() => {
		navigation?.setOptions({
			headerShown: !isAddingRoute
		})

		navigation.getParent()?.setOptions({
			tabBarStyle: {
				display: isAddingRoute ? 'none' : 'flex'
			}
		})

		return () => navigation.getParent()?.setOptions({
			tabBarStyle: undefined
		})
	}, [navigation, isAddingRoute])

	//onPressBack
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBack)
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', onPressBack)
		}
	}, [])

	useEffect(() => {
		if (currentLocation.longitude) moveToUserLocation()
	}, [currentLocation])

	const moveToUserLocation = () => {
		mapEventService.animateToRegion({ ...currentLocation, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 500)
	}

	const createRouteHandler = () => {
		isAuthUser().then(res => {
			if (res) setIsAddingRoute(true)
		})
	}

	const addNewPoint = () => {
		const pointToAdd: INewPoint = {
			title: 'Новая точка',
			description: ''
		}
		pointToAdd.latitude = currentLocation.latitude
		pointToAdd.longitude = currentLocation.longitude
		setNewPoints(newPoints.concat(pointToAdd))
	}

	const editPoint = (index: number) => {
		setIsEditPoint(true)
		setEditPointId(index)
		setEditTitle(newPoints[index].title)
		setEditDescription(newPoints[index].description)
	}

	const savePoint = (point: INewPoint) => {
		const editedPoint = newPoints.map((p, i) => {
			if (i !== editPointId) return p
			return point
		})
		const editedPointList = newPoints
		editedPointList[editPointId].title = editTitle
		editedPointList[editPointId].description = editDescription
		setNewPoints(editedPointList)
		setIsEditPoint(false)
		setEditPointId(-1)
		setEditTitle('')
		setEditDescription('')
	}

	const removePoint = (index: number) => {
		const arr = newPoints.filter((elem, i) => i !== index)
		setNewPoints(arr)
	}

	const exitAddingRoute = () => {
		setNewPoints([])
		setIsAddingRoute(false)
	}

	const saveNewRoute = () => {
		const points = newPoints.map((p) => {
			return { point: p }
		})
		const route: INewRoute = {
			title: 'unknown',
			polyline: '',
			distance: routeDistance,
			duration: stopWatchData,
			media: [],
			points: points
		}
		addRoute(route)
		setIsAddingRoute(false)
		stopWatch.stop()
		NavigationService.navigate('Routes')
	}

	return (
		<>
			<View style={styles.mapContainer}>

				<MapView
					style={styles.map}
					ref={setMapEventService}
					provider={PROVIDER_GOOGLE}
					loadingEnabled={true}
					showsCompass={true}
					showsUserLocation={true}
					onUserLocationChange={(location) => setCurrentLocation(location.nativeEvent.coordinate)}
					initialRegion={{
						latitude: -49.026662,
						longitude: 38.973106,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					{
						newPoints &&
						newPoints.map((point, index) =>
							<Marker
								key={index + point.title + point.latitude}
								coordinate={{
									// @ts-ignore
									latitude: +point.latitude,
									// @ts-ignore
									longitude: +point.longitude
								}}
								title={point.title}
								description={point.description}
							/>
						)
					}
					{
						newPoints && isAddingRoute &&
						// @ts-ignore
						<MapViewDirections
							apikey={KEYS.GOOGLE.key}
							optimizeWaypoints={false}
							origin={currentLocation || ''}
							waypoints={ newPoints.length > 2 ? newPoints.slice(1, -1) : undefined }
							mode={'WALKING'}
							precision={'high'}
							destination={ newPoints[newPoints.length - 1] }
							strokeWidth={4}
							strokeColor='red'
							onReady={({ distance }) => setDistance(distance)}
						/>
					}
				</MapView>

				<TouchableOpacity style={styles.locationButton} onPress={moveToUserLocation}>
					<MyLocationButton />
				</TouchableOpacity>

				{!isAddingRoute &&
					<Button style={styles.createRouteButton} onPress={createRouteHandler}>Создать маршрут</Button>
				}

				{ isAddingRoute &&
				<BottomSheet
					ref={bottomSheetRef}
					snapPoints={snapPoints}
				>
					<Icon
						style={styles.exitButton}
						fill='#000'
						name='close-outline'
						onPress={onPressBack}/>
					<View style={styles.bottomSheet}>

						{ isLoading &&
							<Spinner />
						}

						<View style={styles.statusBar}>
							<View style={styles.timer}>
								<Text style={styles.statusBarItemTitle}>В ПУТИ</Text>
								<Text style={styles.statusBarItemContent}>{stopWatchData}</Text>
							</View>
							<View style={styles.distance}>
								<Text style={styles.statusBarItemTitle}>ПРОЙДЕНО</Text>
								<Text style={styles.statusBarItemContent}>{routeDistance.toFixed(1)} км</Text>
							</View>
							<View style={styles.pointQuant}>
								<Text style={styles.statusBarItemTitle}>ТОЧКИ ПУТИ</Text>
								<Text style={styles.statusBarItemContent}>{newPoints.length}</Text>
							</View>
						</View>

						<View style={styles.sheetButtonGroup}>
							<Button
								style={styles.saveRouteButton}
								onPress={saveNewRoute}
								size={'small'}
								disabled={!(newPoints.length >= 2 && !isLoading)}
							>
								Опубликовать
							</Button>
							<Button
								style={styles.addPointButton}
								onPress={addNewPoint}
								size={'small'}
							>
								Добавить точку
							</Button>
							{/*<Button*/}
							{/*	style={styles.addPointButton}*/}
							{/*	size='small'*/}
							{/*	onPress={exitAddingRoute}*/}
							{/*>*/}
							{/*	Выйти*/}
							{/*</Button>*/}
						</View>

						<ScrollView style={styles.pointListBox}>
							{/*{ pointList &&*/}
							{/*<PointsPassingList points={pointList} soundList={soundList}/>*/}
							{/*}*/}
							{
								!isEditPoint && newPoints && newPoints.map((point, index) =>
									<View
										key={index + point.title}
										style={styles.pointBox}
									>
										<Point title={point.title} photo={getImageSrc(1, 100)} style={{ opacity: 1 }}/>
										<View style={styles.pointControl}>
											<Icon
												style={{ width: 20, height: 20 }}
												fill='#000'
												name='edit-outline'
												onPress={() => editPoint(index)}
											/>
											<Icon
												style={{ width: 20, height: 20 }}
												fill='#000'
												name='close-outline'
												onPress={() => removePoint(index)}
											/>
										</View>
									</View>
								)
							}
							{
								isEditPoint &&
									<KeyboardAvoidingView
										behavior={'padding'}
										enabled={true}
									>
										<Input
											placeholder={'Title'}
											style={styles.editInput}
											value={editTitle}
											onChangeText={text => setEditTitle(text)}
										/>
										<Input
											style={styles.editInput}
											multiline={true}
											numberOfLines={5}
											placeholder={'Description'}
											value={editDescription}
											onChangeText={text => setEditDescription(text)}
										/>
										<Button
											style={styles.addPointButton}
											// @ts-ignore
											onPress={savePoint}
										>
											Сохранить
										</Button>
									</KeyboardAvoidingView>
							}
						</ScrollView>
					</View>
				</BottomSheet>
				}

			</View>
		</>
	)
}

export default MapScreen
