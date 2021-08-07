<template>
    <div>
        <ul>
            <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }" :key="data" v-for="(item,data) in articles">
            <li>
                <span></span>
                <span>{{ articles[data].Title }}</span>
                <span>{{ articles[data].Time }}</span>
            </li>
            </nuxt-link>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ]
        }
    },
    async asyncData(){
        let articlesRes = await axios.get('http://api.glumi.cn/api/Article.php',{ params:{ data:'getAllArticle' } })
        return { articles: articlesRes.data }
    }
}
</script>

<style lang="scss" scoped>
    div {
        margin-top: 15px;
        width: 100%;   
        padding: 10px;
        box-sizing: border-box;
        @media all and(max-width:900px) {
            margin: 0;
        }
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        a {
            text-decoration: none;
            color: #575656;
            li {
                padding: 10px;
                border-bottom: 1px solid #000000;
                span:nth-child(3){
                    float: right;
                }
            }
            &:hover {
                color: cornflowerblue;
            }
        }
    }
</style>