<template>
    <div id="admin-post-box">
        <header>
            <span>目前有 {{sum}} 条留言可以管理 </span>
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
import axios from 'axios'
export default {
    data(){
        return {
            sum: 'null',
            comments: [
                { Email: '请检查你的网络', url: '', name: '目前没有任何评论信息',sex:'',content: '',time: '' }
            ]
        }
    },
    async asyncData({app}){
        let getAllComment = await axios.get(`http://api.glumi.cn/api/comment.php`,{params: {data: 'getAllComment'}})
        let getAllCommentSum = await axios.get(`http://api.glumi.cn/api/comment.php`,{params: {data: 'getAllCommentSum'}})
        return { sum:getAllCommentSum.data, comments:getAllComment.data }
    },
    methods: {
        DelComment(name,content,time){
            axios.get(`http://api.glumi.cn/api/comment.php`,{
                params: {
                    data: 'delComment',
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
            }).catch((error)=>console.log(error))
            
            axios.get(`http://api.glumi.cn/api/comment.php`,{
                params: {
                    data: 'getAllComment'
                }
            }).then((response)=>
                this.comments = response.data
            ).catch(function(err){
                console.log(err);
            }),
            axios.get(`http://api.glumi.cn/api/comment.php`,{
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
}
</script>