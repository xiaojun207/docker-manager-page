<template>
  <div ref="codeEditBox" class="code-edit-container"> </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { editorProps } from './monacoEditorType'

export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    let editor: any
    const codeEditBox = ref()
    let monacoInited = false
    const loadScriptResultMap:object = {}
    // Script引入地址方法
    const importScript = (src:string) => {
      if (loadScriptResultMap[src]) {
        return loadScriptResultMap[src]
      }
      loadScriptResultMap[src] = new Promise((resolve, reject) => {
        const newScript = document.createElement('script')
        newScript.src = src
        document.body.append(newScript)
        newScript.addEventListener('load', () => {
          resolve(true)
        })
        newScript.onerror = () => {
          monacoInited = false
          document.body.removeChild(newScript)
          reject()
        }
      })
      return loadScriptResultMap[src]
    }
    // 引入monaco-editor
    const importMonaco = () => {
          if (monacoInited === true) {
            return Promise.resolve()
          }
          return importScript('https://g.alicdn.com/code/lib/monaco-editor/0.34.1/min/vs/loader.js')
              .then(() => {
                window.require.config({ paths: { vs: '//g.alicdn.com/code/lib/monaco-editor/0.34.1/min/vs' } })
                monacoInited = true
              })
              .catch(() => {
                monacoInited = false
              })
        }
        // 添加编辑器worker
    ;(self as any).MonacoEnvironment = {
      getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
            self.MonacoEnvironment = {
              baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/'
            };
            importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/base/worker/workerMain.js');`)}`
      },
    }
    // 初始化编辑器
    const initMonaco = () => {
      importMonaco().then(() => {
        const callfunc = () => {
          if (codeEditBox.value) {
            console.log("window.monaco.editor:", window.monaco.editor)
            editor = window.monaco.editor.create(codeEditBox.value, {
              value: props.modelValue,
              language: props.language,
              theme: props.theme,
              automaticLayout: true, // 添加这行代码，表示自动布局
              ...props.options,
            })
            window.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: false,
              noSyntaxValidation: false,
            })
            window.monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
              target: window.monaco.languages.typescript.ScriptTarget.ES2020,
              allowNonTsExtensions: true,
            })
            // 监听值的变化
            editor.onDidChangeModelContent(() => {
              const value = editor.getValue() // 给父组件实时返回最新文本
              emit('update:modelValue', value)
              emit('change', value)
            })
            emit('editor-mounted', editor)
          }
        }
        window.require(['vs/editor/editor.main'], callfunc)
      })
    }
    onBeforeUnmount(() => {
      console.log("Monaco.onBeforeUnmount")
      if (editor) {
        editor.dispose() // 销毁编辑器
        editor = null
        monacoInited = false
      } else {
        editor = null
        monacoInited = false
        console.log("onBeforeUnmount editor is not")
      }
    })

    onMounted(() => {
      console.log("Monaco.onMounted")
      initMonaco()
    })

    watch(
        () => props.modelValue,
        newValue => {
          if (editor) {
            const value = editor.getValue()
            if (newValue !== value) {
              editor.setValue(newValue)
            }
          }
        }
    )

    watch(
        () => props.options,
        newValue => {
          editor.updateOptions(newValue)
        },
        { deep: true }
    )

    watch(
        () => props.readOnly,
        () => {
          editor.updateOptions({ readOnly: props.readOnly })
        },
        { deep: true }
    )

    watch(
        () => props.language,
        newValue => {
          window.monaco.editor.setModelLanguage(editor.getModel()!, newValue)
        }
    )

    return {
      codeEditBox,
    }
  },
})
</script>

<style scoped lang="scss">
.code-edit-container {
  width: 100%;
  flex: 1;
  min-height: 432px;
  height: 100%;
  overflow-y: auto;
}
</style>
