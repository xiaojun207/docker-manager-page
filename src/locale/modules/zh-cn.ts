import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import system from './zh-cn/system'
import common from './zh-cn/common'
import menu from './zh-cn/menu'
import docker from './zh-cn/docker'
const lang = {
  el: zhLocale.el, // element内部国际化
  ...docker,
  message: {
    language: '中文',
    ...system,
    ...common,
    ...menu
  },
}

export default lang
