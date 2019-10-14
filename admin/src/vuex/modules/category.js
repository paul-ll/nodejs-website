import category from '../../api/category'

const state = {}
const mutations = {}
const actions = {

  // 创建菜单
  async addCaterory({state, commit}, params) {
    return category.create(params);
  },

  // 获取菜单列表
  async getCategoryList({state, commit}, params) {
    return category.list(params);
  },

  // 更新菜单标签页打开状态
  async updateCateroryTarget({state, commit}, params) {
    return category.target(params);
  },

  // 更新菜单
  async updateCaterory({state, commit}, params) {
    return category.update(params);
  },

  // 删除菜单
  async destroyCategory({state, commit}, id) {
    return category.destroy(id);
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
