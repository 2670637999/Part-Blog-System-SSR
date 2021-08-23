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
        // 获取关于页面的 html
        let contentRes = await axios.post('https://api.glumi.cn/api/About.php',qs.stringify(query_data))
        return { content:contentRes.data }
    }
}
</script>

<style lang="scss" scoped>
    .page-enter-active {
        animation: part-enter-21 1s;
    }
    .page-leave-active {
        animation: part-leave-1 0.51s cubic-bezier(0.1, 1, 1, 1);
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
        }
    }
</style>