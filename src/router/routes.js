// 引入路由组件
import Home from "@/pages/Home/index.vue"
import Search from "@/pages/Search/index.vue"
import Login from "@/pages/Login/index.vue"
import Register from "@/pages/Register/index.vue"
import Detail from "@/pages/Detail/index.vue"
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue"

// 路由配置信息
export default [
  {
    // 路径的前面需要有/(不是二级路由)
    // 路径中单词都是小写的
    // component右侧v别加单引号
    path: "/home",
    component: Home,
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
  // 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
  {
    path: "/",
    redirect: "/home"
  }
]
