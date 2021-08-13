<!-- 历史 -->
<template>
    <div>
        <ul>
            <!-- 路由指向文章详情页 -->
            <nuxt-link :to="{ name: 'index-article-id', params:{ id: articles[data].id  } }" :key="data" v-for="(item,data) in articles">
            <li>
                <span></span>
                <!-- 显示文章标题，并使用过滤 -->
                <span>{{ articles[data].Title | ellipsis }}</span>
                <!-- 文章发布时间 -->
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
    filters: {
        // 过滤器，避免标题字符超出导致布局溢出。 i 为最大字符数
        ellipsis: function(value) {
            let i = 18;
            if(value.length > i){
                return value.slice(0,i)+'...'
            }
            return value
        }
    },
    async asyncData(){
        // 获取所有文章数据
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