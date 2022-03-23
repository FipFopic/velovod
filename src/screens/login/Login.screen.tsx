import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Button, Icon, Input, Text, useStyleSheet } from '@ui-kitten/components'
import VKLogin from 'react-native-vkontakte-login'
import { removeFromStorage, removeUserFromStorage } from '../../core/utils/Storage.service'
import NavigationService from '../../core/utils/Navigation.service'
import { userAPI } from '../../services/user/UserService'
import { EMAIL_PATTERN } from '../../config'
import themedStyles from './Login.style'

const FacebookIcon = (props: any) =>
	<Icon name='facebook' {...props} />

const VkontakteIcon = (props: any) =>
	<Icon name='people' {...props} />

const LoginScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [doLogin, { data, isLoading }] = userAPI.useDoLoginMutation()
	// const [doAuthVK, { data: dataAuthVk, isLoading: isLoadingAuthVK }] = userAPI.useDoAuthWithVKMutation()
	const [doAuthVK, { data: dataAuthVk, isLoading: isLoadingAuthVK }] = userAPI.useDoAuthWithVKMutation()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		removeFromStorage('accessToken')
		removeFromStorage('refreshToken')
		removeUserFromStorage()
	}, [])

	useEffect(() => {
		if (data?.error) {
			setError(data.error)
			return
		}

		if (data?.id) {
			return NavigationService.navigate('Profile', { afterLogin: true })
		}

		setError('')
	}, [data])

	useEffect(() => {
		if (dataAuthVk?.error) {
			setError(dataAuthVk.error)
			return
		}

		if (dataAuthVk) return NavigationService.navigate('Profile', { afterLogin: true })

		setError('')
	}, [dataAuthVk])

	useEffect(() => {
		console.log('\n\n\n\n\n\nisLoadingAuthVK\n\n\n\n', isLoadingAuthVK)
		console.log('dataAuthVk', dataAuthVk)
	}, [isLoadingAuthVK])

	const _isFormValid = () => {
		return email.trim().toLowerCase() && EMAIL_PATTERN.test(email) && password.trim()
	}

	const onPressLogin = () => {
		doLogin({ email, password })
	}

	const getVKToken = async (): Promise<string> => {
		const auth = await VKLogin.login(['email'])
		// console.log('\n\n\n\n\n\n\n\n\nn\n\n\n\n\n\n =================auth====================: ', auth)
		return auth.access_token || ''
		// VKLogin.login(['email']).then((res) => {
		// 	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n =================RESS====================: ', res)
		// })
		// return ''
	}

	const onPressVKAuth = async () => {
		const accessToken = await getVKToken()
		// console.log('\n\n\n\n\n\n\n\n\nn\n\n\n\n\n\n =================accessToken====================: ', accessToken)
		console.log('\n\n\n\n\n\n', doAuthVK({ accessToken }))
	}

	const onPressNavigateRegister = () => {
		return NavigationService.navigate('Signup')
	}

	return (
		<>
			<View style={styles.backgroundBox}>
				<KeyboardAvoidingView
					behavior={'padding'}
					enabled={true}
					style={styles.loginBox}>
					<View style={styles.titleBox}>
						<Text style={styles.title}>
							Вход
						</Text>
					</View>
					{
						!!error &&
						<Text>{ error }</Text>
					}
					<View style={styles.inputGroup}>
						<Input
							style={styles.loginInput}
							// status="control"
							placeholder ="Email"
							keyboardType="email-address"
							value={email}
							onChangeText={(value: string) => setEmail(value)}
						/>
						<Input
							style={styles.loginInput}
							// status="control"
							placeholder="Пароль"
							secureTextEntry
							value={password}
							onChangeText={(value: string) => setPassword(value)}
						/>
					</View>

					<View style={styles.buttonGroup}>
						<Button
							style={styles.loginButton}
							appearance="outline"
							// status="control"
							size="medium"
							disabled={!_isFormValid() || isLoading}
							onPress={onPressLogin}
						>{ isLoading ? 'Загрузка...' : 'Войти' }</Button>
						{/*<Button*/}
						{/*	style={styles.loginButton}*/}
						{/*	size="small"*/}
						{/*	onPress={onPressNavigateRegister}*/}
						{/*>Регистрация</Button>*/}
					</View>
				</KeyboardAvoidingView>

				<View style={styles.socialBox}>
					<Button
						style={styles.socialButton}
						onPress={() => NavigationService.push('Signup')}
					>Регистрация</Button>
					<Button
						style={styles.socialButton}
						accessoryLeft={VkontakteIcon}
						onPress={onPressVKAuth}
					>Войти через ВКонтакте</Button>

					{/*<Button*/}
					{/*	style={styles.socialButton}*/}
					{/*	accessoryLeft={FacebookIcon}*/}
					{/*	// onPress={doLoginWithFB}*/}
					{/*>Войти через Facebook</Button>*/}
				</View>
			</View>
		</>
	)
}

export default LoginScreen
