import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: '', // 头像地址
    nickname: '' // 用户昵称
  },
  mutations: {
    // 编码风格，mutations 最好大写（区分）
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    },
    SET_NICKNAME(state, value) {
      state.nickname = value
    }
  },
  actions: {},
  modules: {}
})
