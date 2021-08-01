export const state = () => ({
    NavBtnChange: false,
    AdminEditorPageState: true
})
export const mutations = {
    ChangeAdminEditorPageState(state){
        state.AdminEditorPageState = !state.AdminEditorPageState
    },
    ChangeBtnStyle(state){
        state.NavBtnChange = !state.NavBtnChange
    },
}
