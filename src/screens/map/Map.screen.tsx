import { useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import themedStyles from './Map.style'

const MapScreen = () => {
	const styles = useStyleSheet(themedStyles)

	return (
		<>
			<View style={styles.mapContainer}>

				<MapView
					style={styles.map}
					provider={PROVIDER_DEFAULT}
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
			</View>
		</>
	)
}

export default MapScreen
