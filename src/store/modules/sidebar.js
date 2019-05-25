
const state = {
    isOpen: false
}

const mutations = {
    TOGGLE_SIDEBAR:(state,payload)=>{
        let status = payload ? payload : !state.isOpen
        state.isOpen = status
    }
}

const actions = {}

export default {
    state,
    mutations,
    actions
}