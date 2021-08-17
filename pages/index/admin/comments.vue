<!-- 留言管理 -->
<template>
    <div id="admin-comments">
        <header>
            <span>目前有 {{sum}} 条留言可以管理 </span>
        </header>
        <main id="admin-comments-list">
            <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                <p ref="posts" :key="data+1" v-for="(item,data) in comments" >{{comments[data].time}} , {{comments[data].name}} : {{ comments[data].content }}<button @click="DelComment(`${comments[data].id}`,`${comments[data].name}`,`${comments[data].content}`,`${comments[data].time}`)"><i class="fa fa-trash-o fa-lg"></i> 删除</button></p>
            </transition-group>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            sum: 'null',
            comments: [
                { id:'',Email: '请检查你的网络', url: '', name: '目前没有任何评论信息',sex:'',content: '',time: '' }
            ]
        }
    },
    async asyncData({app}){
        let getAllComment = await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllComment'}})
        let getAllCommentSum = await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllCommentSum'}})
        return { sum:getAllCommentSum.data, comments:getAllComment.data }
    },
    methods: {
        async DelComment(id,name,content,time){
            if(confirm('确定删除吗 ？')){
                axios.get(`https://api.glumi.cn/api/comment.php`,{
                    params: {
                        token: window.localStorage.getItem('token'),
                        data: 'delComment',
                        Comment_id: `${ id }`,
                        Comment_userName: `${ name }`,
                        Comment_Content: `${ content }`,
                        Comment_Time: `${ time }`
                    }
                }).then(function(res){
                    if(res.data=='删除成功'){
                        alert('删除成功')
                    }else if(res.data=='删除失败') {
                        alert('删除失败')
                    }
                })
            }
            await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllComment'}
            }).then((response)=>this.comments = response.data)
            await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllCommentSum'}
            }).then((response)=>this.sum = response.data)
            await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllComment'}
            }).then((response)=>this.comments = response.data)
            await axios.get(`https://api.glumi.cn/api/comment.php`,{params: {data: 'getAllCommentSum'}
            }).then((response)=>this.sum = response.data)
        }
    }
}
</script>

<style lang="scss" scoped>
    #admin-comments {
        margin: 10px;
        background-color: #fff;
        header {
            padding: 15px;
            border-bottom: 1px solid #ebebeb;
        }
        main {
            padding: 15px;
            p {
                border-bottom: 1px solid #ebebeb;
                button {
                    float: right;
                }
            }
        }
    }
</style>