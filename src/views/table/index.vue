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
      <el-table-column label="Name" >
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row )">{{ scope.row.Name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="ContainersRunning" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ContainersRunning + "/" + scope.row.Containers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="NCPU" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.NCPU }}
        </template>
      </el-table-column>
      <el-table-column label="MemTotal" width="110" align="center">
        <template slot-scope="scope">
          {{ (scope.row.MemTotal/(1024*1024)).toFixed(3) + "MB" }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="ServerVersion" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.ServerVersion }}</span>
        </template>
      </el-table-column>

      <el-table-column label="State" width="100" align="center">
        <template slot-scope="scope">
          <span  v-if="scope.row.State === 'connected'" style="color: #03c961;">{{ scope.row.State }}</span>
          <span  v-if="scope.row.State !== 'connected'" style="color: #d70404;">{{ scope.row.State }}</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :visible.sync="dialogDetailVisible" title="详情" @dragDialog="handleDrag">
      <pre>
{{ JSON.stringify(selectRow, null, 2)}}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/container'

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
      listLoading: true,
      dialogDetailVisible: false,
      selectRow: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
    },
    handleDrag() {
      this.$refs.select.blur()
    }
  }
}
</script>
