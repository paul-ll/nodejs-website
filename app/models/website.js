const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义数据模型
class Website extends Model {

}
// 初始数据模型
Website.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 网站名称
    name: Sequelize.STRING,
    // 网站关键字
    keywords: Sequelize.STRING,
    // 网站说明
    description: Sequelize.STRING,
    // 默认Logo
    logo1: Sequelize.STRING,
    // 浮动Logo
    logo2: Sequelize.STRING,
    // 网站简介
    jiajie: Sequelize.STRING,
    // 版权信息
    copys: Sequelize.STRING,
    // 备案信息
    icps: Sequelize.STRING,
    // 新浪微博
    weibo: Sequelize.STRING,
    // 电子邮箱
    mail: Sequelize.STRING,
    // 底部Logo
    foo_logo: Sequelize.STRING,

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
    tableName: 'website'
})


// 定义数据模型
class Advantage extends Model {

}
// 初始数据模型
Advantage.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 板块ID
    type: Sequelize.STRING,
    // 板块标题
    title: Sequelize.STRING,
    // 板块简介
    intro: Sequelize.STRING,

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
    tableName: 'advantage'
})

// 定义数据模型
class AdvanList extends Model {

}
// 初始数据模型
AdvanList.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 特点标题
    title: Sequelize.STRING,
    // 特点类型
    type: Sequelize.STRING,
    // 特点说明
    intro: Sequelize.STRING,
    // Icon图标
    icon: Sequelize.STRING,
    // 特点图片
    image: Sequelize.STRING,
    // JSON备注
    json_ext: Sequelize.JSON,

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
    tableName: 'tedianlist'
})

module.exports = {
    Website,
    Advantage,
    AdvanList
}
