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
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="命令" >
        <template slot-scope="scope">
          {{ scope.row.ch }}
        </template>
      </el-table-column>
      <el-table-column label="serverName" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serverName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="TaskId" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskId }}
        </template>
      </el-table-column>
      <el-table-column label="参数" align="center">
        <template slot-scope="scope">
          {{ scope.row.param }}
        </template>
      </el-table-column>

      <el-table-column label="信息" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.msg }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ formatTime(scope.row.ts) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span  v-if="scope.row.code === '000000'" style="color: #4573fa;">正在进行</span>
          <span  v-if="scope.row.code === '100100'" style="color: #d70404;">失败</span>
          <span  v-if="scope.row.code === '100200'" style="color: #03c961;">成功</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTasks } from '@/api/task'
import { formatTime } from '@/utils/index.js'
/**
 * ch: "docker.container.restart"
 code: "000000"
 param: {containerId: "4287b4e672139b8e6137469b7e9cf8ee14b8bde887fa4c15905fd321f988049d",…}
 serverName: "docker-desktop"
 taskId: "776726aa-7d96-c8e0-1a86-eda76ece8901"
 ts: 1622471544
 */

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTasks().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    formatTime(d) {
      return formatTime(d)
    }
  }
}
</script>
