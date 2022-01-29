import React, { FC, useEffect, useMemo, useRef } from 'react'
import { ScrollView, View } from 'react-native'
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
		console.log('CLICK BACKCKCK')
		navigation.goBack()
	}

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => <Button onPress={onPressBack}>Test back</Button>
		})
	}, [navigation])

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
