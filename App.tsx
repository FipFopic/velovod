import React, { FC, useEffect } from 'react'
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

const App: FC = () => {
	const store = setupStore()

	//hide splash screen after load
	useEffect(() => {
		SplashScreen.hide()
	})

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
