<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.serverNames" multiple filterable placeholder="服务器" clearable collapse-tags class="filter-item" style="width: 300px">
        <el-option v-for="item in res.serverNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.ContainerNames" multiple filterable placeholder="容器名称" clearable collapse-tags class="filter-item" style="width: 300px;margin-left: 10px">
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
      :data="list"
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
      <el-table-column label="State" width="100" align="center">
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
      <el-table-column label="Command" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.Command }}
        </template>
      </el-table-column>
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
      <el-table-column class-name="status-col" label="操作" width="170" align="center">
        <template slot-scope="scope">
          <el-button :loading="listLoading" :disabled="scope.row.State !== 'running'" type="text" @click="ContainerOperator('stop', scope.row )">停止</el-button>
          <el-button :loading="listLoading" type="text" @click="ContainerOperator('remove', scope.row )">删除</el-button>
          <el-button :loading="listLoading" type="text" @click="ContainerOperator('restart', scope.row )">重启</el-button>
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
import { getContainers, ContainerOperator, getServerNames, getContainerInfos } from '@/api/table'
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
        state: undefined
      }
    }
  },
  computed: {
    groupNum() { // 获取班级列表数组
      return new Set(this.list.map(o => o.ServerName))
    }
  },
  created() {
    this.fetchData()
    this.fetchContainerInfoData()
    this.fetchServerNames()
  },
  methods: {
    ContainerOperator(operator, row) {
      this.listLoading = true
      const data = { 'containerId': row.Id, 'serverNames': [row.ServerName] }
      ContainerOperator(operator, data).then(resp => {
        if (resp.code === '100200') {
          this.$message({
            message: '命令下发成功',
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
      getContainers(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    classGroup(name) {
      return this.list.filter(o => o.ServerName === name).length
    },
    classNameLen(name) {
      const tmp = Array.from(this.groupNum)
      const index = tmp.indexOf(name)
      let len = 0
      for (let i = 0; i < index; i++) {
        len += this.classGroup(tmp[i])
      }
      return len
    },
    spanMethod(data) { // 对于表格数据进行分组合并操作，UI组件回调函数
      const { row, rowIndex, columnIndex } = data
      if (columnIndex === 1) { // 班级合并展示区
        const len = this.classGroup(row.ServerName)
        const lenName = this.classNameLen(row.ServerName)
        if (rowIndex === lenName) { // 某班级首位学生行
          return {
            rowspan: len,
            colspan: 1
          }
        } else {
          return { // 某班级非首位学生行
            rowspan: 0,
            colspan: 0
          }
        }
      } else { // 学生信息展示区
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
    }
  }

}
</script>
