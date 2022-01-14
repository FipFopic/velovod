import React, {FC, useEffect} from 'react'
import { Provider } from 'react-redux'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { setupStore } from './src/core/redux/store'
import { getFromStorage } from './src/core/utils/Storage.service'
import { useAppDispatch } from './src/core/hooks/redux'
// import { setIsAuth } from './src/store/auth/AuthSlice'
import Navigation from './src/navigation/Navigation'
import { default as theme } from './src/theme/configuredTheme.json'
import ApplicationSetup from './src/components/ApplicationSetup/ApplicationSetup'


const App: FC = () => {
	const store = setupStore()

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
