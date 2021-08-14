<!-- 修改文章页面 -->
<template>
    <div id="updateBox">
        <input type="text" placeholder="标题" v-model="Title">
        <input type="text" placeholder="子标题" v-model="subtitle">
        <input type="text" placeholder="作者" v-model="Author">
        <input type="text" placeholder="分类" v-model="categorie">
        <input type="text" placeholder="时间" v-model="Time">
        <div id="editor"><div v-html="Content"></div></div>
        <button @click="updateAboutData">更新</button>
        <nuxt-link :to="{name:'index-admin-articles'}"><button @click="$store.commit('ChangeAdminEditorPageState')">返回</button></nuxt-link>
    </div>
</template>

<script>
if (process.client) {
    var hljs = require('highlight.js')
    var wangEditor = require('wangeditor')
}
var editor
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            editor: null,
            id: Number,
            Title: '',
            subtitle: '',
            Content: '',
            Author: '',
            categorie: '',
            Time: '',
        }
    },
    async asyncData({query}){
        const obj_1 = { 
            data: 'post_getArticleindexOfData',
            id: query.id
        }
        let article = await axios.post('https://api.glumi.cn/api/Article.php',qs.stringify(obj_1))
        return {
            id: article.data.id,
            Title: article.data.Title,
            subtitle: article.data.subtitle,
            Content: article.data.Content,
            Author: article.data.Author,
            categorie: article.data.categorie,
            Time: article.data.Time,
        }
    },
    methods: {
        async updateAboutData(){
            const obj = { 
                data:'post_updateData',
                id: this.id,
                Title: this.Title,
                subtitle: this.subtitle,
                Content: this.Content,
                Author: this.Author,
                categorie: this.categorie,
                Time: this.Time
            }
            let res = await axios.post('https://api.glumi.cn/api/Article.php',qs.stringify(obj))
            if(res.data=='更新成功'){
                alert('更新成功')
            }else if(res.data=='更新失败') {
                alert('更新失败')
            }
        }
    },
    async mounted() {
        editor = new wangEditor(`#editor`)
        editor.config.onchange = (newHtml) => {
            this.Content = newHtml
        }
        editor.highlight = hljs
        editor.create();
        this.editor = editor
        editor.txt.html(this.Content)
    },
}
</script>

<style lang="scss" scoped>
    #updateBox {
        margin: 10px;
        input,button {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>