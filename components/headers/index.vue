<template>
    <div>
        <carousel></carousel>
        <nav id="nav">
            <nuxt-link :key="data" v-for="(item,data) in header" :to="header[data].url" @click.native="NavOnclick(header[data],$event)">
                {{ header[data].itemName }}
                <span></span>
            </nuxt-link>
        </nav>
    </div>
</template>

<script>
import carousel from './carousel.vue'
import qs from 'qs'
export default {
    data(){
        return {
            header:[
                { 'itemName':'','url':'','orders':'','action':'' }
            ]
        }
    },
    components: {
        carousel
    },
    methods: {
        NavOnclick(prop,dom)
        {
            this.ChangeBtnStyle()
            var Alldom = document.getElementById('nav')
            for(let i =0;i<Alldom.childNodes.length;i++){
                Alldom.childNodes[i].childNodes[1].style.width = "0%"
                Alldom.childNodes[i].style.color = "#5e5e5e"
            }
            dom.srcElement.childNodes[1].style.width = "100%"
            dom.srcElement.style.color = "cornflowerblue"
            if(prop.action=="ShowCategory()") {
                this.ShowCategory()
                if(this.$store.state.imageShow == true) {
                    dom.srcElement.childNodes[1].style.width = "100%"
                    dom.srcElement.style.color = "cornflowerblue"
                }else if(this.$store.state.imageShow == false) {
                    dom.srcElement.childNodes[1].style.width = "0%"
                    dom.srcElement.style.color = "#5e5e5e"
                }
            }
        },
        ChangeBtnStyle(){
            this.$store.commit('ChangeBtnStyle')
        }
    },
    async beforeCreate(){
        const data = {class: 'TopMenu'}
        let res = await this.$axios.post('/Menu.php',qs.stringify(data))
        this.header = res.data
    },
    // async asyncData({app}) {
    //     const data = {class: 'TopMenu'}
    //     let header = await app.$axios.post('/Menu.php',qs.stringify(data))
    //     console.log(res)
    //     return { header }
    // },
}
</script>


<style lang="scss" scoped>
    #nav {         
        transition: 2s;
        width: 100%;
        top: 0;
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 0px;
        a {
            text-align: center;
            cursor: pointer;
            line-height: 50px;
            width: 140px;
            font-weight: 600;
            text-decoration: none;
            color: #5e5e5e;
            transition: 0.51s;
            span {
                bottom: 0;
                display: flex;
                width: 0%;
                height: 2px;
                transition: 0.51s;
                background-color: cornflowerblue;
            }
            // &:hover {
            //     color: cornflowerblue;
            //     span {
            //         width: 100%;
            //         opacity: 1;
            //     }
            // }
        }
    }
</style>