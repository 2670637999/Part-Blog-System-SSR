<template>
    <div id="updateBox">
        <!-- <div><input type="text" placeholder="id" v-model="id"></div> -->
        <div><input type="text" placeholder="标题" v-model="Title"></div>
        <div><input type="text" placeholder="子标题" v-model="subtitle"></div>
        <div><input type="text" placeholder="作者" v-model="Author"></div>
        <div><input type="text" placeholder="分类" v-model="categorie"></div>
        <div><input type="text" placeholder="时间" v-model="Time"></div>
        <div id="editor"><div v-html="Content"></div></div>
        <button @click="updateAboutData">更新</button>
        <nuxt-link :to="{name:'admin-articles'}"><button @click="$store.commit('ChangeAdminEditorPageState')">返回</button></nuxt-link>
    </div>
</template>

<script>
if (process.client) {
    var hljs = require('highlight.js')
    var wangEditor = require('wangeditor')
}
var editor
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
    methods:{
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
            let res = await this.$axios.post('Article.php',qs.stringify(obj))
            if(res.data=='更新成功'){
                alert('更新成功')
            }else if(res.data=='更新失败') {
                alert('更新失败')
            }
        }
    },
    async asyncData({app,params}){
        const obj_1 = { 
            data: 'post_getArticleindexOfData',
            id: params.id
        }
        let article = await app.$axios.post('Article.php',qs.stringify(obj_1))
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
    async mounted() {
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
        editor = new wangEditor(`#editor`)
        editor.config.onchange = (newHtml) => {
            this.Content = newHtml
        }
        editor.highlight = hljs
        editor.create();
        this.editor = editor
        editor.txt.html(this.Content)
    },
    // beforeDestroy() {
    //     // 销毁编辑器
    //     this.editor.destroy()
    //     this.editor = null
    // }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-2 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.71s;
    }
    #editor {
        width: 100%;
    }
    button{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    input {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
</style>