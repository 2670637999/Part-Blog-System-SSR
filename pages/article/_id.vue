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