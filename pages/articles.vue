<template>
    <div>
        <ul>
            <nuxt-link :to="{ name: 'article-id', params:{ id: articles[data].id  } }" :key="data" v-for="(item,data) in articles">
            <li>
                <span>#</span>
                <span>{{ articles[data].Title }}</span>
                <span>{{ articles[data].Time }}</span>
            </li>
            </nuxt-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ]
        }
    },
    async asyncData({ app }){
        let articles = await app.$axios.get('Article.php',{ params:{ data:'getAllArticle' } }).then((res)=>res.data)
        return { articles }
    },
    mounted() {
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
    },
}
</script>

<style lang="scss" scoped>
div { 
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    ul {
        margin: 0;
        padding: 0;
        text-align: center;
        width: 700px;
        a {
            text-decoration: none;
        }
        li {
            transition: 0.5s;
            display: flex;
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            cursor: pointer;
            border-bottom: 1px solid #bdbcbc;
            color: initial;
            span {
                width: 100%;
            }
            span:nth-child(1) {
                width: initial;
                margin-right: 5px;
                color: cornflowerblue;
            }
            span:nth-child(2) {
                text-align: left;
            }
            span:nth-child(3) {
                text-align: right;
            }

            &:hover {
                color: cornflowerblue;
                transform: scale(0.9);
                border-bottom: 1px solid cornflowerblue;
            }
        }
    }
}
</style>