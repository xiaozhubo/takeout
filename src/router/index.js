import Vue from "vue"
import VueRouter from "vue-router"
import MainSite from "@/pages/msite/MainSite"

Vue.use(VueRouter)

const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return RouterPush.call(this, to).catch(err => err)
}

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            // component: () => import ('@/pages/msite/MainSite'),
            component: MainSite,
            // children:[{
            //     path: 'index',
            //     component: () => import ('@/pages/msite/Msite'),
            // }]
        }
    ]
})