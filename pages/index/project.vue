<!-- 项目作品展示页，暂时未做后台，可自行自定义 -->
<template>
    <div id="box">
        <a href="https://gitee.com/ChenJieHai/part-blog-system-ssr">
        <div>
            <img src="~/static/part-blog.png" alt="图片失效">
            <h1>Part-Blog</h1>
            <p>前后端分离响应式博客系统</p>
        </div>
        </a>
        
        <a href="https://gitee.com/ChenJieHai/PartAnimator">
            <div>
                <img src="~/static/part-animator.png" alt="图片失效">
                <h1>Part-Animator</h1>
                <p>轻量级动画库</p>
            </div>
        </a>
        
        <a href="https://gitee.com/ChenJieHai/hexo-theme-scroll">
            <div>
                <img src="~/static/hexo.svg" alt="图片失效">
                <h1>Scroll</h1>
                <p>Hexo 主题</p>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    #box {
        margin-top: 30px;
        box-sizing: border-box;
        a {
            text-decoration: none;
            color: #000000;
        }
        div {
            display: block;
            transition: 0.5s;
            margin: 0 auto;
            margin-bottom: 15px;
            border-radius: 15px;
            border: 1px solid #e9e9e9;
            padding: 25px;
            width: 90%;
            text-align: center;
            box-sizing: border-box;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 10px 0px #ebebeb;
            p {
                margin: 0;
            }
            img {
                transition: 0.5s;
            }
        }
        div:hover {
            transform: scale(0.93);
            img {

            }
        }
        @media all and(max-width:900px) {
            div {
                h1 {
                    font-size: 16px;
                }
            }
        }

        @media all and(max-width: 320px) {
            div {
                padding: 5px;
            }
        }
    }
</style>