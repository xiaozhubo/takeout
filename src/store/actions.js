import { reqAddress, reqFoodCategorys, reqShopListByGeo } from "@/api"
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from "./mutation-type"
export default {
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
  }
}