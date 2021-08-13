<!-- 后台管理 -->
<template>
    <main id="admin-view">
        <div id="admin-nav">
            <!-- 路由指向 -->
            <nuxt-link :to="{ name:'index-admin-articles' }"><ul><li>文章管理</li></ul></nuxt-link>
            <nuxt-link :to="{ name:'index-admin-comments'}"><ul><li>评论管理</li></ul></nuxt-link>
            <nuxt-link :to="{ name:'index-admin-pages'}"><ul><li>关于页面</li></ul></nuxt-link>
            <nuxt-link :to="{ name:'index-admin-editor'}"><ul><li>发布文章</li></ul></nuxt-link>
            <nuxt-link :to="{ name:'index-admin-setting'}"><ul><li>站点设置</li></ul></nuxt-link>
            <ul @click="outUser()"><li>退出后台</li></ul>
        </div>
        <div id="admin-content">
            <!-- 显示 admin 文件夹下的子页面 -->
            <nuxt-child/>
        </div>
    </main>
</template>

<script>
export default {
    methods: {
        // 退出账号
        outUser(){
            if(confirm('确定退出后台吗 ？')){
                window.localStorage.removeItem('token')
                this.$router.push({ name: 'index-login' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-2 0.51s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
    }
    #admin-view {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100%;
        // margin-top: 40px;
        #admin-nav {
            background-color: #fff;
            border: 1px solid #ebebeb;
            width: 10rem;
            ul {
                transition: 0.5s;
                text-align: center;
                width: 100%;
                list-style: none;
                margin: 0;
                padding: 15px;
                box-sizing: border-box;
                border-bottom: 1px solid #ebebeb;
                color: #000;
                &:hover {
                    transform: scale(0.8);
                }
            }
            a {
                text-decoration: none;
            }
        }
        #admin-content {
            width: 100%;
            background-color: #ebebeb;
        }
    }
</style>