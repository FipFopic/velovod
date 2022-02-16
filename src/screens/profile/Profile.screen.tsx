import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { Button, Icon, Text, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux'
import { doLogout } from '../../store/auth/ActionCreators'
import { userAPI } from '../../services/user/UserService'
import themedStyles from './Profile.style'
import ProgressBar from '../../../src/components/ProgressBar/ProgressBar'
import { getImageSrc } from '../../core/utils/Main.helper'

const ProfileScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(state => state.auth)
	const { data: user, isLoading, error } = userAPI.useGetProfileQuery(undefined, {
		skip: !isAuth
	})

	useEffect(() => {
		console.log('__user', user.statistic)
	}, [user])

	const onPressLogout = () => {
		dispatch(doLogout())
	}

	const onPressEditProfile = () => {
		NavigationService.navigate('UpdateProfile', { user })
	}

	if (!isAuth) {
		return (
			<>
				<View style={styles.pageBox}>
					<Text>
						Profile
					</Text>
					<Button
						onPress={() => NavigationService.push('Login')}
					>Go to Login</Button>
					<Button
						onPress={() => NavigationService.push('Signup')}
					>Go to </Button>
				</View>
			</>
		)
	}

	if (isAuth) {
		return (
			<>
				<View style={styles.pageBox}>
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
							{/* @ts-ignore */}
							{/*<Image style={styles.userPhoto} source={{uri: 'https://i.pinimg.com/564x/aa/af/64/aaaf640914f8a504978e94802ddd52bc.jpg'}} />*/}
							{/* @ts-ignore */}
							<View style={styles.userPhotoBox}>
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
											<Image
												style={styles.velocoinImage}
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
