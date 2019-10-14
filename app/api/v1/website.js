const Router = require('koa-router');

const { 
    websiteHeader,
    websiteFooter,
    advantageHeader,
    PositiveIdParamsValidator,
    PositiveIdParamsValidatorNumber,
    advantageList
} = require('../../validators/website');

const {Auth} = require('../../../middlewares/auth');
const { 
    WebsiteDao,
    AdvantageDao,
    AdvanListDao
} = require('../../dao/website');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 保存网站基本信息
 */
router.post('/save/website/header', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new websiteHeader().validate(ctx);
    // 更新基本信息
    await WebsiteDao.saveHeaderInfo(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('基本信息更新成功');
});

/**
 * 保存网站底部信息
 */
router.post('/save/website/footer', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new websiteFooter().validate(ctx);
    // 更新基本信息
    await WebsiteDao.saveFooterInfo(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('底部信息更新成功');
});

/**
 * 查询网站信息
 */
router.get('/view/website/info', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 网站基本信息ID
    const id = 1;
    // 查询基本信息
    let info = await WebsiteDao.getWebsiteInfo(id);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(info);
});

/**
 * 保存&更新特点
 */
router.post('/save/advantage/header', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new advantageHeader().validate(ctx);
    // 更新基本信息
    await AdvantageDao.saveAdvantageHeader(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功');
});

/**
 * 获取特点
 */
router.get('/view/advantage/header/:type', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    const type = v.get('path.type');
    const advantage = await AdvantageDao.viewAdvantageHeader(type);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(advantage);
})

/**
 * 新增特点列表
 */
router.post('/save/advantage/list', new Auth(AUTH_ADMIN).m, async (ctx) => {//
    // 通过验证器校验参数是否通过
    const v = await new advantageList().validate(ctx);
    // 更新基本信息
    await AdvanListDao.saveAdvantageList(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功');
});

/**
 * 获取特点列表
 */
router.get('/view/advantage/list/:type', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    const type = v.get('path.type');
    // 查询列表
    let info = await AdvanListDao.viewAdvantageList(type);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(info);
});

/**
 * 删除特点列表
 */
router.delete('/del/advantage/list/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    console.log('----------------',ctx)
    const v = await new PositiveIdParamsValidatorNumber().validate(ctx);
    // 获取分类ID参数
    const id = v.get('path.id');
    // 删除菜单
    await AdvanListDao.destroyAdvantageList(id);
    ctx.response.status = 200;
    ctx.body = res.success('删除特点成功');
})

module.exports = router
