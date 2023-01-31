<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="display: none;">
      <div class="card-panel" @click="handleSetLineChartData('Server')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('主机') }}
          </div>
          {{ $t('在线') }}
          <count-to
            :startVal="0"
            :endVal="dashboradSize.serverConnected"
            :duration="3000"
            class="card-panel-num"
          />
          <el-divider direction="vertical" />
          {{ $t('总计') }}
          <count-to
            :startVal="0"
            :endVal="dashboradSize.server"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"  style="display: none;">
      <div class="card-panel" @click="handleSetLineChartData('Container')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('容器') }}
          </div>
          {{ $t('运行中') }}
          <count-to
            :startVal="0"
            :endVal="dashboradSize.containerRun"
            :duration="3000"
            class="card-panel-num"
          />
          <el-divider direction="vertical" />
          {{ $t('已停止') }}
          <count-to
            :startVal="0"
            :endVal="dashboradSize.container - dashboradSize.containerRun"
            :duration="3000"
            class="card-panel-num"
            style="color: red"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('Task')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('任务') }}
          </div>
          <count-to
            :startVal="0"
            :endVal="dashboradSize.task"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('Image')">
        <div class="card-panel-icon-wrapper icon-image">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('镜像') }}
          </div>
          <count-to
            :startVal="0"
            :endVal="dashboradSize.image"
            :duration="10"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('App')">
        <div class="card-panel-icon-wrapper icon-app">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('应用') }}
          </div>
          <count-to
            :startVal="0"
            :endVal="dashboradSize.app"
            :duration="10"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('follow')">
        <div class="card-panel-icon-wrapper icon-log">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ $t('实时日志开启数量') }}
          </div>
          <count-to
            :startVal="0"
            :endVal="dashboradSize.follow"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { $once, $emit } from '@/utils/events'
import { CountTo } from 'vue3-count-to'
import { getDashboardSize } from '@/api/dashboard'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      dashboradSize: {
        serverConnected:0,
        server: 0,
        container: 1110,
        containerRun: 0,
        image: 0,
        task: 0,
        app: 0,
        follow: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // // 定时器
    // const timer = setInterval(() => {
    //   this.fetchData() // 你所加载数据的方法
    // }, 1000*30)
    // // 销毁定时器
    // $once(this, 'hook:beforeDestroy', () => {
    //   clearInterval(timer)
    // })
  },
  methods: {
    handleSetLineChartData(type) {
      $emit(this, 'handleSetLineChartData', type)
    },
    fetchData() {
      this.listLoading = true
      getDashboardSize().then((resp) => {
        this.dashboradSize = resp.data
        this.listLoading = false
      })
    }
  },
  emits: ['handleSetLineChartData']
}
</script>

<style lang="scss" scoped>
.panel-group {
  //margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }

      .icon-image {
        background: #2837d3;
      }

      .icon-app {
        background: #7f41ea;
      }

      .icon-log {
        background: #58ea41;
      }
    }

    .icon-people {
      background-color: #40c9c6;
    }

    .icon-message {
      background: #36a3f7;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-shopping {
      background: #34bfa3;
    }

    .icon-image {
      background: #2837d3;
    }

    .icon-app {
      background: #7f41ea;
    }

    .icon-log {
      background: #58ea41;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      //background-color: #e4e5e7;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
