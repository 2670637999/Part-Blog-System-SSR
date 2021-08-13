export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
      
      if (process.browser) {
          var tokenstr = window.localStorage.getItem('token')
          var http = new XMLHttpRequest();
          http.open('GET',`http://api.glumi.cn/api/Login.php?data=ValidateToken&token=${tokenstr}`,false)
          http.send()
      }
      // if(process.client){
      //   if(to.name=='index'){
      //     window.addEventListener("scroll",function(){
      //         var header = this.document.querySelector("#nav");
      //         header.classList.toggle("sticky",window.scrollY > 60);
      //     })
      //   }
      // }
    if(process.client){
      switch(to.name){
        case 'index':
          if(window.innerWidth > 900){
            document.getElementById('header').style.height="417px"
              document.getElementById('nav').style.visibility = "inherit"
              document.getElementById('nav').style.opacity = "1"
              document.getElementById('phone-menu-box').style.visibility = "hidden"
              document.getElementById('phone-menu-box').style.opacity = "0"
          }
          else if(window.innerWidth > 600){
              document.getElementById('header').style.height="417px"
              document.getElementById('phone-menu-box').style.visibility = "inherit"
              document.getElementById('phone-menu-box').style.opacity = "1"
          }else if(window.innerWidth < 605){
              document.getElementById('header').style.height="317px"
              document.getElementById('phone-menu-box').style.visibility = "inherit"
              document.getElementById('phone-menu-box').style.opacity = "1"
          }
        break;
        case 'index-article-id':
            document.getElementById('phone-menu-box').style.visibility = 'hidden'
            document.getElementById('phone-menu-box').style.opacity = '0'
            document.getElementById('nav').style.visibility = 'hidden'
            document.getElementById('nav').style.opacity = '0'  
        break;
        case 'index-document':
            document.getElementById('phone-menu-box').style.visibility = 'hidden'
            document.getElementById('phone-menu-box').style.opacity = '0'
            document.getElementById('nav').style.visibility = 'hidden'
            document.getElementById('nav').style.opacity = '0'  
        break;
      }
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