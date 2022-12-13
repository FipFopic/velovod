import React, { useEffect, useState } from 'react'
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, useWindowDimensions, View} from 'react-native'
import {
	Button,
	Spinner,
	Tab,
	Text,
	useStyleSheet,
	ViewPager
} from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { IRoute, RoutesListType, RouteType } from '../../core/interfaces/IRoute'
import { routeAPI } from '../../services/route/RouteService'
import RouteCard from '../../components/RouteCard/RouteCard'
import { isEndOfScroll, RoutesListTypeTab, RouteTab } from './Routes.helper'
import themedStyles from './Routes.style'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {getImageSrc} from "../../core/utils/Main.helper"
import {
	getRouteFromStorage,
	getSavedRouteListStorage,
	removeAllRoutesFromStorage
} from '../../core/utils/Storage.service'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const tabs: RouteTab[] = [
	{
		id: 0,
		title: 'Маршруты',
		type: 'route'
	},
	// {
	// 	id: 1,
	// 	title: 'Квесты',
	// 	type: 'quest'
	// },
	{
		id: 1,
		title: 'Скачанные',
		type: 'savedRoutes'
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

	const layout = useWindowDimensions()

	const [mainTabIndex, setMainTabIndex] = React.useState(0)
	const [mainTabRoutes] = React.useState([
		{ key: 'first', title: 'Маршруты', type: 'route' },
		{ key: 'second', title: 'Скачанные', type: 'savedRoutes' }
	])

	const [routesTabIndex, setRoutesTabIndex] = React.useState(0)
	const [routesTabRoutes] = React.useState([
		{ key: 'first', title: 'Рядом', type: 'near' },
		{ key: 'second', title: 'Все', type: 'default' }
	])

	const [activeTab, setActiveTab] = useState<RouteTab>(tabs[0])
	// const [routesListTypeTab, setRoutesListTypeTab] = useState<RoutesListTypeTab>(routesListType[0])
	const [routesListTypeTab, setRoutesListTypeTab] = useState(routesTabRoutes[0])
	const [currentLocation, setCurrentLocation] = useState<any>({})
	const [routeList, setRouteList] = useState<IRoute[]>([])
	const [nearRouteList, setNearRouteList] = useState<IRoute[]>([])
	const [routePage, setRoutePage] = useState(1)
	const [nearRoutePage, setNearRoutePage] = useState(1)
	const [isEndRoute, setEndRoute] = useState(false)
	const [isEndNearRoute, setEndNearRoute] = useState(false)
	// const [questList, setQuestList] = useState<IRoute[]>([])
	// const [questPage, setQuestPage] = useState(1)
	// const [isEndQuest, setEndQuest] = useState(false)
	const [isLoadingRoutes, setLoadingRoutes] = useState(false)
	const [savedRoutes, setSavedRoutes] = useState([])
	// const [isLoadingQuests, setLoadingQuests] = useState(false)


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

	// const {
	// 	data: questsChunk,
	// 	isLoading: isLoadingQuests,
		// error: errorQuests
	// } = routeAPI.useFetchQuestsQuery({ page: questPage }, { skip: isEndQuest })

	useEffect(() => {
		getSavedRoutes()
	}, [])

	useEffect(() => {
		setRoutesListTypeTab(routesTabRoutes[routesTabIndex])
	}, [routesTabIndex])

	useEffect(() => {
		console.log('errorRoutes', errorRoutes)
	}, [errorRoutes])

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
		if (activeTab.type === tabs[1].type) _getSavedRoutes()
		console.log()
	}, [activeTab])

	// useEffect(() => {
	// 	if (questsChunk?.length) {
	// 		setQuestList([...questList, ...questsChunk])
	// 	} else if (questsChunk?.length === 0) {
	// 		setEndQuest(true)
	// 	}
	// 	setLoadingQuests(false)
	// }, [questsChunk])

	const onPressRouteCard = (route: IRoute, type: RouteType) => {
		NavigationService.push('RouteDetails', {
			id: route.id,
			type,
			isSaved: !!savedRoutes
		})
	}

	const scrollHandler = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		// if (isLoadingRoutes || isLoadingQuests || !isEndOfScroll(nativeEvent)) return
		if (isLoadingRoutes || !isEndOfScroll(nativeEvent)) return

		if (activeTab.type === 'route') {
			if (routesListTypeTab.type === 'default') {
				if (isEndRoute) return
				setRoutePage(routePage + 1)
			} else {
				if (isEndNearRoute) return
				setNearRoutePage(nearRoutePage + 1)
			}
			setLoadingRoutes(true)
		// } else if (activeTab.type === 'quest') {
		// 	if (isEndQuest) return
		// 	setQuestPage(questPage + 1)
		// 	setLoadingQuests(true)
		} else if (activeTab.type === tabs[1].type) {
			// if (isEndQuest) return
			// setQuestPage(questPage + 1)
			// setLoadingQuests(true)
		}
	}

	const _handleRemoveAllRoutes = () => {
		removeAllRoutesFromStorage()
		setSavedRoutes([])
	}

	const _handleTabBar = (idx) => {
		if (idx === 1) {
			_getSavedRoutes()
			console.log('_handleTabBar')
		}
			console.log('_handleTabBar idx === 1', idx, idx === 1)
		// if (activeTab.type === tabs[1].type) _getSavedRoutes()
		setActiveTab(tabs[idx])
		// _getSavedRoutes()
	}

	const getSavedRoutes = () => {
		const tempList = []
		console.log('savedRoutes', savedRoutes.map(elem => elem.routeId))
		getSavedRouteListStorage().then((res) => {
			console.log('res', res.map(elem => elem))
			res.map((savedRouteId) => {
				getRouteFromStorage(savedRouteId).then((elemRoute) => {
					console.log('elemRoute.routeId', elemRoute.routeId)
					tempList.push(elemRoute)
					// const temp = new Set([...savedRoutes, elemRoute])
					console.log('tempList', tempList.length)
				})
			})
		})
		setSavedRoutes(tempList)
	}

	const _getSavedRoutes = async () => {
		const tempList = []
		// console.log('savedRoutes', savedRoutes.map(elem => elem.routeId))
		const routeIdList = await getSavedRouteListStorage()
		routeIdList.forEach((savedRouteId: string) => getRouteFromStorage(savedRouteId).then(res => tempList.push(res)))
		setTimeout(()=>setSavedRoutes(tempList),500)
	}

	const nearRoutes = () => (
		nearRouteList &&
		nearRouteList.map((route, idx) =>
			<RouteCard
				key={`${route.id}-${idx}`}
				route={route}
				type='route'
				onPress={() => onPressRouteCard(route, 'route')}
			/>)
	)

	const regularRoutes = () => (
		routeList &&
		routeList.map((route, idx) =>
			<RouteCard
				key={`${route.id}-${idx}`}
				route={route}
				type='route'
				onPress={() => onPressRouteCard(route, 'route')}
			/>
		)
	)

	const renderRoutesScene = SceneMap({
		first: nearRoutes,
		second: regularRoutes
	})

	const Routes = () => (
		// <ScrollView
		// 	contentContainerStyle={styles.roadRoutesBox}
		// 	showsVerticalScrollIndicator={false}
		// 	scrollEventThrottle={1000}
		// 	onScroll={scrollHandler}
		// >
			<TabView
				navigationState={{ index: routesTabIndex, routes: routesTabRoutes }}
				onIndexChange={setRoutesTabIndex}
				renderScene={renderRoutesScene}
				renderTabBar={_renderTabBar}
				initialLayout={{ width: layout.width }}
			/>
			// {/*<TabBar*/}
			// {/*	selectedIndex={routesListTypeTab.id}*/}
			// {/*	onSelect={idx => setRoutesListTypeTab(routesListType[idx])}*/}
			// {/*	style={{*/}
			// {/*		width: '50%',*/}
			// {/*		// backgroundColor: '#ecf0f1',*/}
			// {/*		display: activeTab.id ? 'none' : 'flex'*/}
			// {/*	}}*/}
			// {/*	indicatorStyle={{*/}
			// {/*		display: 'none'*/}
			// {/*	}}*/}
			// {/*>*/}
			// {/*	{*/}
			// {/*		routesListType &&*/}
			// {/*		routesListType.map(tab =>*/}
			// {/*			<Tab key={tab.id} title={tab.title}/>*/}
			// {/*		)*/}
			// {/*	}*/}
			// {/*</TabBar>*/}
		// 	{
		// 		errorRoutes &&
		// 		<View>
		// 			<Text>{errorRoutes.error.toString()}</Text>
		// 			<Button style={{marginTop: 10}} onPress={() => setActiveTab(tabs[1])}>К сохраненным</Button>
		// 		</View>
		// 	}
		// 	{
		// 		isLoadingRoutes &&
		// 		<View style={styles.bottomSpinner}>
		// 			<Spinner />
		// 		</View>
		// 	}
		// </ScrollView>
	)

	const SavedRoutes = () => (
		<ScrollView
			contentContainerStyle={styles.roadRoutesBox}
			showsVerticalScrollIndicator={false}
			onScroll={scrollHandler}
		>
			<Button style={{marginTop: 10}} onPress={_handleRemoveAllRoutes}>Удалить все маршруты</Button>
			{
				savedRoutes &&
				savedRoutes.map((savedRoute, idx) => {
						console.log('idx', savedRoute.routeId)
						return <RouteCard
							key={`${savedRoute.routeId}-${idx}`}
							route={savedRoute.routeData}
							type='route'
							onPress={() => onPressRouteCard(savedRoute.routeData, 'route')}
							isSaved={true}
							imageSrc={savedRoute.imageSrc}
						/>
					}
				)
			}
			{/*{*/}
			{/*	questList &&*/}
			{/*	questList.map((quest, idx) =>*/}
			{/*		<RouteCard*/}
			{/*			key={`${quest.id}-${idx}`}*/}
			{/*			route={quest}*/}
			{/*			type='quest'*/}
			{/*			onPress={() => onPressRouteCard(quest, 'quest')}*/}
			{/*		/>*/}
			{/*	)*/}
			{/*}*/}
			{/*{*/}
			{/*	errorQuests &&*/}
			{/*	<View>*/}
			{/*		<Text>{errorQuests.toString()}</Text>*/}
			{/*	</View>*/}
			{/*}*/}
			{/*{*/}
			{/*	isLoadingQuests &&*/}
			{/*	<View>*/}
			{/*		<Spinner />*/}
			{/*	</View>*/}
			{/*}*/}
		</ScrollView>
	)

	const renderMainScene = SceneMap({
		first: Routes,
		second: SavedRoutes
	})

	const _renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: 'red' }}
			style={{ backgroundColor: 'green' }}
			renderLabel={({ route, focused }) => {
				const color = focused ? 'black' : 'grey'
				return (
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						{/*{route.key === 'rewards' ? <StarRound color={color} /> : <StarVip color={color} />}*/}
						{/*<Text style={[styles.tabLabelTitle, { color: color }]}>Title</Text>*/}
						<Text style={{ color: color }}>{route.title}</Text>
					</View>
				)
			}}
		/>
	)

	return (
		<>
			<View style={styles.pageBox}>
				<View style={styles.contentBox}>
					<TabView
						navigationState={{ index: mainTabIndex, routes: mainTabRoutes }}
						renderScene={renderMainScene}
						renderTabBar={_renderTabBar}
						onIndexChange={setMainTabIndex}
						initialLayout={{ width: layout.width }}
					/>
					{/*<View>*/}

					{/*	<TabBar*/}
					{/*		selectedIndex={activeTab.id}*/}
					{/*		onSelect={idx => _handleTabBar(idx)}*/}
					{/*	>*/}
					{/*		{*/}
					{/*			tabs &&*/}
					{/*			tabs.map(tab =>*/}
					{/*				<Tab key={tab.id} title={tab.title} />*/}
					{/*			)*/}
					{/*		}*/}
					{/*	</TabBar>*/}

					{/*	<ViewPager*/}
					{/*		selectedIndex={activeTab.id}*/}
					{/*		onSelect={ idx => setActiveTab(tabs[idx])}*/}
					{/*	>*/}
					{/*		*/}
					{/*	</ViewPager>*/}
					{/*</View>*/}
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
