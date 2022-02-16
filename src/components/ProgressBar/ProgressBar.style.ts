import { StyleService } from '@ui-kitten/components'
import theme from '../../theme/themeProps'

const { BORDER_RADIUS } = theme

const themedStyles = StyleService.create({
  outLine: {
    width: '100%',
    height: 5,
    backgroundColor: 'color-basic-300',
    borderRadius: BORDER_RADIUS
  },
  inLine: {
    height: 5,
    backgroundColor: 'color-success-300',
    borderRadius: BORDER_RADIUS
  }
})

export default themedStyles
