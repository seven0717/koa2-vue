import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    user:localStorage.getItem('user') || '',
    token:localStorage.getItem('token') || null
  },
  mutations:{
    LOGIN:(state,data) => {
      state.user = data.user;
      state.token = data.token;
    }
  }
});
export default store;
