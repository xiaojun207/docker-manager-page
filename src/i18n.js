import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import element_zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import element_enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)

  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  messages.zh = {
    ...messages.zh,
    ...element_zhLocale
  }
  messages.en = {
    ...messages.en,
    ...element_enLocale
  }
  return messages
}

function getLanguage() {
  if (localStorage && localStorage.locale) {
    return localStorage.locale
  }
  // 使用系统语言，如果语言文件中没有则使用 en
  return (navigator.language || navigator.userLanguage).split('-')[0]
}

const i18n = new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'zh',
  silentTranslationWarn: true,
  messages: loadLocaleMessages()
})

export default i18n

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

