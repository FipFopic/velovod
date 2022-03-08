import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Text, Icon, Input, Button, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { EMAIL_PATTERN } from '../../config'
import {
	removeFromStorage,
	removeUserFromStorage,
} from '../../core/utils/Storage.service'
import { userAPI } from '../../services/user/UserService'
import themedStyles from './Signup.style'

const FacebookIcon = (props: any) =>
	<Icon name='facebook' {...props} />

const VKIcon = (props: any) =>
	<Icon name='people' {...props} />

const SignupScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const [doRegister, { data, isLoading }] = userAPI.useDoRegisterMutation()

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
		if (data?.error) {
			setError(data.error)
			return
		}

		if (data?.id) {
			return NavigationService.navigate('Profile', { afterLogin: true })
		}

		setError('')
	}, [data])

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
			<View style={styles.backgroundBox}>
				<KeyboardAvoidingView
					behavior={'padding'}
					enabled={true}
					style={styles.signupBox}>
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
							disabled={ !_isFormValid() || isLoading }
							onPress={onPressRegister}
						>{ isLoading ? 'Загрузка...' : 'Зарегистрироваться' }</Button>
						{/*<Button*/}
						{/*	style={styles.signupButton}*/}
						{/*	size="small"*/}
						{/*	onPress={onPressNavigateLogin}*/}
						{/*>Вход</Button>*/}
					</View>
				</KeyboardAvoidingView>

				<View style={styles.socialBox}>
					<Button
						style={styles.socialButton}
						onPress={() => NavigationService.push('Login')}
					>Регистрация</Button>
					<Button
						style={styles.socialButton}
						accessoryLeft={VKIcon}
					>Войти через ВКонтакте</Button>

					{/*<Button*/}
					{/*	style={styles.socialButton}*/}
					{/*	accessoryLeft={FacebookIcon}*/}
					{/*>Войти через Facebook</Button>*/}
				</View>
			</View>
		</>
	)
}

export default SignupScreen
