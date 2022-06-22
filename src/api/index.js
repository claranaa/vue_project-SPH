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

// 获取搜索模块数据 地址：/api/list 请求方式：post，需要带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */

// 当前这个函数需不需要接受外部传递的参数
// 当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数【至少是一个空对象】
/* export const reqGetSearchInfo = params => {
  return requests({
    url: "/list",
    method: "post",
    data: params
  })
} */
export const reqGetSearchInfo = params => requests({ url: "/list", method: "post", data: params })

// 获取产品详情信息的接口 URL:/api/item/{ skuId } GET
export const reqGoodsInfo = skuId => requests({ url: `/item/${skuId}`, method: "get" })
