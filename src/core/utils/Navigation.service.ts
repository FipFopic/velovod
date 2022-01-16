import { createNavigationContainerRef, StackActions, CommonActions } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

const navigate = (routeName: string, params?: any) => {
	navigationRef.dispatch(
		CommonActions.navigate({
			name: routeName,
			params
		})
	)
}

const push = (...args: any) => {
	if (navigationRef.isReady()) {
		// @ts-ignore
		navigationRef.dispatch(StackActions.push(...args))
	}
}

const goBack = () => {
	navigationRef.goBack()
}

export default { navigate, push, goBack }
