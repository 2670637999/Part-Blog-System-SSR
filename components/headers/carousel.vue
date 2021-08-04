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
        }
        100%{
        }
    }
    div {
        animation: imgAnimator 2s;
        transition: 1s;
        position: relative;
        width: 100%;
        height: 0px;
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