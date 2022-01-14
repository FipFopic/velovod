import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
	ownerBox: {
		width: '100%',
		marginTop: 10,
		paddingLeft: 17,
		flexDirection: 'row',
		// borderRadius: theme.BORDER_RADIUS,
		// backgroundColor: 'white',
		alignItems: 'center',
	},
	ownerPhoto: {
		width: 40,
		height: 40,
		borderRadius: theme.BORDER_RADIUS,
		// borderColor: 'color-basic-300',
		// borderWidth: 2,
		marginRight: 10,
	},
	textName: {
		fontSize: 15
	}
})

export default themedStyles
