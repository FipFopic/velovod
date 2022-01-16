import React, {useEffect} from 'react';
import { View } from 'react-native'
import { Button, Text, useStyleSheet } from '@ui-kitten/components'
import NavigationService from '../../core/utils/Navigation.service'
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux'
import { doLogout } from '../../store/auth/ActionCreators'
import { userAPI } from '../../services/user/UserService'
import themedStyles from './Profile.style'

const ProfileScreen = () => {
	const styles = useStyleSheet(themedStyles)

	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(state => state.auth)
	const { data: user, isLoading, error } = userAPI.useGetProfileQuery(undefined, {
		skip: !isAuth
	})

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

						<Button
							style={styles.logoutButton}
							onPress={onPressLogout}
						>Выйти</Button>
						<Button
							style={styles.logoutButton}
							onPress={onPressEditProfile}
						>Редактировать</Button>

						<View style={styles.userInfo}>
							{/* @ts-ignore */}
							{/*<Image style={styles.userPhoto} source={{uri: 'https://i.pinimg.com/564x/aa/af/64/aaaf640914f8a504978e94802ddd52bc.jpg'}} />*/}
							{/* @ts-ignore */}
							{/* <Image style={styles.userPhoto} source={{uri: getImageSrc(user?.avatar ,100)}} /> */}
							<View style={styles.userIdentity}>
								<Text style={styles.userName}>{user?.name || 'No name'}</Text>
								<Text>{user?.email || 'No email'}</Text>
							</View>

							<View style={styles.userAchieves}>
								<View style={styles.levelBox}>
									<View style={styles.levelLabel}>
										<Text>{user?.statistic?.level?.level?.title || '0'}</Text>
										<Text>{user?.count_velocoin?.toString()  || '0'} Velocoins</Text>
									</View>

									{/*
                  // TODO add level progressbar
                */}
									{
										// user?.statistic?.level?.value &&
										// <ProgressBar
										// 	value={ 100 * user.statistic.level.value / user.statistic.level.max }
										// />
										// <ProgressBar value={30}/>
									}
								</View>

								<View style={styles.achieveDetails}>
									<View style={styles.achieve}>
										{
											<Text>0</Text>
										}
										<Text>пройдено км.</Text>
									</View>
									<View style={styles.achieve}>
										{
											<Text>0</Text>
										}
										<Text>маршруты</Text>
									</View>
									<View style={styles.achieve}>
										{
											<Text>0</Text>
										}
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
