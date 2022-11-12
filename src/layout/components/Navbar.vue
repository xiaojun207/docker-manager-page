<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <a href="https://hub.docker.com/r/xiaojun207/docker-manager/tags" target="_blank">
        <div style="float: left;margin-right: 40px;color: #3f3e3e;">
          <el-badge :value="version.upgrade?'new':''" class="item" style="line-height: 30px">{{ $t('当前版本') }} : {{ version.current }}</el-badge>
        </div>
      </a>
      <lang />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="avatar">
            <img src="@/assets/default.png">
          </el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t("首页") }}
            </el-dropdown-item>
          </router-link>

          <el-button type="text" @click="dialogVisible=true">
            <el-dropdown-item>
              {{ $t("密码修改") }}
            </el-dropdown-item>
          </el-button>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t("退出") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" v-loading="loading" label-position="right" :model="form" label-width="80px">
        <el-form-item :label="$t('旧密码')">
          <el-input v-model="form.OldPassword" :placeholder="$t('请输入旧密码')" show-password />
        </el-form-item>
        <el-form-item :label="$t('新密码')">
          <el-input v-model="form.NewPassword" :placeholder="$t('输入新密码')" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;loading = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('修改密码') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Lang from '@/components/Lang'
import { alterPassword } from '@/api/user'
import { getVersion } from '@/api/version'
import { VersionCompare } from '@/utils/index'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Lang
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      version: {
        current: '1.0.0',
        latest: '1.0.0',
        upgrade: true
      },
      form: {
        OldPassword: '',
        NewPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    onSubmit() {
      this.loading = true
      console.log('this.form:', this.form)
      alterPassword(this.form).then(r => {
        this.$message(this.$t('修改成功'))
        this.loading = false
        this.dialogVisible = false
      }).catch(e => {
        this.loading = false
      })
    },
    fetchData() {
      getVersion().then(resp => {
        this.version = resp.data
        this.version.upgrade = VersionCompare(this.version.current, this.version.latest) < 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

