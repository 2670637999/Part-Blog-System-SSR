<template>
    <div>
        <div id="aboutBox" v-html="content"></div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data(){
        return {
            content: ''
        }
    },
    async asyncData({ app }) {
        const query_data = {
            data:'getData'
        }
        let content = await app.$axios.post('About.php',qs.stringify(query_data))
        return { content: content.data }
    },
    async beforeCreate(){
        const query_data = {
            data:'getData'
        }
        let content = await this.$axios.post('About.php',qs.stringify(query_data))
        this.content = content.data
    },
    mounted(){
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
    },
}
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        background-color: #ffffff;
    }
    #aboutBox {
        transition: 1s;
        width: 700px;
        padding: 15px;
        margin-top: 10px;
        background-color: #ffffff;
        margin-bottom: 10px;
        margin: 0px auto;
        box-sizing: border-box;
        @media all and(max-width: 800px) {
            width: 100%;
        }
    }
</style>