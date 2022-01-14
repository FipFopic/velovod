import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { useStyleSheet } from '@ui-kitten/components'
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
			{/* @ts-ignore*/}
			<Image style={styles.pointPhoto} source={{uri: photo}} />
      <Text style={styles.title}>
				{ title }
			</Text>

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
