<template>
    <div id="updateBox">
        <div><input type="text" placeholder="标题" v-model="Title"></div>
        <div id="editor"><div v-html="Content"></div></div>
        <button>更新</button>
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
            id: '',
            Title: '',
            subtitle: '',
            Content: '',
            Author: '',
            categorie: '',
            Time: '',
        }
    },
    async asyncData({app,route}){
        const obj_1 = { 
            data: 'post_getArticleindexOfData',
            id: route.query.id
        }
        let article = await app.$axios.post('Article.php',qs.stringify(obj_1))
        return {
            Title: article.data.Title,
            subtitle: article.data.subtitle,
            Content: article.data.Content,
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
        this.editorData = newHtml
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
    }
    input {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
</style>