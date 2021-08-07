<template>
    <div>
        <nav id="nav" v-if="($route.name=='index-article-id'|$route.name=='index-about')?false:true">
            <nuxt-link id="logo" to="/" ><span @click="onTop">陈陈菌博客</span></nuxt-link>
            <nuxt-link :key="data" v-for="(item,data) in header" :to="{ name:header[data].url }">
                {{ header[data].itemName }}
            </nuxt-link>
        </nav>
        <header id="header" >
            <video muted="" loop="" playsinline="" autoplay="" preload="auto">
                <!-- <source src="https://www.bertani.net/bert-loop-3.mp4" type="video/mp4"> -->
                balbalblablablalbla
            </video>
            <div>
                <h1 id="headerTitle" v-if="$route.name=='index'">L.I.F.E</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-about'"></h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-articles'">历史</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-admin'">管理</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-login'">登录</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-comment'">留言</h1>
                <vue-typed-js v-if="$route.name=='index'" id="text" :smartBackspace="true" :backSpeed="30" :loop="true" :backDelay="3000" :strings="
                [
                    '有一分热，发一分光','就像萤火一般','也可以在黑暗里发一点光',
                    '不必等候炬火','此后如果没有炬火','我便是唯一的光','愿与所有中国青年共勉',
                    '去创造,想要的','给这个世界带来美好和便利',
                ]">
                    <span class="typing"></span>
                </vue-typed-js>
            </div>
        </header>
        <div id="main">
            <div>
                <nuxt-child/>
            </div>
            <menu>
                <!-- <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=290 height=86 src="//music.163.com/outchain/player?type=2&id=454698102&auto=1&height=66"></iframe> -->
                <ul id="ToHome" v-if="($route.name!='index'?true:false)">
                    <li @click="onTop"><nuxt-link :to="{name:'index'}">⬆️ 返回首页</nuxt-link></li>
                </ul>
                <ul>
                    <h3>邻居</h3>
                    <li :key="data" v-for="(item,data) in links">
                        <a :href="links[data].url">{{links[data].itemName}}</a>
                    </li>
                </ul>
            </menu>
        </div>
        <footer id="footer">
            <div><i class="fa fa-qq"></i></div>
            <div><i class="fa fa-facebook"></i></div>
            <div><i class="fa fa-github"></i></div>
            <div><i class="fa fa-codiepie"></i></div>
        </footer>
        <menu id="phone-to-home" @click="onTop">
            <nuxt-link :to="{name:'index'}"><i class="fa fa-home"></i></nuxt-link>
        </menu>
    </div>
</template>

