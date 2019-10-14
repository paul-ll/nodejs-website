import fetch from './fetch';

export default {

  // 创建分类
  create(params) {
    return fetch.post('/category/add', params);
  },

  // 获取菜单列表
  list(params) {
    return fetch.get('/category/list', params)
  },

  // 更新菜单标签页打开状态
  target(params) {
    return fetch.post('/category/update/target', params)
  },

  // 更新菜单
  update(params) {
    return fetch.post('/category/update/info', params);
  },

  // 删除分类
  destroy(id) {
    return fetch.delete('/category/del/' + id)
  },

}
