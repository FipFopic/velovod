import React, { FC, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Button, Input, Text, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { userAPI } from '../../services/user/UserService'
import { EMAIL_PATTERN } from '../../config'
import themedStyles from './UpdateProfile.style'

const UpdateProfileScreen = ({ route: navigation }: any) => {
	const styles = useStyleSheet(themedStyles)

	const user = navigation.params?.user || null

	const [updateProfile, { data, isLoading, error }] = userAPI.useUpdateProfileMutation()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		if (user?.name) {
			setName(user.name)
		}
		if (user?.email) {
			setEmail(user.email)
		}
	}, [user])

	const _isFormValid = () => {
		return email.trim() && EMAIL_PATTERN.test(email) && name.trim()
	}

	const onPressUpdate = () => {
		updateProfile({ name, email, id: user.id })
		NavigationService.goBack()
	}

	if (!user) {
		return (
			<>
				<View>
					<Text>Ошибка!</Text>
				</View>
			</>
		)
	}

	return (
		<>
			<View style={styles.backgroundBox}>
				<KeyboardAvoidingView
					behavior={'padding'}
					enabled={true}
					style={styles.signupBox}>
					<View style={styles.titleBox}>
						<Text style={styles.title}>Редактировать данные</Text>
					</View>
					<View style={styles.inputGroup}>
						<Input
							style={styles.signupInput}
							placeholder="Имя"
							value={name}
							onChangeText={name => setName(name)}
						/>
						<Input
							style={styles.signupInput}
							placeholder="Email"
							keyboardType="email-address"
							value={email}
							onChangeText={email => setEmail(email)}
						/>
					</View>
					{
						!!error &&
						<Text>error {error.toString()}</Text>
					}
					<View style={styles.buttonGroup}>
						<Button
							style={styles.signupButton}
							size="medium"
							disabled={!_isFormValid()}
							onPress={onPressUpdate}
						>Сохранить</Button>
					</View>
				</KeyboardAvoidingView>

			</View>
		</>
	)
}

export default UpdateProfileScreen
