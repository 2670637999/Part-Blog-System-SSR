<template>
    <div id="commentBox">
        <div id="form">
            <input type="text" v-model="inputValue.name" placeholder="用户名">
            <input type="text" v-model="inputValue.Email" placeholder="请输入邮箱（可选）">
            <input type="text" v-model="inputValue.url" placeholder="地址（可选）">
            <textarea type="text" v-model="inputValue.content" placeholder="内容"></textarea>
            先生 <input type="radio" value="男" v-model="inputValue.sex" name="sex">
            女士 <input type="radio" value="女" v-model="inputValue.sex" name="sex">
            <button @click="AddComment">提交</button>
        </div>
        <div id="comment">
            <h3>留言</h3>
            <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                <ul :key="data+1" v-for="(item,data) in comments">
                    <li><img :src="comments[data].sex=='男'?'/man.png':'/woman.png'" alt=""></li>
                    <li>
                        <div>
                            <span><b>{{comments[data].name}}</b></span>
                        </div>
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
            inputValue: {
                Email:'',url:'',name:'',content:'',sex:'男'
            },
            comments:[
                { Email:'',url:'',name:'',sex:'',content:'',time:''}
            ]
        }
    },
    async asyncData(){
        let commentsRes = await axios.get('http://api.glumi.cn/api/comment.php',{ params: { data: 'getAllComment' }})
        return { comments: commentsRes.data }
    },
    methods:{
        AddComment(){
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
                 axios.get('http://api.glumi.cn/api/comment.php',{
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
                    console.log(response.data)
                }).catch((error)=>console.log(error))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#commentBox {
    margin-top: 40px;
    padding: 0px 10px;
    box-sizing: border-box;
    @media all and(max-width:900px) {
        margin: 10px 0px 0px 0px ;
    }
}
img {
    width: 40px;
    height: 40px;
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
    }
    #time {
        float: right;
    }
}
</style>