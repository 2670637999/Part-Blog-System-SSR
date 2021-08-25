<template>
    <div id="categoriesBox">
        <header id="categoriesTag">
            <span @click="ToTop" :key="data" v-for="(item,data) in categories">
                <nuxt-link :to="{ name:'index-categorie-id',params:{ id: categories[data].categorie }}">
                    {{categories[data].categorie}}
                </nuxt-link>
            </span>
        </header>
        <main id="articles">
            <div :key="data" v-for="(item,data) in categories">
                <h3>
                    <i class="fa fa-tag"></i> {{categories[data].categorie}}
                </h3>
                <div @click="ToTop" id="article" :key="data2" v-for="(item,data2) in articles" v-show="articles[data2].categorie==categories[data].categorie">
                    <nuxt-link :to="{ name:'index-article-id',params:{ id: articles[data2].id}}">
                    <div>
                        <p>
                            <span>{{ articles[data2].Title }}</span> <span>{{ articles[data2].Time }}</span>
                        </p>
                        <div v-if="articles[data2].subtitle">
                            <span>{{ articles[data2].subtitle }}</span>
                        </div>   
                    </div>
                    </nuxt-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
import documentVue from './document.vue'
export default {
    data(){
        return {
            categories: [],
            articles: []
        }
    },
    async asyncData(){
        // 获取分类数据
        let categoriesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data:'getCategories' } })
        // 获取文章数据
        let articlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data: 'getAllArticle' }})
        return {
            categories: categoriesRes.data,
            articles: articlesRes.data,
        }
    },
    methods:{
        ToTop(){
            window.scrollTo(0,0)
        }
    }
}

</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-1 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
    }
    #categoriesBox {
        margin-top: 55px;
        #categoriesTag {
            display: flex;
            flex-wrap: wrap;
            padding: 5px;
            a {
                display: inline-block;
                border: 1px solid #ebebeb;
                border-radius: 999em;
                padding: 5px 10px 5px 10px;
                color: #ffffff;
                line-height: 24px;
                // font-size: 12px;
                text-decoration: none;
                margin: 0 3px;
                margin-bottom: 6px;
                background-color: cornflowerblue;
            }
            padding-bottom: 15px;
        }
        #articles {
            margin-bottom: 55px;
            padding: 10px;
            div {
                h3 {
                    color: cornflowerblue;
                }
                #article {
                    border-bottom: 1px solid #ebebeb;
                    a {
                        text-decoration: none;
                        color: #b1b1b1;
                    }
                    div {
                        p
                        {
                            color: #000;
                            span:last-child{
                                float: right;
                                color: #b6b6b6;
                            }
                        }
                        div
                        {
                            margin: 10px 0px;
                            span {
                                font-size: 12px;
                            }

                        }
                    }
                }
            }
        }
        @media all and(max-width: 900px) {
            margin-top: 15px;
            & #articles {
                margin: 0;
            }
        }
    }
</style>