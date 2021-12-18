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
      <el-table-column :label="$t('命令')" width="170">
        <template slot-scope="scope">
          {{ scope.row.Ch }}
        </template>
      </el-table-column>
      <el-table-column label="serverName" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ServerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TaskId" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.TaskId }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('信息')" align="center">
        <template slot-scope="scope">
          {{ scope.row.Msg }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" :label="$t('发布时间')" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span> {{ formatDate(scope.row.Ts) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('状态')" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.Code === '000000'" style="color: #4573fa;">{{ $t('正在进行') }}</span>
          <span v-if="scope.row.Code === '100100'" style="color: #d70404;">{{ $t('失败') }}</span>
          <span v-if="scope.row.Code === '100200'" style="color: #03c961;">{{ $t('成功') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTasks } from '@/api/task'
import { formatDate } from '@/utils/index.js'
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
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTasks().then(r => {
        this.list = r.data
        this.listLoading = false
      })
    },
    formatDate(d) {
      return formatDate(d)
    }
  }
}
</script>
