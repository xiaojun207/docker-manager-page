<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.Ip }}
        </template>
      </el-table-column>
      <el-table-column label="NUM" align="center">
        <template slot-scope="scope">
          {{ scope.row.Num }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getForbiddenList } from '@/api/config'

export default {
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getForbiddenList().then(resp => {
        this.list = resp.data
        this.listLoading = false
      })
    }
  }
}
</script>
