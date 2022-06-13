// 当前这个模块：API进行统一管理
import requests from "./requests"
import mockRequests from "./mockRequests"

// 三级联动接口
// /api/product/getBaseCategoryList   get  无参数

// 获取三级菜单数据
export const reqCategoryList = () => {
  // 发请求:axios发请求返回结果Promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" })
}

// 获取banner (Home首页轮播图的接口)
export const reqGetBannerList = () => {
  return mockRequests.get("/banner")
}

// 获取floor数据
export const reqFloorList = () => {
  return mockRequests.get("/floor")
}
