<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name:'carousel',
}
</script>

<style lang="scss" scoped>
    @keyframes imgAnimator {
        0%{
            background-size: 100%;
        }
        100%{
            background-size: cover;
        }
    }
    div {
        animation: imgAnimator 2s;
        transition: 1s;
        position: relative;
        width: 100%;
        // height: 20%;
        background: no-repeat center center;
        background-size: cover;
        background-image: url('~/static/head.jpeg');
        overflow: hidden;
        @media all and(min-width: 1300px) {
            & {
                background: no-repeat center center;
                background-size: cover;
                background-image: url('~/static/head.jpeg');

            }
        }
    }    
</style>