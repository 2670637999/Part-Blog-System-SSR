<template>
    <div id="article">
        <article>
            <h1 id="Title">{{ article.Title }}</h1>
            <p>{{ article.subtitle }}</p>
            <p id="Author"><span>发布人 </span>{{article.Author}} 写于 {{article.Time}}</p>
            <p id="content" v-html="article.Content"></p>
        </article>
        <div>
            <!-- <p>Author：{{ article.Author }}</p> -->
            <!-- <p>Time：{{ article.Time }}</p> -->
            <p>本链接：<a :href="$route.path">https://blog.glumi.cn{{$route.path}}</a></p>
            <p>@陈杰海 版权所有，遵循许可 <a href="http://creativecommons.org/licenses/by-nc/4.0/"> CC-BY-NC-4.0 </a></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    head(){
        return {
            title: this.article.Title,
            meta: [
                { charset: 'utf-8' },
                { 
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.SEOContent
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.article.categorie
                }
            ]
        }
    },
    data(){
        return {
            article: {
                id: Number,
                Title: '',
                subtitle: '',
                Content: '',
                Author: '',
                categorie: '',
                Time: '',
                url: ''
            }
        }
    },
    async asyncData({route}){
        let article = await axios.get('http://api.glumi.cn/api/Article.php',{ params:{ data: 'getArticleindexOfData',getidArticle: route.params.id }}).then((res)=>res.data)
        var html = article.Content
        var value = html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')
        let i = 100
        if(value.length > i){
            var content = value.slice(0,i)+'...'
        }
        return {
            article: article,
            SEOContent: content
        }
    },
    beforeCreate(){
        if(process.client){
            window.scrollTo(0,0)
            document.getElementById('header').style.height="0px"
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-20 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
    }
    #article {
        margin-top: 40px;
        z-index: 20000;
        padding: 0px 10px;
        box-sizing: border-box;
        article {
            margin-left: 100px;
            @media all and(max-width: 900px) {
                margin: 0;
            }
        }
        #Title {
            color: #575656;
            font-size: 30px;
            margin-bottom: 20px;
            // text-align: center;
        }
        #Author {
            margin: 0 0 14px 0;
            padding: 3px;
            border-radius: 5px;
            color: rgb(143, 143, 143);
            span {
                background-color: rgb(255, 255, 255);
                // color: cornflowerblue;
                margin-right: 3px;
                font-style: italic;
            }
        }
        #content {
            color: #5c5c5c;
        }
        div {
            margin-left: 100px;
            border-top: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;
            // margin-bottom: 10px;
            @media all and(max-width: 900px) {
                margin: 0;
            }
        }
        @media all and(min-width: 900px) {
        }
        @media all and(max-width: 900px) {
            width: 100%;
            margin: 0;
        }
    }
</style>