<template>
    <div id="box">
        <!-- <div><h3>预览</h3></div> -->
        <!-- <div><h3>编写</h3></div> -->
        <div id="editor" ></div>
        <button @click="updateAboutData">更新</button>
        <!-- <div id="pageContent" v-html="editorData"></div> -->
    </div>
</template>

<script>
if (process.client) {
    var hljs = require('highlight.js')
    var wangEditor = require('wangeditor')
}
import qs from 'qs'
export default {
  data(){
    return {
      editor: null,
      editorData: '',
    }
  },
  methods:{
    async updateAboutData(){
      const obj = { data:'updateData',editorData: this.editorData }
      let res = await this.$axios.post('About.php',qs.stringify(obj))
      if(res.data=='更新成功'){
        alert('更新成功')
      }else if(res.data=='更新失败') {
        alert('更新失败')
      }
    }
  },
  async asyncData({ app }){
    const obj = { data:'getData'}
    let res = await app.$axios.post('About.php',qs.stringify(obj))
    return { editorData: res.data }
  },
  async mounted() {
    this.$nextTick(() => {
    this.$nuxt.$loading.start()
    setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
    const editor = new wangEditor(`#editor`)
    editor.config.onchange = (newHtml) => {
    this.editorData = newHtml
    }
    editor.highlight = hljs
    editor.create();
    this.editor = editor
    editor.txt.html(this.editorData)
  },
}
</script>

<style lang="scss" scoped>
.page-enter-active {
  animation: part-enter-2 1s;
}
.page-leave-active {
  animation: part-leave-1 0.71s;
}
#box {
  width: 100%;
  #pageContent {
    overflow: auto;
    padding: 15px;
    box-sizing: border-box; 
    border: 1px solid rgb(241, 241, 241);
  }
  button {
    width: 100%;
    padding: 15px;
  }
}
</style>