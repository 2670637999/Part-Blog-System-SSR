<template>
    <div>
        <div id="aboutBox" v-html="content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            content: ''
        }
    },
    async asyncData({ app }) {
        let content = await app.$axios.get('About.php',{ params: { data:'getData' } })
        return { content: content.data }
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
        margin: 10px auto;
        box-sizing: border-box;
        @media all and(max-width: 800px) {
            width: 100%;
        }
    }
</style>