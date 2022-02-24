import React from 'react'
import { View } from 'react-native'
import { Icon, useStyleSheet } from '@ui-kitten/components'
import themedStyles from './MyLocationButton.style'

const MyLocationButton = () => {
	const styles = useStyleSheet(themedStyles)

	return (
		<View style={styles.buttonBox}>
			<Icon
				style={styles.icon}
				name={'radio-button-on'}
				fill={'#34495e'}
			/>
		</View>
	)
}

export default MyLocationButton
