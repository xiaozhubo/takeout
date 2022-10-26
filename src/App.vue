<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {RECEIVE_ADDRESS} from "./store/mutation-type"
import FooterGuide from "./components/footerguide/FooterGuide"
export default {
  name: "App",
  components: {FooterGuide},
  methods:{
    ...mapActions(["getAddress","getUserInfo","recordGeohash"]),
    getPosition(){
      navigator.geolocation.getCurrentPosition((position)=>{
        const geo = position.coords
        this.recordGeohash(geo)
        this.getAddress()
      },()=>{
        this.$store.commit(RECEIVE_ADDRESS,{address:{name:"定位失败"}})
      })
    }
  },
  mounted(){
    this.getPosition()
    this.getUserInfo()
  }
};
</script>

<style lang="stylus">
// 解决fastclick移动端页面多次点击报错的问题
  *
    touch-action: pan-y
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
