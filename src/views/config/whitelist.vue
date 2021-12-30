<template>
  <div class="app-container">
    <div style="padding-bottom: 10px">
      <el-button type="primary" @click="addWhiteIp">{{ $t('添加') }} IP</el-button>
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
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.IP }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('操作')" width="270">
        <template slot-scope="{row}">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteWhiteIp(row)">{{ $t('删除') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getWhiteList, deleteWhiteIp, addWhiteIp } from '@/api/config'

export default {
  data() {
    return {
      listLoading: false,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getWhiteList().then(resp => {
        this.list = resp.data
        this.listLoading = false
      })
    },
    addWhiteIp() {
      this.$prompt(this.$t('请输入') + 'IP', this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        inputPattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?)(,((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))|\*)((\/([012]\d|3[012]|\d))?))*$/,
        inputErrorMessage: 'IP' + this.$t('格式不正确')
      }).then(({ value }) => {
        addWhiteIp({ IP: value }).then(r => {
          this.$message(this.$t('添加成功'))
        })
      })
    },
    deleteWhiteIp(row) {
      this.listLoading = true
      deleteWhiteIp(row).then(r => {
        this.$message(this.$t('删除成功'))
        this.listLoading = false
        this.fetchData()
      })
    }
  }
}
</script>
