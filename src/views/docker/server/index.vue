<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="
        list.filter(
          (r) =>
            !filterSearch.Name ||
            r.Name.toLowerCase().includes(filterSearch.Name.toLowerCase())
        )
      "
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template v-slot="scope">
          <el-button type="primary" link @click="openDetail(scope.row)">{{
            scope.row.Name
          }}</el-button>
        </template>
        <template v-slot:header align="center">
          Name
          <el-input
            v-model="filterSearch.Name"
            :placeholder="$t('过滤关键字')"
            style="width: 140px"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('运行容器')" width="80" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.Running + '/' + scope.row.Containers }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('镜像')" width="170" align="center">
        <template v-slot="{ row }">
          <span>{{ row.Images }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Cpu" width="110" align="center">
        <template v-slot="scope">
          {{ scope.row.Cpu }}
        </template>
      </el-table-column>
      <el-table-column label="MemTotal" width="110" align="center">
        <template v-slot="scope">
          {{ (scope.row.Memory / (1024 * 1024)).toFixed(3) + 'MB' }}
        </template>
      </el-table-column>
      <el-table-column label="Private IP" width="150" align="center">
        <template v-slot="scope">
          {{ scope.row.PrivateIp }}
        </template>
      </el-table-column>
      <el-table-column label="Host IP" width="150" align="center">
        <template v-slot="scope">
          {{ scope.row.HostIp }}
        </template>
      </el-table-column>
      <el-table-column label="Public IP" width="150" align="center">
        <template v-slot="scope">
          {{ scope.row.PublicIp }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="DockerVersion" width="120">
        <template v-slot="scope">
          <span>{{ scope.row.DockerVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="LastDataTime" width="120">
        <template v-slot="scope">
          <span>{{ formatTime(scope.row.LastDataTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="State" width="100" align="center">
        <template v-slot="scope">
          <span
            :style="{
              color: scope.row.State === 'connected' ? '#03c961' : '#d70404',
            }"
          >{{ scope.row.State }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('操作')" width="100" align="center">
        <template v-slot="scope">
          <el-button type="danger" link @click="deleteServer(scope.row)">{{
            $t('删除')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :hide-on-single-page="true"
      :current-page="page.currentPage"
      :page-sizes="[10, 30, 50, 100, 200, 300, 400]"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper, sizes, total"
      :total="page.total"
      style="width: 500px; margin: 0 auto; margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      v-model="dialogDetailVisible"
      title="详情"
      @dragDialog="handleDrag"
    >
      <pre style="text-indent: -2em;">
    {{ JSON.stringify(selectRow, null, 2) }}
          </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getServerList, getServer, deleteServer } from '@/api/server'
import { formatTime } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      filterSearch: {
        Name: ''
      },
      dialogDetailVisible: false,
      selectRow: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    statusFilter_filter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    fetchData() {
      this.listLoading = true
      getServerList(this.page).then((r) => {
        this.listLoading = false
        this.list = r.data.list
        this.page = r.data.page
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.fetchData()
    },
    deleteServer(row) {
      row.loading = true
      deleteServer({ ServerName: row.Name }).then((r) => {
        row.loading = false
        this.$message(this.$t('成功'))
        this.fetchData()
      })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
      getServer({ ServerName: row.Name }).then((r) => {
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
