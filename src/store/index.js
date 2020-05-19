import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import login from './modules/login'
import register from './modules/register'
import chat from './modules/chat'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axios
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    register,
    chat
  }
})
