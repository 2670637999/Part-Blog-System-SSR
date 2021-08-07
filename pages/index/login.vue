<template>
    <div id="admin-login">
        <h1>博客后台登录</h1>
        <p><input type="text" v-model="user" placeholder="请输入用户名"></p>
        <p><input type="password" v-model="pwd" placeholder="请输入密码"></p>
        <p><nuxt-link to=""><input type="button" @click="Login()" value="登录到博客"></nuxt-link></p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            user: '',
            pwd: '',
            token: '',
        }
    },
    methods:{
        Login(){
            if(this.user=='' && this.pwd==''){
                    alert('输入不能为空')
            }else {
                var datetime = new Date()
                axios.get(`http://api.glumi.cn/api/Login.php`,{
                    params: {
                        data: 'Manual_login',
                        user: this.user, 
                        pwd: this.pwd,
                        time: datetime.toLocaleDateString()
                    }
                })
                .then((res)=> {
                    if(res.data == '找不到用户'){
                        alert('找不到用户')
                    }else {
                        alert('登录成功')
                        axios.get('http://api.glumi.cn/api/Login.php',{
                            params: {
                                data: 'AutoLogin',
                                user: this.user, 
                                pwd: this.pwd,
                                login: true
                            }
                        }).then((response)=>{
                            window.localStorage.setItem('token',response.data)
                        })
                        this.$router.push({ name: 'index-admin-articles'})
                    }
                }
                ).catch(error=>
                    console.log(error)
                )
            }
        },
    }
}
</script>