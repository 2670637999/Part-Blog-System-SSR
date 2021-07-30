import axios from '@nuxtjs/axios'

export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
      
      if (process.browser) {
        if ((window.navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
          var tokenstr = window.localStorage.getItem('token')
          var http = new XMLHttpRequest();
          http.open('GET',`http://test.glumi.cn/api/Login.php?data=ValidateToken&token=${tokenstr}`,false)
          http.send()
        }
      }
      if(to.name=='admin'){
        if(tokenstr==null){
          next('login')
        }else {
          if(http.responseText=='true'){
            next();
          }else {
            next('login')
          }
        }
      }
      next()
    })
}