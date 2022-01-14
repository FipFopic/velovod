import React from 'react'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, useStyleSheet } from '@ui-kitten/components'
import { navigationRef } from '../core/utils/Navigation.service'
import themedStyles from './Navigation.style'
import RoutesScreen from '../screens/routes/Routes.screen'
import RouteDetailsScreen from '../screens/routeDetails/RouteDetails.screen'
import MapScreen from '../screens/map/Map.screen'
import ProfileScreen from '../screens/profile/Profile.screen'
import LoginScreen from '../screens/login/Login.screen'
import SignupScreen from '../screens/signup/Signup.screen'
import UpdateProfileScreen from '../screens/updateProfile/UpdateProfile.screen';

const getTabBarIcon =
	(name: string, { isFocused }: { isFocused: boolean }) => (
		<Icon name={name} fill={'black'} style={{ width: 32, height: 32 }} />
	)

export type TabNavigationParams = {
	RoutesStack: NavigatorScreenParams<RoutesStackParams>
	MapStack: NavigatorScreenParams<MapStackParams>,
	ProfileStack: NavigatorScreenParams<ProfileStackParams>
}

const TabNavigation = createBottomTabNavigator<TabNavigationParams>()

export type RoutesStackParams = {
	Routes: undefined,
	RouteDetails: undefined
}

const RoutesStack = createNativeStackNavigator<RoutesStackParams>()

const RoutesScreenStack = () => {
	return (
		<RoutesStack.Navigator initialRouteName='Routes'>
			<RoutesStack.Screen
				name='Routes'
				component={RoutesScreen}
			/>
			<RoutesStack.Screen
				name='RouteDetails'
				component={RouteDetailsScreen}
			/>
		</RoutesStack.Navigator>
	)
}

export type MapStackParams = {
	Map: undefined
}

const MapStack = createNativeStackNavigator<MapStackParams>()

const MapScreenStack = () => {
	return (
		<MapStack.Navigator initialRouteName='Map'>
			<MapStack.Screen
				name='Map'
				component={MapScreen}
			/>
		</MapStack.Navigator>
	)
}

export type ProfileStackParams = {
	Profile: undefined,
	UpdateProfile: undefined,
	Login: undefined,
	Signup: undefined
}

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

const ProfileScreenStack = () => {
	return (
		<ProfileStack.Navigator initialRouteName='Profile'>
			<ProfileStack.Screen
				name='Profile'
				component={ProfileScreen}
			/>
			<ProfileStack.Screen
				name='UpdateProfile'
				component={UpdateProfileScreen}
			/>
			<ProfileStack.Screen
				name='Login'
				component={LoginScreen}
			/>
			<ProfileStack.Screen
				name='Signup'
				component={SignupScreen}
			/>
		</ProfileStack.Navigator>
	)
}

const Navigation = () => {
	const styles = useStyleSheet(themedStyles)

	return (
		<NavigationContainer ref={navigationRef}>
			<TabNavigation.Navigator
				initialRouteName='RoutesStack'
				screenOptions={({ route }) => ({
					headerShown: false
				})}
			>
				<TabNavigation.Screen
					name='RoutesStack'
					component={RoutesScreenStack}
					options={{
						tabBarLabel: 'Маршруты',
						tabBarIcon: ({ focused }) =>
							getTabBarIcon('map-outline',{ isFocused: focused })
					}}
				/>

				<TabNavigation.Screen
					name='MapStack'
					component={MapScreenStack}
					options={{
					tabBarLabel: 'Карта',
					tabBarIcon: ({ focused }) =>
						getTabBarIcon('navigation-2-outline',{ isFocused: focused })
					}}
				/>

				<TabNavigation.Screen
					name='ProfileStack'
					component={ProfileScreenStack}
					options={{
						tabBarLabel: 'Профиль',
						tabBarIcon: ({ focused }) =>
							getTabBarIcon('person-outline',{ isFocused: focused })
					}}
				/>
			</TabNavigation.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
