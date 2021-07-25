export const state = () => ({
    NavBtnChange: false,
    PostShow: false,
    AuthorShow: false,
    imageShow: false,
    loaderstatus: true,
    token: ''

})
export const mutations = {
    SetLoad(state){
        state.loaderstatus = false
    },
    PostShowF(state){
        state.PostShow = true
        state.loaderstatus = false
    },
    AuthorShowF(state){
        state.AuthorShow = true
    },
    ImageShowF(state){
        state.imageShow = ! state.imageShow
    },
    ChangeBtnStyle(state){
        state.NavBtnChange = !state.NavBtnChange
    },
    SetCurrentArticle(title,content,time,url){
        this.CurrentArticle = title
        this.CurrentArticle.content = content
        this.CurrentArticle.time = time
        this.CurrentArticle.url = url
    }
}
