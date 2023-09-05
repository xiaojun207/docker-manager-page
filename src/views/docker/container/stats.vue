<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.serverNames"
        multiple
        filterable
        :placeholder="$t('主机')"
        clearable
        collapse-tags
        class="filter-item"
        style="width: 300px"
      >
        <el-option
          v-for="item in res.serverNames"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.ContainerNames"
        multiple
        filterable
        :placeholder="$t('容器名称')"
        clearable
        collapse-tags
        class="filter-item"
        style="width: 300px; margin-left: 10px"
      >
        <el-option
          v-for="item in res.ContainerNames"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.Follow"
        :placeholder="$t('是否开启日志')"
        clearable
        filterable
        style="width: 140px; margin-left: 10px; margin-right: 10px"
        class="filter-item"
      >
        <el-option key="true" :label="$t('是')" value="true" />
        <el-option key="false" :label="$t('否')" value="false" />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        :icon="ElIconSearch"
        @click="fetchData"
      >
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
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="210">
        <template v-slot="scope">
          <el-button type="primary" link @click="openDetail(scope.row)">{{
            scope.row.Name
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="ServerName" width="170" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.ServerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CpuStats" width="150" align="center">
        <template v-slot="{ row }">
          {{ row.CpuStats == 0 ? '' : row.CpuStats.toFixed(2) + '%' }}
        </template>
      </el-table-column>
      <el-table-column label="MemoryStats" min-width="180" align="center">
        <template v-slot="scope">
          {{ scope.row.MemoryStats }}
        </template>
      </el-table-column>
      <el-table-column label="MEM %" min-width="150" align="center">
        <template v-slot="{ row }">
          {{
            row.MemoryStatsPercent == 0
              ? ''
              : row.MemoryStatsPercent.toFixed(2) + '%'
          }}
        </template>
      </el-table-column>
      <el-table-column label="Networks" width="210" align="center">
        <template v-slot="scope">
          {{ scope.row.Networks }}
        </template>
      </el-table-column>
      <el-table-column label="UpdateDate" width="210" align="center">
        <template v-slot="scope">
          {{ formatDate(scope.row.UpdateDate) }}
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
      style="width: 500px; margin: 10px auto 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogDetailVisible" :title="$t('详情')">
      <pre style="text-indent: -2em;">
    {{ JSON.stringify(selectRow, null, 2) }}
          </pre>
    </el-dialog>
  </div>
</template>

<script>
import { Search as ElIconSearch } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/index'
import { getStats, getStatsList } from '@/api/stats'
import { getContainerInfos } from '@/api/container'
import { getServerNames } from '@/api/server'
import { getLogStart, getLogClose } from '@/api/logs'

export default {
  data() {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
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
      },
      ElIconSearch
    }
  },
  created() {
    this.fetchServerNames()
    this.fetchContainerInfoData()
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
    fetchServerNames() {
      this.listLoading = true
      getServerNames().then((resp) => {
        this.res.serverNames = resp.data
        this.listLoading = false
      })
    },
    fetchContainerInfoData() {
      this.loading = true
      getContainerInfos().then((resp) => {
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
      this.listQuery.currentPage = this.page.currentPage
      this.listQuery.pageSize = this.page.pageSize
      getStatsList(this.listQuery).then((r) => {
        this.list = r.data.list
        this.page = r.data.page
        this.listLoading = false
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
    startLog(row) {
      const form = {
        containerId: row.ContainerId
      }
      this.loading = true
      getLogStart(form)
        .then((resp) => {
          this.loading = false
          this.$message(this.$t('命令已下发'))
        })
        .catch((resp) => {
          this.loading = false
          this.$message(resp.msg)
        })
    },
    closeLog(row) {
      const form = {
        containerId: row.ContainerId
      }
      this.loading = true
      getLogClose(form)
        .then((resp) => {
          this.loading = false
          this.$message(this.$t('命令已下发'))
        })
        .catch((resp) => {
          this.loading = false
        })
    },
    openDetail(row) {
      this.selectRow = row
      this.dialogDetailVisible = true
      getStats({ ContainerId: row.ContainerId }).then((r) => {
        this.selectRow = r.data
      })
    },
    formatDate(d) {
      return formatDate(d)
    }
  }
}
</script>
