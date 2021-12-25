<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;margin-left: 15px;">
    <el-table-column :label="$t('任务')" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.Ch | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('目标主机')" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.ServerName }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.Code | statusFilter">
          {{ statusFilter(row.Code) }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getTasks } from '@/api/task'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '000000': '正在进行',
        '100200': '完成',
        '100100': '失败'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTasks().then(response => {
        this.list = response.data.slice(0, 8)
      })
    },
    statusFilter(status) {
      const statusMap = {
        '000000': this.$t('正在进行'),
        '100200': this.$t('完成'),
        '100100': this.$t('失败')
      }
      return statusMap[status]
    }
  }
}
</script>
