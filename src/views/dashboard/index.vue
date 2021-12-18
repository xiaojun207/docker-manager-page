<template>
  <div class="dashboard-editor-container">

    <div class="filter-container" style="margin-left: 15px;margin-top: 15px">
      <el-button class="filter-item" type="primary" :loading="loading" icon="el-icon-refresh" @click="refreshContainerList">
        {{ $t("刷新容器列表") }}
      </el-button>

      <el-button class="filter-item" type="primary" :loading="loading" icon="el-icon-refresh" @click="refreshContainerStats">
        {{ $t("刷新容器状态") }}
      </el-button>
    </div>
    <panel-group  />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <transaction-table />
    </el-row>

  </div>
</template>

<script>
import { refreshContainerList, refreshContainerStats } from '@/api/dashboard'
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    TransactionTable
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    refreshContainerList() {
      this.loading = true
      refreshContainerList().then(resp => {
        this.loading = false
        this.$message(this.$t('刷新成功'))
      })
    },
    refreshContainerStats() {
      this.loading = true
      refreshContainerStats().then(resp => {
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
</style>

