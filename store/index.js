export const state = () => ({
    NavBtnChange: false,
    AdminEditorPageState: true,
    DisplayMenuState: false,
    PC_Search_ShowState: false,
    cur: 0
})
export const mutations = {
    ChangePC_Search_ShowState(state){
        state.PC_Search_ShowState = !state.PC_Search_ShowState
    },
    ChangeAdminEditorPageState(state){
        state.AdminEditorPageState = !state.AdminEditorPageState
    },
    ChangeBtnStyle(state){
        state.NavBtnChange = !state.NavBtnChange
    },
    ChangeDisplayMenuState(state){
        state.DisplayMenuState = !state.DisplayMenuState
    },
    ChangeCur(state){
        state.cur++
    }
}
