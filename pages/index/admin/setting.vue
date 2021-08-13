<!-- 站点设置 -->
<template>
    <div id="settingBox">
        <div>
            <h3>音乐设置（未开发）</h3>
            <p>网易云音乐设置：</p>
            <p><input type="text" placeholder="（填入专辑或者歌单ID）"></p>
        </div>
        <div>
            <h3>友情链接</h3>
            <p>当前链接</p>
            <ul>
                <li :key="data" v-for="(item,data) in Links"><span>{{ Links[data].itemName }}</span><span>{{ Links[data].url }}</span></li>
            </ul>
            <p>添加链接：</p>
            <p><input type="text" v-model="input.itemName" placeholder="站点名称"></p>
            <p><input type="text" v-model="input.url" placeholder="链接"></p>
            <p><input type="button" value="添加" @click="addLink"></p>
        </div>
        <div>
            <h3>社交账号</h3>
            <p>当前账号</p>
            <ul>
                <li :key="data" v-for="(item,data) in accounts"><i :class="accounts[data].iconClass"></i> {{ accounts[data].itemName }} {{ accounts[data].url }}</li>
            </ul>
            <p>图标</p>
            <p><input type="text" v-model="account.iconClass" placeholder="CSS 图标类名"></p>
            <p>账号</p>
            <p><input type="text" v-model="account.itemName" placeholder="账号平台"></p>
            <p>地址</p>
            <p><input type="text" v-model="account.url" placeholder="账号主页链接"></p>
            <p><input type="button" value="添加" @click="SettingSubmit"></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
if(process.client){
    var token = window.localStorage.getItem('token')
}
export default {
    data(){
        return {
            Links: [
                { itemName:'',url:'',orders:'' }
            ],
            account:{
                iconClass:'',itemName:'',url:''
            },
            accounts:[
                { iconClass:'',itemName:'',url:'' }
            ],
            input:{
                itemName:'',url:''
            }
        }
    },
    methods:{
        async addLink(){
            if(process.client){
                token = window.localStorage.getItem('token')
            }
            var requ = "^[ ]+$"
            var re = new RegExp(requ)
            if(this.input.itemName=='' | this.input.url=='' | re.test(this.input.itemName) | re.test(this.input.url)){
                alert('输入不能为空')    
            }else {
                axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'addLink',itemName:this.input.itemName,url:this.input.url,token:token})).then((res)=>{
                    if(res.data=='添加成功'){
                        alert('添加成功')
                    }else if(res.data=='添加失败'){
                        alert('添加失败')
                    }
                })
            }
            let res = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
            let res2 = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
            this.Links = res.data
            this.Links = res2.data
        },
        async SettingSubmit(){
            if(process.client){
                token = window.localStorage.getItem('token')
            }
            var requ = "^[ ]+$"
            var re = new RegExp(requ)
            if(this.account.itemName=='' | this.account.url=='' | re.test(this.account.itemName) | re.test(this.account.url)){
                alert('输入不能为空')    
            }else {
                let updateRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({
                    data:'addUserLink',
                    token: token,
                    iconClass: this.account.iconClass,
                    itemName: this.account.itemName,
                    url: this.account.url
                }))
                if(updateRes.data=='添加成功'){
                    alert('添加成功')
                }else if(updateRes.data=='添加失败'){
                    alert('添加失败')
                }
                let accountRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getUserLinks'}))
                let accountRes2 = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getUserLinks'}))
                this.accounts = accountRes.data
                this.accounts = accountRes2.data
            }
        }
    },
    async asyncData(){
        let linksRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getLinks'}))
        let accountRes = await axios.post('http://api.glumi.cn/api/Links.php',qs.stringify({data:'getUserLinks'}))
        return {
            Links:linksRes.data,
            accounts:accountRes.data,
        }
    }
}
</script>

<style lang="scss" scoped>
    #settingBox {
        margin: 10px;
        div {
            background-color: #ffffff;
            padding: 10px 0px;
            box-sizing: border-box;
            h3 {
                padding: 10px;
                margin: 0px 0px 0px 0px;
                border-bottom: 1px solid #ebebeb;
            }
            ul {
                list-style: none;
                padding: 10px 0px;
                margin: 0px 0px;
                li{
                    padding: 10px;
                    border-bottom: 1px solid #ebebeb;
                    span:nth-child(2) {
                        float: right;
                    }
                }
            }
            p {
                margin: 10px 0px 0px 0px;
                padding: 0px 10px;
                box-sizing: border-box;
                input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10px;
                }
            }
        }
    }
</style>