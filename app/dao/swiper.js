const {Sequelize, Op} = require('sequelize')

const { Swiper, Menu } = require('../models/swiper')

// 定义数据模型
class SwiperDao {

    // 创建轮播海报
    static async addSwiper(v) {
        const hasSwiper = await Swiper.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });
        if (hasSwiper) {
            throw new global.errs.Existing('轮播广告已存在');
        };
        const swiper = new Swiper();
        swiper.title = v.get('body.title');
        swiper.intro = v.get('body.intro');
        swiper.button = v.get('body.button');
        swiper.links = v.get('body.links');
        swiper.hover = v.get('body.hover');
        swiper.target = v.get('body.target');
        swiper.bgimg = v.get('body.bgimg');
        swiper.save();
    }

    // 轮播海报列表
    static async getList() {
        const swiper = await Swiper.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        });
        return swiper;
    }

    //更新轮播海报
    static async updateSwiper(v) {
        // 查询菜单是否存在
        const hasSwiper = await Swiper.findOne({
            where: {
                id: v.get('body.id'),
                deleted_at: null
            }
        });
        if (!hasSwiper) {
            throw new global.errs.Existing('海报不存在');
        };
        hasSwiper.title = v.get('body.title');
        hasSwiper.intro = v.get('body.intro');
        hasSwiper.button = v.get('body.button');
        hasSwiper.links = v.get('body.links');
        hasSwiper.hover = v.get('body.hover');
        hasSwiper.target = v.get('body.target');
        hasSwiper.bgimg = v.get('body.bgimg');
        hasSwiper.save();
    }

    // 删除轮播海报
    static async destroySwiper(id) {
        // 查询菜单是否存在
        const hasSwiper = await Swiper.findOne({
            where: {
                id
            }
        });
        if (!hasSwiper) {
            throw new global.errs.Existing('海报不存在');
        };
        hasSwiper.destroy()
    }

    // 创建快捷菜单
    static async addMenu(v) {
        const hasMenu = await Menu.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });
        if (hasMenu) {
            throw new global.errs.Existing('快捷菜单已存在');
        };
        const menu = new Menu();
        menu.title = v.get('body.title');
        menu.intro = v.get('body.intro');
        menu.links = v.get('body.links');
        menu.target = v.get('body.target');
        menu.save();
    }

    // 轮播海报列表
    static async getMenuList() {
        const menu = await Menu.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        });
        return menu;
    }

    //更新轮播海报
    static async updateMenu(v) {
        // 查询菜单是否存在
        const hasMenu = await Menu.findOne({
            where: {
                id: v.get('body.id'),
                deleted_at: null
            }
        });
        if (!hasMenu) {
            throw new global.errs.Existing('快捷菜单不存在');
        };
        hasMenu.title = v.get('body.title');
        hasMenu.intro = v.get('body.intro');
        hasMenu.links = v.get('body.links');
        hasMenu.target = v.get('body.target');
        hasMenu.save();
    }

    // 删除轮播海报
    static async destroyMenu(id) {
        // 查询菜单是否存在
        const hasMenu = await Menu.findOne({
            where: {
                id
            }
        });
        if (!hasMenu) {
            throw new global.errs.Existing('菜单不存在');
        };
        hasMenu.destroy()
    }

}

module.exports = {
    SwiperDao
}
