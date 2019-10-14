const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义数据模型
class Swiper extends Model {

}
// 初始数据模型
Swiper.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 广告标题
    title: Sequelize.STRING,
    // 简介文字
    intro: Sequelize.STRING,
    // 按钮文字
    button: Sequelize.STRING,
    // 跳转链接
    links: Sequelize.STRING,
    // 背景蒙版
    hover: Sequelize.BOOLEAN,
    // 新标签页打开
    target: Sequelize.BOOLEAN,
    // 背景图片
    bgimg: Sequelize.STRING,
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
    
}, {
    sequelize,
    tableName: 'swiper'
})

// 定义数据模型
class Menu extends Model {

}
// 初始数据模型
Menu.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 菜单标题
    title: Sequelize.STRING,
    // 菜单介绍
    intro: Sequelize.STRING,
    // 跳转链接
    links: Sequelize.STRING,
    // 新标签页打开
    target: Sequelize.BOOLEAN,

    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
    
}, {
    sequelize,
    tableName: 'swipermenu'
})


module.exports = {
    Swiper,
    Menu
}
