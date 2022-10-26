import Vue from "vue"
import VueRouter from "vue-router"
import MainSite from "@/pages/msite/MainSite"
import SearchBar from "@/pages/search/SearchBar"
import UserOrder from "@/pages/order/UserOrder"
import UserProfile from "@/pages/profile/UserProfile"
import UserLogin from "@/pages/login/UserLogin"
import ShopIndex from "@/pages/shop/ShopIndex"

Vue.use(VueRouter)

const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return RouterPush.call(this, to).catch(err => err)
}

export default new VueRouter({
    mode: 'history',
    routes: [{
            path:'/',
            redirect: '/msite'
        },
        {
            path:'/msite',
            // component: () => import ('@/pages/msite/MainSite'),
            component: MainSite,
            meta:{
                showFooter: true
            }
            // children:[{
            //     path: 'index',
            //     component: () => import ('@/pages/msite/Msite'),
            // }]
        },
        {
            path:'/search',
            component: SearchBar,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/order',
            component: UserOrder,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/profile',
            component: UserProfile,
            meta:{
                showFooter: true
            }
        },
        {
            path:'/login',
            component: UserLogin
        },
        {
            path:'/shopindex',
            component: ShopIndex
        }
    ]
})