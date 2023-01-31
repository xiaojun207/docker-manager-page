<template>
  <div class="chart-container">
    <div class="box">
      <Chart :option="serverOptions" />
    </div>
    <div class="box">
      <Chart :option="containerOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Chart from '@/components/charts/index.vue'
import { getDashboardSize } from '@/api/dashboard'

import getOption from './modules/circle'
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const serverOptions = reactive(getOption("主机", [
      {value: 0, name: '在线' },
      {value: 0, name: '离线' }
    ]))
    const containerOptions = reactive(getOption("容器", [
      {value: 0, name: '运行中' },
      {value: 0, name: '已停止' }
    ]))
    const s = ref({
      serverConnected:0,
      server: 0,
      container: 1110,
      containerRun: 0,
      image: 0,
      task: 0,
      app: 0,
      follow: 0
    })

    getDashboardSize().then((resp) => {
      s.value = resp.data
      const d = s.value
      serverOptions.series[0].data = [
        {value: d.serverConnected, name: '在线' },
        {value: d.server - d.serverConnected, name: '离线' }
      ]

      containerOptions.series[0].data = [
        {value: d.containerRun, name: '运行中' },
        {value: d.container - d.containerRun, name: '已停止' }
      ]

    })

    return {
      serverOptions,
      containerOptions
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-container{
  //padding: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.box {
  display: inline-block;
  flex: auto;
  margin-right: 40px;
  width: calc(25% - 50px);
  height: 200px;
  background: var(--system-page-background);
  padding: 10px 10px 10px 10px;
  //overflow: hidden;
}
</style>
