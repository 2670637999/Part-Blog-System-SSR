<template>
    <div id="admin-articles">
        <header>
            <span v-if="$store.state.AdminEditorPageState">欢迎回来👏 ，目前有 {{sum}} 篇文章可以管理 </span>
            <span v-if="!$store.state.AdminEditorPageState">编辑文章</span>
            <!-- <span>写文章</span> -->
        </header>
        <main id="admin-articles-list">
            <div>
                <p ref="posts" :key="data" v-for="(item,data) in posts">
                    {{posts[data].Time}} , {{posts[data].Title}} 
                    <nuxt-link :to="{name:'index-admin-update',query:{ id:posts[data].id}}">
                        <button @click="$store.commit('ChangeAdminEditorPageState')"><i class="fa fa-edit"></i> 编辑</button>
                    </nuxt-link>
                    <button @click="DeletePost(`${posts[data].Title}`)" ><i class="fa fa-trash-o fa-lg"></i> 删除</button>
                </p>
            </div>
            <transition mode="out-in" enter-active-class="part-enter-2" leave-active-class="part-leave-1">
                <nuxt/>
            </transition>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            sum: 'null',
            posts: [
                { id:Number,Title: '请检查你的网络',subTitle:'', Content: 'null', Author: 'null',Time: 'null',url: 'null'}
            ]
        }
    },
    async asyncData(){
        let getAllArticle = await axios.get(`http://api.glumi.cn/api/Article.php`,{ params: {data: 'getAllArticle'} })
        let getAllArticleSum = await axios.get(`http://api.glumi.cn/api/Article.php`,{params: {data: 'getAllArticleSum'}})
        return { sum:getAllArticleSum.data, posts:getAllArticle.data }
    },
    methods: {
        DeletePost(Title){
            var user = this.$route.params.user
            axios.get(`http://api.glumi.cn/api/Article.php`,{
                params: {
                    data: 'delArticle',
                    deletePost: `${Title}`
                }
            }).then(function(res){
                if(res.data=='删除成功'){
                    alert('删除成功')
                }else if(res.data=='删除失败') {
                    alert('删除失败')
                }
            }).catch((error)=>console.log(error))
        },
    }
}
</script>

<style lang="scss" scoped>
    #admin-articles {
        margin: 10px;
        box-sizing: border-box;
        background-color: #fff;
        header {
            padding: 15px;
            background-color: #fff;
            border-bottom: 1px solid #ebebeb;
            box-sizing: border-box;
        }
        main {
            padding: 15px;
            box-sizing: border-box;
            p {
                border-bottom: 1px solid #ebebeb;
                a,button {
                    float: right;
                }
            }
        }

    }
</style>