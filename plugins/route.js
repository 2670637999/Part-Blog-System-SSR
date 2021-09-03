export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
    if(process.client){
      var tokenstr = window.localStorage.getItem('token')
      var http = new XMLHttpRequest();
      http.open('GET',`https://api.glumi.cn/api/Login.php?data=ValidateToken&token=${tokenstr}`,false)
      http.send()
    }
    if(process.client){
      console.log(to.params.id)
      switch(to.name){
        case 'index':
          if(window.innerWidth>900){
            document.getElementById('header').style.backgroundImage = "url('/header.jpg')";
          }else if(window.innerWidth<900) {
            document.getElementById('header').style.backgroundImage = "url('/articles.jpg')";
          }
        break;
        case 'index-articles':
          if(window.innerWidth>900){
            document.getElementById('header').style.backgroundImage = "url('/header.jpg')";
          }else if(window.innerHeight<900){
            document.getElementById('header').style.backgroundImage = "url('/articles.jpg')";
          }
          break;
        case 'index-categories':
          if(window.innerWidth>900){
            document.getElementById('header').style.backgroundImage = "url('/header.jpg')";
          }else if(window.innerHeight<900){
            document.getElementById('header').style.backgroundImage = "url('/articles.jpg')";
          }
        break;
        case 'index-project':
          if(window.innerWidth>900){
            document.getElementById('header').style.backgroundImage = "url('/pc-project.jpg')";
          }else if(window.innerWidth<900){
            document.getElementById('header').style.backgroundImage = "url('/phone-project.jpg')";
          }
        break;
        case 'index-about':
          if(window.innerWidth>900){
            document.getElementById('header').style.backgroundImage = "url('/header.jpg')";
          }else if(window.innerWidth<900){
            document.getElementById('header').style.backgroundImage = "url('/articles.jpg')";
          }
        break;
        case 'index-comment':
          document.getElementById('header').style.backgroundImage = "url('/comment.jpg')";  
        break;
        case 'index-article-id':
          let http2 = new XMLHttpRequest();
          http2.open('GET',`https://api.glumi.cn/api/Article.php?data=getArticleindexOfData&getidArticle=${to.params.id}`,false)
          http2.send()
          document.getElementById('header').style.backgroundImage = `url('${JSON.parse(http2.response).imgURL}')`;
          // if(window.innerWidth>900){
          //   document.getElementById('header').style.backgroundImage = "url('/header.jpg')";
          // }else if(window.innerWidth<900) {
          //   document.getElementById('header').style.backgroundImage = "url('/articles.jpg')";
          // }
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