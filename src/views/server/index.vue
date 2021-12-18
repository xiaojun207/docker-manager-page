<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.filter( r => !filterSearch.Name || r.Name.toLowerCase().includes(filterSearch.Name.toLowerCase()))"
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
      <el-table-column label="Name">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row )">{{ scope.row.Name }}</el-button>
        </template>
        <template slot="header" slot-scope="scope">
          Name
          <el-input v-model="filterSearch.Name" size="mini" :placeholder="$t('输入关键字过滤')" style="width: 140px" />
        </template>
      </el-table-column>
      <el-table-column label="ContainersRunning" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Running + "/" + scope.row.Containers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Images" width="170" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Images }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cpu" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.Cpu }}
        </template>
      </el-table-column>
      <el-table-column label="MemTotal" width="110" align="center">
        <template slot-scope="scope">
          {{ (scope.row.Memory/(1024*1024)).toFixed(3) + "MB" }}
        </template>
      </el-table-column>
      <el-table-column label="Private IP" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.PrivateIp }}
        </template>
      </el-table-column>
      <el-table-column label="Public IP" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.PublicIp }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="ServerVersion" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.DockerVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="LastDataTime" width="200">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.LastDataTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="State" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.State === 'connected'" style="color: #03c961;">{{ scope.row.State }}</span>
          <span v-if="scope.row.State !== 'connected'" style="color: #d70404;">{{ scope.row.State }}</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :visible.sync="dialogDetailVisible" title="详情" @dragDialog="handleDrag">
      <pre>
{{ JSON.stringify(selectRow, null, 2) }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getServerList, getServer } from '@/api/server'
import { formatTime } from '@/utils/index'

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
      listLoading: true,
      filterSearch: {
        Name: ''
      },
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
      getServerList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
      getServer({ 'ServerName': row.Name }).then(r => {
        this.selectRow = r.data
      })
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    formatTime(s) {
      return formatTime(s)
    }
  }
}
</script>
