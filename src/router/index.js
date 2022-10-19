import Vue from "vue"
import VueRouter from "vue-router"
import MainSite from "@/pages/msite/MainSite"
import SearchBar from "@/pages/search/SearchBar"
import UserOrder from "@/pages/order/UserOrder"
import UserProfile from "@/pages/profile/UserProfile"
import UserLogin from "@/pages/login/UserLogin"

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
            component: MainSite
            // children:[{
            //     path: 'index',
            //     component: () => import ('@/pages/msite/Msite'),
            // }]
        },
        {
            path:'/search',
            component: SearchBar
        },
        {
            path:'/order',
            component: UserOrder
        },
        {
            path:'/profile',
            component: UserProfile
        },
        {
            path:'/login',
            component: UserLogin
        }
    ]
})