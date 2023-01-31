<template>
  <el-link :href="'https://xiaojun207.github.io/docker-manager/#/'+name+'/'" target="_blank" :title="$t('说明文档')">
    <div style="line-height: 30px;">{{$t('说明文档')}}</div>
  </el-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { locale, t } = useI18n()
    return {
      name: locale
    }
  }
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
