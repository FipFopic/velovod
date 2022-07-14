import { Alert, PermissionsAndroid } from 'react-native'
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

export const requestFineGeoPermission = async () => {
	const requestRes = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

	console.log('requestRes:', requestRes)

	const checkRes = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

	switch (checkRes) {
	case RESULTS.UNAVAILABLE:
		console.log('This feature is not available (on this device / in this context)')
		return false
	case RESULTS.DENIED:
		await requestFineGeoPermission()
		console.log('The permission has not been requested / is denied but requestable')
		break
	case RESULTS.LIMITED:
		console.log('The permission is limited: some actions are possible')
		return true
	case RESULTS.GRANTED:
		console.log('The permission is granted')
		return true
	case RESULTS.BLOCKED:
		showSettingsAlert(() => openSettings().catch(() => console.warn('cannot open settings')))
		console.log('The permission is denied and not requestable anymore')
		return false
	}
}

const showSettingsAlert = (agreeHandle: any) => {
	Alert.alert(
		'Доступ к геолокации.',
		'Приложению Веловод для работы необходимы права доступа к вашей геолокации.',
		[
			{
				text: 'Перейти в настройки',
				style: 'destructive',
				onPress: agreeHandle
			}
		]
	)
}
