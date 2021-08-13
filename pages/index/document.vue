<template>
    <div id="documentBox">
        <ul>
            <span>编程语言</span>
            <li>Java</li>
            <li>C 语言</li>
            <li>C++</li>
            <li>JavaScript</li>
            <li>PHP</li>
            <li>C#</li>
        </ul>
        <ul>
            <span>应用框架</span>
            <li>Vue.js</li>
            <li>React</li>
        </ul>
        <ul>
            <span>操作系统</span>
            <li>Linux</li>
            <li>Windows</li>
            <li>MacOS</li>
            <li>Android</li>
            <li>IOS</li>
        </ul>
        <ul>
            <span>工具</span>
            <li>Visual Studio Code</li>
            <li>Android Studio</li>
            <li>dveco Studio</li>
        </ul>
        <ul>
            <span>数据库</span>
            <li>SQL</li>
            <li>TSQL</li>
            <li>MySQL</li>
        </ul>
        <ul>
            <span>问题解决</span>
        </ul>
    </div>
</template>

<script>
export default {
    beforeCreate(){
        if(process.client){
            window.scrollTo(0,0)
            document.getElementById('header').style.height="0px"
        }
    }
}
</script>

<style lang="scss" scoped>
    #documentBox {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        height: 100%;
        @media all and(max-width:900px) {
            margin: 0;
        }
        &>ul {
            width: 25%;
            border: 1px solid #ebebeb;
            margin: 0;
            padding-left: 0;
            list-style: none;
            box-sizing: border-box;
            span {
                display: inline-flex;
                justify-content: center;
                background-color: #ebebeb;
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
                border: 1px solid #8d8c8c;
            }
            li {
                transition: 0.5s;
                padding: 5px;
                border-bottom: 1px solid #ebebeb;
                box-sizing: border-box;
                box-shadow: 0px 0px 0px 0px #ffffff;
                &:hover {
                    cursor: pointer;
                    background-color: #ebebeb;
                    color: #000000;
                    box-shadow: 0px 0px 10px 0px #8b8b8b;
                }
                // padding-left: 15px;
            }
        }
    }
</style>