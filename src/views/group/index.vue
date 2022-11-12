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
          {{ scope.row.Id }}
        </template>
      </el-table-column>
      <el-table-column label="ServiceName" width="270">
        <template slot-scope="scope">
          <el-button type="text">{{ scope.row.ServiceName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="ServerNames" align="center">
        <template slot-scope="scope">
          {{ scope.row.ServerName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')" align="center" width="170">
        <template slot-scope="scope">
          <el-button :loading="listLoading" size="small" type="text" @click="delGroup(scope.row)">{{ $t("删除") }}</el-button>
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
      style="width: 500px;margin: 0 auto;margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getAppGroup, delGroup } from '@/api/app'

export default {
  data() {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.listQuery = {}
      this.listQuery.currentPage = this.page.currentPage
      this.listQuery.pageSize = this.page.pageSize
      getAppGroup(this.listQuery).then(r => {
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
    delGroup(row) {
      this.listLoading = true
      delGroup({ 'id': row.Id }).then(r => {
        this.listLoading = false
        this.$message(this.$t('成功'))
        this.fetchData()
      })
    }
  }
}
</script>
