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
      <el-table-column label="Username" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Mobile" width="150">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="Email" width="170">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Nickname" width="170">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Role">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="Create" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.create_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Update" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.update_date) }}
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button :loading="listLoading" @click="delApp(scope.row)" size="small" type="text">删除</el-button>-->
<!--          <el-button :loading="listLoading" @click="updateApp(scope.row)" size="small" type="text">更新</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-dialog :visible.sync="dialogDetailVisible" title="详情">
      <pre>
{{ JSON.stringify(selectRow, null, 2) }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
import { formatDate } from '@/utils/index'

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserList().then(r => {
        this.list = r.data
        this.listLoading = false
      })
    },
    formatDate(t) {
      return formatDate(t)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
