// url=https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh?node-id=4-63
// source=src/components/ui/button.tsx
// component=Button
import figma from 'figma'
import { Button } from './button'

const instance = figma.selectedInstance

const kind = instance.getEnum('Kind', {
  Primary: 'default',
  Quiet: 'quiet',
})

const label = instance.findText('Label')
const text = label?.textContent ?? 'Label'

export default {
  example: figma.code`<Button variant="${kind}">${text}</Button>`,
  id: 'button',
  metadata: {
    nestable: true,
  },
  imports: [Button],
}