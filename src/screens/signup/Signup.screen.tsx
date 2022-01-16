import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Icon, Input, Button, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux'
import { doRegister } from '../../store/auth/ActionCreators'
import {authActions} from '../../store/auth/AuthSlice'
import { EMAIL_PATTERN } from '../../config'
import themedStyles from './Signup.style'

const FacebookIcon = (props: any) =>
	<Icon name='facebook' {...props} />

const VKIcon = (props: any) =>
	<Icon name='people' {...props} />

const SignupScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector(state => state.auth)

	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		return () => {
			dispatch(authActions.resetStore())
		}
	}, [])

	const _isFormValid = () => {
		return email.trim() && EMAIL_PATTERN.test(email) && password.trim()
	}

	const onPressRegister = () => {
		dispatch(doRegister({name: userName, email, password}))
	}

	const onPressNavigateLogin = () => {
		dispatch(authActions.resetStore())

		return NavigationService.navigate('Login')
	}

	return (
		<>
			<View style={styles.backgroundBox}>
				<View style={styles.signupBox}>
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
						<Button
							style={styles.signupButton}
							size="small"
							onPress={onPressNavigateLogin}
						>Вход</Button>
					</View>
				</View>

				<View style={styles.socialBox}>
					<Button
						style={styles.socialButton}
						accessoryLeft={VKIcon}
					>Войти через ВКонтакте</Button>

					<Button
						style={styles.socialButton}
						accessoryLeft={FacebookIcon}
					>Войти через Facebook</Button>
				</View>
			</View>
		</>
	)
}

export default SignupScreen
