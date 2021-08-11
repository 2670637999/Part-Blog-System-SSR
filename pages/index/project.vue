<template>
    <div id="box">
        <div>
            <img src="~/static/blog-project.png" alt="图片失效">
            <span>Part-Blog</span>
            <span>前后端分离博客系统</span>
        </div>
        <div>
            <img src="~/static/part-animator.png" alt="">
            <span>Part-Animator</span>
            <span>轻量级动画库</span>
        </div>
        <div>
            <img src="~/static/hexo.svg" alt="图片失效">
            <span>Scroll</span>
            <span>Hexo 主题</span>
        </div>
        <div>
            <img src="~/static/blog-project.png" alt="图片失效">
            <span>微信小程序-音乐播放器</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    #box {
        display: flex;
        justify-content:flex-start;
        flex-wrap: wrap;
        margin-top: 30px;
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: 0.5s;
            margin-bottom: 15px;
            margin-right: 15px;
            border-radius: 15px;
            border: 1px solid #e9e9e9;
            padding: 15px;
            width: 320px;
            text-align: center;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 10px 0px #ebebeb;
            img {
                transition: 0.5s;
                width: 100%;
                // height: 10rem;
            }
        }
        div:hover {
            // transform: scale(3);
            img {

            }
        }
        @media all and(max-width:900px) {
            div {
                width: 130px;
            }
        }
        @media all and(max-width: 720px) {
            justify-content: center;
        }
        @media all and(max-width: 320px) {
            div {
                padding: 5px;
            }
        }
    }
</style>