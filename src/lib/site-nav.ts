/** Primary header links — Style Guide is footer-only. */
export const mainSiteNav = [
  { href: '/contact-sheet', label: 'Examples' },
  { href: '/contact-sheet', label: 'Gallery' },
] as const

export const styleGuideNavItem = {
  href: '/styleguide',
  label: 'Style Guide',
} as const

/** @deprecated Use mainSiteNav in headers; style guide only in the footer. */
export const siteNav = [...mainSiteNav, styleGuideNavItem] as const