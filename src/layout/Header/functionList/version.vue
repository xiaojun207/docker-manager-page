<template>
  <el-link href="https://hub.docker.com/r/xiaojun207/docker-manager/tags" target="_blank" title="当前版本">
    <el-badge
        :value="version.upgrade ? 'new' : ''"
        class="item"
        style="line-height: 30px"
    >
      {{ $t('当前版本') }}:{{ version.current }}
    </el-badge>
  </el-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getVersion } from '@/api/version'
import { VersionCompare } from '@/utils/index'

export default defineComponent({

  setup(){
    const version = ref({
      current: '1.0.0',
      latest: '1.0.0',
      upgrade: true
    })
    getVersion().then((resp) => {
      version.value = resp.data
      version.value.upgrade = VersionCompare(version.value.current, version.value.latest) < 0
    })

    return {
      version
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
