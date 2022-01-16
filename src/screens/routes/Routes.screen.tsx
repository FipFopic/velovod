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
import { IRoute, RouteType } from '../../core/interfaces/IRoute'
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

const RoutesScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [activeTab, setActiveTab] = useState<RouteTab>(tabs[0])
	const [routeList, setRouteList] = useState<IRoute[]>([])
	const [routePage, setRoutePage] = useState(1)
	const [isEndRoute, setEndRoute] = useState(false)
	const [questList, setQuestList] = useState<IRoute[]>([])
	const [questPage, setQuestPage] = useState(1)
	const [isEndQuest, setEndQuest] = useState(false)

	const {
		data: routesChunk,
		isLoading: isLoadingRoutes,
		error: errorRoutes
	} = routeAPI.useFetchRoutesQuery({ page: routePage }, { skip: isEndRoute })

	const {
		data: questsChunk,
		isLoading: isLoadingQuests,
		error: errorQuests
	} = routeAPI.useFetchQuestsQuery({ page: questPage }, { skip: isEndQuest })

	useEffect(() => {
		if (routesChunk?.length) {
			setRouteList([...routeList, ...routesChunk])
		} else if (routesChunk?.length === 0) {
			setEndRoute(true)
		}
	}, [routesChunk])

	useEffect(() => {
		if (questsChunk?.length) {
			setQuestList([...questList, ...questsChunk])
		} else if (questsChunk?.length === 0) {
			setEndQuest(true)
		}
	}, [questsChunk])

	const onPressRouteCard = (route: IRoute, type: RouteType) => {
		NavigationService.push('RouteDetails', {
			id: route.id,
			type
		})
	}

	const scrollHandler = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (!isEndOfScroll(nativeEvent)) {
			return
		}

		if (activeTab.type === 'route') {
			setRoutePage(routePage + 1)
		} else if (activeTab.type === 'quest') {
			setQuestPage(questPage + 1)
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
								{
									errorRoutes &&
									<View>
										<Text>{errorRoutes.toString()}</Text>
									</View>
								}
								{
									isLoadingRoutes &&
									<View>
										<Spinner />
									</View>
								}
							</ScrollView>

							<ScrollView
								contentContainerStyle={styles.roadRoutesBox}
								showsVerticalScrollIndicator={false}
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
				</View>
			</View>
		</>
	)
}

export default RoutesScreen
