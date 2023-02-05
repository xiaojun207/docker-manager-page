<template>
  <el-link :href="'https://github.com/xiaojun207/docker-manager'" target="_blank" :title="$t('Github')">
    <div style="line-height: 30px;">{{$t('Github')}}</div>
  </el-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
  a {
    &:focus {
      outline: none;
    }
  }
  i {
    cursor: pointer;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }
</style>
