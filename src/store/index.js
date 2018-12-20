import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/api_hotel_and_scale.js'
import cookie from '../common/cookie.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    menuShow: true,
    hotel: [],
    currentHotelID: null,
    header: '哎呦有房',
  },
  mutations: {
    setHotel(state, param) {
      state.hotel = param.hotel
    },
    setMenu(state, param) {
      state.menuShow = param
    },
    setHeader(state, param) {
      state.header = param
    },
    setCurrentID(state, param) {
      state.currentHotelID = param
    },
  },
  getters: {
    hotels(state) {
      if (state.hotel.length === 0) {
        store.dispatch('loadHotels')
      }
      return state.hotel
    },
    currentID(state) {
      if (state.hotel.length === 0) {
        store.dispatch('loadHotels')
      } else if (!state.currentHotelID) {
        store.commit('setCurrentID', state.hotel[0].id)
      } else {
        return state.currentHotelID
      }
    }
  },
  actions: {
    async loadHotels({ commit, dispatch, state }) {
      let params = {
        startPage: 1,
        recordNum: 300,
      }
      let result = await API.hotelGetList(params)
      commit('setHotel', { 'hotel': result.data })
      let id = cookie.getCookie('currentID')
      if (id) {
        commit('setCurrentID', Number(id))
      } else {
        commit('setCurrentID', result.data[0].id)
        cookie.setCookie('currentID', result.data[0].id)
      }
    },
    loadState({ commit }, id) {
      // console.log('data', id)
      API.scaleGetList(id).then(result => {
        if (result && result.ret === 1) {
          commit('setState', { statelist: result.data })
        }
      }).catch(() => {})
    },
    loadStateList(state, arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        store.dispatch('loadState', arr[i].id)
      }
    },
  }
})

export default store
