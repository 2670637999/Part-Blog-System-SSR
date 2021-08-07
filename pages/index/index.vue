<template>
    <div id="articles">
        <article :key="data" v-for="(item,data) in articles">
            <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }">
                <h2>{{ articles[data].Title }}</h2>
            </nuxt-link>
            <h3 v-show="articles[data].subtitle==''?false:true">{{ articles[data].subtitle }}</h3>
            <p>{{ ToText(articles[data].Content)|ellipsis}}</p>
            <p>{{ articles[data].Author }} 写于 {{ articles[data].Time }} 「{{ articles[data].categorie }}」 <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }">查看更多</nuxt-link></p>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ],
        }
    },
    async asyncData(){
        let articlesRes = await axios.get('http://api.glumi.cn/api/Article.php',{ params:{ data: 'getAllArticle' }})
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
    }
}
</script>

<style lang="scss" scoped>
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
            font-size: 26px;
            &:hover {
                border-left: 4px solid cornflowerblue;
            }
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