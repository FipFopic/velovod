import React, { FC } from 'react'
import { View } from 'react-native'
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'

const icons = [EvaIconsPack]

const App: FC = () => {
  return (
	  <>
			<ApplicationProvider {...eva} theme={{...eva.light}}>
				<IconRegistry icons={icons} />
					<SafeAreaProvider>
							<View>
									<Text>Main</Text>
							</View>
					</SafeAreaProvider>
			</ApplicationProvider>
		</>
  )
}

export default App
