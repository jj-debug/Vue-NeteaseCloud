import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname:null,
    disable: true,
    theme: 'light',
    user: null,
    uid: null,
    cookie: null,
    isloading:false,
    requestErr:false,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    /**保存用户信息 */
    addUser(state, obj) {
      state.disable = false
      console.log('obj', obj)
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.nickname = state.user.profile.nickname;
      console.log('state.nickname', state.nickname)
      state.cookie = obj.cookie;
    },
    // 删除用户信息
    deleteUser(state) {
      console.log(1);
      state.user = null;
      state.uid = null;
      state.nickname = null;
      state.cookie = null;
    },
    /**显示隐藏loading */
    showLoading(state){
      state.isloading=true;
    },
    hiddenLoading(state){
      state.isloading=false;
    },
    /**修改网络状态 */
    setRequestErr(state){
      state.requestErr=true;
    }
  },
  getters: {
    getTheme(state) {
      if (localStorage.getItem('theme')) {
        state.theme = localStorage.getItem('theme');
      }
      return state.theme;
    },
    getAvatar(state){
      let avatar='../assets/img/one.jpg';
      if(localStorage.getItem('avatar')){
        avatar=localStorage.getItem('avatar');
        return avatar;
      }
      avatar=state.user&&state.user.profile.avatarUrl;
      return avatar;
    },
    getCookie(state){
      if(localStorage.getItem('cookie')){
        state.cookie=localStorage.getItem('cookie');
      }
      return state.cookie;
    },
    /**获取网络请求状态 */
    getRequestType(state){
      return state.requestErr;
    },
    /**获取用户id */
    getUserId(state){
      if(localStorage.getItem('uid')){
        state.uid=localStorage.getItem('uid');
      }
      return state.uid
    },
    getNickname(state){
      if(localStorage.getItem('nickname')){
        state.nickname = localStorage.getItem('nickname')
      }
      return state.nickname
    }
  },
  actions: {
  },
  modules: {
  }
})
