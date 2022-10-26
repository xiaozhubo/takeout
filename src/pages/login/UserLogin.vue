<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button 
              :disabled="!showVerify" 
              class="get_verification" 
              :class="{showVerify:showVerify}" 
              @click.prevent="getCodeByPhone" 
              v-text="computeTime > 0 ? '已发送' + computeTime + 's' : '获取验证码'"
              >
                <!-- {{computeTime > 0 ? "已发送" + computeTime + "s" : "获取验证码"}} -->
              </button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="6" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              <div class="user_protocol">
                <input type="checkbox" id="agree" value="agree" v-model="agree">
                <label for="agree">同意</label>
                <a href="javascript:;">《用户服务协议》</a>
              </div>
              <div class="user_tips">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册
              </div>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="32"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input v-if="showPwd" type="text" maxlength="16" placeholder="密码" v-model="pwd" />
                <input v-else type="password" maxlength="16" placeholder="密码" v-model="pwd" />
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="6" placeholder="验证码" v-model="captcha" />
                <img
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.go(-1)">
        <i class="iconfont icon-jiantou1"></i>
      </a>
    </div>
    <TipAlert v-show="showAlertTip" :alertText="alertText" @closeTip="closeTip"></TipAlert>
  </section>
</template>

<script>
import {reqLoginByPwd} from "@/api"
import TipAlert from "@/components/TipAlert.vue"
export default {
  name: "UserLogin",
  data(){
    return{
      loginWay: true,//登录方式
      computeTime: 0,
      agree: false,
      showPwd: false,
      phone: "",
      code: "",
      name: "",
      pwd: "",
      captcha: "",
      alertText: "",
      showAlertTip: false,
      getCodeVerifyFlag: false,//是否获取手机验证码
      phoneFlag: "",
    }
  },
  components:{
    TipAlert
  },
  methods:{
    getCodeByPhone(){
      if(!this.computeTime){
        this.phoneFlag = this.phone
        this.computeTime = 10
        this.getCodeVerifyFlag = true
        this.conutDownInterval = setInterval(()=>{
          this.computeTime --
          if(this.computeTime <= 0){
            clearInterval(this.conutDownInterval)
          }
        },1000)
      }
    },
    closeTip(){
      this.showAlertTip = false
      this.alertText = ""
    },
    showAlert(text){
      this.alertText = text
      this.showAlertTip = true
    },
    async login(){
      let result
      if(this.loginWay){
        const {showVerify,phone,code,agree} = this
        if(!showVerify){
          this.showAlert("手机号码不正确！")
        }else if(!this.getCodeVerifyFlag){
          this.showAlert("请先获取验证码！")
        }else if(!/\d{6}/.test(code)){
          this.showAlert("验证码不正确！")
        }else if(!agree){
          this.showAlert("请阅读并同意《用户服务协议》")
        }else{
          phone
        }
      }else{
        const {name,pwd,captcha} = this
        if(!name){
          this.showAlert("账号不能为空！")
        }else if(!pwd){
          this.showAlert("密码不能为空！")
        }else if(!captcha){
          this.showAlert("验证码不正确！")
        }else{
          result = await reqLoginByPwd({name,pwd,captcha})
        }
      }
      if(result){
        if(this.computeTime){
          this.computeTime = 0
          this.getCodeVerifyFlag = false
          clearInterval(this.conutDownInterval)
        }
        if(result.code === 0){
          const userinfo = result.data
          this.$store.dispatch("recordUserInfo",userinfo)
          this.$router.replace("/profile")
        }else{
          this.getCaptcha()
          this.showAlert(result.msg)
        }
      }
    },
    getCaptcha(){
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now()
    }
  },
  computed:{
    showVerify(){
      return /^1\d{10}/.test(this.phone)
    }
  },
  watch:{
    phone(){
      if(this.getCodeVerifyFlag){
        this.getCodeVerifyFlag = false  //获取验证码之后手机号码被修改
      }else if(this.showVerify && this.phone !== this.phoneFlag){//修改后的手机号码与上一次获取验证码时不同
        this.computeTime = 0
      }
    }
  }
};
</script>

<style lang="stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.showVerify
                color: black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
                .switch_circle
                  transform translateX(27px)
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 25px
            .user_protocol
              line-height 30px
              >input
                width 10%
                height 10%
              >label,>a
                position relative
                bottom 2px
            .user_tips
              color #02a774
              margin-left 0.5rem
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 20px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>