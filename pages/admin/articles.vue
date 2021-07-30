<template>
    <div id="admin-post-box">
        <header>
            <span>欢迎回来👏 ，目前有 {{sum}} 篇文章可以管理 </span>
            <!-- <span>写文章</span> -->
        </header>
        <main id="admin-post-list">
            <div>
                <p class="part-enter-2" ref="posts" :key="data" v-for="(item,data) in posts">{{posts[data].Time}} , {{posts[data].Title}} <button @click="DeletePost(`${posts[data].Title}`)" >删除文章</button></p>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sum: 'null',
            posts: [
                {Title: '请检查你的网络',subTitle:'', Content: 'null', Author: 'null',Time: 'null',url: 'null'}
            ]
        }
    },
    methods: {
        AutoReadPost(){
            this.$axios.get(`Article.php`,{
                params: {
                    data: 'getAllArticle'
                }
            }).then((response)=>
                this.posts = response.data
            ).catch(function(err){
                console.log(err);
            }),
            this.$axios.get(`Article.php`,{
                params: {
                    data: 'getAllArticleSum'
                }
            }).then((response)=>
                this.sum = response.data
            ).catch(function(err){
                console.log(err);
            })
        },
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
                    // window.location.href= `/admin/${user}/post`
                }else if(res.data=='删除失败') {
                    alert('删除失败')
                    // window.location.href= `/admin/${user}/post`
                }
            }).catch((error)=>console.log(error))
        }
    },
    mounted: function(){
        setInterval(this.AutoReadPost,3000);
    },
    beforeCreate: function(){
        this.$axios.get(`Article.php`,{
            params: {
                data: 'getAllArticle'
            }
        }).then((response)=>
            this.posts = response.data
        ).catch(function(err){
            console.log(err);
        }),
        this.$axios.get(`Article.php`,{
            params: {
                data: 'getAllArticleSum'
            }
        }).then((response)=>
            this.sum = response.data
        ).catch(function(err){
            console.log(err);
        })
        
    }

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
            // box-shadow: 0px 0px 15px 0px #cacaca;
            border: 2px solid rgb(241, 241, 241);
        }
        header {
            box-sizing: border-box;
            span {
                margin: 10px;
            }
            span:nth-child(2) {
                margin: 0;
                transition: 0.3s;
                border-radius: 5px;
                padding: 5px;
                display: block;
                float: right;
                background-color: #ffffff;
                color: #1d1d1d;
                padding: 0px 5px;
                font-size: 20px;
                margin: 0px 20px 0px 0px;
                cursor: pointer;                    
                border: 2px solid rgb(88, 88, 88);

                &:hover {
                    box-shadow: 0px 0px 0px 0px #a8a8a8;
                    transform: scale(0.9);
                    border: 2px solid steelblue;
                    color: steelblue;

                }
            }
        }
        main {
            div {
                // width: 300px;
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
                // p:nth-child(1) {
                //     float: right;
                //     background-color: steelblue;
                //     color: #ffffff;
                // }
            }
        }   
    }
</style>