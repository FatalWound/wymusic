
const state = {
    theme_color: '#954dcc'
}

const mutations = {
    SET_THEME_COLOR: (state, payload) => {
        payload ? payload :'#954dcc'
        state.theme_color = payload
    },
    RESET: (state, payload) => {
        state.theme_color = '#954dcc'
    }
}

const actions = {}

export default {
    state,
    mutations,
    actions
}