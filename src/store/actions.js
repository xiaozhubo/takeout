import { reqAddress, reqFoodCategorys, reqShopListByGeo, reqUserInfo,reqLogout } from "@/api"
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USERINFO,RECORD_GEOHASH,RESET_USERINFO } from "./mutation-type"
export default {
  recordGeohash({commit},geo){
    commit(RECORD_GEOHASH,{geo})
  },
  getAddress({ commit, state }) {
    const geohash = state.latitude + "," + state.longitude
    reqAddress(geohash)
      .then(res => {
        if (res.code === 0) {
          const address = res.data
          commit(RECEIVE_ADDRESS, { address })
        } else {
          console.log("获取失败！")
        }
      })
      .catch(err => console.error(err))
  },
  async getFoodCategorys({ commit }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  async getShopListByGeo({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShopListByGeo(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 记录用户信息
  recordUserInfo({commit},userinfo){
    commit(RECEIVE_USERINFO,{userinfo})
  },
  // 根据会话异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const userinfo = result.data
      commit(RECEIVE_USERINFO,{userinfo})
    }
  },
 async logout({commit}){
  const result = await reqLogout()
  if(result.code === 0){
    commit(RESET_USERINFO)
  }
 }
}