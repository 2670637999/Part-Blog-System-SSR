<template>
    <div id="box">
        <div id="aboutHTML" class="part-enter-20">
            <h1>关于我的介绍</h1>
            <p>陈杰海 / ChenJieHai</p>
            <p>某专科院校计算机相关专业学生，来自广东一个不起眼的小村庄。</p>
            <p>热爱 🎮 游戏 / 🎵 音乐。对交互设计有浓厚兴趣，喜欢钻研软件。</p>
        </div>
        <div id="aboutBox" v-html="content"></div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return {
            content: '',
            header: [
                { itemName:'',url:'',orders:'',action:'' }
            ]
        }
    },
    async asyncData(){
        const query_data = { data:'getData' }
        let contentRes = await axios.post('http://api.glumi.cn/api/About.php',qs.stringify(query_data))
        return { content:contentRes.data }
    },
    async beforeCreate(){
        // if(process.client){
        //     window.scrollTo(0,0)
        //     document.getElementById('header').style.height="0px"
        // }
    }
}
</script>

<style lang="scss" scoped>
    #box {
        // overflow: hidden;
    }
    #aboutBox {
        padding: 10px;
        box-sizing: border-box;
        color: #686868;
        padding-left: 100px;
        box-sizing: border-box;
        @media all and(max-width:900px) {
            padding: 10px;
        }
    }
    #aboutHTML {
        margin-top: 40px;
        margin-left: 100px;
        box-sizing: border-box;
        // height: 400px;
        border-radius: 15px;
        background-color: cornflowerblue;
        color: #ffffff;
        padding: 10px;
        h1 {
            margin-top: 0;
        }
        h3 {

        }
        @media all and(max-width:900px) {
            margin: 15px;
            // padding: 15px;
            // height: 300px;
        }
    }
</style>