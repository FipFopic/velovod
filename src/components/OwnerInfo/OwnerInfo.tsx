import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { useStyleSheet } from '@ui-kitten/components'
import themedStyles from './OwnerInfo.style'

interface OwnerInfoProps {
	name: string
	photo: string
}

const OwnerInfo: FC<OwnerInfoProps> = ({ name, photo}) => {
	const styles = useStyleSheet(themedStyles)

	return (
		<View style={styles.ownerBox}>
			{/* @ts-ignore*/}
			<Image style={styles.ownerPhoto} source={{uri: photo}} />
			<Text style={styles.textName}>
				{ name }
			</Text>
		</View>
	)
}

export default OwnerInfo
