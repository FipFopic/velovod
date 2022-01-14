import { StyleService } from '@ui-kitten/components'
import themeProps from '../../theme/themeProps'

const { BORDER_RADIUS, TEXT_SHADOW, TITLE } = themeProps


const themedStyles = StyleService.create({
	cardBox: {
		width: '90%',
		display: 'flex',
		// borderWidth: 2,
		marginTop: 10,
		// shadowColor: "color-primary-200",
		// shadowOffset: {
		//   width: 0,
		//   height: 9,
		// },
		// shadowOpacity: 0.20,
		// shadowRadius: 20,
		// elevation: 19,
	},
	cardImageBox: {
		width: '100%',
		height: 200,
		borderRadius: BORDER_RADIUS,
		backgroundColor: 'color-basic-700',
	},
	cardImage: {
		width: '100%',
		height: 200,
		borderRadius: BORDER_RADIUS,
		opacity: 0.7
	},
	detailsBox: {
		height: 100,

		display: 'flex',
		justifyContent: 'flex-end',

		marginTop: -100,
		paddingTop: 10,
		paddingLeft: BORDER_RADIUS,
		paddingBottom: 10,

		borderBottomRightRadius: BORDER_RADIUS,
		borderBottomLeftRadius: BORDER_RADIUS,
	},
	title: {
		...TEXT_SHADOW,
		...TITLE,
		color: 'color-basic-200',
	},
	rate: {
		width: 100,
		height: 20
	},
	star: {
		width: 20,
		height: 20,
		color: 'red'
	},
	starList: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		overflow: 'hidden',
	},
	specList: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 5,
		// justifyContent: 'flex-start'
	},
	spec: {
		// width: '10%',
		marginRight: '5%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: 'color-basic-300',
	},
	specIcon: {
		...TEXT_SHADOW
	},
	specText: {
		...TEXT_SHADOW,
		color: 'color-basic-200',
		fontWeight: "800"
	}
})

export default themedStyles
