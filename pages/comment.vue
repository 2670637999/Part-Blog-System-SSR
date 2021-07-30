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
                <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                    <ul :key="data+1" v-for="(item,data) in comments">
                        <li><img :src="comments[data].sex=='男'?'/man.png':'/woman.png'" alt=""></li>
                        <li>
                            <div>
                                <span><b>{{comments[data].name}}</b></span>
                            </div>
                            <div>
                                <span>{{comments[data].content}}</span>
                                <span>{{comments[data].time}}</span>
                            </div>
                        </li>
                    </ul>
                </transition-group>
            </div>
        </div>
</template>

<script>
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
    methods: {
        AutoReadComment(){
            
            this.$axios.get('comment.php',{
                params: {
                    data: 'getAllComment'
                }
            }).then((response)=>
                this.comments = response.data
            ).catch(function(err){
                console.log(err);
            })
        },
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
                 this.$axios.get('comment.php',{
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
    },
    mounted:function(){
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })

        setInterval(this.AutoReadComment,3000)
    },
    beforeDestroy() {
    },
    async asyncData({ app }) {
        let comments = await app.$axios.get('comment.php',{ params: { data: 'getAllComment' }}).then((response)=>response.data)
        return { comments }
    },
}
</script>

<style lang="scss" scoped>
    #commentBox {
        width: 100%;
        // background-color: #ffffff;
        box-sizing: border-box;
        padding: 10px 0px;
        #comment,#form {
            display: block;
            width: 700px;
            margin: auto;
            @media all and(max-width: 700px) {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
        }
    }
    @keyframes commentUser {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
            border: 1px solid cornflowerblue;
        }
        100% {
            transform: scale(1);
        }
    }
    #comment {
        margin-top: 10px;
        ul {
            transition: 0.5s;
            margin: 10px 0px;
            padding: 10px 10px;
            background-color: #ffffff;
            border-radius: 15px;
            border: 1px solid #d8d8d8;
            &:hover {
                animation: commentUser  0.51s cubic-bezier(0.51, 0.82, 0.965, 1);
                // transform: scale(0.95);
            }
           li {
               display: inline-block;
               div {
                   display: block;
                   margin-left: 2px;
                   span {
                       display: inline-block;
                   }
                   span:nth-child(2) {
                       float: right;
                       
                       color: #000000;
                   }
                }
                div:nth-child(1) {
                    margin-top: 10px;
                }
                div:nth-child(2){
                    margin-top: 10px;
                }
           }
           li:nth-child(1){
               margin-right: 15px;
           }
           li:nth-child(2) {
               width: 100%;
           }
           img {
               width: 50px;
               height: 50px;
           } 
        }
    }
    #form {
        input:nth-child(1),
        input:nth-child(2),
        input:nth-child(3){
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            box-sizing: border-box;
            border: 1px solid #d8d8d8;
            font-size: 16px;
            border-radius: 10px;
        }
        textarea {
            width: 100%;
            height: 200px;
            padding: 15px;
            box-sizing: border-box;
            margin-bottom: 15px;
            border-radius: 10px;
            font-size: 16px;
            border: 1px solid #d8d8d8;
        }
        button {
            margin-top: 15px;
            margin-bottom: 15px;
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            background-color: cornflowerblue;
            color: #ffffff;
        }
    }
</style>