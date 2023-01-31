import enLocale from 'element-plus/lib/locale/lang/en'
import system from './en/system'
import common from './en/common'
import menu from './en/menu'
import docker from './en/docker'
const lang = {
  el: enLocale.el, // element-plus i18 setting
  ...docker,
  message: {
    language: 'English',
    ...system,
    ...common,
    ...menu
  },
}

export default lang
