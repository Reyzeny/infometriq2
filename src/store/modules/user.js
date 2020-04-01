import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    currentUser: null,
    refreshUserData: false,
  },
  getters: {
    isLoggedIn: () =>{ 
      
      let userData = JSON.parse(localStorage.getItem("user_data"));
      return userData && userData.auth_token;
    },
    getRefreshUserData(state) {
      return state.refreshUserData;
    }
  },
  actions: {
    changeRefreshState({commit, state}, refresh_state) {
      commit('SET_REFRESH_USER_STATE', refresh_state);
    },

    // signUp ({ commit, state }, payload) {
    //   return Vue.axios.post('user/register', payload).then(res => {
    //     const { user, token } = res.data.data

    //     const { store, branch } = user

    //     localStorage.setItem('pos_token', token.token)

    //     commit('SET_CURRENT_USER', user)

    //     commit('sales/RESET_CART', null, { root: true })
    //     commit('sales/RESET_TRANSFER_CART', null, { root: true })

    //     commit('settings/SET_STORE_SETTINGS', { branch, store, loggedInUser: user }, { root: true })

    //     return res.data
    //   })
    // },

    // login ({ commit, state, rootState }, payload) {
    //   return Vue.axios.post('user/login', payload).then(res => {
    //     const loginData = res.data
    //     const { user, token } = loginData.data
    //     const { store, branch } = user

    //     localStorage.setItem('pos_token', token.token)

    //     const appPrevSettings = rootState.settings.settings

    //     let settings = {
    //       loggedInUser: user,
    //       store
    //     }

    //     if (
    //       appPrevSettings &&
    //       (!appPrevSettings.branch || appPrevSettings.store.id !== store.id)
    //     ) {
    //       settings.branch = branch
    //     } else if (!appPrevSettings) {
    //       settings.branch = branch
    //     }

    //     commit('SET_CURRENT_USER', user)

    //     commit('settings/SET_STORE_SETTINGS', { ...settings }, { root: true })

    //     return loginData.data
    //   })
    // },

    // logout ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       localStorage.removeItem('pos_token')
    //       commit('CLEAR_CURRENT_USER')
    //       return resolve('success')
    //     } catch (e) {
    //       return reject(new Error(e))
    //     }
    //   })
    // }
  },
  mutations: {
    SET_REFRESH_USER_STATE(state, refresh_state) {
      state.refreshUserData = refresh_state
    },
  }

}
