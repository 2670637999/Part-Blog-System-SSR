<!-- 整站页面的布局 -->
<template>
    <div id="appbox">
        <!-- PC 端导航菜单 -->
        <nav id="nav">
            <nuxt-link id="logo" to="/" ><span @click="onTop">陈陈菌博客</span></nuxt-link>
            <nuxt-link :key="data" v-for="(item,data) in header" :to="{ name:header[data].url }">
                <i :class="header[data].iconClass"></i> {{ header[data].itemName }}
            </nuxt-link>
        </nav>
        <header id="header" >
            <!-- <video loop="loop" autoplay="autoplay" >
                <source src="~/static/header.mp4">
            </video> -->
            <!-- 顶部标题文字显示 -->
            <div id="TitleBox">
                <h1 id="headerTitle" v-if="$route.name=='index'">L.I.F.E</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-about'">关于</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-articles'">历史</h1>
                <h1 id="headerTitle" v-else-if="(
                    $route.name=='index-admin'|
                    $route.name=='index-admin-articles'|
                    $route.name=='index-admin-comments'|
                    $route.name=='index-admin-editor'|
                    $route.name=='index-admin-pages'|
                    $route.name=='index-admin-setting'|
                    $route.name=='index-admin-update'
                )">管理</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-login'">登录</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-comment'">留言</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-project'">项目作品</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-document'">文档中心</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-douban'">我的豆瓣</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-categories'">分类目录</h1>
                <h1 id="headerTitle" v-else-if="$route.name=='index-categorie-id'">{{ $route.params.id }}</h1>
                <h2 id="headerTitle" v-else-if="$route.name=='index-article-id'">
                    <div id="articleTitle">{{ articles[articlesLength-$route.params.id].Title }} </div>
                    <div id="articleSubTitle">
                        {{ articles[articlesLength-$route.params.id].subtitle }}
                    </div>
                    <div id="articleTime">{{articles[articlesLength-$route.params.id].Author}} 写于 {{ articles[articlesLength-$route.params.id].Time }}</div>
                </h2>
                <!-- 用于显示打字效果的组件，往数组内写参数即可。 -->
                <vue-typed-js v-if="$route.name=='index'" id="text" :smartBackspace="true" :backSpeed="30" :backDelay="3000" :strings="
                [
                    'Code Life'
                ]">
                    <span class="typing"></span>
                </vue-typed-js>
            </div>
            <!-- svg 波浪效果的实现 -->
            <div class="preview-overlay">
                <svg class="preview-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                </defs>
                <g class="preview-parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="var(--gentle-wave1)"></use>
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="var(--gentle-wave2)"></use>
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="var(--gentle-wave3)"></use>
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="var(--gentle-wave)"></use>
                </g>
                </svg>
            </div>
        </header>
        <div id="main">
            <div>
                <!-- 显示子页面 -->
                <transition mode="out-in" enter-active-class="part-enter-1" leave-active-class="part-leave-1">
                    <nuxt-child/>
                </transition>
            </div>
            <menu>
                <!-- 名言语录 -->
                <ul v-show="$route.name=='index'">
                    <!-- <h3>名言语录</h3> -->
                    <li>What I cannot create，I do not understand - Richard Feynman</li>
                    <li>"凡我不能创造的，我都不能理解。"<br>—— 理查德·费曼<br></li>
                    <li><a style="color:cornflowerblue;" href="https://github.com/danistefanovic/build-your-own-x">build-your-own-x</a></li>
                </ul>
                <!-- 作者简介 -->
                <transition enter-active-class="part-enter-1">
                <ul id="about" v-show="$route.name=='index-about'">
                    <img src="~/static/Me.jpg" alt="">
                    <div>1个时而逆行的完美主义 / 极简主义者</div>
                    <div id="callme">
                        <li v-show="userLinks[0].orders" :key="data" v-for="(item,data) in userLinks"><a :href="userLinks[data].url"><i :class="userLinks[data].iconClass"></i></a></li>
                    </div>
                </ul>
                </transition>
                <!-- 网易云音乐外部播放器 -->
                <ul id="music">
                    <!-- <h3>音乐</h3> -->
                    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 :src="`//music.163.com/outchain/player?type=2&id=${ musicID }&auto=0&height=66`"></iframe>
                    <li v-show="$route.name=='index'">
                        第一个进入太空的地球生物：流浪狗“莱卡”于1957年11月3日当地时间上午10时28分升空，但几小时后因太空衣隔热不佳成为“火烧狗”。目前它的尸体与当年的太空舱还滞留在地球轨道上。 <br>—— 想回家的莱卡
                    </li>

                </ul>
                <!-- 文章分类 -->
                <ul id="categories" v-show="$route.name=='index'|$route.name=='index-article-id'|$route.name=='index-categorie-id'">
                    <h3>文章分类<nuxt-link :to="{ name:'index-categories' }"><span @click="ToTop"><i class="fa fa-navicon"> 查看更多</i></span></nuxt-link></h3>
                   <li :key="data" v-for="(item,data) in categories"><nuxt-link :to="{ name:'index-categorie-id', params:{ id: categories[data].categorie } }"><span @click="ToTop">{{ categories[data].categorie }}</span></nuxt-link></li>
                </ul>
                <!-- 根据三目运算符判断结果显示该按钮，（仅PC端显示） -->
                <ul id="articleNav" v-if="($route.name!='index'?true:false)">
                    <li @click="onTop"><nuxt-link :to="{name:'index'}">⬆️ 返回首页</nuxt-link></li>
                    <li @click="onTop" v-if="$route.name=='index-article-id'&$route.params.id-1!=0?true:false">
                        <nuxt-link :to="{ name:'index-article-id',params:{ id: (Number($route.params.id)-1) } }">
                            <span @click="ToTop">上一篇</span>
                        </nuxt-link>
                    </li>
                    <li @click="onTop" v-if="$route.name=='index-article-id'&$route.params.id<articlesLength | Number($route.params.id)+1==articlesLength?true:false">
                        <nuxt-link :to="{ name:'index-article-id',params:{ id: (Number($route.params.id)+1)} }">
                            <span @click="ToTop">下一篇</span>
                        </nuxt-link>
                    </li>
                </ul>
                <!-- 随机文章组件 -->
                <transition mode="in-out" enter-active-class="part-enter-13" leave-active-class="part-leave-1">
                <ul id="randomArticles" v-show="($route.name=='index'|$route.name=='index-about'|$route.name=='index-comment'|$route.name=='index-project'|$route.name=='index-articles'|$route.name=='index-admin'|$route.name=='index-categories')">
                    <h3>随机文章<span @click="getRandomArticles"><i class="fa fa-random"> 随机一下</i></span></h3>
                    <li @click="ToTop" :key="data" v-for="(item,data) in randomArticles"><nuxt-link :to="{ name: 'index-article-id', params:{id: randomArticles[data].id}}"><i class="fa fa-share"></i> {{ randomArticles[data].Title|ellipsis }} <span>阅读文章</span></nuxt-link></li>
                </ul>
                </transition>
                <!-- 更多内容（待完善） -->
                <transition mode="in-out" enter-active-class="part-enter-13" leave-active-class="part-leave-1">
                <ul v-show="($route.name=='index'|$route.name=='index-about'|$route.name=='index-comment'|$route.name=='index-project'|$route.name=='index-articles'|$route.name=='index-admin')">
                    <h3>更多内容</h3>
                    <li @click="ToTop"><nuxt-link :to="{name:'index-document'}"><i class="fa fa-code"></i> 文档中心（开发中）</nuxt-link></li>
                    <li @click="ToTop"><nuxt-link :to="{name:'index-douban'}"><i class="fa fa-code"></i> 豆瓣观影（开发中）</nuxt-link></li>
                </ul>
                </transition>
                <!-- 友情链接 -->
                <transition mode="in-out" enter-active-class="part-enter-13" leave-active-class="part-leave-1">
                <ul v-show="($route.name=='index'|$route.name=='index-about'|$route.name=='index-comment'|$route.name=='index-project'|$route.name=='index-articles'|$route.name=='index-admin')">
                    <h3>邻居</h3>
                    <li :key="data" v-for="(item,data) in links">
                        <a :href="links[data].url">{{links[data].itemName}}</a>
                    </li>
                </ul>
                </transition>
                <!-- 统计 -->
                <transition mode="in-out" enter-active-class="part-enter-13" leave-active-class="part-leave-1">
                <ul v-show="$route.name=='index'">
                    <li style="width:100%;height:300px;margin:0px;padding:0px;" id="echarts_data"></li>
                </ul>
                </transition>
            </menu>
        </div>
        <!-- 页脚的社交账号显示 -->
        <footer id="footer" v-if="$route.name=='index'">
            <div v-show="userLinks[0].orders" :key="data" v-for="(item,data) in userLinks"><a :href="userLinks[data].url"><i :class="userLinks[data].iconClass"></i></a></div>
        </footer>
        <div v-if="$route.name=='index'" id="Keep-on-record">
            <p>粤ICP备18077886号</p>
            <p>© https://blog.glumi.cn</p>
        </div>
        <!-- home 键（返回首页按钮） -->
        <!-- <transition mode="out-in" enter-active-class="part-enter-10" leave-active-class="part-leave-3">
            <menu id="phone-to-home" @click="onTop" v-if="$route.name!='index'">
                <nuxt-link :to="{ name:'index'}">
                    <i class="fa fa-home"></i>
                </nuxt-link>
            </menu>
        </transition> -->
        <!-- 手机端导航菜单（上一篇文章） -->
       <!-- <menu id="phone-to-lastArticle" @click="onTop" v-if="$route.name=='index-article-id'&$route.params.id-1!=0?true:false">
            <nuxt-link :to="{ name:'index-article-id',params: { id:Number($route.params.id)-1 }}">
                旧
            </nuxt-link>
        </menu> -->
        <!-- 手机端导航菜单（下一篇文章） -->
        <!-- <menu id="phone-to-nextArticle" @click="onTop" v-if="$route.name=='index-article-id'&$route.params.id<articlesLength | Number($route.params.id)+1==articlesLength?true:false">
            <nuxt-link :to="{ name:'index-article-id',params: { id:Number($route.params.id)+1 }}">
                新
            </nuxt-link>
        </menu> -->
        <!-- 手机端导航菜单 -->
        <nav id="phone-menu-box">
            <nuxt-link id="logo" :to="{ name:'index' }" ><span @click="onTop">陈陈菌博客</span></nuxt-link>
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
import * as echarts from 'echarts'
export default {
    // 整站的 head 属性
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    data(){
        return {
            EveryDayNewPeopleSum: '',
            PeopleSum: '',
            articlesLength: Number,
            header: [
                { iconClass:'',itemName:'',url:'',orders:'',action:'' }
            ],
            links: [
                { itemName:'',url:'',orders:''}
            ],
            userLinks: [
                { iconClass:null,itemName:null,url:null,orders:null }
            ],
            randomArticles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ],
            articles: [
                { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
            ],
            categories: [
                { categorie: '' }
            ],
            musicID: ''
        }
    },
    async asyncData({route}){
        // 获取友情链接列表数据
        let linksRes = await axios.post('https://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
        // 获取导航菜单列表数据
        let MenuRes = await axios.post('https://api.glumi.cn/api/Menu.php',qs.stringify({class:'TopMenu'}))
        // 获取随机文章列表数据
        let RandomArticlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params: { data:'getRandomArticle' }})
        // 获取社交账号列表数据
        let userLinksRes = await axios.post('https://api.glumi.cn/api/Links.php',qs.stringify({data:'getUserLinks'}))
        // 获取网易云音乐歌曲ID
        let musicIDres = await axios.get('https://api.glumi.cn/api/setting.php',{ params: { data:'getMusicID' }})
        // 获取分类数据
        let categoriesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params:{ data:'getCategories' } })
        // 获取每日新访客人数
        let EveryDayNewPeopleSumRes = await axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getEveryDayNewPeopleSum' } })
        // 获取每日访客数
        let PeopleSumRes = await axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getPeopleSumNumber' } })
        // 获取所有文章总数
        let articlesLength = await axios.get('https://api.glumi.cn/api/Article.php',{ params: { data: 'getAllArticleSum' } })
        // 获取所有文章数据
        let articlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params: { data: 'getAllArticle' } })
        return { 
            header: MenuRes.data,
            links: linksRes.data,
            randomArticles: RandomArticlesRes.data,
            userLinks: userLinksRes.data,
            musicID: musicIDres.data,
            categories: categoriesRes.data,
            EveryDayNewPeopleSum: EveryDayNewPeopleSumRes.data,
            PeopleSum: PeopleSumRes.data,
            articlesLength: articlesLength.data,
            articles: articlesRes.data
        }
    },
    // 过滤器，用于裁剪字符数。通过改变 i 来修改字符最大值。
    filters: {
        ellipsis: function(value) {
            let i = 15;
            if(value.length > i){
                return value.slice(0,i)+'...'
            }
            return value
        },
    },
    methods:{
        // 返回首页
        onTop(){
            let i = window.scrollY
            var time = setInterval(()=>{
                window.scrollTo(0,i-=(i*0.01))
                if(window.scrollY==0){
                    clearInterval(time)
                }
            },0.1)
        },
        // 跳转站外链接
        ToUrl(url){
            window.location.href = url
        },
        // 点击随机文章时自动调用
        ToTop(){
            let i = window.scrollY
            var time = setInterval(()=>{
                window.scrollTo(0,i-=(i*0.01))
                if(window.scrollY==0){
                    clearInterval(time)
                }
            },0.1)
        },
        async getRandomArticles(){
            // 获取随机文章列表数据
            let RandomArticlesRes = await axios.get('https://api.glumi.cn/api/Article.php',{ params: { data:'getRandomArticle' }})
            this.randomArticles = RandomArticlesRes.data
        },
        // 移动端导航菜单的交互动画效果。
        async onClickDisplayMenu(){
            this.$store.commit('ChangeDisplayMenuState')
            if(this.$store.state.DisplayMenuState){
                document.getElementById('phone-menu').style.top = "55px"
                document.getElementById('phone-menu').style.width = "160px"
                document.getElementById('phone-menu').style.maxHeight = "380px"
                document.getElementById('phone-menu').style.boxShadow = "0px 0px 10px 0px #bdbdbd"
                document.getElementById('phone-menu').style.opacity = "1"
                for (let i =0;i<document.getElementById('phone-menu').childNodes[0].childNodes.length;i++){ 
                    document.querySelector('#phone-menu ul').childNodes[i].style.opacity="1" 
                }
                document.getElementById('phone-menu-button').style.backgroundColor = "#ebebeb"
                document.getElementById('phone-menu-button').style.color = "#000000"
            }else {
                document.getElementById('phone-menu').style.boxShadow = "0px 0px 0px 0px #ebebeb"
                document.getElementById('phone-menu').style.padding = "0px"
                document.getElementById('phone-menu').style.top = "0px"
                document.getElementById('phone-menu').style.maxHeight = "0px"
                document.getElementById('phone-menu').style.opacity = "0"
                for (let i =0;i<document.getElementById('phone-menu').childNodes[0].childNodes.length;i++){ 
                    document.querySelector('#phone-menu ul').childNodes[i].style.opacity="0" 
                }
                document.getElementById('phone-menu-button').style.backgroundColor = "inherit"
                document.getElementById('phone-menu-button').style.color = "#ffffff"
            }
        }
    },
    async mounted(){
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 2000)
        })
        var charDom = document.getElementById('echarts_data')
        var myChart = echarts.init(charDom)

        // 通过本地存储生成用于验证是否新访客的字段
        axios.get('https://api.glumi.cn/api/echarts.php',{params: {
            data:'setNumberPeople',
            people: window.localStorage.getItem('people')
        }})
        window.localStorage.setItem('people','visit')
        // 模拟实时更新访客数据
        setInterval(()=>{
            axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getEveryDayNewPeopleSum' } }).then((res)=>this.EveryDayNewPeopleSum=res.data)
            axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getPeopleSumNumber' } }).then((res)=>this.PeopleSum=res.data)
            axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getAllDateTime' } }).then((res)=>{
                myChart.setOption({
                    title: {
                        left: 'center',
                        text: `今日访问：${this.EveryDayNewPeopleSum}，总访问数：${this.PeopleSum}`
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: res.data
                    },
                    yAxis: {
                        type: 'value'
                    }
                })
            })
            axios.get('https://api.glumi.cn/api/echarts.php',{ params: { data: 'getAllPeopleNumber' } }).then((res)=>{
                myChart.setOption({
                    series: [{
                        type: 'line',
                        data: res.data,
                    }]
                })
            })
        },1000)
    }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-1 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.71s;
    }
    #Keep-on-record {
        display: flex;
        justify-content: center;
        margin-top: 0;
        margin-bottom: 30px;
        flex-direction: column;
        text-align: center;
        p {
            margin: 0;
        }
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
        position: absolute;
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
                // color: cornflowerblue !important;
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
    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }

    #svgbox {
        color: cornflowerblue;
        svg {
            g {
                use:nth-child(1) {
                    animation: svgAnimation 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                    animation-delay: -2s;
                    animation-duration: 7s;
                    background-repeat: repeat-x;
                    background-position: 0 10px;
                    opacity: 0.5;
                }
                use:nth-child(2) {
                    animation: svgAnimation 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                    animation-delay: -3s;
                    animation-duration: 10s;
                    background-repeat: repeat-x;
                    background-position: 0 10px;
                    opacity: 0.7;
                }
                use:nth-child(3) {
                    animation: svgAnimation 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                    animation-delay: -4s;
                    animation-duration: 13s;
                    background-repeat: repeat-x;
                    background-position: 0 10px;
                    opacity: 1;
                }
                use:nth-child(4) {
                    animation: svgAnimation 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                    animation-delay: -5s;
                    animation-duration: 20s;
                    background-repeat: repeat-x;
                    background-position: 0 10px;
                    opacity: 0.6;
                }
            }
        }
    }
    #header {
        // position: absolute;
        transition: 1s;
        width: 100%;
        // max-height: 100%;
        height: 417px;
        background: no-repeat center center;
        // background-image: url('https://huangxuan.me/img/home-bg.jpg');
        // background-image: url('~/static/header.jpeg');
        background-image: url('~/static/header.jpg');
        background-size: cover;
        display: flex;
        justify-content:space-around;
        align-items: center;
        text-align: center;
        flex-direction: column;
        // video {
        //     width: 100%;
        //     // z-index: -6000;
        //     height: 100%;
        //     object-fit: cover;
        //     @media all and(min-width:900px) {
        //         height: 417px;
        //     }
        //     @media all and(max-width:900px) {
        //         height: 317px;
        //     }
        //     source {

        //     }
        // }
        #TitleBox {
            width: 100%;
            position: absolute;
            color: #ffffff;
            justify-content: center;
            div {
                justify-content: center;
            }
            h1 {
                font-size: 80px;
                margin: 0;
            }
            h2 {
                // width: 850px;
                font-size: 44px;
                padding: 10px;
                margin: 0 auto;
                box-sizing: border-box;
                @media all and(min-width: 900px) {
                    width: 850px;
                    text-align: left;
                    #articleTime {
                        font-size: 18px;
                        // display: none;
                    }
                    #articleSubTitle {
                        font-size: 18px;
                        // display: none;
                    }
                }
                @media all and(max-width: 900px) {
                    text-align: left;
                    width: 100%;
                    #articleTitle {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    #articleTime {
                        font-size: 15px;
                        color: #fff;
                    }
                    #articleSubTitle {
                        font-size: 15px;
                        margin-bottom: 10px;
                    }
                }
            }
            #text {
                font-size: 1.2rem;
                color: #ffffff;
            }
            @media all and(max-width:605px) {
                h1 {
                    font-size: 50px;
                }
                width: 100%;
            }
        }
        .preview-overlay {
            position: relative ;
            bottom: -1px;
            width: 100%;
            height: 100%;
            // overflow: hidden;
            // z-index: 100;
            box-sizing: border-box;
            svg {
                display: block;
                width: 100%;
                position: absolute;
                bottom: 0;
                @media all and(min-width: 900px) {
                    height: 100px;
                }
                @media all and (max-width: 900px) {
                    height: 50px;
                }
            }
        }
        .preview-overlay .preview-parallax>use {
            animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
            fill: #ffffff;
        }

        .preview-overlay .preview-parallax>use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
            opacity: 0.51;
        }
        .preview-overlay .preview-parallax>use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
            opacity: 0.5;
        }
        .preview-overlay .preview-parallax>use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
            opacity: 1;
        }
        .preview-overlay .preview-parallax>use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
            opacity: 0.51;
        }
        @media all and(max-width: 605px) {
            height: 317px;
            background-image: url('~/static/header2.jpg');
        }
    }
    #main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        z-index: 10000 !important;
        div {
            width: 750px;
            @media all and(max-width:900px) {
                width: 100%;
            }
        }
        menu {
            width: 300px;
            list-style: none;
            margin: 20px 0px 0px 30px;
            padding: 0;
            #about {
                display: flex;
                flex-direction: column;
                img {
                    border-radius: 15px;
                    border: 1px solid #e0e0e0;
                    margin-bottom: 15px;
                }
                div {
                    text-align: center;
                    width: 100%;
                }
                #callme {
                    display: flex;
                    justify-content: center;
                    flex: 1;
                    margin-top: 15px;
                    margin-bottom: 15px;
                    li {
                        width: 45px;
                        height: 45px;
                        border: 1px solid #868686;
                        border-radius: 50%;
                        margin: 0px 10px;
                        a {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #000000;
                            font-size: 1.5rem;
                        }
                    }
                }
            }
            #categories {
                li {
                    display: inline-block;
                    border: 1px solid rgba(211, 208, 208, 0.8);
                    border-radius: 999em;
                    padding: 0 10px 0 10px;
                    color: #fff;
                    line-height: 24px;
                    font-size: 12px;
                    text-decoration: none;
                    margin: 0 2px;
                    margin-bottom: 6px;
                    cursor: pointer;
                    &:hover {
                        border: 1px solid cornflowerblue;
                    }
                }
            }
            #music {
                iframe {
                    width: 100%;
                }
            }
            #articleNav {
                width: 100%;
                border: 0;
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: inherit;
                    box-sizing: border-box;
                    border: 1px solid rgb(211, 211, 211);
                    border-radius: 15px;
                    padding: 10px;
                    text-align: center;
                    margin: 5px 0px;
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
            #randomArticles {
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
                // border-radius: 10px;
                margin: 20px 0px;
                padding: 0 10px 0 10px;
                list-style: none;
                border-bottom: 1px solid #e6e6e6;
                box-sizing: border-box;
                h3 {}
                li {
                    // width: 100%;
                    display: inline-block;
                    color: #a3a3a3;
                    padding: 5px;
                    box-sizing: border-box;
                    img {
                        width: 100%;
                        border-radius: 10px;
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
    #phone-to-nextArticle {
        position: fixed;
        right: 35px;
        bottom: 25px;
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
            text-decoration: none;
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
    #phone-to-lastArticle {
        position: fixed;
        right: 35px;
        bottom: 165px;
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
            text-decoration: none;
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
            font-size: 1.4rem;
            align-items: center;
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 15px;
            cursor: pointer;
            // border-radius: 50%;
            color: #ffffff;
            &:hover {
                // background-color: #ebebeb;
                // color: #000000;
            }
        }
        
        #phone-menu {
            transition: 0.81s;
            position: absolute;
            right: 0px;
            padding: 0px;
            top: 0px;
            // width: 0px;
            max-height: 0px;
            // height: 0px;
            overflow: hidden;
            background-color:rgba(#ffffff,1);
            // border-radius: 15px;
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
                        color: #535353;
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
        margin-bottom: 10px;
        div {
            transition: 0.5s;
            text-align: center;
            width: 20px;
            height: 20px;
            padding: 15px;
            line-height: 25px;
            margin: 0px 10px;
            border: 1px solid #000000;
            border-radius: 100%;
            cursor: pointer;
            
            i {
                width: 100%;
                height: 100%;
                transform: scale(2);
            }
            a {
                color: #000000;
            }
            &:hover {
                background-color: #000000;
                a {
                    color: #ffffff;
                }
            }
        }
    }
</style>