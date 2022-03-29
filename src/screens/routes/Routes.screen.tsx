import React, { useEffect, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import {
	Spinner,
	Tab,
	TabBar,
	Text,
	useStyleSheet,
	ViewPager
} from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import {IRoute, RoutesListType, RouteType} from '../../core/interfaces/IRoute'
import { routeAPI } from '../../services/route/RouteService'
import RouteCard from '../../components/RouteCard/RouteCard'
import { isEndOfScroll, RoutesListTypeTab, RouteTab } from './Routes.helper'
import themedStyles from './Routes.style'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

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

const routesListType: RoutesListTypeTab[] = [
	{
		id: 0,
		title: 'Рядом',
		type: 'near'
	},
	{
		id: 1,
		title: 'Все',
		type: 'default'
	}
]

const RoutesScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [activeTab, setActiveTab] = useState<RouteTab>(tabs[0])
	const [routesListTypeTab, setRoutesListTypeTab] = useState<RoutesListTypeTab>(routesListType[0])
	const [currentLocation, setCurrentLocation] = useState<any>({})
	const [routeList, setRouteList] = useState<IRoute[]>([])
	const [nearRouteList, setNearRouteList] = useState<IRoute[]>([])
	const [routePage, setRoutePage] = useState(1)
	const [nearRoutePage, setNearRoutePage] = useState(1)
	const [isEndRoute, setEndRoute] = useState(false)
	const [isEndNearRoute, setEndNearRoute] = useState(false)
	const [questList, setQuestList] = useState<IRoute[]>([])
	const [questPage, setQuestPage] = useState(1)
	const [isEndQuest, setEndQuest] = useState(false)
	const [isLoadingRoutes, setLoadingRoutes] = useState(false)
	const [isLoadingQuests, setLoadingQuests] = useState(false)

	const {
		data: routesChunk,
		// isLoading: isLoadingRoutes,
		error: errorRoutes
	} = routeAPI.useFetchRoutesQuery({ page: routePage }, { skip: isEndRoute })

	const {
		data: routesNearChunk,
		// isLoading: isLoadingRoutes,
		error: errorNearRoutes
	} = routeAPI.useFetchRoutesQuery({ latitude: currentLocation.latitude, longitude: currentLocation.longitude, page: nearRoutePage }, { skip: isEndNearRoute })

	const {
		data: questsChunk,
		// isLoading: isLoadingQuests,
		error: errorQuests
	} = routeAPI.useFetchQuestsQuery({ page: questPage }, { skip: isEndQuest })

	useEffect(() => {
		if (routesListTypeTab.type === 'near') return

		if (routesChunk?.length) {
			setRouteList([...routeList, ...routesChunk])
		} else if (routesChunk?.length === 0) {
			setEndRoute(true)
		}
		setLoadingRoutes(false)
	}, [routesChunk])

	useEffect(() => {
		if (routesListTypeTab.type === 'default') return

		if (routesNearChunk?.length) {
			setNearRouteList([...nearRouteList, ...routesNearChunk])
		} else if (routesNearChunk?.length === 0) {
			setEndNearRoute(true)
		}
		setLoadingRoutes(false)
	}, [routesNearChunk])

	useEffect(() => {
		switch (routesListTypeTab.type) {
		case 'near':
			setNearRoutePage(nearRoutePage)
			// if (routesNearChunk) setNearRouteList(routesNearChunk)
			break
		case 'default':
			setRoutePage(1)
			setRouteList(routesChunk)
			break
		}
	}, [routesListTypeTab, routesNearChunk])

	useEffect(() => {
		if (questsChunk?.length) {
			setQuestList([...questList, ...questsChunk])
		} else if (questsChunk?.length === 0) {
			setEndQuest(true)
		}
		setLoadingQuests(false)
	}, [questsChunk])

	const onPressRouteCard = (route: IRoute, type: RouteType) => {
		NavigationService.push('RouteDetails', {
			id: route.id,
			type
		})
	}

	const scrollHandler = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (isLoadingRoutes || isLoadingQuests || !isEndOfScroll(nativeEvent)) return

		if (activeTab.type === 'route') {
			if (routesListTypeTab.type === 'default') {
				if (isEndRoute) return
				setRoutePage(routePage + 1)
			} else {
				if (isEndNearRoute) return
				setNearRoutePage(nearRoutePage + 1)
			}
			setLoadingRoutes(true)
		} else if (activeTab.type === 'quest') {
			if (isEndQuest) return
			setQuestPage(questPage + 1)
			setLoadingQuests(true)
		}
	}

	return (
		<>
			<View style={styles.pageBox}>
				<View style={styles.contentBox}>
					<View>

						<TabBar
							selectedIndex={activeTab.id}
							onSelect={ idx => setActiveTab(tabs[idx]) }
							style={{
								backgroundColor: '#ecf0f1'
							}}
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
							onSelect={ idx => setActiveTab(tabs[idx])}
						>

							<ScrollView
								contentContainerStyle={styles.roadRoutesBox}
								showsVerticalScrollIndicator={false}
								scrollEventThrottle={1000}
								onScroll={scrollHandler}
							>
								<TabBar
									selectedIndex={routesListTypeTab.id}
									onSelect={idx => setRoutesListTypeTab(routesListType[idx])}
									style={{
										width: '50%',
										backgroundColor: '#ecf0f1',
										display: activeTab.id ? 'none' : 'flex'
									}}
									indicatorStyle={{
										display: 'none'
									}}
								>
									{
										routesListType &&
										routesListType.map(tab =>
											<Tab key={tab.id} title={tab.title}/>
										)
									}
								</TabBar>
								{
									nearRouteList && routesListTypeTab.type === 'near' &&
									nearRouteList.map((route, idx) =>
										<RouteCard
											key={`${route.id}-${idx}`}
											route={route}
											type='route'
											onPress={() => onPressRouteCard(route, 'route')}
										/>
									)
								}
								{
									routeList && routesListTypeTab.type === 'default' &&
									routeList.map((route, idx) =>
										<RouteCard
											key={`${route.id}-${idx}`}
											route={route}
											type='route'
											onPress={() => onPressRouteCard(route, 'route')}
										/>
									)
								}
								{
									errorRoutes &&
									<View>
										<Text>{errorRoutes.toString()}</Text>
									</View>
								}
								{
									isLoadingRoutes &&
									<View style={styles.bottomSpinner}>
										<Spinner />
									</View>
								}
							</ScrollView>

							<ScrollView
								contentContainerStyle={styles.roadRoutesBox}
								showsVerticalScrollIndicator={false}
								onScroll={scrollHandler}
							>
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
								{
									errorQuests &&
									<View>
										<Text>{errorQuests.toString()}</Text>
									</View>
								}
								{
									isLoadingQuests &&
									<View>
										<Spinner />
									</View>
								}
							</ScrollView>


						</ViewPager>
					</View>
					<MapView
						provider={PROVIDER_GOOGLE}
						showsUserLocation={true}
						onUserLocationChange={(location) => setCurrentLocation(location.nativeEvent.coordinate)}
						style={{ display: 'none' }}
					/>
				</View>
			</View>
		</>
	)
}

export default RoutesScreen
