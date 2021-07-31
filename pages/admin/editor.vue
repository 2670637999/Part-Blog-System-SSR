<template>
    <div id="editorbox">
        <input type="text" v-model="title" placeholder="标题">
        <input type="text" v-model="subtitle" placeholder="小标题（可为空）">
        <input type="text" v-model="categorie" placeholder="分类">
        <input type="text" v-model="time" placeholder="时间（如果不输入，会是当前时间）">
        <div id="editor"></div>
        <button @click="onclick">发布文章</button>
    </div>
</template>

<script>
if (process.client) {
    var hljs = require('highlight.js')
    var wangEditor = require('wangeditor')
}
import hyperdown from 'hyperdown'
import qs from 'qs'
export default {
    data(){
        return {
            editor: null,
            editorData: '',
            id: '',
            title: '',
            subtitle: '',
            content: '',
            author: '',
            categorie: '',
            time: '',
        }
    },
    methods:{
        onclick(){
            var requ = "^[ ]+$"
            var re = new RegExp(requ)
            this.author = this.$route.params.user
            this.editorData = this.editor.txt.html();
            const data = {
                data: 'post_addArticle',
                token: window.localStorage.getItem('token'),
                article_title: this.title,
                article_subtitle: this.subtitle,
                article_content: this.editorData,
                article_author: this.author,
                article_categorie: this.categorie,
                article_time: this.time
            }
            this.$axios.post('Article.php',qs.stringify(data)).then((res)=>{
                if(re.test(this.title) | re.test(this.content)){
                    alert('不能发布空文章')
                }else {
                    if(res.data == '发布成功'){
                        alert('发布成功')
                    }else if(res.data == '发布失败') {
                        alert('发布失败')
                    }
                }
            })
        }
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
    },
    // beforeDestroy(){
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
#editorbox { 
    input {
        display: block;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 15px;
        
    }
    display: block;
    width: 100%;
    height: 100%;
    // margin: 0 auto;
    background-color: #ffffff;
    #editor {
        // width: 700px;
        margin: auto;
        text-align: left;
    }
    button {
        display: block;
        width: 100%;
        margin: auto;
        padding: 15px;
    }
    @media all and(max-width: 700px) {
        input {
            width: 100%;
        }
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