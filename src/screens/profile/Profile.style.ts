import { StyleService } from '@ui-kitten/components'
import theme  from '../../theme/themeProps'

const { BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
	pageBox: {
		height: '100%',
		backgroundColor: 'color-basic-700'
	},
	logoutButton: {
		alignSelf: 'flex-end',
		backgroundColor: 'color-basic-700',
		borderRadius: BORDER_RADIUS,
		borderColor: 'color-basic-300',
		marginTop: 15,
		marginRight: 15
	},
	userProfile: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'center',
	},
	userInfo: {
		width: '100%',
		height: '50%',
		marginTop: '25%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'color-basic-200',
		// borderRadius: BORDER_RADIUS,
	},
	userPhoto: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginTop: -75,
		backgroundColor: 'color-basic-100'
	},
	userIdentity: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: 20,
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	userDetails: {
		height: '80%',
		backgroundColor: 'color-basic-300',
	},
	userAchieves: {

	},
	levelBox: {
		height: 40,
		display: 'flex',
		justifyContent: 'center',
	},
	levelLabel: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontWeight: '600'
	},
	achieveDetails: {
		display: 'flex',
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
	userTravaledList: {
		width: '85%',
		backgroundColor: 'red',
		display: 'flex',
		// alignItems: 'flex-end',
	}
})

export default themedStyles
