const Router = require('koa-router');

const {
    CategoryValidator,
    PositiveIdParamsValidator
} = require('../../validators/category');

const {CategoryDao} = require('../../dao/category');
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 创建菜单
 */
router.post('/category/add', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new CategoryValidator().validate(ctx);
    await CategoryDao.createCategory(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建菜单成功')
})

/**
 * 获取所有菜单
 */
router.get('/category/list', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 获取分类下关联的文章
    const categoryList = await CategoryDao.getCategoryList();

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(categoryList);
})

/**
 * 更新菜单标签页打开状态
 */
router.post('/category/update/target', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    await CategoryDao.updateTarget(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功')
})

/**
 * 更新菜单
 */
router.post('/category/update/info', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new CategoryValidator().validate(ctx);
    await CategoryDao.updateCategory(v);
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新成功')
})

/**
 * 删除菜单
 */
router.delete('/category/del/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);
    // 获取分类ID参数
    const id = v.get('path.id');
    // 删除菜单
    await CategoryDao.destroyCategory(id);
    ctx.response.status = 200;
    ctx.body = res.success('删除菜单成功');
})

module.exports = router
