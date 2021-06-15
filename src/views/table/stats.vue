<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.serverNames" multiple filterable placeholder="服务器" clearable collapse-tags class="filter-item" style="width: 300px">
        <el-option v-for="item in res.serverNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.ContainerNames" multiple filterable placeholder="容器名称" clearable collapse-tags class="filter-item" style="width: 300px;margin-left: 10px">
        <el-option v-for="item in res.ContainerNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.Follow" placeholder="是否开启日志" clearable filterable style="width: 140px;margin-left: 10px;margin-right: 10px;" class="filter-item">
        <el-option key="true" label="是" value="true" />
        <el-option key="false" label="否" value="false" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        Search
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top: 15px"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="210">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row )">{{ scope.row.Name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="ServerName" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ServerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="cpu_stats" width="150" align="center">
        <template slot-scope="scope">
          {{ formatCpu(scope.row.cpu_stats) }}
        </template>
      </el-table-column>
      <el-table-column label="memory_stats" min-width="180" align="center">
        <template slot-scope="scope">
          {{ formatMemory(scope.row.memory_stats) }}
        </template>
      </el-table-column>
      <el-table-column label="MEM %" min-width="150" align="center">
        <template slot-scope="scope">
          {{ formatMemory2(scope.row.memory_stats) }}
        </template>
      </el-table-column>
      <el-table-column label="networks" width="210" align="center">
        <template slot-scope="scope">
          {{ formatNet(scope.row.networks) }}
        </template>
      </el-table-column>
      <el-table-column label="实时日志" width="100" align="center">
        <template slot-scope="scope">
          <span  v-if="scope.row.Follow" style="color: #03c961;">已开启</span>
          <span  v-if="!scope.row.Follow" style="color: #d70404;">未开启</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button :loading="listLoading" :disabled="scope.row.Follow" type="text" @click="startLog(scope.row )">开启日志</el-button>
          <el-button :loading="listLoading" :disabled="!scope.row.Follow" type="text" @click="closeLog(scope.row )">关闭日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogDetailVisible" title="详情">
      <pre>
{{ JSON.stringify(selectRow, null, 2) }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getStatsList } from '@/api/stats'
import { getContainerInfos, getServerNames } from '@/api/table'
import { getLogStart, getLogClose } from '@/api/logs'
import { formatMemory, formatMemory2, formatNet, formatCpu } from '@/utils/docker'

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
      selectRow: {},
      res: {
        serverNames: [],
        ContainerNames: [],
        containerInfos: []
      },
      listQuery: {
        serverNames: [],
        ContainerNames: [],
        Follow: undefined
      }
    }
  },
  created() {
    this.fetchServerNames()
    this.fetchContainerInfoData()
    this.fetchData()
  },
  methods: {
    fetchServerNames() {
      this.listLoading = true
      getServerNames().then(resp => {
        this.res.serverNames = resp.data
        this.listLoading = false
      })
    },
    fetchContainerInfoData() {
      this.loading = true
      getContainerInfos().then(resp => {
        const d = resp.data
        this.res.ContainerNames = []
        for (const i in d) {
          for (const j in d[i].containers) {
            const name = d[i].containers[j].Names
            if (this.res.ContainerNames.indexOf(name) === -1) {
              this.res.ContainerNames.push(name)
            }
          }
        }
        this.loading = false
      })
    },
    fetchData() {
      this.listLoading = true
      getStatsList(this.listQuery).then(r => {
        this.list = r.data
        this.listLoading = false
      })
    },
    startLog(row) {
      const form = {
        'containerId': row.id
      }
      this.loading = true
      getLogStart(form).then(resp => {
        this.loading = false
        this.$message('命令已下发')
      }).catch(resp => {
        this.loading = false
        this.$message(resp.msg)
      })
    },
    closeLog(row) {
      const form = {
        'containerId': row.id
      }
      this.loading = true
      getLogClose(form).then(resp => {
        this.loading = false
        this.$message('命令已下发')
      }).catch(resp => {
        this.loading = false
      })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
    },
    formatMemory(m) {
      return formatMemory(m)
    },
    formatMemory2(m) {
      return formatMemory2(m)
    },
    formatCpu(c) {
      return formatCpu(c)
    },
    formatNet(n) {
      return formatNet(n)
    }
  }
}
</script>
