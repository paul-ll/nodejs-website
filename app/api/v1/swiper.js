const Router = require('koa-router');

const { 
    addSwiperBanner,
    addSwiperMenu,
    PositiveIdParamsValidator
} = require('../../validators/swiper');

const {Auth} = require('../../../middlewares/auth');
const { SwiperDao } = require('../../dao/swiper');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 新增轮播广告
 */
router.post('/swiper/add', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new addSwiperBanner().validate(ctx);
    // 更新基本信息
    await SwiperDao.addSwiper(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('新增海报成功');
});

/**
 * 获取所有轮播广告
 */
router.get('/swiper/list', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 获取分类下关联的文章
    const swiperList = await SwiperDao.getList();
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(swiperList);
})

/**
 * 更新轮播海报
 */
router.post('/swiper/update', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new addSwiperBanner().validate(ctx);
    await SwiperDao.updateSwiper(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功')
})

/**
 * 删除轮播海报
 */
router.delete('/swiper/del/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    // 获取分类ID参数
    const id = v.get('path.id');
    // 删除菜单
    await SwiperDao.destroySwiper(id);
    ctx.response.status = 200;
    ctx.body = res.success('删除海报成功');
})

/**
 * 新增快捷菜单
 */
router.post('/swiper/menu/add', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new addSwiperMenu().validate(ctx);
    // 更新基本信息
    await SwiperDao.addMenu(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('新增菜单成功');
});

/**
 * 获取所有快捷菜单
 */
router.get('/swiper/menu/list', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 获取分类下关联的文章
    const menuList = await SwiperDao.getMenuList();
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(menuList);
})

/**
 * 更新快捷菜单
 */
router.post('/swiper/menu/update', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new addSwiperMenu().validate(ctx);
    await SwiperDao.updateMenu(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功')
})

/**
 * 删除快捷菜单
 */
router.delete('/swiper/menu/del/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    // 获取分类ID参数
    const id = v.get('path.id');
    // 删除菜单
    await SwiperDao.destroyMenu(id);
    ctx.response.status = 200;
    ctx.body = res.success('删除菜单成功');
})

module.exports = router
