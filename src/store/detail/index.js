import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid--->生成一个随机的字符串（不能再变）
import { getUUID } from "@/utils/uuid_token.js"
const state = {
  goodInfo: {},
  // 游客的临时身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODINFO (state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息的action
  async getGoodInfo ({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit("GETGOODINFO", result.data)
    }
  },
  // 将产品添加到购物车中，或者修改某一个产品的个数
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的结果
    // 加入购物车以后（发请求），前台将参数带给服务器【需要存储这些数据，存储成功了，没有返回数据】
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    // 因为服务器没有返回其余的数据，因此不需要三连环存储数据，也即不需要仓库存储数据了
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 当前的这个函数执行返回Promise
    // 代表服务器加入购物车成功
    if (result.code == 200) {
      return "ok"
    } else {
      // 加入购物车失败
      return Promise.reject(new Error("fail"))
    }
  }
}
// 简化数据而生
const getters = {
  // 下面的state是当前仓库中的state
  // 路径导航的简化数据
  categoryView (state) {
    // 比如：state.goodInfo初始状态空对象，空对象的categortView属性值为undefined
    // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo (state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
