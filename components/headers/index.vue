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
export default {
    data(){
        return {
            header:[
                { 'itemName':'','url':'','orders':'','action':'' }
            ]
        }
    },
    // async asyncData({ app }) {
    //     let header = await app.$axios.get('/Menu.php',{ params:{ class: 'TopMenu' }}).then((res)=>res.data)
    //     return { header }
    // },
    beforeCreate(){
        this.$axios.get('/Menu.php',{ params:{ class: 'TopMenu' }}).then((res)=>this.header=res.data)
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
                Alldom.childNodes[i].style.color = "#000000"
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
                    dom.srcElement.style.color = "#000000"
                }
            }
        },
        ChangeBtnStyle(){
            this.$store.commit('ChangeBtnStyle')
        }
    },
}
</script>


<style lang="scss" scoped>
    #nav {         
        width: 100%;
        top: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        box-sizing: border-box;
        margin-bottom: 10px;
        a {
            text-align: center;
            cursor: pointer;
            line-height: 50px;
            width: 140px;
            text-decoration: none;
            color: #000000;
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