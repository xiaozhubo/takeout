<template>
  <section class="profile">
    <HeaderTop topTitle="我的"></HeaderTop>
    <section class="profile-number">
      <router-link :to="userinfo._id ? '/userinfo' : '/login'" class="profile-link">
        <div class="profile_image">
          <i class="iconfont icon-my"></i>
        </div>
        <div class="user-info" v-if="!userinfo._id">
          <p class="user-info-top">登录/注册</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">暂未绑定手机号</span>
          </p>
        </div>
        <div class="user-info" v-else>
          <p class="user-info-top">{{userinfo.name ? userinfo.name : "请设置用户名"}}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">{{userinfo.phone ? userinfo.phone : "暂未绑定手机号"}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou2"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:;" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-orders"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou2"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou2"></i>
          </span>
        </div>
      </a>
      <!-- 硅谷外卖会员卡 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou2"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou2"></i>
          </span>
        </div>
      </a>
    </section>

    <section class="profile_my_order border-1px" v-if="userinfo._id">
      <mt-button type="danger" style="width: 100%" @click="logout">退出登陆</mt-button>
      <!-- <button type="button" class="profile_my_order_logout" v-if="userinfo._id">退出登陆</button> -->
    </section>
  </section>
</template>

<script>
import {MessageBox,Toast } from "mint-ui"
import { mapState } from 'vuex'
import HeaderTop from "@/components/HeaderTop"
export default {
  name: "UserProfile",
  components:{HeaderTop},
  computed:{
    ...mapState(['userinfo'])
  },
  methods:{
    logout(){
      MessageBox.confirm("确认退出吗？").then(
        ()=>{
          this.$store.dispatch("logout")
          Toast({
            message: '退出成功',
            iconClass: 'iconfont icon-check-circle1'
          })
        },
        ()=>{}
      )
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
  .profile //我的
    width 100%
    overflow hidden
    .profile-number
      margin-top 45.5px
      .profile-link
        clearFix()
        position relative
        display block
        background #02a774
        padding 20px 10px
        .profile_image
          float left
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon-my
            background #e4e4e4
            font-size 62px
            color: gray
        .user-info
          float left
          margin-top 8px
          margin-left 15px
          p
            font-weight: 700
            font-size 18px
            color #fff
            &.user-info-top
              padding-bottom 8px
            .user-icon
              display inline-block
              margin-left -15px
              margin-right 5px
              width 20px
              height 20px
              .icon-shouji
                font-size 24px
                vertical-align text-top
            .icon-mobile-number
              font-size 16px
              color #fff
        .arrow
          width 12px
          height 12px
          position absolute
          right 15px
          top 40%
          .icon-jiantou2
            color #fff
            font-size 5px
    .profile_info_data
      bottom-border-1px(#e4e4e4)
      width 100%
      background #fff
      overflow hidden
      .info_data_list
        clearFix()
        .info_data_link
          float left
          width 33%
          text-align center
          border-right 1px solid #f1f1f1
          .info_data_top
            display block
            width 100%
            font-size 14px
            color #333
            padding 15px 5px 10px
            span
              display inline-block
              font-size 30px
              color #f90
              font-weight 700
              line-height 30px
          .info_data_bottom
            display inline-block
            font-size 14px
            color #666
            font-weight 400
            padding-bottom 10px
        .info_data_link:nth-of-type(2)
          .info_data_top
            span
              color #ff5f3e
        .info_data_link:nth-of-type(3)
          border 0
          .info_data_top
            span
              color #6ac20b
    .profile_my_order
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .my_order
        display flex
        align-items center
        padding-left 15px
        >span
          display flex
          align-items center
          width 20px
          height 20px
          >.iconfont
            margin-left -10px
            font-size 30px
          .icon-orders
            color #02a774
          .icon-jifen
            color #ff5f3e
          .icon-vip
            color #f90
          .icon-fuwu
            color #02a774
        .my_order_div
          width 100%
          border-bottom 1px solid #f1f1f1
          padding 18px 10px 18px 0
          font-size 16px
          color #333
          display flex
          justify-content space-between
          span
            display block
          .my_order_icon
            width 10px
            height 10px
            .icon-jiantou2
              color #bbb
              font-size 10px
    .profile_my_order_logout
      bottom-border-1px(#e3e3e3)
      font-size 16px
      width 100%
      height 50px
      background-color #fff
</style>