<template>
  <div style="float: left">
    <el-select v-model="lang" style="width: 90px;height: 30px;margin-right: 10px;border: none;" size="mini" @change="changeLanguage">
      <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Lang',
  data() {
    return {
      langs: [
        {
          label: 'English',
          value: 'en'
        },
        {
          label: '中文',
          value: 'zh'
        }
      ],
      lang: 'zh'
    }
  },
  created() {
    this.lang = this.$i18n.locale
  },
  methods: {
    changeLanguage(lang) {
      // console.log('lang:', lang)
      // 保存语言配置到localStorage
      localStorage.setItem('locale', lang)
      localStorage.locale = lang
      // 修改显示语言
      this.$i18n.locale = lang
    }
  }
}
</script>
