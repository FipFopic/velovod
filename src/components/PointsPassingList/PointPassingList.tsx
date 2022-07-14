import React, { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PointPass } from '../../screens/routePassing/RoutePassing.helper'
import { Icon, useStyleSheet } from '@ui-kitten/components'
import { getImageSrc, getAudioSrc, getMediaSrc } from '../../core/utils/Main.helper'
import Point from '../Point/Point'
import themedStyles from './PointPassingList.style'
import Sound from 'react-native-sound'

interface PointsPassingListProps {
  points: PointPass[]
  soundList: Sound[]
}

const PointsPassingList: FC<PointsPassingListProps> = ({ points, soundList }) => {
	const styles = useStyleSheet(themedStyles)

	const [isAudioPlaying, setAudioPlaying] = useState(false)
	const [actualAudioIndex, setActualAudioIndex] = useState(-1)

	const _playAudio = (index: number) => {
		if (isAudioPlaying && actualAudioIndex !== index) {
			soundList[actualAudioIndex].pause()
		}

		if (!soundList[index].isPlaying()) {
			soundList[index].play(() => {
				setAudioPlaying(false)
			})
			setAudioPlaying(true)
			setActualAudioIndex(index)
			return
		}

		soundList[index].pause()
		setAudioPlaying(false)
		setActualAudioIndex(-1)
	}

	return (
		<View style={{ paddingBottom: 50 }}>
			{
				points &&
        points.map(pointInfo =>
					<Point
						key={pointInfo.index}
						style={{ opacity: pointInfo.isPassed ? 1 : 0.5 }}
						title={ pointInfo.data.point.title }
						photo={ getMediaSrc(pointInfo.data.point.media, 'image', 100) }
					>
						{
							// !soundList || soundList[pointInfo.index] &&
							!!soundList[pointInfo.index] &&
							<Icon
								style={styles.playIcon}
								width={40}
								height={40}
								fill={'#ecf0f1'}
								name={
									actualAudioIndex === pointInfo.index
										? 'pause-circle-outline'
										: 'play-circle-outline'
								}
								// onPress={ () => pointInfo.isPassed && _playAudio(pointInfo.index) }
								onPress={ () => _playAudio(pointInfo.index) }
							/>
						}
					</Point>
        )
			}
		</View>
	)
}

export default PointsPassingList
