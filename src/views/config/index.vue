<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
    </div>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="任务提交频率">
        <el-input-number v-model="form.TaskFrequency" placeholder="容器名称"  controls-position="right" :min="0"></el-input-number>秒
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 200px" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConfig, updateConfig } from '@/api/config'

export default {
  data() {
    return {
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
        this.$message('发布成功')
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      getConfig().then(resp => {
        this.form.TaskFrequency = resp.data.agentConfig.TaskFrequency
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

