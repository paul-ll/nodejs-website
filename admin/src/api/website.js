import fetch from './fetch';

export default {

  // 保存网站基本信息
  saveHeader(params) {
    return fetch.post('/save/website/header', params);
  },

  // 保存网站底部信息
  saveFooter(params) {
    return fetch.post('/save/website/footer', params);
  },

  //查询网站底部信息
  viewWebsite() {
    return fetch.get('/view/website/info');
  },
  
  // 保存&更新特点
  saveAdHeader(params) {
    return fetch.post('/save/advantage/header', params);
  },

  // 获取特点信息
  viewAdHeader(type) {
    return fetch.get('/view/advantage/header/' + type);
  },

  // 新增特点列表
  saveAdList(params) {
    return fetch.post('/save/advantage/list', params);
  },

  // 获取特点列表
  viewAdList(type) {
    return fetch.get('/view/advantage/list/' + type);
  },

  // 删除特点列表
  destroyAdList(id) {
    return fetch.delete('/del/advantage/list/' + id)
  },
}
