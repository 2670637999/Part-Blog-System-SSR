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
                    <nuxt-link :to="{name:'admin-update',query:{ id:posts[data].id}}">
                        <button @click="$store.commit('ChangeAdminEditorPageState')">编辑文章</button>
                        <!-- <button>编辑文章</button> -->
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
export default {
    data() {
        return {
            sum: 'null',
            posts: [
                { id:Number,Title: '请检查你的网络',subTitle:'', Content: 'null', Author: 'null',Time: 'null',url: 'null'}
            ]
        }
    },
    methods: {
        // AutoReadPost(){
        //     this.$axios.get(`Article.php`,{
        //         params: {
        //             data: 'getAllArticle'
        //         }
        //     }).then((response)=>
        //         this.posts = response.data
        //     ).catch(function(err){
        //         console.log(err);
        //     }),
        //     this.$axios.get(`Article.php`,{
        //         params: {
        //             data: 'getAllArticleSum'
        //         }
        //     }).then((response)=>
        //         this.sum = response.data
        //     ).catch(function(err){
        //         console.log(err);
        //     })
        // },
        DeletePost(Title){
            var user = this.$route.params.user
            this.$axios.get(`Article.php`,{
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
    },
    async asyncData({app}){
        let getAllArticle = await app.$axios.get(`Article.php`,{ params: {data: 'getAllArticle'} })
        let getAllArticleSum = await app.$axios.get(`Article.php`,{params: {data: 'getAllArticleSum'}})
        return { sum:getAllArticleSum.data, posts:getAllArticle.data }
    },
    async mounted(){
        // var time1 = setInterval(this.AutoReadPost,3000);
    },

}
</script>

<style lang="scss" scoped>
.page-enter-active {
  animation: part-enter-2 1s;
}
.page-leave-active {
  animation: part-leave-1 0.71s;
}
    #admin-post-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);

        header,main,footer {
            display: block;
            margin: 0px 10px;
            padding: 10px;
            border: 2px solid rgb(241, 241, 241);
        }
        header {
            box-sizing: border-box;
            span {
                margin: 10px;
            }
        }
        main {
            div {
                p {
                    text-align: left;
                    margin: 10px;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: #f3f3f3;
                    button {
                        float: right;
                    }
                }
            }
        }   
    }
</style>