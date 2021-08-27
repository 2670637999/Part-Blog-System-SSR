<!-- 首页文章 -->
<template>
    <div id="articles">
        <article :key="data" v-for="(item,data) in articles" v-show="articles[data].categorie==$route.params.id">
            <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }">
                <h2 @click="ToTop">{{ articles[data].Title }}</h2>
            </nuxt-link>
            <h3 v-show="articles[data].subtitle==''?false:true">{{ articles[data].subtitle }}</h3>
            <p>{{ ToText(articles[data].Content)|ellipsis}}</p>
            <p>{{ articles[data].Author }} 写于 {{ articles[data].Time }} 「{{ articles[data].categorie }}」 <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }"><span @click="ToTop" >查看更多</span></nuxt-link></p>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    head() {
        return {
            title: this.categorieTitle,
            meta:[
                { charset: 'utf-8' },
                { 
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
            ]
        }
    },
    data(){
        return {
            categorieTitle: '',
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ],
        }
    },
    async asyncData({params}){
        let articlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data: 'getAllArticle' }})
        return { 
            categorieTitle: params.id,
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
    .page-enter-active {
        animation: part-enter-2 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
    }
    a {
        color: #575656;
        text-decoration: none;
    }
    p {
        a {
            float: right;
        }
    }
    #articles {
        overflow: hidden;
    }
    article {
        margin-top: 40px;
        margin-left: 100px;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 30px;
        h2 {
            transition: 0.21s;
            border-left: 4px solid rgb(209, 211, 214);
            padding-left: 10px;
            font-size: 21px;
            &:hover {
                border-left: 4px solid cornflowerblue;
            }
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
        }
        @media all and(max-width:900px) {
            margin: 0;
            padding: 0px 10px;
        }
    }
</style>