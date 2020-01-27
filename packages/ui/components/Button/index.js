import React from 'react'
import { View } from 'react-native'
import { observer } from 'startupjs'
import propTypes from 'prop-types'
import Div from '../Div'
import Icon from '../Icon'
import Span from '../Span'
import config from '../../config/rootConfig'
import './index.styl'
// TODO. Remove
import { faStar } from '@fortawesome/free-solid-svg-icons'

const { colors } = config

const ICON_SIZES = {
  m: 's',
  l: 'l',
  xl: 'xxl'
}

function Button ({
  style,
  children,
  color,
  disabled,
  label,
  shape,
  size,
  icon,
  rightIcon,
  textColor,
  variant,
  onPress,
  ...props
}) {
  const isLeftIconSingle = icon && !rightIcon && !label
  const isRightIconSingle = rightIcon && !icon && !label
  const isSingleIcon = isLeftIconSingle || isRightIconSingle

  const labelExtraProps = {}
  if (textColor) labelExtraProps.style = { color: textColor }

  function getIconColor () {
    switch (variant) {
      case 'flat':
        return colors.white
      default:
        return colors[color] || colors.primary
    }
  }

  const iconColor = getIconColor()

  return pug`
    Div.root(
      style=style
      styleName=[
        size,
        variant,
        shape,
        isSingleIcon ? 'icon-' + size : '',
        color ? variant + '-' + color : '',
        {
          disabled,
          icon: isSingleIcon
        }
      ]
      disabled=disabled
      onPress=onPress
      ...props
    )
      if icon
        View.leftIconWrapper(styleName=[size, color, label ? 'with-label' : ''])
          Icon(
            icon=icon
            size=ICON_SIZES[size]
            color=iconColor
          )
      if label
        Span.label(
          bold
          styleName=[
            size,
            variant,
            color ? variant + '-' + color : ''
          ]
          ...labelExtraProps
        )= label
      if rightIcon
        View.rightIconWrapper(styleName=[size, color, label ? 'with-label' : ''])
          Icon(
            icon=rightIcon
            size=ICON_SIZES[size]
            color=iconColor
          )
  `
}

Button.defaultProps = {
  color: 'primary',
  variant: 'flat',
  size: 'm',
  shape: 'rounded',

  // TODO. remove
  label: 'Button!',
  icon: faStar,
  rightIcon: faStar,
  disabled: false,
  onPress: () => null
}

Button.propTypes = {
  color: propTypes.oneOf(['primary', 'secondary', 'success']),
  label: propTypes.string,
  variant: propTypes.oneOf(['flat', 'outlined', 'ghost']),
  size: propTypes.oneOf(['m', 'l', 'xl']),
  shape: propTypes.oneOf(['rounded', 'circle', 'squared']),
  icon: propTypes.object,
  rightIcon: propTypes.object,
  textColor: propTypes.string,
  disabled: propTypes.bool,
  onPress: propTypes.func.isRequired
}

export default observer(Button)
