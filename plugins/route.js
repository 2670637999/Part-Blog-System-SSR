export default ({ app })=>{
    app.router.beforeEach((to, from, next) => {
        // const tokenstr = window.localStorage.getItem('token')

        if( to.name == 'admin' | to.name == 'adminPost' | to.name == 'adminComment' | to.name== 'editor'){
          if(from.name == 'login') {
            next();
          }else {
            if( from.name == 'admin' 
            | from.name == 'adminPost' 
            | from.name == 'adminComment' 
            | from.name == 'editor'){
              next();
            }else {
              return next('/login');
            }
          }
        }
        next();
    })
}