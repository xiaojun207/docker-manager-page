<template>
  <div class="app-container">
    <el-cascader
      v-model="form.containerId"
      :disabled="isConnected"
      filterable
      :placeholder="$t('目标容器')"
      clearable
      :options="res.containerInfos"
      :props="{ expandTrigger: 'hover', emitPath: false }"
      style="width: 500px; margin-right: 10px"
    />
    <el-input
      v-model="form.cmd"
      placeholder="请输入内容"
      style="width: 160px; margin-right: 10px"
    />
    <el-button
      :loading="loading"
      class="filter-item"
      type="primary"
      :icon="ElIconSearch"
      :disabled="isConnected"
      @click="onStartExec"
    >
      {{ $t('连接') }}
    </el-button>
    <el-button
      :loading="loading"
      class="filter-item"
      type="primary"
      :disabled="!isConnected"
      @click="onCloseExec"
    >
      {{ $t('断开连接') }}
    </el-button>
    <div class="console">
      <terminal
        ref="terminal"
        @onInitTerm="isConnected = true"
        @onSocketClose="isConnected = false"
        @onSocketError="isConnected = false"
      />
    </div>
  </div>
</template>

<script>
import { Search as ElIconSearch } from '@element-plus/icons'
import { getContainerInfos } from '@/api/container'
import { WsHost } from '@/utils/index.ts'
import { ContainerShortId } from '@/utils/docker.ts'
import Terminal from '@/components/Terminal/index.vue'

export default {
  name: 'ContainerTerminal',
  components: {
    Terminal
  },
  data() {
    return {
      listLogs: [],
      loading: true,
      isConnected: false,
      res: {
        containerInfos: []
      },
      form: {
        containerId: '',
        cmd: '/bin/bash'
      },
      ElIconSearch
    }
  },
  created() {
    this.fetchData()
  },
  destroyed: function() {
    // this.$refs.terminal.close()
  },
  methods: {
    statusFilter_filter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    fetchData() {
      this.loading = true
      getContainerInfos().then((response) => {
        this.res.containerInfos = response.data
        for (const i in this.res.containerInfos) {
          const tmp_server = this.res.containerInfos[i]
          tmp_server.children = tmp_server.containers
          tmp_server.label = tmp_server.serverName
          tmp_server.value = tmp_server.serverName

          for (const j in tmp_server.children) {
            const tmp_container = tmp_server.children[j]
            tmp_container.label =
              tmp_container.Name + ' - ' + tmp_container.State
            tmp_container.value = tmp_container.Id
            tmp_server.children[j] = tmp_container
          }
          this.res.containerInfos[i] = tmp_server
        }
        this.loading = false
      })
    },
    onStartExec() {
      if (!this.form.containerId) {
        this.$message(this.$t('必须选择容器'))
        return
      }
      const wsUri =
        WsHost() +
        '/dockerMgrApi/ws/exec?containerId=' +
        ContainerShortId(this.form.containerId) +
        '&cmd=' +
        this.form.cmd // ws地址
      this.$refs.terminal.initSocket(wsUri)
    },
    onCloseExec() {
      this.$refs.terminal.close()
    }
  }
}
</script>

<style scoped>
.app-container,
.console {
  height: 100%;
}
.console {
  margin-top: 10px;
  min-height: 800px;
  height: 810px;
  padding: 10px;
  background: #2b2b2b;
  color: white;
}
</style>
