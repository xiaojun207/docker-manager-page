<template>
  <el-table
    :data="list"
    style="width: 100%; padding-top: 15px; margin-left: 15px"
  >
    <el-table-column :label="$t('任务')" min-width="200">
      <template v-slot="scope">
        {{ orderNoFilter_filter(scope.row.Ch) }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('目标主机')" width="195" align="center">
      <template v-slot="scope">
        {{ scope.row.ServerName }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template v-slot="{ row }">
        <el-tag :type="statusFilter_filter(row.Code)">
          {{ statusFilter(row.Code) }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getTasks } from '@/api/task'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    orderNoFilter_filter(str) {
      return str
    },
    statusFilter_filter(status) {
      // "success", "info", "warning", "danger", ""
      const statusMap = {
        '000000': 'warning',
        100200: 'success',
        100100: 'danger'
      }
      return statusMap[status]
    },
    fetchData() {
      const page = {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
      getTasks(page).then((r) => {
        this.list = r.data.list
      })
    },
    statusFilter(status) {
      const statusMap = {
        '000000': this.$t('正在进行'),
        100200: this.$t('完成'),
        100100: this.$t('失败')
      }
      return statusMap[status]
    }
  }
}
</script>
