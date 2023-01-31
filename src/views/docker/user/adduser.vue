<template>
  <el-dialog v-model="dialogVisible" :title="$t('添加用户')" width="30%">
    <el-form
      v-loading="formLoading"
      label-position="right"
      label-width="120px"
      :model="formUser"
    >
      <el-form-item :label="$t('昵称')" :rules="rules.nickname">
        <el-input v-model="formUser.nickname" />
      </el-form-item>
      <el-form-item :label="$t('用户名')" :rules="rules.username">
        <el-input v-model="formUser.username" />
      </el-form-item>
      <el-form-item :label="$t('手机')" prop="mobile" :rules="rules.mobile">
        <el-input v-model="formUser.mobile" />
      </el-form-item>
      <el-form-item :label="$t('邮箱')" prop="email" :rules="rules.email">
        <el-input v-model="formUser.email" />
      </el-form-item>
      <el-form-item :label="$t('密码')" :rules="rules.password">
        <el-input v-model="formUser.password" show-password />
      </el-form-item>
      <el-form-item :label="$t('角色')">
        <el-select v-model="formUser.role" :placeholder="$t('请选择')">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="addUser">{{ $t('确定') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { addUser } from '@/api/user'
import { checkPhoneNumber, checkIdNum } from '@/utils/validate'

export default {
  name: 'AddUser',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roles: [
        { label: '超级管理员', value: 'ADMIN' },
        { label: '客户端代理', value: 'AGENT' }
      ],
      formLoading: false,
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 15, message: '请输入正确的昵称', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        checkPhone: [
          { required: true, validator: checkPhoneNumber, trigger: 'blur' }
        ],
        checkId: [{ required: true, validator: checkIdNum, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 6, max: 11, message: '请输入正确的手机号码', trigger: 'blur' },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('请输入邮箱地址'),
            trigger: 'blur'
          },
          {
            type: 'email',
            message: this.$t('请输入正确的邮箱地址'),
            trigger: ['blur', 'change']
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      formUser: {
        nickname: '',
        username: '',
        mobile: '',
        email: '',
        password: '',
        role: ''
      }
    }
  },
  updated() {},
  created() {},
  methods: {
    addUser() {
      this.formLoading = true
      addUser(this.formUser)
        .then((r) => {
          this.formLoading = false
          close()
        })
        .catch((e) => {
          console.log(e)
          this.formLoading = false
          close()
        })
    },
    onCancel() {
      // this.dialogVisible = false
      this.formLoading = false
      // this.$emit('onCancel')
      close()
    },
    close() {
      console.log('close')
      this.dialogVisible = false
      // this.$emit('update:dialogVisible', !this.dialogVisible)
    }
  }
}
</script>
