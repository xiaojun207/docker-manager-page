<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item :label="$t('代码URL')">
        <el-input v-model="form.sourceUrl" :placeholder="$t('请输入代码git URL')"/>
      </el-form-item>

      <el-form-item :label="$t('分支')">
        <el-input v-model="form.branch" :placeholder="$t('请输入分支')"/>
      </el-form-item>

      <el-form-item :label="$t('端口')">
        <el-input v-model="form.port" :placeholder="$t('请输入端口')"/>
      </el-form-item>

      <el-form-item :label="$t('Dockerfile位置')">
        <el-input v-model="form.dockerfile" :placeholder="$t('请输入Dockerfile位置')"/>
        <div>
         打包命令： docker build -t ${Image} -f ./Dockerfile .
        </div>
      </el-form-item>

      <el-form-item :label="$t('推送触发')">
        <el-checkbox v-model="form.webHook">{{ $t('推送到master时触发流水线') }}</el-checkbox><br>
        webhook配置参数：http://dockermanager.my, application/json, secret
      </el-form-item>

      <el-form-item :label="$t('镜像仓库地址')">
        <el-input v-model="form.imageUrl" :placeholder="$t('请输入镜像仓库地址URL')"/>
        镜像仓库授权方式
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 200px" @click="onSubmit">{{ $t('保存') }}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: 'FlowLine',
  data() {
    return {
      form: {
        sourceUrl: '',
        branch: 'master',
        port: 80,
        dockerfile: './Dockerfile',
        webHook: '',
        imageUrl: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('流水线功能开发中...')
    }
  }
}

</script>

<style>

</style>
