<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="表单模式" name="2">
        <publish-form></publish-form>
      </el-tab-pane>
      <el-tab-pane label="Yaml模式" name="3">
        <div style="color: #90949b;font-size: 14px;padding: 10px">使用docker compose yaml格式规范</div>
        <yaml-editor v-model="yamlData"/>

        <el-select v-model="form.ServerNames" multiple filterable placeholder="ServerName" clearable class="filter-item"  style="margin-top: 10px;margin-bottom: 10px;margin-right: 10px;">
          <el-option v-for="item in res.ServerNames" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-button type="primary" style="width: 200px" @click="onSubmit">{{ $t('发布') }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="Json模式" name="4" disabled>
        <json-editor ref="jsonEditor" v-model="jsonData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { publishDockerYaml } from '@/api/container'
import { getServerNames } from '@/api/server'
import YamlEditor from '@/components/YamlEditor/index.vue'
import JsonEditor from '@/components/JsonEditor'
import PublishForm from './form'

const DefaultYamlData = 'version: "2"\n' +
  '\n' +
  'services:\n' +
  '  openresty:\n' +
  '    container_name: test-openresty\n' +
  '    image: openresty/openresty:latest\n' +
  '    restart: always\n' +
  '    ports:\n' +
  '      - "80:80"\n' +
  '      - "443:443"\n' +
  '    environment:\n' +
  '      - GET_HOSTS_FROM=dns\n' +
  '    volumes:\n' +
  '      - "/tmp/data/web:/data/web"\n' +
  '      - "/tmp/openresty/nginx/logs:/usr/local/openresty/nginx/logs"\n' +
  '    \n' +
  '\n'

const DefaultJsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

export default {
  components: { YamlEditor, JsonEditor, PublishForm },
  data() {
    return {
      res: {
        ServerNames: []
      },
      form: {
        ServerNames: []
      },
      activeName: '2',
      yamlData: DefaultYamlData,
      jsonData: JSON.parse(DefaultJsonData)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      // console.log('yamlData:', this.yamlData)
      const d = { serverNames: this.form.ServerNames, yaml: this.yamlData }
      publishDockerYaml(d).then(r => {
        this.$message('发布成功')
      })
    },
    fetchData() {
      this.listLoading = true
      getServerNames().then(resp => {
        this.res.ServerNames = resp.data
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

