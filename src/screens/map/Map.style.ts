import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { DEFAULT_BOX_SIZE } = theme

const themedStyles = StyleService.create({
	pointList: {
		height: 500,
		backgroundColor: 'color-basic-100'
	},
	mapContainer: {
		height: '100%'
	},
	map: {
		height: '100%'
	},
	createRouteButton: {
		width: '50%',
		position: 'absolute',
		bottom: 50,
		left: '25%'
	},
	locationButton: {
		width: 50,
		height: 50,
		position: 'absolute',
		top: 10,
		right: 10
	},
	bottomSheet: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	statusBar: {
		width: DEFAULT_BOX_SIZE,
		height: 60,
		// backgroundColor: '#000',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	timer: {
		width: '30%',
		// backgroundColor: 'red',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	distance: {
		width: '30%',
		// backgroundColor: 'blue',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	pointQuant: {
		width: '30%',
		// backgroundColor: 'green',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	statusBarItemTitle: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	statusBarItemContent: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	pointListBox: {
		width: DEFAULT_BOX_SIZE,
		height: '75%'
		// backgroundColor: 'red',
	},
	pointBox: {
		width: DEFAULT_BOX_SIZE,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	pointControl: {
		display: 'flex',
		flexDirection: 'row'
	},
	controlIcon: {

	},
	editInput: {
		marginBottom: 20
	},
	addPointButton: {

	},
	topButtonGroup: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#ff0000'
	},
	saveRouteButton: {
		alignSelf: 'center'
	},
	exitButton: {
		width: 20,
		height: 20,
		marginRight: 20,
		alignSelf: 'flex-end'
	},
	sheetButtonGroup: {
		width: DEFAULT_BOX_SIZE,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})

export default themedStyles
