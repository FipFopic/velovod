import React, { useEffect } from 'react'
import VKLogin from 'react-native-vkontakte-login'
import { KEYS } from '../../config'

const ApplicationSetup = () => {
	useEffect(() => {
		VKLogin.initialize(KEYS.AUTH.VK.appId)
	}, [])

	return (
		<>
		</>
	)
}

export default ApplicationSetup
