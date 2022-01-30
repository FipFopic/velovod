import BottomSheet from '@gorhom/bottom-sheet'
import { Button, Icon, useStyleSheet } from '@ui-kitten/components'
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { Alert, BackHandler, ScrollView, Text, View } from 'react-native'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import themedStyles from './Map.style'
import { StopWatch } from '../../core/utils/StopWatch.helper'

const MapScreen = ({ navigation }: any) => {
	const styles = useStyleSheet(themedStyles)

	const [isAddingRoute, setIsAddingRoute] = useState(false)

	const sheetPositions = ['14%', '50%', '90%']
	const [snapPos, setSnapPos] = useState<number>(1)

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => sheetPositions, [])

	const stopWatch = new StopWatch()
	const [stopWatchData, setStopWatchData] = useState<string>('')

	const onPressBack = () => {
		Alert.alert(
			'Завершить добавление маршрута?',
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

	//stopwatch
	useEffect(() => {
		if (!isAddingRoute) {
			stopWatch.stop()
			return
		}

		stopWatch.start()

		const stopWatchInterval = setInterval(() => {
			setStopWatchData(stopWatch.actualValue)
			console.log('testDate', stopWatch.actualValue)
		}, 1000)

		return () => clearInterval(stopWatchInterval)
	}, [isAddingRoute])

	useEffect(() => {
		navigation?.setOptions({
			headerShown: !isAddingRoute
		})

		navigation.getParent()?.setOptions({
			tabBarStyle: {
				display: isAddingRoute ? 'none' : 'flex'
			}
		})

		return () => navigation.getParent()?.setOptions({
			tabBarStyle: undefined
		})
	}, [navigation, isAddingRoute])

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBack)
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', onPressBack)
		}
	}, [])

	return (
		<>
			<View style={styles.mapContainer}>

				<MapView
					style={styles.map}
					provider={PROVIDER_GOOGLE}
					loadingEnabled={true}
					showsCompass={true}
					showsUserLocation={true}
					showsMyLocationButton={true}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				/>

				{!isAddingRoute &&
				<Button style={styles.createRouteButton} onPress={() => setIsAddingRoute(true)}>Создать маршрут</Button>
				}

				{ isAddingRoute &&
				<BottomSheet
					ref={bottomSheetRef}
					index={snapPos}
					snapPoints={snapPoints}
				>
					<View style={styles.bottomSheet}>
						<View style={styles.statusBar}>
							<View style={styles.timer}>
								<Text style={styles.statusBarItemTitle}>В ПУТИ</Text>
								<Text style={styles.statusBarItemContent}>{stopWatchData}</Text>
							</View>
							<View style={styles.distance}>
								<Text style={styles.statusBarItemTitle}>ПРОЙДЕНО</Text>
								<Text style={styles.statusBarItemContent}>1 км</Text>
							</View>
							<View style={styles.pointQuant}>
								<Text style={styles.statusBarItemTitle}>ТОЧКИ ПУТИ</Text>
								<Text style={styles.statusBarItemContent}>2</Text>
							</View>
						</View>

						{/*<ScrollView style={styles.pointListBox}>*/}
						{/*	/!*{ pointList &&*!/*/}
						{/*	/!*<PointsPassingList points={pointList} soundList={soundList}/>*!/*/}
						{/*	/!*}*!/*/}
						{/*	<View style={styles.pointBox}>*/}
						{/*		/!*<Point title={'title'} photo={getImageSrc(1, 100)} style={{opacity: 1}}/>*!/*/}
						{/*		<View style={styles.pointControl}>*/}
						{/*			<Icon*/}
						{/*				style={{ width: 20, height: 20 }}*/}
						{/*				fill='#000'*/}
						{/*				name='edit-outline'/>*/}
						{/*			<Icon*/}
						{/*				style={{ width: 20, height: 20 }}*/}
						{/*				fill='#000'*/}
						{/*				name='close-outline'/>*/}
						{/*		</View>*/}
						{/*	</View>*/}
						{/*</ScrollView>*/}
						<View style={styles.sheetButtonGroup}>
							<Button
								style={styles.addPointButton}
							>
								Добавить точку
							</Button>
							<Button
								style={styles.addPointButton}
								size='small'
								onPress={() => setIsAddingRoute(false)}
							>
								Выйти
							</Button>
						</View>
					</View>
				</BottomSheet>
				}

			</View>
		</>
	)
}

export default MapScreen
