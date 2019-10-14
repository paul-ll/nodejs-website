import website from '../../api/website'

const state = {}
const mutations = {}
const actions = {

  //保存网站基本信息
  async getSaveWebSiteHeader({state, commit}, params) {
    return website.saveHeader(params);
  },

  //保存网站底部信息
  async getSaveWebSiteFooter({state, commit}, params) {
    return website.saveFooter(params);
  },

   //获取网站信息
   async getWebsiteInfo({state, commit}) {
    return website.viewWebsite();
  },

  // 保存&更新特点
  async getCreateAdHeader({state, commit}, params) {
    return website.saveAdHeader(params);
  },

  // 获取特点信息
  async viewCreateAdHeader({state, commit}, type) {
    return website.viewAdHeader(type);
  },

  //新增特点列表
  async getCreateAdList({state, commit}, params) {
    return website.saveAdList(params);
  },

  //获取特点列表
  async viewCreateAdList({state, commit}, type) {
    return website.viewAdList(type);
  },

  //删除特点列表
  async destroyAdList({state, commit}, id) {
    return website.destroyAdList(id);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
