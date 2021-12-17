<template>
  <div class="app-container">

    <div class="filter-container">
      <el-select v-model="listQuery.serverNames" multiple filterable :placeholder="$t('服务器')" clearable collapse-tags class="filter-item" style="width: 300px;margin-right: 10px;">
        <el-option v-for="item in res.serverNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        Search
      </el-button>

    </div>

    <el-table
      ref="tableList"
      v-loading="listLoading"
      :data="list.filter( r => !search || r.RepoTags.toLowerCase().includes(search.toLowerCase()))"
      :span-method="spanMethod"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row
      class="filter-tree"
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
      <el-table-column label="ImageId" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.ImageId" placement="top-start">
            <el-button type="text" @click="openDetail(scope.row)">{{ formatImageId(scope.row.ImageId) }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Tags" align="center">

        <template slot="header" slot-scope="scope">
          Tags
          <el-input v-model="search" size="mini" :placeholder="$t('输入关键字过滤')" style="width: 140px"/>
        </template>
        <template slot-scope="scope">
          <div v-for="item in formatTags(scope.row.RepoTags)" :key="item">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Size" align="center">
        <template slot-scope="scope">
          {{ formatSize(scope.row.Size) }}
        </template>
      </el-table-column>
      <el-table-column label="RepoDigests" align="center">
        <template slot-scope="scope">
          {{ scope.row.RepoDigests }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Created" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ formatDate(scope.row.Created) }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('操作')" width="170" align="center">

        <template slot-scope="scope">
          <el-button :loading="listLoading" type="text" @click="ImageOperator('remove', scope.row )">{{ $t('删除') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-loading="detailLoading" :visible.sync="dialogDetailVisible" :title="$t('详情')">
      <pre>
{{ JSON.stringify(selectRow, null, 2) }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import { getServerNames } from '@/api/server'
import { getImage, getImageList, ImageOperator } from '@/api/image'
import { formatDate } from '@/utils/index'
import { formatSize, FormatName } from '@/utils/docker'

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
      detailLoading: false,
      dialogDetailVisible: false,
      selectRow: {},
      res: {
        serverNames: []
      },
      listQuery: {
        serverNames: []
      },
      filterText: '',
      search: ''
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
    this.fetchServerNames()
  },
  methods: {
    ImageOperator(operator, row) {
      this.listLoading = true
      const data = { 'ImageId': row.ImageId, 'serverName': row.ServerName }
      ImageOperator(operator, data).then(resp => {
        if (resp.code === '100200') {
          this.$message({
            message: this.$t('命令下发成功'),
            type: 'success'
          })
          this.fetchData()
        }
        this.listLoading = false
      })
    },
    fetchServerNames() {
      getServerNames().then(resp => {
        this.res.serverNames = resp.data
      })
    },
    fetchData() {
      this.listLoading = true
      getImageList(this.listQuery).then(r => {
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
    FormatName(names) {
      return FormatName(names)
    },
    formatSize(s) {
      return formatSize(s)
    },
    formatTags(s) {
      // const arr = s.split(',')
      // return s.replaceAll(',', '\r\n<br>')
      return s.split(',')
    },
    formatImageId(s) {
      return s.substr(7, 12)
    },
    openDetail(row) {
      this.dialogDetailVisible = true
      this.detailLoading = true
      this.selectRow = row
      const params = {
        ImageId: row.ImageId
      }
      getImage(params).then(r => {
        this.detailLoading = false
        this.selectRow = r.data
        console.log(r.data)
      })
    }
  }

}
</script>
