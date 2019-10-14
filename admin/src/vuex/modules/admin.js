import admin from '../../api/admin'
import * as types from '../mutation-types'

const state = {
  adminAuth: null
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.adminAuth = data
  }

}

const actions = {
  // 管理员登录
  async login({state, commit}, params) {
    return admin.login(params);
  },

  // 管理员微信登录
  async wxlogin({state, commit}, params) {
    return admin.wxlogin(params);
  },

  // 获取当前管理员信息
  async auth({state, commit}, params) {
    const res = await admin.auth(params);
    commit('SET_USER_INFO', res.data.data);
    return res;
  },

  // 获取微信登录二维码
  async getQrcode({state, commit}) {
    return admin.qrcode();
  },


}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
