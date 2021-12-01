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
      <el-table-column label="AppName" width="270">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row )">{{ scope.row.Name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Image" width="270">
        <template slot-scope="scope">
          {{ scope.row.Image }}
        </template>
      </el-table-column>
      <el-table-column label="MaxMemory" width="170">
        <template slot-scope="scope">
          {{ formatSize(scope.row.Memory) }}
        </template>
      </el-table-column>
      <el-table-column label="Ports" width="270">
        <template slot-scope="scope">
          <div v-for="item in scope.row.Ports" :key="item.key">{{ PortToStr(item) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Volumes">
        <template slot-scope="scope">
          <div v-for="item in scope.row.Volumes" :key="item.key">{{ item }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Env" align="center">
        <template slot-scope="scope">
          <div v-for="item in scope.row.scope" :key="item.key">{{ item }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')" align="center">
        <template slot-scope="scope">
          <el-button :loading="listLoading" @click="delApp(scope.row)" size="small" type="text">{{ $t("删除") }}</el-button>
          <el-button :loading="listLoading" @click="updateApp(scope.row)" size="small" type="text">{{ $t("更新") }}</el-button>
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
import { getAppList, delApp, updateApp } from '@/api/app'
import { PortsToStr, FormatVolumes, formatSize } from '@/utils/docker'

export default {
  data() {
    return {
      list: null,
      selectRow: {},
      dialogDetailVisible: false,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAppList().then(r => {
        this.list = r.data
        this.listLoading = false
      })
    },
    delApp(row) {
      const data = {
        'Name': row.Name
      }
      this.listLoading = true
      delApp(data).then(r => {
        this.$message(r.msg)
        this.listLoading = false
      })
    },
    updateApp(row) {
      const data = {
        'Name': row.Name
      }
      this.listLoading = true
      updateApp(data).then(r => {
        this.$message(r.msg)
        this.listLoading = false
      })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
    },
    PortsToStr(ports) {
      return PortsToStr(ports)
    },
    PortToStr(p) {
      const pub = (p.IP ? p.IP : '') + (p.PublicPort ? ':' + p.PublicPort : '')
      return (pub ? pub + ' -> ' : '') + p.PrivatePort + '/' + p.Type
    },
    FormatVolumes(values) {
      return FormatVolumes(values)
    },
    formatSize(values) {
      return formatSize(values)
    }
  }
}
</script>
