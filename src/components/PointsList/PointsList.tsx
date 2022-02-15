import React, { FC } from 'react'
import { View } from 'react-native'
import { getMediaSrc } from '../../../src/core/utils/Main.helper'
import { IPoint } from '../../core/interfaces/IRoute'
import Point from '../Point/Point'

interface PointsListProps {
	points: IPoint[]
}

const PointsList: FC<PointsListProps> = ({ points }) => {
	return (
		<View>
			{
				points &&
				points.map(pointInfo =>
					<Point
						key={pointInfo.point.id}
						title={pointInfo.point.title}
						photo={getMediaSrc(pointInfo?.point?.media, 'image', 100)}
						style={{ opacity: 1 }}
					/>
				)
			}
		</View>
	)
}

export default PointsList
