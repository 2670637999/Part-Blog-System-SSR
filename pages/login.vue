<template>
    <div id="admin-login">
        <h1>博客后台登录</h1>
        <p><input type="text" v-model="user" placeholder="请输入用户名"></p>
        <p><input type="password" v-model="pwd" placeholder="请输入密码"></p>
        <p><router-link to=""><input type="button" @click="Login()" value="登录到博客"></router-link></p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: '',
            pwd: '',
            token: ''
        }
    },
    methods: {
        Login(){
            if(this.user=='' && this.pwd==''){
                    alert('输入不能为空')
            }else {
                var datetime = new Date()
                this.$axios.get(`Login.php`,{
                    params: {
                        data: 'Manual_login',
                        user: this.user, 
                        pwd: this.pwd,
                        time: datetime.toLocaleDateString(),
                        // token: window.localStorage.getItem('token')
                    }
                })
                .then((res)=> {
                    if(res.data == '找不到用户'){
                        alert('找不到用户')
                    }else {
                        alert('登录成功')
                        this.$axios.get('Login.php',{
                            params: {
                                data: 'AutoLogin',
                                user: this.user, 
                                pwd: this.pwd,
                                login: true
                            }
                        }).then((response)=>{
                            window.localStorage.setItem('token',response.data)
                        })
                        this.$router.push({ name: 'admin',params: { user : this.user } })
                    }
                }
                ).catch(error=>
                    console.log(error)
                )
            }
        },
    },
    
}




</script>

<style lang="scss" scoped>
    #admin-login {
        text-align: center;
        background-color: #ffffff;
        margin: 10px 0px;
        padding: 10px 0px;
        h1 {
            margin: 0;
        }
        p {
            input {
                width: 230px;
                padding: 5px;
            }
        }
    }
</style>