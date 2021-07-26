<template>
    <div>
        about
    </div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
    },
}
</script>

<style lang="scss" scoped>
div { 
    display: flex;
    justify-content: center;
    // align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}
</style>