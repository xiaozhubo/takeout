<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide/>
  </div>
</template>

<script>
import FooterGuide from "./components/footerguide/FooterGuide"
import {mapActions} from "vuex"
export default {
  name: "App",
  components: {FooterGuide},
  methods:{
    ...mapActions(["getAddress","getFoodCategorys"])
  },
  mounted(){
    this.getAddress()
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
