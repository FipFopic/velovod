import React, { useCallback, useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import { Tab, TabBar, Text, useStyleSheet, ViewPager } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { IRoute, RouteType } from '../../core/interfaces/IRoute'
import { useAppSelector } from '../../core/hooks/redux'
import { routeAPI } from '../../services/route/RouteService'
import RouteCard from '../../components/RouteCard/RouteCard'
import { isEndOfScroll, RouteTab } from './Routes.helper'
import themedStyles from './Routes.style'

const tabs: RouteTab[] = [
	{
		id: 0,
		title: 'Маршруты',
		type: 'route'
	},
	{
		id: 1,
		title: 'Квесты',
		type: 'quest'
	}
]

const pagination: any = {
	routes: {
		page: 1,
		isEnd: false
	},
	quests: {
		page: 1,
		isEnd: false
	}
}

const RoutesScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [fetchRoutes, {
		data: routesChunk,
		isLoading: isLoadingRoutes,
		error: errorRoutes
	}] = routeAPI.useFetchRoutesMutation()

	const [fetchQuests, {
		data: questsChunk,
		isLoading: isLoadingQuests,
		error: errorQuests
	}] = routeAPI.useFetchQuestsMutation()

	const { isAuth } = useAppSelector(state => state.auth)
	const callback = useCallback(() => console.log('Движение мыши'), [])

	const scrollHandler = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		console.log('scrollHandler')
		if (!isEndOfScroll(nativeEvent)) {
			return
		}

		console.log('LOAD')
		if (activeTab.type === 'route') {
			loadRoutes()
		} else if (activeTab.type === 'quest') {
			loadQuests()
		}
	}
	const [activeTab, setActiveTab] = useState<RouteTab>(tabs[0])
	const [routeList, setRouteList] = useState<IRoute[]>([])
	const [questList, setQuestList] = useState<IRoute[]>([])

	useEffect(() => {
		loadRoutes()
		loadQuests()
	}, [])

	useEffect(() => {
		console.log('routesChunk ', routesChunk)
		if (routesChunk?.length) {
			setRouteList([...routeList, ...routesChunk])
		} else if (routesChunk?.length === 0) {
			pagination.routes.isEnd = true
		}
	}, [routesChunk])

	useEffect(() => {
		if (questsChunk?.length) {
			setQuestList([...questList, ...questsChunk])
		} else if (questsChunk?.length === 0) {
			pagination.quests.isEnd = true
		}
	}, [questsChunk])

	const loadRoutes = () => {
		if (!pagination.routes.isEnd) {
			console.log('loadRoutes page=', pagination.routes.page)
			fetchRoutes({ page: pagination.routes.page })
			pagination.routes.page++
		}
	}

	const loadQuests = () => {
		if (!pagination.quests.isEnd) {
			console.log('loadQuests')
			fetchQuests({ page: pagination.quests.page })
			pagination.quests.page++
		}
	}

	const onPressRouteCard = (route: IRoute, type: RouteType) => {
		NavigationService.push('RouteDetails', {
			id: route.id,
			type
		})
	}

	return (
		<>
			<View style={styles.pageBox}>
				<View style={styles.contentBox}>
					<View>

						<TabBar
							selectedIndex={activeTab.id}
							onSelect={ idx => setActiveTab(tabs[idx]) }
						>
							{
								tabs &&
								tabs.map(tab =>
									<Tab key={tab.id} title={tab.title} />
								)
							}
						</TabBar>

						<ViewPager
							selectedIndex={activeTab.id}
							onSelect={ idx => setActiveTab(tabs[idx]) }
						>

							{/* TODO add filter */}

							<ScrollView
								contentContainerStyle={styles.roadRoutesBox}
								showsVerticalScrollIndicator={false}
								scrollEventThrottle={1000}
								onScroll={scrollHandler}
							>
								{
									routeList &&
									routeList.map((route, idx) =>
										<RouteCard
											key={`${route.id}-${idx}`}
											route={route}
											type='route'
											onPress={() => onPressRouteCard(route, 'route')}
										/>
									)
								}
								{/*{*/}
								{/*	simpleList &&*/}
								{/*	simpleList.map((route, idx) =>*/}
								{/*		<RouteCard*/}
								{/*			key={route.id + '' + idx}*/}
								{/*			type={RoutesEnum.SIMPLE_ROUTE}*/}
								{/*			route={route}*/}
								{/*		/>*/}
								{/*	)*/}
								{/*}*/}
								{/*{*/}
								{/*	isPreloader && isPagLoading &&*/}
								{/*	<Spinner/>*/}
								{/*}*/}
							</ScrollView>

							<ScrollView
								contentContainerStyle={styles.roadRoutesBox}
								showsVerticalScrollIndicator={false}
							>
								{
									errorQuests &&
									<View>
										<Text>{errorQuests.toString()}</Text>
									</View>
								}
								{
									questList &&
									questList.map((quest, idx) =>
										<RouteCard
											key={`${quest.id}-${idx}`}
											route={quest}
											type='quest'
											onPress={() => onPressRouteCard(quest, 'quest')}
										/>
									)
								}
								{/*{*/}
								{/*	questList &&*/}
								{/*	questList.map((route, idx) =>*/}
								{/*		<RouteCard*/}
								{/*			key={route.id + '' + idx}*/}
								{/*			type={RoutesEnum.QUEST_ROUTE}*/}
								{/*			route={route}*/}
								{/*		/>*/}
								{/*	)*/}
								{/*}*/}
								{/*{*/}
								{/*	isPreloader && isPagLoading &&*/}
								{/*	<Spinner/>*/}
								{/*}*/}
							</ScrollView>
						</ViewPager>
					</View>
				</View>
			</View>
		</>
	)
}

export default RoutesScreen
