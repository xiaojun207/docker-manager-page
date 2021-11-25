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
      <el-table-column label="ID" width="95" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Username" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Mobile" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="Email" width="170" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Nickname" width="170" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Role" align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.status) }}
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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope"  :loading="scope.row.Loading" >
          <el-button @click="changeStatus(scope.row, scope.row.status === 0 ? 1 : 0)" size="small" type="text">{{scope.row.status === 0 ? '禁用':'恢复'}}</el-button>
          <el-button @click="resetPassword(scope.row)" size="small" type="text">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { changeStatus, getUserList, resetPassword } from '@/api/user'
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
    },
    formatStatus(s) {
      return s === 0 ? '正常' : '禁用'
    },
    changeStatus(r, s) {
      r.Loading = true
      const data = {
        username: r.username,
        status: s
      }
      changeStatus(data).then(r => {
        r.Loading = false
        this.fetchData()
      })
    },
    resetPassword(r) {
      r.Loading = true
      const data = {
        username: r.username
      }
      resetPassword(data).then(r => {
        r.Loading = false
        this.$alert('密码仅显示一次，请备份：' + r.data, '密码重置成功', {
          confirmButtonText: '确定'
        })
        this.fetchData()
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
