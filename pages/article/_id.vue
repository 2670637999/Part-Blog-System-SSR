<template>
    <div>
        <h2>{{ article.Title }}</h2>
        <p v-html="article.Content"></p>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.$axios.get('Article.php',{ params: { data: 'getArticleindexOfData', getidArticle: this.$route.params.id }}).then((res)=>res.data.id),
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
                Title: '加载中',
                Content: '',
                Author: '',
                categorie: '',
                Time: '',
                url: ''
            }
        }
    },
    beforeCreate(){
        this.$axios.get('Article.php',{
            params: {
                data: 'getArticleindexOfData',
                getidArticle: this.$route.params.id
            }
        }).then((res)=>{
            this.article = res.data
        })
    }
}
</script>


<style lang="scss" scoped>
    div {
        padding: 15px;
    }
</style>