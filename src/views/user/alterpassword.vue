<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item :label="$t('旧密码')">
        <el-input v-model="form.OldPassword" :placeholder="$t('请输入旧密码')" show-password />
      </el-form-item>
      <el-form-item :label="$t('新密码')">
        <el-input v-model="form.NewPassword" :placeholder="$t('输入新密码')" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 200px" @click="onSubmit">{{ $t('修改密码') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { alterPassword } from '@/api/user'

export default {
  data() {
    return {
      form: {
        OldPassword: '',
        NewPassword: ''
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.listLoading = true
      console.log('this.form:', this.form)
      alterPassword(this.form).then(resp => {
        this.$message(this.$t('修改成功'))
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

