<template>
    <div>
        <nav id="nav">
            <nuxt-link id="logo" to="/" ><span @click="onTop">陈陈菌博客</span></nuxt-link>
            <nuxt-link :key="data" v-for="(item,data) in header" :to="{ name:header[data].url }">
                <i :class="header[data].iconClass"></i> {{ header[data].itemName }}
            </nuxt-link>
        </nav>
        <header id="header" >
            <video muted="" loop="" playsinline="" autoplay="" preload="auto">
                <!-- <source src="https://www.bertani.net/bert-loop-3.mp4" type="video/mp4"> -->
                <!-- <source src="~/static/header.mp4" type="video/mp4"> -->
                balbalblablablalbla
            </video>
            <div>
                <h1 id="headerTitle" v-if="$route.name=='index'">L.I.F.E</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-about'">关于</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-articles'">历史</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-admin'">管理</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-login'">登录</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-comment'">留言</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-project'">项目作品</h1>
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
                <ul id="ToHome" v-if="($route.name!='index'?true:false)">
                    <li @click="onTop"><nuxt-link :to="{name:'index'}">⬆️ 返回首页</nuxt-link></li>
                </ul>
                <ul>
                    <h3>音乐</h3>
                    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height=86 src="//music.163.com/outchain/player?type=2&id=1297750163&auto=1&height=66"></iframe>
                </ul>
                <ul id="randomArticles">
                    <h3>随机文章<span @click="getRandomArticles"><i class="fa fa-random"> 随机一下</i></span></h3>
                    <li @click="ToTop" :key="data" v-for="(item,data) in randomArticles"><nuxt-link :to="{ name: 'index-article-id', params:{id: randomArticles[data].id}}"><i class="fa fa-share"></i> {{ randomArticles[data].Title|ellipsis }} <span>阅读文章</span></nuxt-link></li>
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
            <nuxt-link :to="{ name:'index'}">
                <i v-if="$route.name=='index-article-id'|$route.name=='index-about'" class="fa fa-upload"></i>
                <i v-else-if="$route.name!='index-article-id'" class="fa fa-home"></i>
            </nuxt-link>
        </menu>
        <nav id="phone-menu-box">
            <nuxt-link id="logo" to="/" ><span @click="onTop">陈陈菌博客</span></nuxt-link>
            <div id="phone-menu-button" @click="onClickDisplayMenu">
                <i class="fa fa-navicon"></i>
            </div>
            <div id="phone-menu">
                <ul>
                    <li :key="data" v-for="(item,data) in header" @click="onClickDisplayMenu"><nuxt-link :to="{ name:header[data].url}"><i :class="header[data].iconClass"></i> {{header[data].itemName}}</nuxt-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            header: [
                { iconClass:'',itemName:'',url:'',orders:'',action:'' }
            ],
            links: [
                { itemName:'',url:'',orders:''}
            ],
            randomArticles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ]
        }
    },
    async asyncData(){
        let linksRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
        let MenuRes = await axios.post('http://api.glumi.cn/api/Menu.php',qs.stringify({class:'TopMenu'}))
        let RandomArticlesRes = await axios.get('http://api.glumi.cn/api/Article.php',{ params: { data:'getRandomArticle' }})
        return { 
            header: MenuRes.data,
            links: linksRes.data,
            randomArticles: RandomArticlesRes.data
        }
    },
    filters: {
        ellipsis: function(value) {
            let i = 15;
            if(value.length > i){
                return value.slice(0,i)+'...'
            }
            return value
        }
    },
    methods:{
        onTop(){
            window.scrollTo(0,0)
            document.getElementById('phone-to-home').style.animation = "phone-to-home-button-animation 1s"
            console.log('Top!')
        },
        ToUrl(url){
            window.location.href = url
        },
        ToTop(){
            window.scrollTo(0,0)
        },
        async getRandomArticles(){
            let RandomArticlesRes = await axios.get('http://api.glumi.cn/api/Article.php',{ params: { data:'getRandomArticle' }})
            this.randomArticles = RandomArticlesRes.data
        },
        async onClickDisplayMenu(){
            this.$store.commit('ChangeDisplayMenuState')
            if(this.$store.state.DisplayMenuState){
                document.getElementById('phone-menu').style.top = "60px"
                document.getElementById('phone-menu').style.width = "160px"
                document.getElementById('phone-menu').style.height = "320px"
                document.getElementById('phone-menu').style.boxShadow = "0px 0px 10px 0px #bdbdbd"
                document.getElementById('phone-menu-button').style.backgroundColor = "#ebebeb"
                document.getElementById('phone-menu-button').style.color = "#000000"
            }else {
                document.getElementById('phone-menu').style.boxShadow = "0px 0px 0px 0px #ebebeb"
                document.getElementById('phone-menu').style.padding = "0px"
                document.getElementById('phone-menu').style.top = "0px"
                document.getElementById('phone-menu').style.width = "0px"
                document.getElementById('phone-menu').style.height = "0px"
                document.getElementById('phone-menu-button').style.backgroundColor = "inherit"
                document.getElementById('phone-menu-button').style.color = "#ffffff"
            }
        }
    },
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
        // background-color: rgba(#ffffff,0.91);
        // box-shadow: 0px 0px 10px 0px #777777;
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
            box-shadow: 0px 0px 10px 0px #777777;
            a {
                color: #000000;
            }
        }
        @media all and(max-width: 900px) {
            width: 100%;
            background-color: rgba(#ffffff,0.9);
            justify-content: space-between;
            visibility: hidden ;
            opacity: 0 ;
            // background-color: red;
            a {
                padding: 15px;
                color: #000000;
            }
            a:nth-child(1){
                display: none;

            }
        }
        @media all and(min-width: 900px) {
            visibility: inherit ;
            opacity: 1 ;
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
        // background-image: url('https://huangxuan.me/img/home-bg.jpg');
        background-image: url('~/static/home-bg2.jpg');
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
                // font-size: 3rem;
                font-size: 50px;
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
            width: 300px;
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
            #randomArticles {
                h3 {
                    span {
                        float: right;
                        font-size: 0.6rem;
                        background-color: #868686;
                        color: #ffffff;
                        padding: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
                li {
                    padding: 0;
                    margin: 5px;
                    display: block;
                    a {
                        span {
                            float: right;
                        }
                    }
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
        z-index: 3000;
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
    #phone-menu-box {
        transition: 0.5s;
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        width: 100%;
        // background-color: #ffffff;
        a {
            padding: 15px;
            font-size: 1rem;
            text-decoration: none;
            font-weight: 800;
            color: #ffffff;
        }
        #phone-menu-button {
            transition: 0.5s;
            display: flex;
            font-size: 1.2rem;
            align-items: center;
            position: absolute;
            right: 15px;
            padding: 15px;
            cursor: pointer;
            border-radius: 15px;
            color: #ffffff;
            &:hover {
                // background-color: #ebebeb;
                // color: #000000;
            }
        }
        
        #phone-menu {
            transition: 0.51s;
            position: absolute;
            right: 15px;
            padding: 0px;
            top: 0px;
            width: 0px;
            height: 0px;
            overflow: hidden;
            background-color:rgba(#ffffff,1);
            border-radius: 15px;
            box-shadow: 0px 0px 0px 0px #ebebeb ;
            ul {
                // width: 50px;
                list-style: none;
                margin: 0;
                padding: 0;
                li {
                    transition: 0.5s;
                    // width: 100%;
                    box-sizing: border-box;
                    border-bottom: 1px solid #e6e6e6;
                    a {
                        display: inline-block;
                        width: 100%;
                        box-sizing: border-box;
                        color: #000000;
                        font-size: 1rem;

                    }
                    &:last-child{
                        border: none;
                    }
                }
            }
        }
        @media all and(max-width: 725px) {
            visibility: inherit ;
            opacity: 1 ;
        }
        @media all and(min-width: 900px) {
            visibility: hidden ;
            opacity: 0 ;
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