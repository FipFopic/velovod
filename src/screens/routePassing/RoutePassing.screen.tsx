import React, { FC, useMemo, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import BottomSheet from '@gorhom/bottom-sheet'
import PointsPassingList
	from '../../components/PointsPassingList/PointPassingList'
import { IPoint, RouteType } from '../../core/interfaces/IRoute'
import NavigationService from '../../core/utils/Navigation.service'
import themedStyles from './RoutePassing.style'
// import SimpleRoutePassing from './components/SimpleRoutePassing'

const RoutePassingScreen: FC = ({ route: navigation }: any) => {
	const styles = useStyleSheet(themedStyles)

	const id = navigation?.params?.id as number
	const type = navigation?.params?.type as RouteType
	const points = navigation?.params?.points as IPoint[]
	// const soundList = navigation?.state?.params?.soundList as Sound[]

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => ['15%', '50%', '80%'], [])

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
			<View>
				<View style={styles.mapContainer}>
					<BottomSheet
						ref={bottomSheetRef}
						index={1}
						snapPoints={snapPoints}
					>
						<ScrollView>
							{
								points &&
								points.map(point =>
									<Text key={point.id + point.point.title}>point</Text>
								)
								// <PointsPassingList
								// 	points={points}
								// 	// soundList={soundList}
								// />
							}
						</ScrollView>
					</BottomSheet>
				</View>
			</View>
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
