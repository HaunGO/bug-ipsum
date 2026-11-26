// url=https://www.figma.com/design/eoEasW5XkZ54fXEwS5yE6P/Bug-Ipsum-Refresh?node-id=4-63
// source=src/app/globals.css
// component=btn-primary, btn-quiet
// There is no Button component. Primary and Quiet are classes.
// Hover is CSS (:hover), and disabled is not defined, so State does not change the snippet.
import figma from 'figma'

const instance = figma.selectedInstance

const kind = instance.getEnum('Kind', {
  Primary: 'btn-primary',
  Quiet: 'btn-quiet',
})

const label = instance.findText('Label')
const text = label?.textContent ?? 'Label'

export default {
  example: figma.code`<button type="button" className="${kind}">${text}</button>`,
  id: 'button',
  metadata: {
    nestable: true,
  },
}
