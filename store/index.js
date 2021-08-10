export const state = () => ({
    NavBtnChange: false,
    AdminEditorPageState: true,
    DisplayMenuState: false
})
export const mutations = {
    ChangeAdminEditorPageState(state){
        state.AdminEditorPageState = !state.AdminEditorPageState
    },
    ChangeBtnStyle(state){
        state.NavBtnChange = !state.NavBtnChange
    },
    ChangeDisplayMenuState(state){
        state.DisplayMenuState = !state.DisplayMenuState
    }
}
