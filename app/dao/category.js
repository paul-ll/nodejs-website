const {Category} = require('../models/category')

class CategoryDao {
    // 创建菜单
    static async createCategory(v) {
        // 查询是否存在重复的菜单
        const hasCategory = await Category.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });
        if (hasCategory) {
            throw new global.errs.Existing('菜单已存在');
        };
        const category = new Category();
        category.title = v.get('body.title');
        category.links = v.get('body.links');
        category.target = v.get('body.target');
        category.save();
    }

    // 菜单列表
    static async getCategoryList() {
        const category = await Category.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        });
        return category;
    }
    
    // 更新菜单标签页打开状态
    static async updateTarget(v) {
        const category = await Category.findOne({
            where: {
                id: v.get('body.id'),
                deleted_at: null
            }
        });
        if (!category) {
            throw new global.errs.Existing('菜单不存在');
        };
        category.target = v.get('body.target');
        category.save();
    }

    //更新菜单
    static async updateCategory(v) {
        // 查询菜单是否存在
        const hasCategory = await Category.findOne({
            where: {
                id: v.get('body.id'),
                deleted_at: null
            }
        });
        if (!hasCategory) {
            throw new global.errs.Existing('菜单不存在');
        };
        hasCategory.title = v.get('body.title');
        hasCategory.links = v.get('body.links');
        hasCategory.target = v.get('body.target');
        hasCategory.save();
    }

    // 删除菜单
    static async destroyCategory(id) {
        // 查询菜单是否存在
        const hasCategory = await Category.findOne({
            where: {
                id
            }
        });
        if (!hasCategory) {
            throw new global.errs.Existing('菜单不存在');
        };
        hasCategory.destroy()
    }


}

module.exports = {
    CategoryDao
}