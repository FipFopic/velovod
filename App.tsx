import React, {FC, useEffect, useState} from 'react'
import { Provider } from 'react-redux'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { setupStore } from './src/core/redux/store'
import { getFromStorage } from './src/core/utils/Storage.service'
// import { setIsAuth } from './src/store/auth/AuthSlice'
import Navigation from './src/navigation/Navigation'
// eslint-disable-next-line import/no-named-default
import { default as theme } from './src/theme/configuredTheme.json'
import ApplicationSetup from './src/components/ApplicationSetup/ApplicationSetup'
import { KeyboardAvoidingView } from 'react-native'
import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import { requestFineGeoPermission } from './src/core/utils/permissions.helper'

const App: FC = () => {
	const store = setupStore()
	const [isPermissions, setPermissions] = useState(false)

	//hide splash screen after load and getPermissions
	useEffect(() => {
		SplashScreen.hide()
		requestFineGeoPermission().then((res) => setPermissions(res))
	})

	useEffect(() => {
		if (!isPermissions) requestFineGeoPermission().then((res) => setPermissions(res))
	}, [isPermissions])

	return (
		<>
			<Provider store={store}>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
					<SafeAreaProvider>
						<Navigation />
					</SafeAreaProvider>
				</ApplicationProvider>
				<ApplicationSetup />
			</Provider>
		</>
	)
}

export default App
