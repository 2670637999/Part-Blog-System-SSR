<template>
    <div id="editorbox">
        <div id="editor"></div>
        <button>发布</button>
    </div>
</template>

<script>
if (process.client) {
  var E = require('wangeditor')
  var hljs = require('highlight.js')
}
import 'highlight.js/styles/xcode.css'
import hyperdown from 'hyperdown'
export default {
    data(){
        return {
            markdown: '',
            html: ''
        }
    },
    methods:{

    },
    mounted() {
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
        var editor = new E('#editor')
        editor.highlight = hljs
        editor.create();

        // setInterval(()=>{
        //     this.html = editor.txt.html();
        // },100)
    },
}
</script>

<style lang="scss" scoped>
#editorbox { 

    width: 100%;
    height: 100%;
    // margin: 0 auto;
    background-color: #ffffff;
    #editor {
        width: 700px;
        margin: auto;
    }
    button {
        display: block;
        width: 700px;
        margin: auto;
        padding: 15px;
    }
    @media all and(max-width: 700px) {
        #editor {
            width: 100%;
        }
        button {
            width: 100%;
            padding: 15px;
        }
    }
}
</style>