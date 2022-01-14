import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { DEFAULT_BOX_SIZE, BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
	backgroundBox: {
		width: '100%',
		height:' 100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	signupBox: {
		width: DEFAULT_BOX_SIZE,
		height: '50%',
		borderRadius: BORDER_RADIUS,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	titleBox: {
		height: '10%'
	},
	title: {

	},
	inputGroup: {
		height: '40%',
		display: 'flex',
		justifyContent: 'space-around',
	},
	signupInput: {
		width: '70%'
	},
	buttonGroup: {
		width: '100%',
		height: '30%',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	signupButton: {
		width: '70%'
	},
	socialBox: {
		width: DEFAULT_BOX_SIZE,
		height: '15%',
		marginTop: '5%',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	socialButton: {
		width: '70%'
	}
})

export default themedStyles
