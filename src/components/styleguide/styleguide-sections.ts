export const STYLEGUIDE_SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'colors', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'borders', label: 'Borders & radii' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Form controls' },
  { id: 'components', label: 'UI components' },
  { id: 'audit', label: 'System audit' },
] as const

export type StyleGuideSectionId = (typeof STYLEGUIDE_SECTIONS)[number]['id']