<template>
    <div id="admin-post-box">
        <header>
            <span v-if="$store.state.AdminEditorPageState">欢迎回来👏 ，目前有 {{sum}} 篇文章可以管理 </span>
            <span v-if="!$store.state.AdminEditorPageState">编辑文章</span>
            <!-- <span>写文章</span> -->
        </header>
        <main id="admin-post-list">
            <div>
                <p class="part-enter-2" ref="posts" :key="data" v-for="(item,data) in posts">
                    {{posts[data].Time}} , {{posts[data].Title}} 
                    <nuxt-link :to="{name:'index-admin-update',query:{ id:posts[data].id}}">
                        <button @click="$store.commit('ChangeAdminEditorPageState')">编辑文章</button>
                    </nuxt-link>
                    <button @click="DeletePost(`${posts[data].Title}`)" >删除文章</button>
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