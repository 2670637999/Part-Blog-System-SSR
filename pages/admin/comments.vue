<template>
    <div id="admin-post-box">
        <header>
            <span>目前有 {{sum}} 条留言可以管理 </span>
            <!-- <span>新增留言</span> -->
        </header>
        <main id="admin-post-list">
            <div>
                <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                    <p ref="posts" :key="data+1" v-for="(item,data) in comments" >{{comments[data].time}} , {{comments[data].name}} : {{ comments[data].content }}<button @click="DelComment(`${comments[data].name}`,`${comments[data].content}`,`${comments[data].time}`)">删除评论</button></p>
                </transition-group>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sum: 'null',
            comments: [
                { Email: '请检查你的网络', url: '', name: '目前没有任何评论信息',sex:'',content: '',time: '' }
            ]
        }
    },
    methods: {
        AutoReadComment(){
            this.$axios.get(`comment.php`,{
                params: {
                    data: 'getAllComment'
                }
            }).then((response)=>
                this.comments = response.data
            ).catch(function(err){
                console.log(err);
            }),
            this.$axios.get(`comment.php`,{
                params: {
                    data: 'getAllCommentSum'
                }
            }).then((response)=>
                this.sum = response.data
            ).catch(function(err){
                console.log(err);
            })
        },
        DelComment(name,content,time){
            
            this.$axios.get(`comment.php`,{
                params: {
                    data: 'delComment',
                    Comment_userName: `${ name }`,
                    Comment_Content: `${ content }`,
                    Comment_Time: `${ time }`
                }
            }).then(function(res){
                if(res.data=='删除成功'){
                    // alert('删除成功')
                    console.log('删除成功')
                    // window.location.href= `/admin/${user}/comment`
                }else if(res.data=='删除失败') {
                    alert('删除失败')
                    // window.location.href= `/admin/${user}/comment`
                }
            }).catch((error)=>console.log(error))
            
            this.$axios.get(`comment.php`,{
                params: {
                    data: 'getAllComment'
                }
            }).then((response)=>
                this.comments = response.data
            ).catch(function(err){
                console.log(err);
            }),
            this.$axios.get(`comment.php`,{
                params: {
                    data: 'getAllCommentSum'
                }
            }).then((response)=>
                this.sum = response.data
            ).catch(function(err){
                console.log(err);
            })
            
        }
    },
    mounted:function(){
        setInterval(this.AutoReadComment,3000)
    },
    beforeCreate: function(){
        this.$axios.get(`comment.php`,{
            params: {
                data: 'getAllComment'
            }
        }).then((response)=>
            this.comments = response.data
        ).catch(function(err){
            console.log(err);
        }),
        this.$axios.get(`comment.php`,{
            params: {
                data: 'getAllCommentSum'
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
            }
        }   

    }

</style>