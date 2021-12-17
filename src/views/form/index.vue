<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
      <el-input v-model="formTmp.tempText" type="textarea" :rows="5" :placeholder="$t('临时记录区域')" />
    </div>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item :label="$t('容器名称')">
        <el-input v-model="form.Name" :placeholder="$t('容器名称')" />
      </el-form-item>
      <el-form-item :label="$t('镜像')">
        <el-input v-model="form.Image" placeholder="docker.io/library/nginx:latest" />
      </el-form-item>

      <el-form-item :label="$t('内存(M)')">
        <el-input-number v-model="formTmp.Memory" :controls="false" :placeholder="$t('内存，如：128')" style="width: 210px" />
        <el-input disabled placeholder="M" style="width: 50px" />
      </el-form-item>
      <el-form-item :label="$t('端口映射')">
        <el-button type="success" size="small" icon="el-icon-plus" @click="addPort()">{{ $t('添加') }}</el-button>
        <div v-for="(item, index) in form.Ports" :key="item.key" :items="form.Ports" style="margin-top: 10px">
          <el-input v-model="item.PublicPort" placeholder="8080" style="width: 200px">
            <template slot="prepend">{{ item.IP }}:</template>
          </el-input>
          <span style="color: #2b2b2b"> -> </span>
          <el-input v-model="item.PrivatePort" placeholder="8080" style="width: 200px">
            <el-select slot="append" v-model="item.Type" placeholder="TCP" style="width: 80px">
              <el-option label="TCP" value="tcp" />
              <el-option label="UDP" value="udp" />
              <el-option label="SCTP" value="sctp" />
            </el-select>
          </el-input>
          <el-button type="danger" style="margin-left: 15px" size="small" icon="el-icon-delete" circle @click="delPort(item, index)" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('卷映射')">
        <el-button type="success" size="small" icon="el-icon-plus" @click="addVolume()">{{ $t('添加') }}</el-button>
        <el-link type="info" :underline="false" href="https://docs.docker.com/storage/bind-mounts/#start-a-container-with-a-bind-mount" style="margin-left: 10px;">{{ $t('Bind模式相当于docker -v参数。如何挂载卷？') }}</el-link>
        <div v-for="(item, index) in formTmp.Volumes" :key="item.hostPath" :items="formTmp.Volumes" style="margin-top: 10px">
          <el-input v-model="item.Source" :placeholder="$t('源地址(宿主机地址)')" style="width: 400px">
            <el-select slot="prepend" v-model="item.Type" disabled :placeholder="$t('绑定方式')" style="width: 100px">
              <el-option label="Bind" value="bind" />
              <el-option label="Volume" value="volume" />
              <el-option label="Tmpfs" value="tmpfs" />
            </el-select>
          </el-input>
          <span style="color: #2b2b2b"> : </span>
          <el-input v-model="item.Destination" :placeholder="$t('容器内地址')" style="width: 400px">
            <el-select slot="append" v-model="item.RW" clearable placeholder="" style="width: 80px;">
              <el-option :label="$t('读写')" value=":rw" />
              <el-option :label="$t('只读')" value=":ro" />
            </el-select>
          </el-input>
          <el-button type="danger" style="margin-left: 15px" size="small" icon="el-icon-delete" circle @click="delVolume(item, index)" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('环境变量')">
        <el-button type="success" size="small" icon="el-icon-plus" @click="addEnv()">{{ $t('添加') }}</el-button>
        <div v-for="(item, index) in formTmp.Env" :key="index" :value="item" :items="formTmp.Env" style="margin-top: 10px">
          <el-input v-model="item.key" :placeholder="$t('变量key')" style="width: 400px" />
          <span style="color: #2b2b2b"> = </span>
          <el-input v-model="item.value" :placeholder="$t('变量值')" style="width: 400px" />
          <el-button type="danger" style="margin-left: 15px" size="small" icon="el-icon-delete" circle @click="delEnv(item, index)" />
        </div>
      </el-form-item>
      <el-form-item :label="$t('日志驱动')">
        <el-select v-model="form.LogType" clearable :placeholder="$t('请选择')">
          <el-option v-for="item in res.logTypes" :key="item.key" :label="item.name" :value="item.name" :title="item.summary" />
        </el-select>
        <el-link type="info" :underline="false" href="https://docs.docker.com/config/containers/logging/configure/" style="margin-left: 10px;">{{ $t('如何选择日志驱动？') }}</el-link>
      </el-form-item>
      <el-form-item :label="$t('日志配置参数')">
        <el-button type="success" size="small" icon="el-icon-plus" @click="addLogConfig()">{{ $t('添加') }}</el-button>
        <div v-for="(item, index) in formTmp.LogConfig" :key="item.key" :value="item" :items="formTmp.LogConfig" style="margin-top: 10px">
          <el-input v-model="item.key" :placeholder="$t('变量key')" style="width: 400px" />
          <span style="color: #2b2b2b"> = </span>
          <el-input v-model="item.value" :placeholder="$t('变量值')" style="width: 400px" />
          <el-button type="danger" style="margin-left: 15px" size="small" icon="el-icon-delete" circle @click="delLogConfig(item, index)" />
        </div>
      </el-form-item>

