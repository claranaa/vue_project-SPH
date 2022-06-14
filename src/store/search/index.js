import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
  // 仓库初始状态
  searchList: {}
}
const mutations = {
  GETSEARCHLIST (state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取Search模块的数据
  async getSearchList ({ commit }, params = {}) {
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data)
    }
  }
}
// 计算属性：在项目当中，为了简化仓库中的数据
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  // 当前形参state是当前仓库中的state，并非大仓库中的state
  goodsList (state) {
    // 这样写是有问题的，当没网时searchList是一个空对象，没有goodList等属性
    // state.searchList.goodList它的前提是服务器的数据已经回来了，如果服务器数据回来了，则没问题，它是一个数组
    // 假如网络不给力|没有网，state.searchList.goodList返回的是undefined
    // 计算新的属性的属性值至少给一个数组，以防万一
    return state.searchList.goodsList || []
  },
  trademarkList (state) {
    return state.searchList.trademarkList
  },
  attrsList (state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
