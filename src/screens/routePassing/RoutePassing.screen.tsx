import React, { FC } from 'react'
import { View } from 'react-native'
import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import { IPoint, RouteType } from '../../core/interfaces/IRoute'
import NavigationService from '../../core/utils/Navigation.service'
import themedStyles from '../routes/Routes.style'
// import SimpleRoutePassing from './components/SimpleRoutePassing'

const RoutePassingScreen: FC = ({ route: navigation }: any) => {
	const styles = useStyleSheet(themedStyles)

	const id = navigation?.state?.params?.id as number
	const type = navigation?.state?.params?.type as RouteType
	const points = navigation?.state?.params?.points as IPoint[]
	// const soundList = navigation?.state?.params?.soundList as Sound[]

	if (!id || !type || points.length < 2) {
		return (
			<>
				<View>
					<Text>Произошла ошибка</Text>
					<Button
						onPress={ () => NavigationService.navigate('Routes') }
					>Вернуться на главну</Button>
				</View>
			</>
		)
	}
	if (type === 'route') {
		return (
			<Text>passing</Text>
			// <SimpleRoutePassing
			// 	points={points}
			// 	soundList={soundList}
			// />
		)
	}

	return (
		<>
			<View>
				<Text>Произошла ошибка</Text>
				<Button
					onPress={ () => NavigationService.navigate('Routes') }
				>Вернуться на главну</Button>
			</View>
		</>
	)
}

export default RoutePassingScreen
