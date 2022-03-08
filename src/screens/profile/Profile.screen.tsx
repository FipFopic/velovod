import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { Button, Icon, Text, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { isAuthUser } from '../../core/utils/Storage.service'
import { userAPI } from '../../services/user/UserService'
import themedStyles from './Profile.style'
import ProgressBar from '../../../src/components/ProgressBar/ProgressBar'
import { getImageSrc } from '../../core/utils/Main.helper'

const ProfileScreen = ({ route: navigation }: any) => {
	const styles = useStyleSheet(themedStyles)
	const afterLogin = navigation.params?.afterLogin || false

	const [isAuth, setAuth] = useState(false)

	const { data: user, isLoading, error } = userAPI.useGetProfileQuery(undefined, {
		skip: !isAuth
	})

	const [doLogout, { data: dataLogout, isLoading: isLoadingLogout }] = userAPI.useDoLogoutMutation()

	const onPressLogout = () => {
		doLogout()
	}

	const onPressEditProfile = () => {
		NavigationService.navigate('UpdateProfile', { user })
	}

	useEffect(() => {
		isAuthUser().then(res => {
			setAuth(res)
		})
	}, [user, afterLogin])

	useEffect(() => {
		if (dataLogout) {
			setAuth(false)
		}
	}, [dataLogout])

	if (!isAuth) {
		return (
			<>
				<View style={styles.pageBox}>
					<View style={styles.loginButtonsBox}>
						<Button
							style={{ marginBottom: 40 }}
							onPress={() => NavigationService.push('Login')}
						>Войти</Button>
						<Button
							onPress={() => NavigationService.push('Signup')}
						>Регистрация</Button>
					</View>
				</View>
			</>
		)
	}

	if (isAuth) {
		return (
			<>
				<View style={styles.profileBox}>
					<View style={styles.userProfile}>
						<View style={styles.buttonBox}>
							{/*<Button*/}
							{/*	style={styles.logoutButton}*/}
							{/*	onPress={onPressEditProfile}*/}
							{/*>Редактировать</Button>*/}
							{/*<Button*/}
							{/*	style={styles.logoutButton}*/}
							{/*	onPress={onPressLogout}*/}
							{/*>*/}
							<Icon
								style={styles.logoutIcon}
								fill={'#fff'}
								name={'settings'}
								onPress={onPressEditProfile}
							/>
							<Icon
								style={styles.logoutIcon}
								fill={'#fff'}
								name={'log-out'}
								onPress={onPressLogout}
							/>
							{/*</Button>*/}
						</View>

						<View style={styles.userInfo}>
							<View style={styles.userPhotoBox}>
								{/* @ts-ignore */}
								<Image style={styles.userPhoto} source={{ uri: getImageSrc(user?.avatar?.id, 100) }} />
							</View>
							<View style={styles.userIdentity}>
								<Text style={styles.userName}>{user?.name || 'No name'}</Text>
								<Text>{user?.email || 'No email'}</Text>
							</View>

							<View style={styles.userAchieves}>
								<View style={styles.topAchievesBar}>
									<View style={styles.levelBox}>
										<View style={styles.levelLabel}>
											<Text>{user?.statistic?.level?.level?.title || '0'}</Text>
											<Text style={styles.levelCounter}>{user?.statistic?.level?.value || '0'} / {user?.statistic?.level?.level?.max || '0'}</Text>
										</View>

										{
											user?.statistic?.level?.value &&
											<ProgressBar
												value={ 100 * (user?.statistic?.level?.value || 0) / (user?.statistic?.level?.level?.max || 1) }
											/>
										}
									</View>
									<View style={styles.velocoinBox}>
										<View style={styles.velocoinLabel}>
											<Text>{user?.count_velocoin?.toString() || '0'}</Text>
											{/* @ts-ignore */}
											<Image style={styles.velocoinImage}
												source={require('../../../src/theme/img/velocoin.png')}/>
										</View>
										<Text>велокоины</Text>
									</View>

								</View>

								<View style={styles.achieveDetails}>
									<View style={styles.achieve}>
										<Text style={styles.achieveCounter}>{user?.statistic?.count_go_km || 0}</Text>
										<Text>пройдено км.</Text>
									</View>
									<View style={styles.achieve}>
										<Text style={styles.achieveCounter}>{user?.statistic?.count_create_routes || 0}</Text>
										<Text>маршруты</Text>
									</View>
									<View style={styles.achieve}>
										<Text style={styles.achieveCounter}>{user?.statistic?.count_create_points || 0}</Text>
										<Text>точки</Text>
									</View>
								</View>

							</View>

							{/*<Text>ID: {'' + user?.id}</Text>*/}
						</View>

						<View style={styles.userDetails}>

							{/* <View style={styles.userTravaledList}>*/}
							{/*  <RoadRoutesCard*/}
							{/*    title={'Test'}*/}
							{/*    imageSrc={{}}*/}
							{/*    rating={4}*/}
							{/*    distance={3}*/}
							{/*    points={3}*/}
							{/*    duration={'3'} />*/}
							{/*</View> */}

						</View>
					</View>
				</View>
			</>
		)
	}

	return (
		<>
			<View>
				<Text>Ошибка!</Text>
			</View>
		</>
	)
}

export default ProfileScreen
