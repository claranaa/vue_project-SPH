//配置路由的地方
import Vue from "vue"
import VueRouter from "vue-router"

import routes from "./routes"
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from "@/store"

// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace方法
// 第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call与apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行时传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call与apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行时传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 对外暴露VueRouter类的实例
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 滚动条始终滚动到顶部
    // 返回的这个y=0，代表的滚动条在最上方
    // return { top: 0 }
    return { y: 0 }
  }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断，能跳还是不能跳）
router.beforeEach(async (to, from, next) => {
  // to: 可以获取到你要跳转到哪个路由
  // from: 可以获取到你从哪个路由而来的信息
  // next: 放行函数  next()放行 next('/login') 放行到指定的路由中 next(false)中断当前的导航，重置到from路由对应的地址
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // 用户已经登录了
  if (token) {
    // 还想去login[不能去，要停留在首页],按产品需求注册也不能去了
    if (to.path == "/login" || to.path == "/register") {
      next("/")
      // console.log("1")
    } else {
      // 登录了，去的不是login【home|search|detail|shopcart】
      if (name) {
        // 登陆了且有用户信息才放行
        next()
        // console.log("2")
      } else {
        // 登录了，但是没有用户信息，需要在路由跳转之前获取用户信息，派发action，让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo")
          next()
          // console.log("3")
        } catch (error) {
          //token失效了获取不到用户的信息，需要重新登录
          // 清除token
          await store.dispatch("userLogout")
          // 退出登录后重新登录，让服务器发送新的token
          next("/login")
        }
      }
    }
  } else {
    // 未登录暂时没有处理完毕
    next()
    // console.log("4")
  }
})

export default router
