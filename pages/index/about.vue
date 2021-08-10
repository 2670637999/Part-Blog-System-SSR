<template>
    <div id="aboutBox" v-html="content"></div>
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
</style>