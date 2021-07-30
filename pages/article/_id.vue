<template>
    <div>
        <article>
            <h2>{{ article.Title }}</h2>
            <p>{{ article.Time }}</p>
            <p v-html="article.Content"></p>
        </article>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.title,
            meta: [
                { charset: 'utf-8' },
                { 
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '测试描述'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '测试关键字'
                }
            ]
        }
    },
    data(){
        return {
            article: {
                id: Number,
                Title: '',
                Content: '',
                Author: '',
                categorie: '',
                Time: '',
                url: ''
            }
        }
    },
    async asyncData({ app,route }) {
        let article = await app.$axios.get('Article.php',{ params:{ data: 'getArticleindexOfData',getidArticle: route.params.id }}).then((res)=>res.data)
        return { article }
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
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding: 15px;
        box-sizing: border-box;
        article {
            margin: auto;
        }
        @media all and (min-width: 750px) {
            article{
                width: 700px;
            }
        }
    }
</style>