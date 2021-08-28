<!-- 首页文章 -->
<template>
    <div id="articles">
        <article :key="data" v-for="(item,data) in articles">
            <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }">
                <h2 @click="ToTop">{{ articles[data].Title }}</h2>
            </nuxt-link>
            <h3 v-show="articles[data].subtitle==''?false:true">{{ articles[data].subtitle }}</h3>
            <p>{{ ToText(articles[data].Content)|ellipsis}}</p>
            <p>{{ articles[data].Author }} 写于 {{ articles[data].Time }}</p>
            <p id="categories">分类：
                <nuxt-link :to="{name:'index-categorie-id',params:{ id:articles[data].categorie }}">
                    <span @click="ToTop">{{ articles[data].categorie }}</span>
                </nuxt-link>
                <nuxt-link :to="{ name:'index-article-id',params:{ id: articles[data].id } }">
                    <span @click="ToTop">阅读全文</span>
                </nuxt-link>
            </p>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    head: {
        title: '陈陈菌博客',
        htmlAttrs: {
        lang: 'cn'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords',name: 'keywords',content: '陈陈菌博客,陈陈菌,陈杰海,陈杰海博客' },
            { hid: 'description', name: 'description', content: '技术、学习、笔记。1名电脑技术爱好者的个人博客，不定期更新记录一些技术学习相关的笔记和内容。' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    data(){
        return {
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ],
        }
    },
    async asyncData(){
        let articlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data: 'getAllArticle' }})
        return { 
            articles: articlesRes.data,
        }
    },
    filters: {
        ellipsis: function(value) {
            let i = 260;
            if(value.length > i){
                return value.slice(0,i)+'...'
            }
            return value
        }
    },
    methods:{
        ToText(HTML)
        {
            var input = HTML;
            return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
        },
        ToTop(){
            let i = window.scrollY
            var time = setInterval(()=>{
                window.scrollTo(0,i-=(i*0.01))
                if(window.scrollY==0){
                    clearInterval(time)
                }
            },0.1)
        }
    }
}
</script>

<style lang="scss" scoped>
    a {
        color: #575656;
        text-decoration: none;
    }
    // p {
    //     a:nth-child(1){
    //         border: 1px solid #c4c4c4;
    //         font-style: initial;
    //         padding: 3px 10px;
    //         box-sizing: border-box;
    //         margin-left: 3px;
    //         border-radius: 999em;
    //         float: right;
    //     }
    // }
    @keyframes articleAnimation {
        from {
            background-position-x: -50rem;
        }
        50% {
            background-position-x: 0rem;
        }
        to {
            background-position-x: 50rem;
        }
    }
    #articles {
        overflow: hidden;
    }
    article {
        margin-top: 20px;
        margin-left: 100px;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
        a {
            transition: 0.2s;
            display: inline-block;
            &:hover {
                color: cornflowerblue;
            }
        }
        h2 {
            transition: 0.21s;
            // padding-left: 10px;
            // border-left: 4px solid cornflowerblue;
            font-size: 21px;
            color: #696969;
        }
        h3 {
            font-weight: 200;
            font-size: 16px;
            margin: 0;
        }
        p{
            color: #a3a3a3;
            font-size: 14px;
            font-style: italic;
            &:nth-child(2) {
                background-color: red; 
            }
        }
        #categories {
            a:nth-child(1){
                border: 1px solid #c4c4c4;
                font-style: initial;
                padding: 3px 10px;
                box-sizing: border-box;
                margin-left: 3px;
                border-radius: 999em;
            }
            a:nth-child(2){
                font-style: initial;
                float: right;
            }
        }
        @media all and(max-width:900px) {
            margin: 0;
            padding: 0px 10px;
        }
    }
</style>