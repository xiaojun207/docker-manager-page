import Vue from 'vue'
import VueI18n from 'vue-i18n'

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
  return messages
}

function getLanguage() {
  if (localStorage && localStorage.locale) {
    return localStorage.locale
  }
  // 使用系统语言，如果语言文件中没有则使用 en
  return (navigator.language || navigator.userLanguage).split('-')[0]
}

export default new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'zh',
  silentTranslationWarn: true,
  messages: loadLocaleMessages()
})
