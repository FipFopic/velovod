import React, { FC } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { useStyleSheet, Icon } from '@ui-kitten/components'
import { IRoute, RouteType } from '../../core/interfaces/IRoute'
import { getImageSrc } from '../../core/utils/Main.helper'
import themedStyles from './RouteCard.style'

interface RouteCardProps {
	route: IRoute
	type: RouteType
	onPress: () => void
}

const getDuration = (duration: string) => {
	return parseInt(duration.split(':')[0], 10).toString()
		+ '.' +
		duration.substr(3, 1)
		+ 'ч'
}

const getDistance = (distance: string) => {
	return parseInt(distance, 10).toFixed(1)
		+ 'км'
}

const RouteCard: FC<RouteCardProps> = ({ route, type, onPress }) => {
	const styles = useStyleSheet(themedStyles)

	const {
		id,
		title,
		cover,
		count_point,
		distance,
		duration,
		resource
	} = route

	return (
		<TouchableOpacity
			style={styles.cardBox}
			onPress={onPress}
		>

			<View style={styles.cardImageBox}>
				{/*@ts-ignore*/}
				<Image style={styles.cardImage} source={{ uri: getImageSrc(cover?.id, 720) }} />
			</View>

			<View style={styles.detailsBox}>

				<Text style={styles.title}>{route.title}</Text>

				<View style={styles.specList}>

					<View style={styles.spec}>
						<Text style={styles.specText}>
							{ getDistance(distance) }
						</Text>
					</View>

					<View style={styles.spec}>
						<Text style={styles.specText}>
							{ getDuration(duration) }
						</Text>
					</View>

					<View style={styles.spec}>
						{/*
              // TODO add icon
            */}
						<Icon
							style={styles.specIcon}
							width={15}
							height={15}
							fill={'#ecf0f1'}
							name={'pin'}
						/>
						<Text style={styles.specText}>{count_point}</Text>
					</View>

				</View>

				<View style={styles.rate}>
					{/*@ts-ignore*/}
					<View width={ (resource?.rating / 5 * 100) + '%' } style={styles.starList}>
						{
							[...Array(5).keys()]
								.map((elem) =>
									<Icon
										key={elem}
										style={styles.star}
										fill={'#f1c40f'}
										name='star'
									/>
								)
						}
					</View>
				</View>

			</View>

		</TouchableOpacity>
	)
}

export default RouteCard
