import { StyleService } from '@ui-kitten/components'

const themedStyles = StyleService.create({
	bottomBarBox: {
		width: '100%',
		height: '10%',
		backgroundColor: 'color-basic-100',
		position: 'absolute',
		bottom: 0,
		// display: 'flex',
		// justifyContent: 'center',
		// alignSelf: 'center',
		// display: 'flex',
		// flexDirection: 'row',
		// justifyContent: 'space-around',
		//   backgroundColor: 'blue',
		// height: 200,
		// opacity: 0.1
		// shadowColor: "#000",
		// shadowOffset: {
		//   width: 0,
		//   height: 12,
		// },
		// shadowOpacity: 0.58,
		// shadowRadius: 16.00,
		//
		// elevation: 24,
	},
	bottomTabBar: {
		// position: 'absolute',
		// bottom: 0,
		// display: 'flex',
		// justifyContent: 'center',
		// alignSelf: 'center',
		// bottom: 30,
		// width: '85%',
		// borderWidth: 5,
		// borderColor: 'color-basic-100',
		// borderRadius: 100,
		// shadowColor: "color-primary-200",
		// shadowOffset: {
		//   width: 0,
		//   height: 9,
		// },
		// shadowOpacity: 0.20,
		// shadowRadius: 20,
		// elevation: 19,
	},
	tabBarLabelStyle: {
		fontWeight: '700',
		fontSize: 10
	},
	tabBarLabelStyleActive: {
		color: 'color-danger-500',
		fontWeight: '700'
	}
})

export default themedStyles
