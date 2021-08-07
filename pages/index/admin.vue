<template>
    <div id="admin-box">
        <div id="admin-view">
            <main id="admin-main">
                <div id="admin-nav">
                    <nuxt-link :to="{ name:'index-admin-articles' }"><ul><li>文章管理（beta）</li></ul></nuxt-link>
                    <nuxt-link :to="{ name:'index-admin-comments'}"><ul><li>评论管理（beta）</li></ul></nuxt-link>
                    <nuxt-link :to="{ name:'index-admin-pages'}"><ul><li>关于页面</li></ul></nuxt-link>
                    <nuxt-link :to="{ name:'index-admin-editor'}"><ul><li>写文章</li></ul></nuxt-link>
                    <ul @click="outUser()"><li>退出后台</li></ul>
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
    methods: {
        outUser(){
            if(confirm('确定退出后台吗 ？')){
                window.localStorage.removeItem('token')
                this.$router.push({ name: 'index-login' })
            }
        }
    }
}
</script>