<template>
  <div class="app-container">
    <div style="margin-bottom: 15px;">
    </div>
  </div>
</template>

<script>
import { getVersion } from '@/api/version'

export default {
  data() {
    return {
      version: {},
      Loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.Loading = true
      getVersion().then(resp => {
        console.log(resp.data)
        this.version = resp.data
        this.Loading = false
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

