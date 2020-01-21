import React from 'react'
import { observer } from 'startupjs'
import { Props } from 'components'
import * as COMPONENTS from 'ui'
import {
  useComponentName,
  useShowGrid,
  useShowSizes,
  useValidateWidth,
  useDarkTheme
} from 'clientHelpers'
import './index.styl'

export default observer(function PStyleguide () {
  const [componentName] = useComponentName()
  const [showGrid] = useShowGrid()
  const [showSizes] = useShowSizes()
  const [validateWidth] = useValidateWidth()
  const [darkTheme] = useDarkTheme()
  return pug`
    Props.root(
      theme=darkTheme ? 'dark' : undefined
      key=componentName
      Component=COMPONENTS[componentName]
      componentName=componentName
      showSizes=showSizes
      showGrid=showGrid
      validateWidth=validateWidth
    )
  `
})
