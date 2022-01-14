import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Input, Text, useStyleSheet } from '@ui-kitten/components'
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
		if (user?.name)
			setName(user.name)
		if (user?.email)
			setEmail(user.email)
	}, [user])

	const _isFormValid = () => {
		return email.trim() && EMAIL_PATTERN.test(email) && name.trim()
	}

	const onPressUpdate = () => {
		updateProfile({ name, email, id: user.id })
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
			<View>
				<Text>Update user</Text>
				<Input
					value={name}
					onChangeText={name => setName(name)}
				/>
				<Input
					value={email}
					onChangeText={email => setEmail(email)}
				/>
				<Text>name {name}</Text>
				<Text>email {email}</Text>
				{
					isLoading &&
					<Text>isLoding</Text>
				}
				{
					!!error &&
					<Text>error {error.toString()}</Text>
				}
				{
					data &&
					<Text>Data {JSON.stringify(data).toString()}</Text>
				}
				<Button
					disabled={!_isFormValid()}
					onPress={onPressUpdate}
				>Confirm Update</Button>
			</View>
		</>
	)
}

export default UpdateProfileScreen
