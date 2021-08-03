
export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
      
      if (process.browser) {
          var tokenstr = window.localStorage.getItem('token')
          var http = new XMLHttpRequest();
          http.open('GET',`http://api.glumi.cn/api/Login.php?data=ValidateToken&token=${tokenstr}`,false)
          http.send()
      }
      if(to.name=='admin' 
      | to.name=='admin-editor' 
      | to.name=='admin-articles'
      | to.name=='admin-comments'
      | to.name=='admin-editor'
      | to.name=='admin-pages'
      | to.name=='admin-articles-editor'){
        if(tokenstr==null){
          next('/login')
        }else {
          if(http.responseText=='true'){
            next();
          }else {
            next('/login')
          }
        }
      }
      next()
    })
}