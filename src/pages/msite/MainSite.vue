<template>
  <section class="msite">
    <!-- 首页头部 -->
    <!-- <HeaderTop :topTitle="addressName">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="!userinfo ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userinfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop> -->
    <header class="msite_header">
      <router-link to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <span class="header_title">
        <span class="header_title_text ellipsis" @click="getPosition">
          <i class="iconfont icon-dingwei1" v-if="addressName==='定位失败'"></i>
          <i class="iconfont icon-weizhi" v-else-if="addressName!=='定位中...'"></i>
          {{addressName}}
        </span>
      </span>
      <router-link class="header_login" :to="userinfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userinfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </header>
    <!-- 首页导航 -->
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length != 0">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(categorys, index) in categorySplitArr"
                :key="index"
              >
                <a
                  href="javascript:;"
                  class="link_to_food"
                  v-for="(category, index) in categorys"
                  :key="index"
                >
                  <div class="food_container">
                    <img
                      :src="categoryImageBaseUrl + category.image_url"
                      alt="Network Error!"
                    />
                  </div>
                  <span>{{ category.title }}</span>
                </a>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <img
            src="/images/msite_back.svg"
            alt="Network Error!"
            v-else
          />
        </nav>
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-caidan"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList></ShopList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { mapState } from "vuex";
import ShopList from "@/components/shoplist/ShopList";
export default {
  name: "MainSite",
  data() {
    return {
      categoryImageBaseUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: { ShopList },
  methods:{
    getPosition(){
      this.addressName = ''
      navigator.geolocation.getCurrentPosition((position)=>{
        const geo = position.coords;
        this.$store.dispatch("recordGeohash",geo)
        this.$store.dispatch("getAddress")
      },()=>{
        this.addressName = "定位失败"
      })
    }
  },
  mounted() {
    this.$store.dispatch("getFoodCategorys");
    this.$store.dispatch("getShopListByGeo");
  },
  computed: {
    ...mapState(["address", "categorys","userinfo"]),
    addressName: {
      get(){
        return this.address.name === "" || this.address.name === undefined
          ? "定位中..."
          : this.address.name;
      },
      set(newValue){
        this.address.name = newValue
      }
    },
    categorySplitArr() {
      const { categorys } = this;
      const categoryArr = [];
      let minArr = [];
      for (let i = 0; i < categorys.length; i++) {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          categoryArr.push(minArr);
        }
        minArr.push(categorys[i]);
      }
      return categoryArr;
    },
  },
  watch: {
    categorys() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          pagination: ".swiper-pagination",
        })
      })
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite  // 首页
  width 100%
  .msite_header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
    .icon-sousuo
        font-size 25px
        color #fff
    .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 60%
        color #fff
        text-align center
    .header_title_text
        font-size 16px
        color #fff
        display block
    .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
    .header_login_text
        color #fff
  .miste-content-wrapper 
    position fixed
    top 45px
    bottom 46px
    width 100%
    overflow auto
    &-webkit-scrollbar 
      display none
    .msite_nav 
      bottom-border-1px(#e4e4e4)
      margin-top 15px
      height 200px
      background #fff
      .swiper-container 
        width 100%
        height 100%
        .swiper-wrapper 
          width 100%
          height 100%
          .swiper-slide 
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food 
              width 25%
              .food_container 
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img 
                  display inline-block
                  width 50px
                  height 50px
              span 
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination 
          >span.swiper-pagination-bullet-active 
            background #02a774
  .msite_shop_list 
    top-border-1px(#e4e4e4)
    &before 
      height 10px
      transform translateY(-10px)
    margin-top 10px
    background #fff
    .shop_header 
      padding 10px 10px 0
      .shop_icon 
        margin-left 5px
        color #999
      .shop_header_title 
        color #999
        font-size 14px
        line-height 20px
</style>