<script>
if(process.client){
    window.addEventListener("scroll",function(){
        var header = this.document.querySelector("#nav");
        header.classList.toggle("sticky",window.scrollY > 60);
    })
}
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            header: [
                { itemName:'',url:'',orders:'',action:'' }
            ],
            links: [
                { itemName:'',url:'',orders:''}
            ]
        }
    },
    async asyncData(){
        let linksRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
        let MenuRes = await axios.post('http://api.glumi.cn/api/Menu.php',qs.stringify({class:'TopMenu'}))
        return { 
            header: MenuRes.data,
            links: linksRes.data
        }
    },
    methods:{
        onTop(){
            if(process.client){
                if(window.innerWidth > 600){
                    document.getElementById('header').style.height="417px"
                }else if(window.innerWidth < 605){
                    document.getElementById('header').style.height="317px"
                }
            }
            window.scrollTo(0,0)
            document.getElementById('phone-to-home').style.animation = "phone-to-home-button-animation 1s"
            console.log('Top!')
        },
        ToUrl(url){
            window.location.href = url
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-2 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
    }
    #nav.sticky {
        background-color: rgba(#ffffff,0.91);
        box-shadow: 0px 0px 10px 0px #777777;
        a {
            color: #000000;
        }
    }
    #nav {
        position: fixed;
        display: flex;
        transition: 0.51s;
        width: 100%;
        flex-direction: row;
        justify-content: flex-end;
        box-sizing: border-box;
        z-index: 1000;
        
        a {
            transition: 0.51s;
            padding: 20px 30px;
            box-sizing: border-box;
            color: #ffffff;
            text-decoration: none;
            &:hover {
                cursor: pointer;
                color: cornflowerblue !important;
            }
        }
        a:nth-child(1){
            flex: 1;
            padding-left: 50px;
        }
        &:hover {
        background-color: rgba(#ffffff,0.91);
            a {
                color: #000000;
            }
        }
        @media all and(max-width: 605px) {
            width: 100%;
            background-color: rgba(#ffffff,0.9);
            justify-content: space-between;
            a {
                padding: 15px;
                color: #000000;
            }
            a:nth-child(1){
                display: none;

            }
        }
    }
    @keyframes headerStart {
        0%{
            height: 0px;
            opacity: 0;
        }100%{
            height: 417px;
            opacity: 1;
        }
    }
    @keyframes headerStartM {
        0%{
            height: 0px;
            opacity: 0;
        }100%{
            height: 317px;
            opacity: 1;
        }
    }
    #header {
        transition: 1s;
        height: 417px;
        overflow: hidden;
        background: no-repeat center center;
        background-image: url('https://huangxuan.me/img/home-bg.jpg');
        // background-image: url('https://blog.glumi.cn/img/album/21.jpg');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        div {
            width: 600px;
            position: absolute;
            color: #ffffff;
            justify-content: center;
            h1 {
                font-size: 80px;
                // font-size: 3rem;
                margin: 0;
            }
            #text {
                font-size: 1.2rem;
                color: #ffffff;
            }
        }
        @media all and(max-width: 605px) {
            div h1 {
                font-size: 3rem;
            }
            div {
                width: 100%;
            }
            height: 317px;
        }
    }
    #main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        div {
            width: 750px;
            @media all and(max-width:900px) {
                width: 100%;

            }
        }
        menu {
            width: 292px;
            list-style: none;
            margin: 15px 0px 0px 30px;
            padding: 0;
            #ToHome {
                width: 100px;
                li {
                    // font-size: 20px;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    box-sizing: border-box;
                    a {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }
                }
                @media all and(max-width:900px) {
                    display: none;
                }
            }
            ul {
                color: #a3a3a3;
                border-radius: 10px;
                margin: 20px 0px;
                padding: 0 10px 0 10px;
                list-style: none;
                border-bottom: 1px solid #e6e6e6;
                box-sizing: border-box;
                li {
                    // width: 100%;
                    display: inline-block;
                    color: #a3a3a3;
                    padding: 5px;
                    box-sizing: border-box;
                    img {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        border: 5px solid rgb(176, 178, 180);
                    }
                    a {
                        display: inline-block;
                        width: 100%;
                        color: #a3a3a3;
                        text-decoration: none;
                        font-size: 14px;
                        &:hover {
                            color: cornflowerblue;
                        }
                    }
                }
            }
            @media all and(max-width: 900px) {
                width: inherit;
                margin: 0 0 0 0px;
            }
        }
        @media all and(max-width: 900px) {
            flex-direction: column;
        }
    }
    @keyframes phone-to-home-button-animation {
        0%{
            transform: scale(1);
        }50%{
            transform: scale(0.8);
        }
        100%{
            transform: scale(1);
        }
    }
    #phone-to-home {
        position: fixed;
        right: 35px;
        bottom: 95px;
        font-size: 26px;
        margin: 0;
        padding: 0;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 10px 0px #dededf;
        background-color: #ffffff;
        &:hover {
            // animation: phone-to-home-button-animation 1s;
        }
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
            user-select: none;
            i {
                width: 100%;
                height: 100%;  

            }
        }
        @media all and(min-width:900px) {
            display: none;
        }
    }
    #footer {
        height: 104px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        div {
            transition: 0.5s;
            text-align: center;
            width: 20px;
            height: 20px;
            padding: 15px;
            line-height: 25px;
            // font-size: 1.5rem;
            margin: 0px 10px;
            border: 1px solid #000000;
            border-radius: 100%;
            cursor: pointer;
            
            i {
                width: 100%;
                height: 100%;
                transform: scale(2);
            }
            &:hover {
                background-color: #000000;
                color: #ffffff;
            }
        }
    }
</style>