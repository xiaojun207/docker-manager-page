<template>
  <div class="app-container">
    <div style="padding-bottom: 10px">
      <el-button type="primary" @click="dialogVisible = true">{{ $t('添加用户') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="95" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Username" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Mobile" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="Email" width="170" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Nickname" width="170" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Role" align="center">
        <template slot-scope="scope">
          {{ formatRole(scope.row.role) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('状态')" align="center">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="Create" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.create_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Update" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.update_date) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')" align="center">
        <template slot-scope="scope" :loading="scope.row.Loading">
          <el-button size="small" type="text" @click="deleteUser(scope.row)">{{ $t("删除") }}</el-button>
          <el-button size="small" type="text" @click="changeStatus(scope.row, scope.row.status === 0 ? 1 : 0)">{{ scope.row.status === 0 ? $t('禁用'):$t('恢复') }}</el-button>
          <el-button size="small" type="text" @click="resetPassword(scope.row)">{{ $t("密码重置") }}</el-button>
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

    <el-dialog
      :title="$t('添加用户')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form v-loading="formLoading" :model="formUser" label-position="right" label-width="120px">
        <el-form-item :label="$t('昵称')" :rules="rules.nickname">
          <el-input v-model="formUser.nickname" :placeholder="$t('请输入昵称')" />
        </el-form-item>
        <el-form-item :label="$t('用户名')" :rules="rules.username">
          <el-input v-model="formUser.username" :placeholder="$t('请输入用户名')" />
        </el-form-item>
        <el-form-item :label="$t('手机')" prop="mobile" :rules="rules.mobile">
          <el-input v-model="formUser.mobile" :placeholder="$t('请输入手机号码')" />
        </el-form-item>
        <el-form-item :label="$t('邮箱')" prop="email" :rules="rules.email">
          <el-input v-model="formUser.email" :placeholder="$t('请输入邮箱地址')" />
        </el-form-item>
        <el-form-item :label="$t('密码')" :rules="rules.password">
          <el-input v-model="formUser.password" :placeholder="$t('请输入密码')" show-password />
        </el-form-item>
        <el-form-item :label="$t('角色')">
          <el-select v-model="formUser.role" :placeholder="$t('请选择')">
            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="addUser">{{ $t('确定') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteUser, changeStatus, getUserList, resetPassword } from '@/api/user'
import { formatDate } from '@/utils/index'
import { addUser } from '@/api/user'
import { checkPhoneNumber, checkIdNum } from '@/utils/validate'

export default {
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      listLoading: false,
      roleStr: { 'ADMIN': this.$t('超级管理员'), 'AGENT': this.$t('客户端代理') },
      roles: [{ 'label': this.$t('超级管理员'), value: 'ADMIN' }, { 'label': this.$t('客户端代理'), value: 'AGENT' }],
      formLoading: false,
      rules: {
        nickname: [{ required: true, message: this.$t('请输入昵称'), trigger: 'blur' }, { min: 3, max: 15, message: this.$t('请输入正确的昵称'), trigger: 'blur' }],
        username: [{ required: true, message: this.$t('请输入用户名'), trigger: 'blur' }, { min: 3, max: 20, message: this.$t('请输入正确的用户名'), trigger: 'blur' }],
        checkPhone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
        checkId: [{ required: true, validator: checkIdNum, trigger: 'blur' }],
        mobile: [{ required: true, message: this.$t('请输入手机号码'), trigger: 'blur' }, { min: 6, max: 11, message: this.$t('请输入正确的手机号码'), trigger: 'blur' }, { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: this.$t('请输入正确的手机号码') }],
        email: [{ required: true, message: this.$t('请输入邮箱地址'), trigger: 'blur' }, { type: 'email', message: this.$t('请输入正确的邮箱地址'), trigger: ['blur', 'change'] }],
        password: [{ required: true, message: this.$t('请输入密码'), trigger: 'blur' }]
      },
      formUser: {
        nickname: '',
        username: '',
        mobile: '',
        email: '',
        password: '',
        role: ''
      },
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
    fetchData() {
      this.listLoading = true
      getUserList(this.page).then(r => {
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
    formatDate(t) {
      return formatDate(t)
    },
    formatStatus(s) {
      return s === 0 ? this.$t('正常') : this.$t('禁用')
    },
    formatRole(s) {
      const roleStr = { 'ADMIN': this.$t('超级管理员'), 'AGENT': this.$t('客户端代理') }
      return roleStr[s]
    },
    changeStatus(r, s) {
      r.Loading = true
      const data = {
        username: r.username,
        status: s
      }
      changeStatus(data).then(r => {
        r.Loading = false
        this.fetchData()
      })
    },
    resetPassword(r) {
      r.Loading = true
      const data = {
        username: r.username
      }
      resetPassword(data).then(r => {
        r.Loading = false
        this.$alert(this.$t('密码仅显示一次，请备份：') + r.data, this.$t('密码重置成功'), {
          confirmButtonText: this.$t('确定')
        })
        this.fetchData()
      })
    },
    deleteUser(r) {
      this.$confirm(this.$t('此操作将永久删除该用户, 是否继续?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(() => {
        r.Loading = true
        const data = {
          id: r.id
        }
        deleteUser(data).then(r => {
          r.Loading = false
          this.fetchData()
        })
      })
    },
    addUser() {
      this.formLoading = true
      addUser(this.formUser).then(r => {
        this.formLoading = false
        this.dialogVisible = false
        this.fetchData()
      }).catch(e => {
        console.log(e)
        this.formLoading = false
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
