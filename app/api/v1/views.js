const Router = require('koa-router');

const { SwiperDao } = require('../../dao/swiper');
const { 
    WebsiteDao,
    AdvantageDao,
    AdvanListDao
} = require('../../dao/website');
const { CategoryDao } = require('../../dao/category');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const router = new Router({
    prefix: '/v2'
})

/**
 * 获取网站信息+导航菜单
 */
router.get('/website/info', async (ctx) => {
    // 获取网站信息
    const webinfo = await WebsiteDao.getWebsiteInfo(1);
    // 获取轮播菜单
    const category = await CategoryDao.getCategoryList();

    const value = {webinfo: webinfo, category: category};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
});

/**
 * 获取轮播广告+轮播菜单
 */
router.get('/banner/list', async (ctx) => {
    // 获取轮播
    const swiperList = await SwiperDao.getList();
    // 获取菜单
    const menuList = await SwiperDao.getMenuList();
    
    const value = {swiperList: swiperList, menuList: menuList};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
})

/**
 * 获取特点标题+特点列表
 */
router.get('/advantage/list', async (ctx) => {
    // 获取特点标题
    const advantage = await AdvantageDao.viewAdvantageHeader('advantage');
    // 获取特点列表
    const advanlist = await AdvanListDao.viewAdvantageList('tedian');
    
    const value = {advantage: advantage, advanlist: advanlist};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
})

/**
 * 获取功能标题+功能列表
 */
router.get('/powerful/list', async (ctx) => {
    // 获取特点标题
    const powerful = await AdvantageDao.viewAdvantageHeader('powerful');
    // 获取特点列表
    const powerlist = await AdvanListDao.viewAdvantageList('gonnen');
    
    const value = {powerful: powerful, powerlist: powerlist};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
})

/**
 * 获取生态标题+生态列表
 */
router.get('/ecology/list', async (ctx) => {
    // 获取特点标题
    const ecology = await AdvantageDao.viewAdvantageHeader('ecology');
    // 获取特点列表
    const ecologylist = await AdvanListDao.viewAdvantageList('shentai');
    
    const value = {ecology: ecology, ecologylist: ecologylist};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
})

/**
 * 获取案例标题+案例列表
 */
router.get('/case/list', async (ctx) => {
    // 获取特点标题
    const cases = await AdvantageDao.viewAdvantageHeader('case');
    // 获取特点列表
    const caselist = await AdvanListDao.viewAdvantageList('anli');
    
    const value = {cases: cases, caselist: caselist};
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(value);
})


module.exports = router
