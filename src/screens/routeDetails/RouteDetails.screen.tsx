import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import {
	Button,
	Spinner,
	Tab,
	TabBar,
	Text,
	useStyleSheet,
	ViewPager
} from '@ui-kitten/components'
import FastImage from 'react-native-fast-image'
import NavigationService from '../../core/utils/Navigation.service'
import { IPoint } from '../../core/interfaces/IRoute'
import { getAudioSrc, getImageSrc, getMediaSrc } from '../../core/utils/Main.helper'
import { useAppSelector } from '../../core/hooks/redux'
import { routeAPI } from '../../services/route/RouteService'
import PointsList from '../../components/PointsList/PointsList'
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo'
import { getQuestRouteType } from './RouteDetails.helper'
import themedStyles from './RouteDetails.style'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { KEYS } from '../../config'
import { getPointsCoords, getPointsToPass, PointPass } from '../routePassing/RoutePassing.helper'
import Sound from 'react-native-sound'

const RouteDetailsScreen = ({ route: navigation }: any) => {
	const styles = useStyleSheet(themedStyles)
	const id = +navigation.params?.id || null
	const type = navigation.params?.type || null

	if (!id || !type) {
		return (
			<>
				<View>
					<Text>Ошибка!</Text>
				</View>
			</>
		)
	}

	const { isAuth } = useAppSelector(state => state.auth)

	if (type === 'route') {
		const { data: route, isLoading, error } = routeAPI.useGetRouteQuery(id)

		const [points, setPoints] = useState<IPoint[]>([])
		const [tabIndex, setTabIndex] = useState(0)
		const [initialRegion, setInitialRegion] = useState({})
		const [mapEventService, setMapEventService] = useState<any>()
		const [isAudioLoading, setAudioLoading] = useState(false)

		const POINTS_COORDS = points.map((point) => {
			return {
				latitude: +point.point.latitude,
				longitude: +point.point.longitude
			}
		})

		useEffect(() => {
			if (route?.points) {
				setPoints(route.points)
			}
		}, [route])

		useEffect(() => {
			setInitialRegion({
				latitude: points[0] ? +(points[0].point.latitude) : 0.3,
				longitude: points[0] ? +(points[0]?.point.longitude) : 0.3,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			})
		}, [points])

		const onPressStartRoute = () => {
			if (!isAuth) {
				return NavigationService.navigate('ProfileStack')
			}

			return downloadRoute()
		}

		const downloadRoute = () => {
			setAudioLoading(true)

			Sound.setCategory('Playback')

			const soundList: Sound[] = []

			points.map((point, idx) => {
				// if (point.point.media[1] === undefined) {
				// 	return
				// }

				const audioSrc = getMediaSrc(point.point.media, 'audio')
				if (!audioSrc) {
					console.log('audioSrc', audioSrc)
					return ''
				}

				soundList[idx] = new Sound(
					audioSrc,
					undefined,
					err => err &&
						console.warn(`error in downloading audio: ${point.point.media[1].id}  file: `, err)
				)

				const interval = setInterval(() => {
					if (!soundList.every(sound => sound.isLoaded())) {
						return
					}

					NavigationService.navigate('RoutePassing', { id, type, points, soundList })

					setAudioLoading(false)
					clearInterval(interval)
				}, 1000)
			})
		}

		return (
			<>
				<View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.roadDetailsBox}>

							<View style={styles.roadBox}>
								<FastImage
									// @ts-ignore
									style={styles.roadImage}
									source={{
										uri: getImageSrc(route?.cover?.id, 1080),
										cache: FastImage.cacheControl.immutable
									}}
								/>
								{
									error &&
									<View>
										<Text>Произошла ошибка...</Text>
									</View>
								}
								{
									(isLoading || isAudioLoading) &&
									<View>
										<Spinner />
									</View>
								}
								{
									!isLoading && !isAudioLoading && !error && points.length > 0 &&
									<Button
										style={styles.beginButton}
										onPress={onPressStartRoute}
									>Начать маршрут</Button>
								}

								<OwnerInfo
									name={route?.author?.name || ''}
									photo={getImageSrc(route?.author?.avatar?.id || -1, 100)}
								/>

								<View style={styles.descriptionBox}>
									<Text style={styles.description}>
										{route?.description}
									</Text>
								</View>

							</View>

							<TabBar
								style={styles.tabBar}
								indicatorStyle={styles.tabIndicator}
								selectedIndex={tabIndex}
								onSelect={setTabIndex}
								// customize tab https://github.com/akveo/react-native-ui-kitten/issues/1079
							>
								{/*<Tab*/}
								{/*	style={styles.tab}*/}
								{/*	title={evaProps =>*/}
								{/*		<Text {...evaProps} style={styles.tab}>Список точек</Text>*/}
								{/*	}*/}
								{/*/>*/}
								<Tab title={'Список точек'}/>
								<Tab title={'Точки на карте'}/>
							</TabBar>
							{/*<TabView*/}
							{/*	style={{height: 50, width: '100%'}}*/}
							{/*/>*/}

						</View>

						<ViewPager
							style={styles.roadInfo}
							selectedIndex={tabIndex}
							onSelect={setTabIndex}
						>
							<View style={styles.infoSlide}>
								<ScrollView
									contentContainerStyle={styles.slideContainer}
									showsVerticalScrollIndicator={false}
								>
									<PointsList
										points={points}
									/>
								</ScrollView>
							</View>

							<View style={styles.infoSlide}>
								<View style={styles.slideContainer}>
									{!isLoading && !error && points.length > 0 &&
									<MapView
										style={{ height: '100%', width: '100%' }}
										provider={PROVIDER_GOOGLE}
										region={initialRegion}
										zoomEnabled={true}
										showsUserLocation={true}
										showsMyLocationButton={true}
										ref={setMapEventService}
										// onUserLocationChange={onUserLocationChange}
										// onRegionChange={onRegionChangeComplete}
									>
										{
											points &&
											points.map((point, index) =>
												<Marker
													key={index}
													coordinate={{
														latitude: +point.point.latitude,
														longitude: +point.point.longitude
													}}
													title={point.point.title}
													description={point.point.description}
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
									}

									{/*<MapView*/}
									{/*  style={{height: 400, borderRadius: 34}}*/}
									{/*  mapType={'standard'}*/}
									{/*  initialRegion={{*/}
									{/*    latitude: 47.2357,*/}
									{/*    longitude: 39.7015,*/}
									{/*    latitudeDelta: 0.0922,*/}
									{/*    longitudeDelta: 0.0421,*/}
									{/*  }}*/}
									{/*  showsUserLocation={true}*/}
									{/*>*/}
									{/*<Marker*/}
									{/*  coordinate={{*/}
									{/*    latitude: 47.2357,*/}
									{/*    longitude: 39.7015*/}
									{/*  }}*/}
									{/*  title="title"*/}
									{/*  description="description"*/}
									{/*/>*/}
									{/*</MapView>*/}
									{/* <MapPointList height={400} pointList={points}/> */}
								</View>
							</View>
						</ViewPager>

					</ScrollView>
				</View>
			</>
		)
	}

	if (type === 'quest') {
		const { data: quest, isLoading, error } = routeAPI.useGetQuestQuery(id)

		const onPressStartQuest = () => {
			if (!isAuth) {
				return NavigationService.navigate('ProfileStack')
			}
		}

		return (
			<>
				<View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.roadDetailsBox}>

							<View style={styles.roadBox}>
								<FastImage
									// @ts-ignore
									style={styles.roadImage}
									source={{ uri: getImageSrc(quest?.cover?.id, 1080) }}
								/>
								{
									error &&
									<View>
										<Text>Произошла ошибка...</Text>
									</View>
								}
								{
									isLoading &&
									<View>
										<Spinner />
									</View>
								}
								{
									quest?.count_point && false &&
									<Button
										onPress={onPressStartQuest}
									>Начать квест</Button>
								}

								{
									quest &&
									<>
										<OwnerInfo
											name={quest.author?.name || ''}
											photo={getImageSrc(quest?.author?.avatar?.id || -1, 100)}
										/>

										<View style={styles.descriptionBox}>
											<Text style={styles.description}>
												{quest.description}
											</Text>
										</View>

										<Text>Тип { getQuestRouteType(quest?.for_one!, quest?.for_group!) }</Text>
										<Text>Количество точек { quest?.count_point || '' }</Text>
										<Text>Режим работы { 'Онлайн' }</Text>
										<Text>Порядок точек { quest?.option_random_point ? 'Случайный' : 'Упорядоченный' }</Text>
									</>
								}
							</View>

						</View>

					</ScrollView>
				</View>
			</>
		)
	}

	return (
		<>
			<View>
				<Text>Ошибка</Text>
			</View>
		</>
	)
}

export default RouteDetailsScreen
