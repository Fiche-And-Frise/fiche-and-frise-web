import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('username') || '',
    status: '',
    themes: []
  },
  getters:{
    isAuthenticated: state => !!state.user,
    authStatus: state => state.status,
    getThemes: state => state.themes
  },
  mutations: {
    SET_USER(state, user){
      state.user = user;
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, username){
      state.status = 'success'
      state.user = username
    },
    AUTH_ERROR(state){
      state.status = 'error'
    },
    AUTH_LOGOUT(state){
      state.user = '';
      state.status = 'success'
    },
    SET_THEMES(state, themesList){
      state.themes = themesList
    }
  },
  actions: {
    setUser(context, user){
      context.commit('SET_USER', user)
    },
    setThemes(context, themesList){
      context.commit('SET_THEMES', themesList)
    },
    authRequest({commit}, {username, password}){
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:8081/login', data: params, method: 'POST', config })
            .then(resp => {
              const username = resp.data.username
              localStorage.setItem('username', username) // store the token in localstorage
              commit('AUTH_SUCCESS', username)
              // you have your token, now log in your user :)
              //dispatch('USER_REQUEST')
              resolve(resp)
            })
            .catch(err => {
              commit('AUTH_ERROR', err)
              localStorage.removeItem('username') // if the request fails, remove any possible user token if possible
              reject(err)
            })
      })
    },
    authLogout({commit}){
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('username') // clear your user's token from localstorage
        resolve()
      })
    },
    getAllThemes({commit}){
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        axios({url: 'http://localhost:8081/themes', method: 'GET'})
            .then(resp => {
              const themes = resp.data
              commit('SET_THEMES', themes)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
      })
    }
  },
  modules: {
  }
})
