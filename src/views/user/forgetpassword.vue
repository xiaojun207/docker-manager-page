<template>
  <div class="app-container">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('首页') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('忘记密码') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider />

    <div>
      <lang />
    </div>

    <el-tabs v-model="activeName" v-loading="loading" type="card" style="width: 800px;margin: 0 auto;">

      <el-tab-pane :label="$t('管理员找回密码')" name="first">
        <el-form ref="form" :model="form" label-width="140px">

          <el-form-item :label="$t('用户名或邮箱')" style="padding-top: 40px;">
            <el-input v-model="form.username" :placeholder="$t('请输入用户名或邮箱')" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.code" :placeholder="$t('请输入验证码')" >
              <el-select slot="prepend" v-model="form.codeType" :placeholder="$t('请选择')" style="width: 200px;">
                <el-option :label="$t('控制台验证码')" value="console">{{ $t('控制台验证码') }}</el-option>
<!--                <el-option :label="$t('邮箱验证码')" value="mail">{{ $t('邮箱验证码') }}</el-option>-->
              </el-select>
              <el-button slot="append" type="primary" @click="onGetCode">{{ $t('获取验证码') }}</el-button>
            </el-input>
          </el-form-item>
          <div v-if="form.codeType=='console'" style="line-height: 40px;padding: 0px 0px 20px 120px;color: #86898d;font-size: 14px">
            {{ $t('验证码将会打印到docker-manager的控制台日志') }}
          </div>
          <el-form-item>
            <el-button type="primary" style="width: 200px" @click="onResetPassword">{{ $t('重置密码') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('非管理员找回密码')" name="second">
        <div style="line-height: 40px;padding: 10px;color: #86898d;">
          {{ $t('请联系管理员，重置密码') }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { forgetPassword } from '@/api/user'
import { sendCode } from '@/api/code'
import Lang from '@/components/Lang'

export default {
  components: {
    Lang
  },
  data() {
    return {
      activeName: 'first',
      loading: false,
      form: {
        code: '',
        codeType: 'console',
        username: ''
      }
    }
  },
  created() {
  },
  methods: {
    onResetPassword() {
      this.loading = true
      console.log('this.form:', this.form)
      forgetPassword(this.form).then(r => {
        this.loading = false
        this.$alert(this.$t('密码仅显示一次，请备份：') + r.data, this.$t('密码重置成功'), {
          confirmButtonText: this.$t('确定')
        })
      }).catch(e => {
        this.loading = false
      })
    },
    onGetCode() {
      sendCode({ username: this.form.username, codeType: this.form.codeType, key: '' + Math.random() }).then(r => {
        this.$message(this.$t('发送成功'))
      })
    }
  }
}
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

