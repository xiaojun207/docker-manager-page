<template>
  <div class="dashboard-editor-container">
    <CircleChart/>
    <panel-group />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <transaction-table />
    </el-row>
  </div>
</template>

<script>
import { Refresh as ElIconRefresh } from '@element-plus/icons'
import { refreshContainerList, refreshContainerStats } from '@/api/dashboard'
import PanelGroup from './components/PanelGroup.vue'
import TransactionTable from './components/TransactionTable.vue'
import PieChart from './components/pieChart.vue'
import CircleChart from './components/circleChart.vue'

export default {
  name: 'DashboardAdmin',
  components: {
    CircleChart,
    PieChart,
    PanelGroup,
    TransactionTable
  },
  data() {
    return {
      loading: false,
      ElIconRefresh
    }
  },
  methods: {
    refreshContainerList() {
      this.loading = true
      refreshContainerList().then((resp) => {
        this.loading = false
        this.$message(this.$t('刷新成功'))
      })
    },
    refreshContainerStats() {
      this.loading = true
      refreshContainerStats().then((resp) => {
        this.loading = false
        this.$message(this.$t('刷新成功'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-editor-container {
  padding: 10px;
}
</style>
