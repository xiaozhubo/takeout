<template>
  <div class="footer_guide">
    <div class="guide_item" :class="{on: '/msite' === $route.path}" @click="goToPath('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>首页</span>
    </div>
    <div class="guide_item" :class="{on: '/search' === $route.path}" @click="goToPath('/search')">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </div>
    <div class="guide_item" :class="{on: '/order' === $route.path}" @click="goToPath('/order')">
      <span class="item_icon">
        <i class="iconfont icon-gouwuche"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="guide_item" :class="{on: '/profile' === $route.path}" @click="goToPath('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FooterGuide',
    data(){
      return {
        
      }
    },
    methods:{
      goToPath(path){
        this.$router.replace(path)
      }
    },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl";
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 45px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-style 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-style 22px
</style>