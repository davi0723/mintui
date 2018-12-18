import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from '../common/cookie.js'
import store from '../store'
// import { bus } from '../bus.js'
// login
const Login = resolve => require(['@/components/Login'], resolve)
// Home
const Home = resolve => require(['@/components/Home'], resolve)
// 房源明细
const Room = resolve => require(['@/components/Room/list'], resolve)
// 图片管理+房型参数修改
const Imagea = resolve => require(['@/components/Imagea'], resolve)
// 首页内容
// const Dashboard = resolve => require(['@/components/Home/Dashboard.vue'], resolve)
const HomeDashboard = resolve => require(['@/components/Home/HomeDashboard.vue'], resolve)
// 订单列表
const Order = resolve => require(['@/components/Order'], resolve)
// 房间状态
const State = resolve => require(['@/components/State'], resolve)
const StateToday = resolve => require(['@/components/State/StateToday.vue'], resolve)
// 酒店列表
const Hotel = resolve => require(['@/components/Hotel'], resolve)
// 房价明细
const PriceDetail = resolve => require(['@/components/Price/PriceDailyMouth.vue'], resolve)
// 房价修改
const PriceFix = resolve => require(['@/components/Price/PricePut.vue'], resolve)
// 房价
const Price = resolve => require(['@/components/Price/Price.vue'], resolve)
// 手动分房
const RoomAssign = resolve => require(['@/components/Room/RoomAssign.vue'], resolve)

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    name: '登录',
    component: Login,
    // leaf: true,
  }, {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    // leaf:false,
    children: [{
      path: '/dashboard',
      component: HomeDashboard,
      name: '首页',
      log: '../../static/011.png',
      log2: '../../static/001.png',
      menuShow: true
    }, {
      path: '/order',
      name: '订单',
      component: Order,
      log: '../../static/013.png',
      log2: '../../static/003.png',
      menuShow: true
    }, {
      path: '/room/:id',
      name: '房源detail',
      props: true,
      // component: RoomStyle,
      component: Room,
      menuShow: false
    }, {
      path: '/roomassign',
      name: '手动分房',
      // props: true,
      // component: RoomStyle,
      component: RoomAssign,
      menuShow: false
    }, {
      path: '/style',
      name: '房型',
      component: Hotel,
      log: '../../static/012.png',
      log2: '../../static/002.png',
      menuShow: true
    }, {
      path: '/price',
      name: '房价',
      component: Price,
      log: '../../static/014.png',
      log2: '../../static/004.png',
      menuShow: true
    }, {
      path: '/state',
      name: '房态',
      component: State,
      log: '../../static/015.png',
      log2: '../../static/005.png',
      menuShow: true
    }, {
      path: '/statetoday',
      name: '今日房态',
      component: StateToday,
      log: '../../static/015.png',
      log2: '../../static/005.png',
      menuShow: true
    }, {
      path: '/price/:id',
      name: '房价明细',
      component: PriceDetail,
      props: true,
      menuShow: false
    }, {
      path: '/pricefix/:id',
      name: '房价修改',
      component: PriceFix,
      props: true,
      menuShow: false
    }, {
      path: '/style/:id',
      name: '房型详情',
      props: true,
      component: Imagea,
      menuShow: false
    }]
  }]
})
router.beforeEach((to, from, next) => {
  console.log('to:' + to.path)
  store.commit('setMenu', (to.path === '/dashboard'))
  if (to.path === '/login') {
    cookie.delCookie('access-1u2s3e4r')
    next()
  } else {
    let loged = cookie.getCookie('access-1u2s3e4r')
    if (!loged) {
      next({ path: '/login' })
    } else {
      // console.log(to.path.split('/').length===2)
      next()
    }
  }
})

export default router
