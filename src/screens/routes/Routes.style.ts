import { StyleService } from '@ui-kitten/components'

const themedStyles = StyleService.create({
	pageBox: {
		height: '100%',
	},
	contentBox: {
		height: '93%',
	},
	roadRoutesBox: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 80
	}
})

export default themedStyles
