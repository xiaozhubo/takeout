<template>
  <section class="msite">
    <!-- 首页头部 -->
    <HeaderTop :topTitle="addressName">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
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
import HeaderTop from "@/components/HeaderTop";
import ShopList from "@/components/shoplist/ShopList";
export default {
  name: "MainSite",
  data() {
    return {
      categoryImageBaseUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: { HeaderTop, ShopList },
  mounted() {
    this.$store.dispatch("getFoodCategorys");
    this.$store.dispatch("getShopListByGeo");
  },
  computed: {
    ...mapState(["address", "categorys"]),
    addressName() {
      return this.address.name === "" || this.address.name === undefined
        ? "定位中..."
        : this.address.name;
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

.msite { // 首页
  width: 100%;

  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 46px;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .msite_nav {
      bottom-border-1px(#e4e4e4);
      margin-top: 15px;
      height: 200px;
      background: #fff;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-wrapper {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;

            .link_to_food {
              width: 25%;

              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;

                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }

              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }

        .swiper-pagination {
          >span.swiper-pagination-bullet-active {
            background: #02a774;
          }
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);

    &::before {
      height: 10px;
      transform: translateY(-10px);
    }

    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>