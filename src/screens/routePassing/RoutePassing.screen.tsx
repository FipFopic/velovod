import React, { FC, useEffect, useMemo, useRef } from 'react'
import { ScrollView, View, Alert, BackHandler } from 'react-native'
import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import BottomSheet from '@gorhom/bottom-sheet'
import PointsPassingList
	from '../../components/PointsPassingList/PointPassingList'
import { IPoint, RouteType } from '../../core/interfaces/IRoute'
import NavigationService from '../../core/utils/Navigation.service'
import SimpleRoutePassing from './components/SimpleRoutePassing'
import themedStyles from './RoutePassing.style'
// import SimpleRoutePassing from './components/SimpleRoutePassing'

const RoutePassingScreen: FC = ({ route: routeNavigation, navigation }: any) => {
	const styles = useStyleSheet(themedStyles)

	const id = routeNavigation?.params?.id as number
	const type = routeNavigation?.params?.type as RouteType
	const points = routeNavigation?.params?.points as IPoint[]
	// const soundList = navigation?.state?.params?.soundList as Sound[]

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

	// function handleBackButtonClick() {
	// 	navigation.goBack();
	// 	return true;
	// }

	useEffect(() => {
		navigation.setOptions({
			headerShown: false
		})

		navigation.getParent()?.setOptions({
			tabBarStyle: { display: 'none' }
		})

		return () => navigation.getParent()?.setOptions({
			tabBarStyle: undefined
		})
	}, [navigation])

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBack)
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', onPressBack)
		}
	}, [])

	if (!id || !type || points.length < 2) {
		return (
			<>
				<View>
					<Text>Произошла ошибка</Text>
					<Button
						onPress={ () => NavigationService.navigate('Routes') }
					>Вернуться на главную</Button>
				</View>
			</>
		)
	}
	if (type === 'route') {
		return (
			<SimpleRoutePassing
				points={points}
				navigation={navigation}
			/>
		)
	}

	return (
		<>
			<View>
				<Text>Произошла ошибка</Text>
				<Button
					onPress={ () => NavigationService.navigate('Routes') }
				>Вернуться на главную</Button>
			</View>
		</>
	)
}

export default RoutePassingScreen
