import React, { useEffect, useState } from 'react'
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
import NavigationService from '../../core/utils/Navigation.service'
import { IPoint } from '../../core/interfaces/IRoute'
import { getImageSrc } from '../../core/utils/Main.helper'
import { useAppSelector } from '../../core/hooks/redux'
import { routeAPI } from '../../services/route/RouteService'
import PointsList from '../../components/PointsList/PointsList'
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo'
import { getQuestRouteType } from './RouteDetails.helper'
import themedStyles from './RouteDetails.style'

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

		useEffect(() => {
			if (route?.points) {
				setPoints(route.points)
			}
		}, [route])

		const onPressStartRoute = () => {
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
								<Image
									// @ts-ignore
									style={styles.roadImage}
									source={{ uri: getImageSrc(route?.cover?.id, 1080) }}
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
								// selectedIndex={tabIndex}
								// onSelect={setTabIndex}>
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
							// selectedIndex={tabIndex}
							// onSelect={setTabIndex}
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
								<Image
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
