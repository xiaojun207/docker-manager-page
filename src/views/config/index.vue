<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
    </div>
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
      <el-table-column :label="$t('字段名称')"  width="270">
        <template slot-scope="scope">
          <el-button type="text" >{{ scope.row.Name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('值')" align="center">
        <template slot-scope="scope">
          {{ scope.row.Value }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('备注')"  width="270">
        <template slot-scope="scope">
          {{ scope.row.Memo }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getConfig, updateConfig } from '@/api/config'

export default {
  data() {
    return {
      list:[],
      form: {
        TaskFrequency: 600
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.listLoading = true
      console.log('this.form:', this.form)
      updateConfig(this.form).then(resp => {
        this.$message(this.$t('发布成功'))
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      getConfig().then(resp => {
        this.list = resp.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

