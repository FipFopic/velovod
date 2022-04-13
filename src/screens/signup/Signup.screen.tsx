import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, ScrollView, View} from 'react-native'
import { Text, Icon, Input, Button, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { EMAIL_PATTERN } from '../../config'
import {
	removeFromStorage,
	removeUserFromStorage,
} from '../../core/utils/Storage.service'
import { userAPI } from '../../services/user/UserService'
import themedStyles from './Signup.style'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const FacebookIcon = (props: any) =>
	<Icon name='facebook' {...props} />

const VKIcon = (props: any) =>
	<Icon name='people' {...props} />

const SignupScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [doRegister, { data: registerData, isLoading: isLoadingRegister }] = userAPI.useDoRegisterMutation()
	const [doLogin, { data: loginData, isLoading: isLoadingLogin }] = userAPI.useDoLoginMutation()

	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		removeFromStorage('accessToken')
		removeFromStorage('refreshToken')
		removeUserFromStorage()
	}, [])

	useEffect(() => {
		if (registerData?.error) {
			setError(registerData.error)
			return
		}

		if (registerData?.access_token) {
			doLogin({ email, password })
		}

		setError('')
	}, [registerData])

	useEffect(() => {
		if (loginData?.id) {
			return NavigationService.navigate('Profile', { afterLogin: true })
		}
	}, [loginData])

	const _isFormValid = () => {
		return email.trim() && EMAIL_PATTERN.test(email) && password.trim() && userName.trim()
	}

	const onPressRegister = () => {
		doRegister({ name: userName, email, password })
	}

	const onPressNavigateLogin = () => {
		return NavigationService.navigate('Login')
	}

	return (
		<>
			<KeyboardAwareScrollView contentContainerStyle={styles.backgroundBox}>
				<View
					// behavior={'position'}
					// behavior={'padding'}
					// enabled={true}
					style={styles.signupBox}
					// keyboardVerticalOffset={10}
				>
					<View style={styles.titleBox}>
						<Text style={styles.title}>Регистрация</Text>
					</View>
					{
						!!error &&
						<Text>{ error }</Text>
					}
					<View style={styles.inputGroup}>
						<Input
							style={styles.signupInput}
							// status="control"
							placeholder="Имя"
							value={userName}
							onChangeText={(name: string) => setUserName(name)}
						/>
						<Input
							style={styles.signupInput}
							// status="control"
							placeholder="Email"
							keyboardType="email-address"
							value={email}
							onChangeText={(value: string) => setEmail(value)}
						/>
						<Input
							style={styles.signupInput}
							// status="control"
							placeholder="Пароль"
							secureTextEntry
							value={password}
							onChangeText={(value: string) => setPassword(value)}
						/>
					</View>
					<View style={styles.buttonGroup}>
						<Button
							style={styles.signupButton}
							appearance="outline"
							// status="control"
							size="medium"
							disabled={ !_isFormValid() || isLoadingRegister || isLoadingLogin }
							onPress={onPressRegister}
						>{ isLoadingRegister || isLoadingLogin ? 'Загрузка...' : 'Зарегистрироваться' }</Button>
						{/*<Button*/}
						{/*	style={styles.signupButton}*/}
						{/*	size="small"*/}
						{/*	onPress={onPressNavigateLogin}*/}
						{/*>Вход</Button>*/}
					</View>
				</View>

				<View style={styles.socialBox}>
					<Button
						style={styles.socialButton}
						onPress={() => NavigationService.push('Login')}
					>Регистрация</Button>
					{/*<Button*/}
					{/*	style={styles.socialButton}*/}
					{/*	accessoryLeft={VKIcon}*/}
					{/*>Войти через ВКонтакте</Button>*/}

					{/*<Button*/}
					{/*	style={styles.socialButton}*/}
					{/*	accessoryLeft={FacebookIcon}*/}
					{/*>Войти через Facebook</Button>*/}
				</View>
			</KeyboardAwareScrollView>
		</>
	)
}

export default SignupScreen
