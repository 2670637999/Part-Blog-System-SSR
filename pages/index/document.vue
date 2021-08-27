<!-- 文档系统，暂未开发完成。请忽略此页面，如有能力可自行自定义 -->
<template>
    <div id="documentBox">
        <ul>
            <h3><span>操作系统</span><span><i class="fa fa-navicon"></i></span></h3>
            <li>Android</li>
            <li>Windows</li>
            <li>MacOS</li>
        </ul>
        <ul>
            <h3><span>前端开发</span><span><i class="fa fa-navicon"></i></span></h3>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Vue.js</li>
            <li>微信小程序</li>
            <li>Echarts</li>
        </ul>
        <ul>
            <h3><span>后端开发</span><span><i class="fa fa-navicon"></i></span></h3>
            <li>Node.js</li>
            <li>PHP</li>
            <li>MySQL</li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-1 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.71s;
    }
    #documentBox {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        margin-bottom: 40px;
        justify-content: space-between;
        @media all and(max-width:900px) {
            margin: 0;
        }
        ul {
            transition: 2s;
            width: 100%;
            background-color: #fff;
            margin: 0px 0px;
            list-style: none;
            padding: 0;
            overflow: hidden;
            color: rgb(105, 105, 105);
            border-bottom: 1px solid #ebebeb;
            h3 {
                display: flex;
                transition: 1s;
                padding-left: 20px;
                margin: 0;
                height: 60px;
                align-items: center;
                & span:nth-child(1){
                    flex: 0.97;
                }
                i {
                    float: right;
                }
            }
            li {
                transition: 1s;
                background-color: #fff;
                color: #000;
                padding: 0px;
                height: 0px;
                opacity: 0;
                border-bottom: 1px solid #ebebeb;
                line-height: 50px;
                &:hover {
                    background-color: #ebebeb;
                    cursor: pointer;
                }
            }
            &:hover {

                @media all and (min-width: 900px) {
                    cursor: pointer;
                }
                li {
                    height: 50px;
                    padding: 10px;
                    padding-left: 20px;
                    opacity: 1;
                }
            }
        }
    }
</style>