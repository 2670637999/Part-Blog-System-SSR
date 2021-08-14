<!-- 文章详情页 -->
<template>
    <div id="article">
        <article>
            <h1 id="Title">{{ article.Title }}</h1>
            <p>{{ article.subtitle }}</p>
            <p id="Author"><span>发布人 </span>{{article.Author}} 写于 {{article.Time}}</p>
            <p id="content" v-html="article.Content"></p>
        </article>
        <div>
            <p>本链接：<a :href="$route.path">https://blog.glumi.cn{{$route.path}}</a></p>
            <p>@陈杰海 版权所有，遵循许可 <a href="http://creativecommons.org/licenses/by-nc/4.0/"> CC-BY-NC-4.0 </a></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    // 文章详情页的 SEO 设置，默认绑定为文章所写内容
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
        // 获得文章详情页的 html 元素
        let article = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data: 'getArticleindexOfData',getidArticle: route.params.id }}).then((res)=>res.data)
        var html = article.Content
        // 处理 html 内容为普通文本
        var value = html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ')
        // 从过滤器中裁剪字符数，i 为最大字符数
        let i = 100
        if(value.length > i){
            var content = value.slice(0,i)+'...'
        }
        return {
            // 将用于显示正文的 html 元素返回
            article: article,
            // 将处理过的 html 作为普通文本返回。
            SEOContent: content
        }
    },
    // 如果你看到这里有个奇怪的代码🤔，那么它负责导航抬头（header）收放的动画效果。
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
            p {
                a {
                    text-decoration: none;
                    :hover{
                        text-decoration: initial;
                    }
                }

            }
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