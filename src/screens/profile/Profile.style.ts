import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
	pageBox: {
		height: '100%'
	},
	profileBox: {
		height: '100%',
		backgroundColor: 'color-basic-700'
	},
	loginButtonsBox: {
		width: '60%',
		height: '100%',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	buttonBox: {
		width: '90%',
		marginTop: 20,
		marginBottom: 40,
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	logoutIcon: {
		// alignSelf: 'flex-end',
		// backgroundColor: 'color-basic-700',
		// borderRadius: BORDER_RADIUS,
		// borderColor: 'color-basic-300',
		// marginTop: 15,
		width: 20,
		height: 20
	},
	userProfile: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'center'
	},
	userInfo: {
		width: '100%',
		height: '100%',
		marginTop: '25%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'color-basic-200',
		// borderRadius: BORDER_RADIUS,
	},
	userPhotoBox: {
		width: 155,
		height: 155,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'color-basic-100',
		borderWidth: 5,
		borderRadius: 75,
		marginTop: -75
	},
	userPhoto: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: 'color-basic-100'
	},
	userIdentity: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: 20
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	userDetails: {
		height: '80%',
		backgroundColor: 'color-basic-300'
	},
	userAchieves: {
		width: '90%'
	},
	topAchievesBar: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	levelBox: {
		width: '70%',
		height: 40,
		display: 'flex',
		justifyContent: 'center'
	},
	levelLabel: {
		marginBottom: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontWeight: '600'
	},
	levelCounter: {
		fontSize: 10
	},
	velocoinBox: {
	},
	velocoinLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	velocoinImage: {
		width: 25,
		height: 25
	},
	achieveDetails: {
		marginTop: 25,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	achieve: {
		width: '30%',
		height: 50,
		// backgroundColor: 'color-basic-300',
		// borderRadius: BORDER_RADIUS,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	achieveCounter: {
		fontWeight: 'bold'
	},
	userTravaledList: {
		width: '85%',
		backgroundColor: 'red',
		display: 'flex'
	}
})

export default themedStyles
