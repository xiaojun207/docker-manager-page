// get data from settings

import defaultSettings from '@/settings'
import i18n from '@/i18n'
const title = defaultSettings.title || 'Docker Manager'

export default function getPageTitle(pageTitle) {
  // console.log('pageTitle:', pageTitle)
  if (pageTitle) {
    return i18n.t(pageTitle) + ` - ${title}`
  }
  return `${title}`
}
