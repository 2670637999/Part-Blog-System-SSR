export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
      
      if (process.browser) {
          var tokenstr = window.localStorage.getItem('token')
          var http = new XMLHttpRequest();
          http.open('GET',`http://api.glumi.cn/api/Login.php?data=ValidateToken&token=${tokenstr}`,false)
          http.send()
      }
      if(to.name=='index-admin' 
      | to.name=='index-admin-editor' 
      | to.name=='index-admin-articles'
      | to.name=='index-admin-comments'
      | to.name=='index-admin-editor'
      | to.name=='index-admin-pages'
      | to.name=='index-admin-articles-editor'){
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