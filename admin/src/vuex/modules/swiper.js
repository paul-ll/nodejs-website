import swiper from '../../api/swiper'

const state = {}
const mutations = {}
const actions = {

  // 创建轮播海报
  async addSwiperBanner({state, commit}, params) {
    return swiper.create(params);
  },

  // 获取轮播海报列表
  async getSwiperList({state, commit}, params) {
    return swiper.list(params);
  },

  // 更新轮播海报
  async updateSwiperBanner({state, commit}, params) {
    return swiper.update(params);
  },

  // 删除轮播海报
  async destroySwiperBanner({state, commit}, params) {
    return swiper.destroy(params);
  },
  
  // 创建快捷菜单
  async addSwiperMenu({state, commit}, params) {
    return swiper.createMenu(params);
  },

  // 更新快捷菜单
  async updateSwiperMenu({state, commit}, params) {
    return swiper.updateMenu(params);
  },

  // 获取快捷菜单列表
  async getSwiperMenuList({state, commit}, params) {
    return swiper.listMenu(params);
  },

  // 删除快捷菜单
  async destroySwiperMenu({state, commit}, params) {
    return swiper.destroyMenu(params);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
