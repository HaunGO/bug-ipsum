// url=https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh?node-id=REPLACE_WITH_INPUT_NODE
// source=src/components/ui/input.tsx
// component=Input
import figma from 'figma'
import { Input } from './input'

const instance = figma.selectedInstance

const label = instance.findText('Placeholder')
const placeholder = label?.textContent ?? 'Placeholder'

export default {
  example: figma.code`<Input type="text" placeholder="${placeholder}" />`,
  id: 'field-input',
  metadata: {
    nestable: true,
  },
  imports: [Input],
}