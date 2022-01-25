import BottomSheet from '@gorhom/bottom-sheet'
import { Button, Icon, useStyleSheet } from '@ui-kitten/components'
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import themedStyles from './Map.style'
import { StopWatch } from '../../core/utils/StopWatch.helper'

const MapScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [isAddingRoute, setIsAddingRoute] = useState(false)

	const sheetPositions = ['15%', '50%', '80%']
	const [snapPos, setSnapPos] = useState<number>(1)

	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => sheetPositions, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const stopWatch = new StopWatch()
	const [stopWatchData, setStopWatchData] = useState(stopWatch.actualValue)

	//stopwatch
	useEffect(() => {
		stopWatch.initNewDate()

		if (!isAddingRoute) {
			setStopWatchData(stopWatch.actualValue)
			return
		}

		const stopWatchInterval = setInterval(() => {
			setStopWatchData(stopWatch.actualValue)
			console.log('testDate', stopWatch.actualValue)
		}, 1000)

		return () => clearInterval(stopWatchInterval)
	}, [isAddingRoute])

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
					onChange={handleSheetChanges}
				>
					<View style={styles.bottomSheet}>
						<View style={styles.statusBar}>
							<View style={styles.timer}>
								<Text style={styles.statusBarItemTitle}>В ПУТИ</Text>
								<Text style={styles.statusBarItemContent}>{stopWatchData.hours}:{stopWatchData.minutes}:{stopWatchData.seconds}</Text>
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
