<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.ServerNames" multiple filterable :placeholder="$t('主机')" clearable collapse-tags class="filter-item" style="width: 300px">
        <el-option v-for="item in res.serverNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.ContainerNames" multiple filterable :placeholder="$t('容器名称')" clearable collapse-tags class="filter-item" style="width: 300px;margin-left: 10px">
        <el-option v-for="item in res.ContainerNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.state" placeholder="state" clearable filterable style="width: 140px;margin-left: 10px;margin-right: 10px;" class="filter-item">
        <el-option key="running" label="running" value="running" />
        <el-option key="exited" label="exited" value="exited" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        Search
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list.filter(r => filterMatch(r))"
      :span-method="spanMethod"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top: 20px;"
    >
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="ServerName" width="170">
        <template slot-scope="scope">
          {{ scope.row.ServerName }}
        </template>
      </el-table-column>
      <el-table-column label="Name" >
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row )" :title="scope.row.Name">{{ scope.row.Name }}</el-button>
        </template>
        <template slot="header" slot-scope="scope">
          Name
          <el-input v-model="filterSearch.Name" size="mini" :placeholder="$t('输入关键字过滤')" style="width: 140px"/>
        </template>
      </el-table-column>
      <el-table-column label="IMAGE" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Image }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.Status }}
        </template>
      </el-table-column>
      <el-table-column label="State" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.State === 'running'" style="color: #03c961;">{{ scope.row.State }}</span>
          <span v-if="scope.row.State !== 'running'" style="color: #d70404;">{{ scope.row.State }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ports" width="270" align="center">
        <template slot-scope="scope">
          <div v-for="item in scope.row.Ports" :key="item.key">{{ PortToStr(item) }}</div>
        </template>
      </el-table-column>
<!--      <el-table-column label="Command" width="200" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.Command }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Mounts">-->
<!--        <template slot-scope="scope">-->
<!--          <div v-for="item in scope.row.Mounts" :key="item.key">{{ item.Source + ' : ' + item.Destination }}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column align="center" prop="created_at" label="Created" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ formatDate(scope.row.Created) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" prop="created_at" label="Update" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <i class="el-icon-time" />-->
<!--          <span>{{ formatDate(scope.row.Update) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column class-name="status-col" :label="$t('操作')" width="170" align="center">
        <template slot-scope="scope">
          <el-button :loading="listLoading" :disabled="scope.row.State !== 'running'" type="text" @click="ContainerOperator('stop', scope.row )">{{ $t('停止') }}</el-button>
          <el-button :loading="listLoading" type="text" @click="ContainerOperator('remove', scope.row )">{{ $t('删除') }}</el-button>
          <el-button :loading="listLoading" type="text" @click="ContainerOperator('restart', scope.row )">{{ $t('重启') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogDetailVisible" :title="$t('详情')">
      <pre>
{{ JSON.stringify(selectRow, null, 2) }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getContainer, getContainers, ContainerOperator, getContainerInfos } from '@/api/container'
import { getServerNames } from '@/api/server'
import { formatDate } from '@/utils/index'
import { PortsToStr, FormatName } from '@/utils/docker'

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
      groupList: [],
      groups: {},
      listLoading: false,
      dialogDetailVisible: false,
      selectRow: {},
      filterSearch: {
        Name: ''
      },
      res: {
        serverNames: [],
        ContainerNames: [],
        containerInfos: []
      },
      listQuery: {
        ServerNames: [],
        ContainerNames: [],
        state: undefined
      }
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
    this.fetchContainerInfoData()
    this.fetchServerNames()
  },
  methods: {
    ContainerOperator(operator, row) {
      this.listLoading = true
      const data = { 'ContainerId': row.ContainerId, 'ServerNames': [row.ServerName] }
      ContainerOperator(operator, data).then(resp => {
        if (resp.code === '100200') {
          this.$message({
            message: this.$t('命令下发成功'),
            type: 'success'
          })
          // this.fetchData()
        } else {
          this.$message({
            message: resp.msg,
            type: 'warning'
          })
        }
        this.listLoading = false
      })
    },
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
            const name = d[i].containers[j].Name

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
      getContainers(this.listQuery).then(r => {
        this.list = r.data
        this.list.sort(function(a, b) {
          return a.ServerName.localeCompare(b.ServerName)
        })
        this.groupList = new Set(this.list.map(o => o.ServerName))
        this.groups = {}
        for (let i = 0; i < this.list.length; i++) {
          const item = this.list[i]
          let group = this.groups[item.ServerName]
          if (!group) {
            group = {
              ServerName: item.ServerName,
              Members: 0,
              StartIdx: i
            }
          }
          group.Members = group.Members + 1
          this.groups[item.ServerName] = group
        }
        this.listLoading = false
      })
    },
    spanMethod(data) { // 对于表格数据进行分组合并操作，UI组件回调函数
      const { row, rowIndex, columnIndex } = data
      if (columnIndex === 1) { // ServerName合并展示区
        const group = this.groups[row.ServerName]
        if (rowIndex === group.StartIdx) { // ServerName首位学生行
          return {
            rowspan: group.Members,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
    formatDate(d) {
      return formatDate(d)
    },
    PortsToStr(Ports) {
      return PortsToStr(Ports)
    },
    PortToStr(p) {
      const pub = (p.IP ? p.IP : '') + (p.PublicPort ? ':' + p.PublicPort : '')
      return (pub ? pub + ' -> ' : '') + p.PrivatePort + '/' + p.Type
    },
    FormatName(names) {
      return FormatName(names)
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
      const params = { ContainerId: row.ContainerId }
      getContainer(params).then(r => {
        this.selectRow = r.data
      })
    },
    filterMatch(r) {
      return !this.filterSearch.Name || r.Name.toLowerCase().includes(this.filterSearch.Name.toLowerCase())
    }
  }

}
</script>
