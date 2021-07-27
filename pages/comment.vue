<template>     
        <div id="commentBox">
            <div id="comment">
                <transition-group enter-active-class="part-enter-2" leave-active-class="part-leave-2">
                    <p :key="data+1" v-for="(item,data) in comments">{{comments[data].name}} <span>{{comments[data].time}}</span><br><br>{{comments[data].content}}</p>
                </transition-group>
            </div>
            <div id="form">
                <p><input type="text" v-model="inputValue.Email" placeholder="请输入邮箱（可选）"><input type="text" v-model="inputValue.url" placeholder="地址（可选）"><input type="text" v-model="inputValue.name" placeholder="用户名"></p>
                <p><textarea type="text" v-model="inputValue.content" placeholder="内容"></textarea></p>
                <p><button @click="AddComment">提交</button></p>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return {
            inputValue: {
                Email:'',url:'',name:'',content:'' 
            },
            comments:[
                { Email:'',url:'',name:'',content:'',time:''}
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
        margin: 0px 0px;
        width: 100%;
        display: grid;
        box-sizing: border-box;
        @media all and (min-width: 1000px) {
            display: inline-flex;
            justify-content: center;
        }
        @media all and (max-width: 800px) {
            & #form{
                display: block;
            }
        }
        #form {
            width: 50%;
            margin: 0px 10px;
            padding: 10px 50px;
            background-color: #ffffff;
            box-sizing: border-box;
            @media all and (max-width: 800px) {
                & {
                    padding: 10px;
                    margin: 0px 0px 0px 0px;
                    width: 100%;
                }
            }
            p {
                
                & * {
                    box-sizing: border-box;
                    border-radius: 5px;
                    border: 1px solid rgb(196, 196, 196);

                }
                input{
                    display: block;
                    width: 100%;  
                    padding: 15px;
                    margin: 15px 0px;
                    
                    &:checked {
                        color: cornflowerblue;
                        border: 1px solid cornflowerblue;
                    }
                }
                textarea {
                    width: 100%;  
                    padding: 15px;
                    height: 150px;
                }
                button {
                    transition: 0.5s;
                    width: 100px;
                    padding: 5px;
                    cursor: pointer;
                    background-color: #ffffff;
                    box-shadow: 0px 2px 5px 0px cornflowerblue;
                    &:hover {
                        box-shadow: 0px 0px 0px 0px cornflowerblue;
                        transform: scale(0.95) translateY(10px);
                    }
                }
            }
        }
        #comment {
            display: block;
            width: 100%;
            padding: 10px 50px;
            box-sizing: border-box;
            background-color: #ffffff;
            @media all and (max-width: 800px) {
                & {
                    padding: 10px;
                    margin: 0px 0px 10px 0px;
                }
            }
            p {
                box-sizing: border-box;
                width: 100%;
                background-color: rgb(240, 240, 240);
                margin: 20px 0px;
                padding: 15px;
                span {
                    float: right;
                }
            }
        }
    }
</style>