// url=https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh?node-id=4-63
// source=src/components/ui/button.tsx
// component=Button
import figma from 'figma'
import { Button } from './button'

const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Quiet: 'quiet',
  Outline: 'outline',
  Ghost: 'ghost',
  Link: 'link',
})

const size = instance.getEnum('Size', {
  Default: 'default',
  Small: 'sm',
  Icon: 'icon',
})

const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Disabled: 'disabled',
})

const label = instance.findText('Label')
const text = label?.textContent ?? 'Button'

const sizeProp = size === 'default' ? '' : ` size="${size}"`
const disabledProp = state === 'disabled' ? ' disabled' : ''

export default {
  example: figma.code`<Button variant="${variant}"${sizeProp}${disabledProp}>${text}</Button>`,
  id: 'button',
  metadata: {
    nestable: true,
  },
  imports: [Button],
}
