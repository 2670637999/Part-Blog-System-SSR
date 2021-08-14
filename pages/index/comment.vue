<!-- 留言 -->
<template>
    <div id="commentBox">
        <div id="form">
            <input type="text" v-model="inputValue.name" placeholder="用户名">
            <input type="text" v-model="inputValue.Email" placeholder="请输入QQ邮箱（可选，用于获取头像）">
            <input type="text" v-model="inputValue.url" placeholder="地址（可选）">
            <textarea type="text" v-model="inputValue.content" placeholder="内容"></textarea>
            man <input type="radio" value="男" v-model="inputValue.sex" name="sex">
            woman <input type="radio" value="女" v-model="inputValue.sex" name="sex">
            <button @click="AddComment">提交</button>
        </div>
        <div id="comment">
            <h3 v-if="comments[0]">留言</h3>
            <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                <ul :key="data+1" v-for="(item,data) in comments">
                    <li><img :src="comments[data].Email!=''?`http://q1.qlogo.cn/g?b=qq&nk=${comments[data].Email}&s=100`:(comments[data].sex=='男'?'/man.png':'/woman.png')" alt="图片失效了"></li>
                    <li>
                        <div>
                            <nuxt-link v-if="comments[data].url==null" :to="{name:'index-comment'}"><span><b>{{comments[data].name}}</b></span></nuxt-link>
                            <a v-else-if="comments[data].url!=null" :href="comments[data].url"><span><b>{{comments[data].name}}</b></span></a>
                        </div><br>
                        <div>
                            <span>{{comments[data].content}}</span>
                            <span id="time">{{comments[data].time}}</span>
                        </div>
                    </li>
                </ul>
            </transition-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            // 输入表单
            inputValue: {
                Email:'',url:'',name:'',content:'',sex:'男'
            },
            // 评论数据
            comments:[
                { Email:'',url:'',name:'',sex:'',content:'',time:''}
            ]
        }
    },
    async asyncData(){
        // 发起请求获取所有评论数据，把值返回给 Data 
        let commentsRes = await axios.get('https://api.glumi.cn/api/comment.php',{ params: { data: 'getAllComment' }})
        return { comments: commentsRes.data }
    },
    methods:{
        // 添加评论函数
        async AddComment(){
            var requ = "^[ ]+$"
            var re = new RegExp(requ)
            if(this.inputValue.name =='' 
            | this.inputValue.content == '' 
            | this.inputValue.name==' ' 
            | this.inputValue.content==' '
            | this.inputValue.name==null
            | this.inputValue.content==null
            | re.test(this.inputValue.name)){
                alert('不能填写空内容')
            }else {
                // 请求留言接口，response.data 为 ok 提交成功，为 0 则提交失败。
                 axios.get('https://api.glumi.cn/api/comment.php',{
                    params: {
                        data: 'addComment',
                        Email: this.inputValue.Email,
                        url: this.inputValue.url,
                        name: this.inputValue.name,
                        sex: this.inputValue.sex,
                        content: this.inputValue.content
                    }
                }).then(function(response){
                    if(response.data=='ok'){
                        alert('提交成功')
                    }else if(response.data=='0'){
                        alert('提交失败')
                    }
                }).catch((error)=>console.log(error))
            }
        }
    },
    beforeCreate(){
        // 定时请求获取评论数据
        setInterval(()=>{
            axios.get('https://api.glumi.cn/api/comment.php',{ params: { data: 'getAllComment' }}).then((res)=>{
                this.comments = res.data
            })
        },3000)
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #7c7c7c;
}
#commentBox {
    margin-top: 40px;
    padding: 0px 10px;
    box-sizing: border-box;
    @media all and(max-width:900px) {
        margin: 10px 0px 0px 0px ;
    }
}
img {
    width: 50px;
    height: 50px;
    border-radius: 20%;

}
#form {
    &>* {
        border: 1px solid rgb(209, 207, 207);
        border-radius: 5px;
    }
    input:nth-child(1),input:nth-child(2),input:nth-child(3) {
        display: block;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    textarea {
        width: 100%;
        height: 200px;
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 10px
    }
    button {
        margin-top: 10px;
        width: 100%;
        padding: 15px;
    }
}
#comment{
    ul {
        list-style: none;
        margin: 15px 0px;
        padding: 10px;
        border: 1px solid rgb(231, 231, 231);
        border-radius: 15px;
        color: #7c7c7c;
        li {
            div:nth-child(1) {
                margin-top: 10px;
            }
        }
    }
    #time {
        float: right;
    }
}
</style>