const moment = require('moment');

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义文章模型
class Category extends Model {

}

// 初始分类模型
Category.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 菜单名称
    title: Sequelize.STRING,
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
    tableName: 'category'
})

module.exports = {
    Category
}
