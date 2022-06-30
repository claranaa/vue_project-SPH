// 引入路由组件
// import Home from "@/pages/Home/index.vue"
import Search from "@/pages/Search/index.vue"
import Login from "@/pages/Login/index.vue"
import Register from "@/pages/Register/index.vue"
import Detail from "@/pages/Detail/index.vue"
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue"
import ShopCart from "@/pages/ShopCart/index.vue"
import Trade from "@/pages/Trade/index.vue"
import Pay from "@/pages/Pay/index.vue"
import PaySuccess from "@/pages/PaySuccess/index.vue"
import Center from "@/pages/Center/index.vue"
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder/index.vue"
import GroupOrder from "@/pages/Center/groupOrder/index.vue"

/* const foo = () => {
  console.log(111111)
  return import("@/pages/Home")
} */

// 路由配置信息
export default [
  {
    // 路径的前面需要有/(不是二级路由)
    // 路径中单词都是小写的
    // component右侧v别加单引号
    path: "/home",
    // component: Home,
    // component: foo,
    component: () => import("@/pages/Home"),
    meta: { show: true }
  },
  {
    path: "/search/:keywords?",
    component: Search,
    meta: { show: true },
    name: "search",
    // 路由组件能不能传递props数据？
    // 布尔值写法
    // props: true
    // 对象写法
    // props: { a: 1, b: 2 }
    // 函数写法：params参数、query参数，通过props传递给路由组件
    props: $route => {
      return { keywords: $route.params.keywords, k: $route.query.k }
    }
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false }
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false }
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true }
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true }
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path == "/shopcart") {
        next()
      } else {
        // 从其他的路由组件而来，停留在当前
        next(false)
      }
    }
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true }
  },
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: MyOrder
      },
      {
        path: "grouporder",
        component: GroupOrder
      },
      {
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },
  // 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
  {
    path: "/",
    redirect: "/home"
  }
]
