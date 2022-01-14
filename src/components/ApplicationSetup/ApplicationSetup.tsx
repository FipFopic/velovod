import React, { useEffect } from 'react'
import VKLogin from 'react-native-vkontakte-login'
// import { Settings } from 'react-native-fbsdk-next'
import { getFromStorage } from '../../core/utils/Storage.service'
import { useAppDispatch } from '../../core/hooks/redux'
import { authActions } from '../../store/auth/AuthSlice'
import { KEYS } from '../../config'

const ApplicationSetup = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		getFromStorage('accessToken').then((accessToken => {
			if (accessToken)
				dispatch(authActions.setIsAuth(true))
			else
				dispatch(authActions.setIsAuth(false))

			VKLogin.initialize(KEYS.AUTH.VK.appId)
			// Settings.initializeSDK()
			// Settings. setAppID(KEYS.AUTH.FACEBOOK.appId)
		}))
	}, [])

	return (
		<>
		</>
	)
}

export default ApplicationSetup
