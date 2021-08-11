<template>
    <div id="pages">
        <div id="editor" style="height:90%;"></div>
        <button @click="updateAboutData">更新</button>
    </div>
</template>

<script>
if (process.client) {
    var hljs = require('highlight.js')
    var wangEditor = require('wangeditor')
}
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            editor: null,
            editorData: '',
        }
    },
    async asyncData(){
        const obj = { data:'getData'}
        let res = await axios.post('http://api.glumi.cn/api/About.php',qs.stringify(obj))
        return { editorData: res.data }
    },
    methods:{
        async updateAboutData(){
            const obj = { data:'updateData',editorData: this.editorData }
            let res = await axios.post('http://api.glumi.cn/api/About.php',qs.stringify(obj))
            if(res.data=='更新成功'){
                alert('更新成功')
            }else if(res.data=='更新失败') {
                alert('更新失败')
            }
        }
    },
    async mounted() {
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
    #pages {
        margin: 10px;
        button {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>