<!--      <el-form-item label="副本数量">-->
<!--        <el-input-number v-model="formTmp.Replicas" :controls="false" :min="1" :max="10" :step="1" :step-strictly="true" placeholder="副本数量，如：1" style="width: 210px" />-->
<!--        <a style="width: 350px;margin-left: 10px;color:#807b7b">副本数量，如：1</a>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('目标服务器')">
        <el-select v-model="form.ServerNames" multiple filterable placeholder="ServerName" clearable class="filter-item" style="width: 100%">
          <el-option v-for="item in res.ServerNames" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 200px" @click="onSubmit">{{ $t('发布') }}</el-button>
        <!--        <el-button @click="onCancel">Cancel</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { publishDocker } from '@/api/container'
import { getServerNames } from '@/api/server'

export default {
  data() {
    return {
      res: {
        ServerNames: [],
        logTypes: [
          { name: 'json-file', summary: '日志格式化为 JSON。这是 Docker 默认的日志驱动程序。' },
          { name: 'syslog', summary: '将日志消息写入 syslog 工具。需配置syslog地址参数syslog-address，或守护程序必须在主机上运行。' },
          { name: 'journald', summary: '将日志消息写入 journald。journald 守护程序必须在主机上运行。' },
          { name: 'gelf', summary: '将日志消息写入 Graylog Extended Log Format (GELF) 终端，例如 Graylog 或 Logstash。' },
          { name: 'fluentd', summary: '将日志消息写入 fluentd（forward input）。需配置fluentd地址参数fluentd-address，或fluentd守护程序必须在主机上运行。' },
          { name: 'awslogs', summary: '将日志消息写入 Amazon CloudWatch Logs。' },
          { name: 'splunk', summary: 'Writes log messages to splunk using the HTTP Event Collector.' },
          { name: 'etwlogs', summary: '将日志消息写为 Windows 的 Event Tracing 事件。仅在Windows平台上可用。' },
          { name: 'gcplogs', summary: '将日志消息写入 Google Cloud Platform (GCP) Logging。' },
          { name: 'logentries', summary: '将日志消息写入 Rapid7 Logentries。' }],
        logTypes2: ['json-file', 'fluentd', 'journald', 'syslog', 'gelf', 'awslogs', 'splunk', 'etwlogs', 'gcplogs', 'logentries']
      },
      formTmp: {
        Ports: [],
        Env: [], // [{'key':'WebSite', 'value':'管理系统网站'}, {'key':'Domain','value':'www.abc.com'}]
        Volumes: [], // [{ 'Source': '', 'Destination': '', 'RW': true, 'Mode': '', 'Type': 'bind', 'Propagation': 'rprivate' }]
        LogConfig: [],
        Memory: 0,
        Replicas: 1,
        tempText: ''
      },
      form: {
        Image: '',
        Name: '',
        Ports: [], // [{ 'hostPort': '', 'appPort': '' }]
        Volumes: [], // [{ 'hostPath': '', 'appPath': '' }]
        Env: [], // [{'key':'WebSite', 'value':'管理系统网站'}, {'key':'Domain=www.abc.com'}]
        ServerNames: [],
        Memory: 0,
        LogType: '',
        LogConfig: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.listLoading = true
      const ports = []
      for (const i in this.formTmp.Ports) {
        const p = this.formTmp.Ports[i]
        // { 'PublicPort': 0, 'PrivatePort': 0, 'IP': '0.0.0.0', 'Type': 'tcp'}
        let pub = p.IP
        if (p.PublicPort && p.PublicPort.length > 0) {
          pub += ((pub.length > 0) ? ':' : '') + p.PublicPort
        }
        ports.push(((pub.length > 0) ? '->' : '') + p.PrivatePort + '/' + p.Type)
      }
      const env = []
      for (const i in this.formTmp.Env) {
        const p = this.formTmp.Env[i]
        env.push(p.key + '=' + p.value)
      }
      const volumes = []
      for (const i in this.formTmp.Volumes) {
        const p = this.formTmp.Volumes[i]
        volumes.push(p.Source + ':' + p.Destination + p.RW)
      }
      const logConfig = {}
      for (const i in this.formTmp.LogConfig) {
        const p = this.formTmp.LogConfig[i]
        logConfig[p.key] = p.value
      }
      this.form.Env = env
      this.form.Volumes = volumes
      this.form.LogConfig = logConfig
      this.form.Memory = this.formTmp.Memory * 1024 * 1024
      console.log('this.formTmp:', this.formTmp)
      console.log('this.form:', this.form)
      publishDocker(this.form).then(resp => {
        this.$message('发布成功')
        this.listLoading = false
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getServerNames().then(resp => {
        this.res.ServerNames = resp.data
        this.listLoading = false
      })
    },
    addPort() {
      this.form.Ports.push({ 'PublicPort': '', 'PrivatePort': '', 'IP': '0.0.0.0', 'Type': 'tcp' })
    },
    delPort(item, index) {
      this.$delete(this.form.Ports, index)
    },
    addVolume() {
      this.formTmp.Volumes.push({ 'Source': '', 'Destination': '', 'RW': '', 'Mode': '', 'Type': 'bind', 'Propagation': 'rprivate' })
    },
    delVolume(item, index) {
      this.$delete(this.formTmp.Volumes, index)
    },
    addEnv: function() {
      this.formTmp.Env.push({ 'key': '', 'value': '' })
    },
    delEnv(item, index) {
      this.$delete(this.formTmp.Env, index)
    },
    addLogConfig: function() {
      this.formTmp.LogConfig.push({ 'key': '', 'value': '' })
    },
    delLogConfig(item, index) {
      this.$delete(this.formTmp.LogConfig, index)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

