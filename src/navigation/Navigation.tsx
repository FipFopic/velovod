import React from 'react'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, useStyleSheet } from '@ui-kitten/components'
import { navigationRef } from '../core/utils/Navigation.service'
import RoutePassingScreen from '../screens/routePassing/RoutePassing.screen'
import themedStyles from './Navigation.style'
import RoutesScreen from '../screens/routes/Routes.screen'
import RouteDetailsScreen from '../screens/routeDetails/RouteDetails.screen'
import MapScreen from '../screens/map/Map.screen'
import ProfileScreen from '../screens/profile/Profile.screen'
import LoginScreen from '../screens/login/Login.screen'
import SignupScreen from '../screens/signup/Signup.screen'
import UpdateProfileScreen from '../screens/updateProfile/UpdateProfile.screen'
import { Platform, SafeAreaView } from 'react-native'

const getTabBarIcon =
	(name: string, { isFocused }: { isFocused: boolean }) => (
		<Icon name={name} fill={isFocused ? '#BC241C' : '#2c3e50'} style={{ width: 32, height: 32 }} />
	)
const getLabelStyle = (styles:any, focused: boolean) => focused ? styles.tabBarLabelStyle : styles.tabBarLabelStyleActive

export type TabNavigationParams = {
	RoutesStack: NavigatorScreenParams<RoutesStackParams>
	MapStack: NavigatorScreenParams<MapStackParams>,
	ProfileStack: NavigatorScreenParams<ProfileStackParams>
}

const TabNavigation = createBottomTabNavigator<TabNavigationParams>()

export type RoutesStackParams = {
	Routes: undefined,
	RouteDetails: undefined,
	RoutePassing: undefined
}

const RoutesStack = createNativeStackNavigator<RoutesStackParams>()

const RoutesScreenStack = () => {
	return (
		<RoutesStack.Navigator initialRouteName='Routes'>
			<RoutesStack.Screen
				name='Routes'
				component={RoutesScreen}
				options={{
					headerShown: false,
					title: 'Маршруты'
				}}
			/>
			<RoutesStack.Screen
				name='RouteDetails'
				component={RouteDetailsScreen}
				options={{
					headerStyle: {
						// backgroundColor: '#ecf0f1'
					},
					title: 'О маршруте'
				}}
			/>
			<RoutesStack.Screen
				name='RoutePassing'
				component={RoutePassingScreen}
				options={{
					title: 'Прохождение маршрута'
				}}
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
				options={{
					headerStyle: {
						// backgroundColor: '#ecf0f1'
					},
					title: 'Создание маршрута'
				}}
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
				options={{
					headerShown: false,
					title: 'Профиль'
				}}
			/>
			<ProfileStack.Screen
				name='UpdateProfile'
				component={UpdateProfileScreen}
				options={{
					title: 'Редактировать'
				}}
			/>
			<ProfileStack.Screen
				name='Login'
				component={LoginScreen}
				options={{
					title: 'Авторизация'
				}}
			/>
			<ProfileStack.Screen
				name='Signup'
				component={SignupScreen}
				options={{
					title: 'Регистрация'
				}}
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
					headerShown: false,
					tabBarHideOnKeyboard: true
				})}
				sceneContainerStyle={
					Platform.OS === 'ios' ? { paddingTop: 50, backgroundColor: 'color-basic-100' } : { backgroundColor: 'color-basic-100' }
				}
			>
				<TabNavigation.Screen
					name='RoutesStack'
					component={RoutesScreenStack}
					options={{
						tabBarLabel: 'Маршруты',
						tabBarLabelStyle: styles.tabBarLabelStyle,
						tabBarInactiveTintColor: '#000',
						tabBarActiveTintColor: '#BC241C',
						tabBarIcon: ({ focused }) =>
							getTabBarIcon('map-outline', { isFocused: focused })
					}}
				/>

				<TabNavigation.Screen
					name='MapStack'
					component={MapScreenStack}
					options={{
						tabBarLabel: 'Карта',
						tabBarLabelStyle: styles.tabBarLabelStyle,
						tabBarInactiveTintColor: '#000',
						tabBarActiveTintColor: '#BC241C',
						tabBarIcon: ({ focused }) =>
							getTabBarIcon('navigation-2-outline', { isFocused: focused })
					}}
				/>

				<TabNavigation.Screen
					name='ProfileStack'
					component={ProfileScreenStack}
					options={{
						tabBarLabel: 'Профиль',
						tabBarLabelStyle: styles.tabBarLabelStyle,
						tabBarInactiveTintColor: '#000',
						tabBarActiveTintColor: '#BC241C',
						tabBarIcon: ({ focused }) =>
							getTabBarIcon('person-outline', { isFocused: focused })
					}}
				/>
			</TabNavigation.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
