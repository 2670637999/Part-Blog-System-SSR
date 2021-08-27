<!-- 文章详情页 -->
<template>
    <div id="article">
        <article>
            <p id="content" v-html="article.Content"></p>
        </article>
        <div id="articleFooter">
            <p>本链接：<a :href="$route.path">https://blog.glumi.cn{{$route.path}}</a></p>
            <p>@陈杰海 版权所有，遵循许可 <a href="http://creativecommons.org/licenses/by-nc/4.0/"> CC-BY-NC-4.0 </a></p>
            <p>分类：<nuxt-link :to="{ name:'index-categorie-id',params:{ id: article.categorie } }"><span @click="ToTop">{{ article.categorie }}</span></nuxt-link></p>
            <p>
                <nuxt-link v-if="article.id-1!=0?true:false" :to="{ name:'index-article-id',params:{ id: (Number(article.id)-1) } }">
                    <span @click="ToTop">上一篇</span>
                </nuxt-link>
                <nuxt-link v-if="$route.params.id<articlesSum | Number($route.params.id)+1==articlesSum?true:false" :to="{ name:'index-article-id',params:{ id: (Number(article.id)+1)} }">
                    <span @click="ToTop">下一篇</span>
                </nuxt-link>
            </p>
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
            articlesSum: Number,
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
        // 获得所有文章数量
        let articlesSum = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data: 'getAllArticleSum'}}).then((res)=>res.data)
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
            // 返回文章数量
            articlesSum: articlesSum,
            // 将用于显示正文的 html 元素返回
            article: article,
            // 将处理过的 html 作为普通文本返回。
            SEOContent: content
        }
    },
    methods: {
        ToTop(){
            let i = window.scrollY
            var time = setInterval(()=>{
                window.scrollTo(0,i-=(i*0.01))
                if(window.scrollY==0){
                    clearInterval(time)
                }
            },0.1)
        }
    },
}
</script>

<style lang="scss" scoped>
    #article {
        margin-top: 40px;
        margin-bottom: 40px;
        z-index: 20000;
        padding: 0px 10px;
        box-sizing: border-box;
        overflow: auto;
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
    #articleFooter {
        p:last-child {
            display: flex;
            border-top: 1px solid #ebebeb;
            padding-top: 15px;
            a {
                background-color: aliceblue;
                text-align: center;
                margin: 10px;
                flex: 1;
                span {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>