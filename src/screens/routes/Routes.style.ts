import { StyleService } from '@ui-kitten/components'

const themedStyles = StyleService.create({
	pageBox: {
		height: '100%'
	},
	contentBox: {
		height: '100%'
	},
	roadRoutesBox: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 130
	},
	bottomSpinner: {
		marginTop: 15
	}
})

export default themedStyles
