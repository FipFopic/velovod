import { StyleService } from '@ui-kitten/components'

const themedStyles = StyleService.create({
	pointList: {
		height: 500,
		backgroundColor: 'color-basic-100'
	},
	mapContainer: {
		height: '100%'
	},
	map: {
		height: '95%'
	},
	locationButton: {
		width: 50,
		height: 50,
		position: 'absolute',
		top: 10,
		right: 10
	},
	exitButton: {
		width: 20,
		height: 20,
		marginRight: 20,
		alignSelf: 'flex-end'
	},
	endButton: {
		width: '50%',
		alignSelf: 'center'
	}
})

export default themedStyles
