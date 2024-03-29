import { NativeScrollEvent } from 'react-native'
import { RoutesListType, RouteType } from '../../core/interfaces/IRoute'

export interface RouteTab {
	id: number
	title: string
	type: RouteType
}

export interface RoutesListTypeTab {
	id: number
	title: string
	type: RoutesListType
}

export const isEndOfScroll = (nativeEvent: NativeScrollEvent): boolean => {
	const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
	const paddingToBottom = 200

	return layoutMeasurement.height + contentOffset.y >=
		contentSize.height - paddingToBottom
}
