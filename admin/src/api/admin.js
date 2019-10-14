import fetch from './fetch';

export default {
  // 登录
  login(params) {
    return fetch.post('/admin/login', params)
  },

  // 微信登录
  wxlogin(params) {
    return fetch.post('/admin/wxlogin', params)
  },

  // 验证管理员token
  auth(params) {
    return fetch.get('/admin/auth', params)
  },

  // 获取微信登录二维码
  qrcode() {
    return fetch.get('/wechat/qrcode')
  }
}
