import ajax from "./ajax"

// 1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax("/api/position/" + geohash)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax("/api/index_category")
// 3、根据经纬度获取商铺列表
export const reqShopListByGeo = (longitude, latitude) => ajax("/api/shops",{longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash,keyword) => ajax("/api/search_shops",{geohash,keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax("/api/captcha")
// 6、用户名密码登陆
export const reqLoginByPwd = ({name,pwd,captcha}) => ajax("/api/login_pwd",{name,pwd,captcha},"POST")
// 7、发送短信验证码
export const reqPhoneCode = (phone) => ajax("/api/sendcode",{phone})
// 8、手机号验证码登陆
export const reqLoginByCode = (phone,code) => ajax("/api/login_sms",{phone,code})
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax("/api/userinfo")
// 10、用户登出
export const reqLogout = () => ajax("/api/logout")

// 获取商家信息，暂时使用mockjs截取ajax请求获取数据
export const reqShopInfo = () => ajax("/shopinfo")

// 获取商家食品列表，暂时使用mockjs截取ajax请求获取数据
export const reqShopGoods = () => ajax("/goods")

// 获取商家评价，暂时使用mockjs截取ajax请求获取数据
export const reqShopRatings = () => ajax("/ratings")