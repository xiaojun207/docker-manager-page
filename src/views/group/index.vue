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
          <el-button :loading="listLoading" @click="delGroup(scope.row)" size="small" type="text">{{ $t("删除") }}</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getAppGroup, delGroup } from '@/api/app'

export default {
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
      getAppGroup().then(r => {
        this.list = r.data
        // for (const k in r.data) {
        //   const item = {
        //     'appName': k,
        //     'ServerNames': r.data[k]
        //   }
        //   this.list.push(item)
        // }
        this.listLoading = false
      })
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
