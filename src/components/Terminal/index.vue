<template>
  <div id="xterm" class="xterm" />
</template>

<script>
import { $emit } from '@/utils/events'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { WebLinksAddon } from 'xterm-addon-web-links'

export default {
  name: 'Xterm',
  data() {
    return {
      isConnected: false,
      term: null,
      socket: null
    }
  },
  mounted() {
    // this.initSocket()
  },
  beforeUnmount() {
    this.close()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      const webLinksAddon = new WebLinksAddon()

      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.loadAddon(webLinksAddon)
      term.open(document.getElementById('xterm'))
      fitAddon.fit()
      term.resize(term.cols, term.rows + 25)
      term.focus()
      this.term = term
      this.isConnected = true
      $emit(this, 'onInitTerm')
    },
    initSocket(wsUrl) {
      // console.log('Terminal.initSocket:', wsUrl)
      if (wsUrl === '') {
        console.log('Terminal.initSocket.socketURI is empty')
        return false
      }
      this.socket = new WebSocket(wsUrl)
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    close() {
      if (this.socket) {
        this.socket.close()
      }
      if (this.term) {
        this.term.dispose()
      }
      this.isConnected = false
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        // console.log('close socket')
        this.isConnected = false
        $emit(this, 'onSocketClose')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
        this.isConnected = false
        $emit(this, 'onSocketError')
      }
    }
  },
  emits: ['onInitTerm', 'onSocketClose', 'onSocketError']
}
</script>
