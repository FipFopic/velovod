import React, { useEffect } from 'react'
import VKLogin from 'react-native-vkontakte-login'
// import { Settings } from 'react-native-fbsdk-next'
import { KEYS } from '../../config'

const ApplicationSetup = () => {
	useEffect(() => {
		VKLogin.initialize(KEYS.AUTH.VK.appId)
		// Settings.initializeSDK()
		// Settings. setAppID(KEYS.AUTH.FACEBOOK.appId)
	}, [])

	return (
		<>
		</>
	)
}

export default ApplicationSetup
