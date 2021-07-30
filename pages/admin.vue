<template>

<div id="admin-box">
    <div id="admin-view">
        <main id="admin-main">
            <div id="admin-nav">
                <nuxt-link :to="{ name:'admin-articles' }"><ul><li>文章管理</li></ul></nuxt-link>
                <nuxt-link :to="{ name:'admin-comments'}"><ul><li>评论管理</li></ul></nuxt-link>
                <nuxt-link :to="{ name:'admin-editor'}"><ul><li>写文章</li></ul></nuxt-link>
                <ul @click="outUser()"><li>退出</li></ul>
            </div>
            <div id="admin-content">
                <nuxt-child/>
            </div>
        </main>
    </div>
</div>

</template>

<script>
export default {
    name: 'admin',
    methods: {
        outUser(){
            if(confirm('确定退出后台吗 ？')){
                window.localStorage.removeItem('token')
                this.$router.push({ name: 'login' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #admin-box {
        display: flex;
        justify-content: center;
        margin: 10px 0px 10px 0px;
        background-color: #ffffff;
    }
    a {
        text-decoration: none;
    }
    #admin-view {
        width: 100%;
        #admin-main {
            display: flex;
            div {
                display: inline-block;
            }
            #admin-nav {
                width: 200px;
                background-color: rgb(255, 255, 255);
                text-align: center;
                text-decoration: none;
                ul {
                    transition: 0.5s;
                    list-style: none;
                    color: #464646;
                    margin: 0;
                    padding: 20px 0px 20px 0px;
                    border: 2px solid rgb(241, 241, 241);
                    &:hover {
                        color: cornflowerblue;
                        border: 2px solid cornflowerblue;
                        // background-color: cornflowerblue;
                        cursor: pointer;
                    }
                }
            }
            #admin-content {
                text-align: center;
                width: 100%;
                background-color: rgb(255, 255, 255);

            }
        }
    }
</style>