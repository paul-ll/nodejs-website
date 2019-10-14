import fetch from './fetch';

export default {

  // 创建轮播海报
  create(params) {
    return fetch.post('/swiper/add', params);
  },

  // 轮播海报列表
  list(params) {
    return fetch.get('/swiper/list', params)
  },

  // 更新轮播海报
  update(params) {
    return fetch.post('/swiper/update', params)
  },

  // 删除轮播海报
  destroy(id) {
    return fetch.delete('/swiper/del/' + id)
  },

  // 创建快捷菜单
  createMenu(params) {
    return fetch.post('/swiper/menu/add', params);
  },

  // 更新快捷菜单
  updateMenu(params) {
    return fetch.post('/swiper/menu/update', params)
  },

  // 删除快捷菜单
  destroyMenu(id) {
    return fetch.delete('/swiper/menu/del/' + id)
  },

  // 快捷菜单列表
  listMenu(params) {
    return fetch.get('/swiper/menu/list', params)
  },
}
