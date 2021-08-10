<template>
    <div id="editorbox">
        <input type="text" v-model="title" placeholder="标题">
        <input type="text" v-model="subtitle" placeholder="小标题（可为空）">
        <input type="text" v-model="author" placeholder="作者">
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
import axios from 'axios'
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
            time: ''
        }   
    },
    methods: {
        onclick(){
            var requ = "^[ ]+$"
            var re = new RegExp(requ)
            this.editorData = this.editor.txt.html();
            if(re.test(this.title) 
            | this.title=='' 
            | this.author==''){
                alert('null')
            }else {
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
                axios.post('http://api.glumi.cn/api/Article.php',qs.stringify(data)).then((res)=>{
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
        }
    },
    // async beforeCreate(){
    //     axios.get('http://api.glumi.cn/api/Article.php?data=getNewArticleId').then((res)=>{
    //         this.id = res.data
    //     })
    // },
    async mounted() {
        let ArticleIdRes = await axios.get('http://api.glumi.cn/api/Article.php',{ params:{ data:'getNewArticleId'} })
        this.id = ArticleIdRes.data
        const editor = new wangEditor(`#editor`)
        editor.config.onchange = (newHtml) => {
            this.editorData = newHtml
        }
        editor.highlight = hljs
        editor.config.uploadImgServer = 'http://api.glumi.cn/api/File.php'
        editor.config.uploadImgParams = {
            token: window.localStorage.getItem('token'),
            id: this.id
        }
        editor.create();
        this.editor = editor
    },
}
</script>