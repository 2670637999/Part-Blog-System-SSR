<template>
    <div>
        <main>
            <input type="text" placeholder="请输入用户名">
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })
    }
}
</script>


<style lang="scss" scoped>
div { 
    // align-items: center;
    width: 100%;
    height: 100px;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    main {
    }
}
</style>