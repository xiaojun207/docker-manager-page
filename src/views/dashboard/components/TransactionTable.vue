<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;margin-left: 15px;">
    <el-table-column label="任务" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.ch | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="目标服务器" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.serverName }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.code | statusFilter">
          {{ statusFilter(row.code) }}
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
        '000000': '正在进行',
        '100200': '完成',
        '100100': '失败'
      }
      return statusMap[status]
    }
  }
}
</script>
