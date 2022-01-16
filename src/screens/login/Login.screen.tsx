import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Icon, Input, Text, useStyleSheet } from '@ui-kitten/components'
import { removeFromStorage, removeUserFromStorage } from '../../core/utils/Storage.service'
import NavigationService from '../../core/utils/Navigation.service'
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux'
import { doAuthWithVK, doLogin } from '../../store/auth/ActionCreators'
import { authActions } from '../../store/auth/AuthSlice'
import { EMAIL_PATTERN } from '../../config'
import themedStyles from './Login.style'

const FacebookIcon = (props: any) =>
	<Icon name='facebook' {...props} />

const VkontakteIcon = (props: any) =>
	<Icon name='people' {...props} />

const LoginScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector(state => state.auth)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		removeFromStorage('accessToken')
		removeUserFromStorage()
	}, [])

	useEffect(() => {
		return () => {
			dispatch(authActions.resetStore())
		}
	}, [])

	const _isFormValid = () => {
		return email.trim().toLowerCase() && EMAIL_PATTERN.test(email) && password.trim()
	}

	const onPressLogin = () => {
		dispatch(doLogin({ email, password }))
	}

	const onPressVKAuth = () => {
		dispatch(doAuthWithVK())
	}

	const onPressNavigateRegister = () => {
		dispatch(authActions.resetStore())

		return NavigationService.navigate('Signup')
	}

	return (
		<>
			<View style={styles.backgroundBox}>
				<View style={styles.loginBox}>
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
							placeholder="Email"
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
						<Button
							style={styles.loginButton}
							size="small"
							onPress={onPressNavigateRegister}
						>Регистрация</Button>
					</View>
				</View>

				<View style={styles.socialBox}>
					<Button
						style={styles.socialButton}
						accessoryLeft={VkontakteIcon}
						onPress={onPressVKAuth}
					>Войти через ВКонтакте</Button>

					<Button
						style={styles.socialButton}
						accessoryLeft={FacebookIcon}
						// onPress={doLoginWithFB}
					>Войти через Facebook</Button>
				</View>
			</View>
		</>
	)
}

export default LoginScreen
