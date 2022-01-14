import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
	pointBox: {
		width: '100%',
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	childrenBox: {
		width: 60,
		height: 60,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.7
	},
	pointPhoto: {
		width: 60,
		height: 60,
		borderRadius: BORDER_RADIUS/2,
		// borderColor: 'color-primary-200',
		// borderWidth: 2,
		marginRight: 10
	},
	title: {
		width: 200,
		fontSize: 15,
		flexWrap: 'nowrap',
		fontWeight: '500',
		marginRight: BORDER_RADIUS/2,
	}
})

export default themedStyles
