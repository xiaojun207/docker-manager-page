<template>
  <div class="app-container">
    <el-cascader
      v-model="form.containerId"
      :disabled="isConnected"
      filterable
      placeholder="目标容器"
      clearable
      :options="res.containerInfos"
      :props="{ expandTrigger: 'hover', emitPath: false }"
      style="width: 500px;margin-right: 10px;"
    >

    </el-cascader>
    <el-checkbox v-model="showSystemTime" style="margin-right: 10px">显示日志系统时间 </el-checkbox>
    <el-button :loading="loading" class="filter-item" type="primary" icon="el-icon-search" :disabled="isConnected" @click="fetchLogData()">
      连接日志
    </el-button>
    <el-button :loading="loading" class="filter-item" type="primary" :disabled="!isConnected" @click="disconnectLog()">
      断开连接
    </el-button>
    <el-link :underline="false">  </el-link>
    <div class="console">
      <div v-for="item in listLogs" id="log" ref="log" :key="item">
        <div>
          <span v-if="showSystemTime">{{ formatDate(item.ts) }} </span> {{ item.line }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContainerInfos } from '@/api/container'
import { getLogStart, getLogClose } from '@/api/logs'
import { formatDate } from '@/utils/index'

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
      websock: null,
      listLogs: [],
      loading: true,
      showSystemTime: false,
      isConnected: false,
      res: {
        containerInfos: []
      },
      form: {
        containerId: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  destroyed: function() {
    this.disconnectLog()
  },
  methods: {
    fetchData() {
      this.loading = true
      getContainerInfos().then(response => {
        this.res.containerInfos = response.data
        for (const i in this.res.containerInfos) {
          const tmp_server = this.res.containerInfos[i]
          tmp_server.children = tmp_server.containers
          tmp_server.label = tmp_server.serverName
          tmp_server.value = tmp_server.serverName

          for (const j in tmp_server.children) {
            const tmp_container = tmp_server.children[j]
            tmp_container.label = tmp_container.Names + ' - ' + tmp_container.State
            tmp_container.value = tmp_container.Id
            tmp_server.children[j] = tmp_container
          }
          this.res.containerInfos[i] = tmp_server
        }
        this.loading = false
      })
    },
    disconnectLog() {
      if (this.websock) {
        this.websock.close()
        getLogClose(this.form)
      }
    },
    fetchLogData() {
      if (!this.form.containerId) {
        this.$message('必须选择容器')
        return
      }

      this.loading = true
      this.listLogs = [{ 'ts': '', 'line': '正在连接...' }]
      console.log('fetchLogData', this.form)
      getLogStart(this.form).then(resp => {
        this.loading = false
        if (resp.code === '100200') {
          this.list = resp.data
          this.initWebSocket(this.form.containerId)
        } else {
          this.$message(resp.msg)
          this.listLogs.push({ 'ts': '', 'line': resp.msg })
        }
      }).catch(resp => {
        this.loading = false
        console.log('logstart.error:', resp)
        this.$message(resp.msg)
        this.listLogs.push({ 'ts': '', 'line': resp.msg })
      })
    },
    initWebSocket() { // 初始化weosocket
      console.log('location.protocol:', location)
      const proto = (location.protocol === 'http:' ? 'ws:' : 'wss')
      const wsUri = proto + location.host + '/dockerMgrApi/ws/log?containerId=' + this.form.containerId // ws地址
      this.websock = new WebSocket(wsUri)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      this.isConnected = true
      console.log('WebSocket连接成功')
      this.listLogs.push({ 'ts': '', 'line': '连接成功.' })
      const d = {
        'ch': 'base.ht.ping'
      }
      this.websocketsend(JSON.stringify(d))
    },
    websocketonerror(e) { // 错误
      this.isConnected = false
      console.log('WebSocket连接发生错误', e)
      this.listLogs.push({ 'ts': '', 'line': '连接发生错误.' })
    },
    websocketonmessage(e) { // 数据接收
      const msg = JSON.parse(e.data)
      if (msg.ch === 'docker.container.log.line') {
        this.listLogs.push(msg.d)
        const div = this.$refs.log
        div.scrollTop = div.scrollHeight
      }
    },
    websocketsend(agentData) { // 数据发送
      this.websock.send(agentData)
    },
    websocketclose(e) { // 关闭
      this.isConnected = false
      console.log('connection closed ', e)
      this.listLogs.push({ 'ts': '', 'line': '连接已关闭.' })
    },
    formatDate(d) {
      return formatDate(d)
    }
  }
}
</script>

<style scoped>
.console {
  margin-top: 10px;
  min-height: 600px;
  padding: 10px;
  background: #2b2b2b;
  color: white;
}
</style>
