import { NativeScrollEvent } from 'react-native'
import { RouteType } from '../../core/interfaces/IRoute'

export interface RouteTab {
	id: number
	title: string
	type: RouteType
}

export const isEndOfScroll = (nativeEvent: NativeScrollEvent): boolean => {
	console.log('isEndOfScroll')
	const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
	const paddingToBottom = 1000

	return layoutMeasurement.height + contentOffset.y >=
		contentSize.height - paddingToBottom
}
