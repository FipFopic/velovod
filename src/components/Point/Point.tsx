import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { useStyleSheet } from '@ui-kitten/components'
import FastImage from 'react-native-fast-image'
import { getImageSrc } from '../../core/utils/Main.helper'
import themedStyles from './Point.style'

interface OwnerInfoProps {
  title: string
  photo: string
  style: {
    opacity: number
  }
}

const OwnerInfo: FC<OwnerInfoProps> = ({ title, photo, style, children }) => {
	const styles = useStyleSheet(themedStyles)

	return (
		<View style={{ ...style, ...styles.pointBox }}>
			<FastImage
				// @ts-ignore
				style={styles.pointPhoto}
				source={{
					uri: photo,
					cache: FastImage.cacheControl.immutable
				}}
			/>
			<View style={styles.title}>
				<Text>
					{ title }
				</Text>
			</View>

			{
				children &&
				<View style={styles.childrenBox}>
					{ children }
				</View>
			}

		</View>
	)
}

export default OwnerInfo
