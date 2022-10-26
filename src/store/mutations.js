import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USERINFO,RECORD_GEOHASH,RESET_USERINFO} from "./mutation-type"

export default {
  [RECORD_GEOHASH](state,{geo}){
    state.latitude = geo.latitude
    state.longitude = geo.longitude
  },
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO](state,{userinfo}){
    state.userinfo = userinfo
  },
  [RESET_USERINFO](state){
    state.userinfo = {}
  }
}