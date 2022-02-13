import React, { FC } from 'react'
import { View } from 'react-native'
import { IPoint } from '../../core/interfaces/IRoute'
import Point from '../Point/Point'

interface PointsListProps {
	points: IPoint[]
}

const PointsList: FC<PointsListProps> = ({ points }) => {

	// console.log(' ')
	// console.log(' ')
	// console.log(' ')
	// console.log(' ')
	// console.log('_____pointInfo', points[0].point.media)
	// console.log(' ')
	// console.log(' ')
	// console.log(' ')
	// console.log(' ')

	return (
		<View>
			{
				points &&
				points.map(pointInfo =>
					<Point
						key={pointInfo.point.id}
						title={pointInfo.point.title}
						photo={'https://i.pinimg.com/564x/ff/2e/3b/ff2e3b2eb929a60c83868dbb7f7c33a0.jpg'}
						style={{ opacity: 1 }}
					/>
				)
			}
		</View>
	)
}

export default PointsList
