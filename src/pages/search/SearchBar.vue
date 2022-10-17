<template>
  <section class="search">
    <header class="msite_header">
      <span class="header_title">
        <span class="header_title_text ellipsis">搜索</span>
      </span>
    </header>
    <form class="search_form">
      <input type="search" placeholder="请输入商家名称" class="search_input">
      <input type="submit" class="search_submit" disabled value="搜索">
    </form>
    <section class="list">
      <ul class="list_container">
        <a href="javascript:;" class="list_li">
          <section class="item_left">
            <img src="/images/shop/2.jpg" alt="Sorry,Error!" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>爱心早餐</span>
              </p>
              <p>月售 999 单</p>
              <p>9.9 元起送 / 距离5.20km</p>
            </div>
          </section>
        </a>
        <a href="javascript:;" class="list_li">
          <section class="item_left">
            <img src="/images/shop/2.jpg" alt="Sorry,Error!" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>爱心早餐</span>
              </p>
              <p>月售 999 单</p>
              <p>9.9 元起送 / 距离5.20km</p>
            </div>
          </section>
        </a>
        <a href="javascript:;" class="list_li">
          <section class="item_left">
            <img src="/images/shop/2.jpg" alt="Sorry,Error!" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>爱心早餐</span>
              </p>
              <p>月售 999 单</p>
              <p>9.9 元起送 / 距离5.20km</p>
            </div>
          </section>
        </a>
      </ul>
    </section>
    <!-- <div class="search_none">很抱歉！无搜索结果</div> -->
  </section>
</template>

<script>
export default {
    name: 'SearchBar',
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff
        .list_li
          display: flex
          color: black
          justify-content: center
          padding: 10px
          border-bottom: 1px solid $bc
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>