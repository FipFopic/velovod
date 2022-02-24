import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const themedStyles = StyleService.create({
	buttonBox: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: 'color-basic-200',
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		width: 25,
		height: 25
	}
})

export default themedStyles
