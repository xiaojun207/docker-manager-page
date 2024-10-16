<template>
  <div class="app-container">
    <div style="margin-bottom: 15px" />
    告警配置
    <p>
      条件：
      1、容器状态非running，超过预警时间；
      通知方式：
      1、短信配置；
      2、邮件通知；
      3、钉钉；
    </p>
  </div>
</template>

<script>
import { getVersion } from '@/api/version'

export default {
  data() {
    return {
      version: {},
      Loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.Loading = true
      getVersion().then((resp) => {
        this.version = resp.data
        this.Loading = false
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
