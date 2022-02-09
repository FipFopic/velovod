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
import { getImageSrc } from '../../core/utils/Main.helper'
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
		const { data: route, isLoading, error } = routeAPI.useGetRouteQuery(id, { skip: !isAuth })

		const [points, setPoints] = useState<IPoint[]>([])
		const [tabIndex, setTabIndex] = useState(0)
		const [initialRegion, setInitialRegion] = useState({})

		const POINTS_COORDS = points.map((point) => {
			return {
				latitude: +point.point.latitude,
				longitude: +point.point.longitude
			}
		})

		console.log(typeof points[1], 'points[0]')

		// const initialRegion =

		useEffect(() => {
			if (route?.points) {
				setPoints(route.points)
				setInitialRegion({
					latitude: points[0] ? +(points[0].point.latitude) : 0.3,
					longitude: points[0] ? +(points[0]?.point.longitude) : 0.3,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				})
			}
		}, [route])

		const onPressStartRoute = () => {
			if (!isAuth) {
				return NavigationService.navigate('ProfileStack')
			}

			return NavigationService.navigate('RoutePassing', {
				id, type, points
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
									isLoading &&
									<View>
										<Spinner />
									</View>
								}
								{
									!isLoading && !error && points.length > 0 &&
									<Button
										onPress={onPressStartRoute}
									>Начать маршрут</Button>
								}

								<OwnerInfo
									name={route?.author?.name || ''}
									photo={'https://i.pinimg.com/564x/c5/ab/39/c5ab39e1036b8fde3cb1b87222c14d09.jpg'}
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
									{!isLoading && points.length &&
									<MapView
										style={{ height: 500, width: '100%' }}
										provider={PROVIDER_GOOGLE}
										region={initialRegion}
										zoomEnabled={true}
										showsUserLocation={true}
										showsMyLocationButton={true}
										// onUserLocationChange={onUserLocationChange}
										// ref={setMapEventService}
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
											photo={'https://i.pinimg.com/564x/c5/ab/39/c5ab39e1036b8fde3cb1b87222c14d09.jpg'}
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
