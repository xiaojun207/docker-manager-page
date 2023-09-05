<template>
  <div class="app-container">
    <div style="margin-bottom: 15px" />
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column :label="$t('字段名称')" width="270">
        <template v-slot="scope">
          <el-button type="primary" link >{{ scope.row.Name }}</el-button>
        </template>
      </el-table-column>

      <el-table-column min-width="270px" :label="$t('值')">
        <template v-slot="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.Value" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.Value }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('备注')" width="270">
        <template v-slot="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.Memo" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.Memo }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('操作')" width="270">
        <template v-slot="{ row }">
          <el-button
            v-if="!row.edit"
            type="primary"
            size="small"
            :icon="ElIconEdit"
            @click="row.edit = !row.edit"
          >Edit</el-button>
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            @click="confirmEdit(row)"
          >OK</el-button>
          <el-button
            v-if="row.edit"
            type="warning"
            size="small"
            :icon="ElIconRefresh"
            @click="cancelEdit(row)"
          >Cancel</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Edit as ElIconEdit, Refresh as ElIconRefresh } from '@element-plus/icons-vue'
import { getConfig, updateConfig } from '@/api/config'

export default {
  data() {
    return {
      listLoading: false,
      list: [],
      ElIconEdit,
      ElIconRefresh
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getConfig().then((resp) => {
        this.list = resp.data.map((v) => {
          v['edit'] = false // https://vuejs.org/v2/guide/reactivity.html
          v.originalValue = v.Value //  will be used when user click the cancel botton
          v.originalMemo = v.Memo
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.Value = row.originalValue
      row.Memo = row.originalMemo
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      row.originalValue = row.Value
      row.originalMemo = row.Memo
      this.listLoading = true
      updateConfig(row).then((resp) => {
        this.$message(this.$t('发布成功'))
        this.listLoading = false
        this.fetchData()
      })
    }
  }
}
</script>
