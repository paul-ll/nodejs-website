const {Sequelize, Op} = require('sequelize')

const { 
    Website,
    Advantage,
    AdvanList
} = require('../models/website')

// 定义数据模型
class WebsiteDao {

    // 保存网站基本信息
    static async saveHeaderInfo(v) {
        const website = await Website.findOne({
            where: {
                id: v.get('body.id')
            }
        });
        website.id = v.get('body.id');
        website.name = v.get('body.name');
        website.keywords = v.get('body.keywords');
        website.description = v.get('body.description');
        website.logo1 = v.get('body.logo1');
        website.logo2 = v.get('body.logo2');
        website.save();
    }

    // 保存网站底部信息
    static async saveFooterInfo(v) {
        const website = await Website.findOne({
            where: {
                id: v.get('body.id')
            }
        });
        website.id = v.get('body.id');
        website.jiajie = v.get('body.jiajie');
        website.copys = v.get('body.copys');
        website.icps = v.get('body.icps');
        website.weibo = v.get('body.weibo');
        website.mail = v.get('body.mail');
        website.foo_logo = v.get('body.foo_logo');
        website.save();
    }

    // 查询网站信息
    static async getWebsiteInfo(id) {
        const scope = 'bh';
        const website = await Website.scope(scope).findOne({
            where: {
                id
            }
        })
        return website
    }

}

class AdvantageDao {

    // 保存&更新特点 
    static async saveAdvantageHeader(v) {
        const hasAdvantage = await Advantage.findOne({
            where: {
                type: v.get('body.type'),
                deleted_at: null
            }
        });
        if (hasAdvantage) {
            hasAdvantage.title = v.get('body.title');
            hasAdvantage.intro = v.get('body.intro');
            hasAdvantage.save();
        } else {
            const advantage = new Advantage();
            advantage.type = v.get('body.type');
            advantage.title = v.get('body.title');
            advantage.intro = v.get('body.intro');
            advantage.save();
        }
    }

    // 获取特点
    static async viewAdvantageHeader(type) {
        const scope = 'bh';
        const advantage = await Advantage.scope(scope).findOne({
            where: {
                type
            }
        });
        return advantage
    }

}

class AdvanListDao {

    // 新增&更新特点列表
    static async saveAdvantageList(v) {
        const hasAdvanList = await AdvanList.findOne({
            where: {
                id: v.get('body.id'),
                deleted_at: null
            }
        });
        if (hasAdvanList) {
            hasAdvanList.title = v.get('body.title');
            hasAdvanList.type = v.get('body.type');
            hasAdvanList.intro = v.get('body.intro');
            hasAdvanList.icon = v.get('body.icon');
            hasAdvanList.image = v.get('body.image');
            hasAdvanList.json_ext = v.get('body.json_ext');
            hasAdvanList.save();
        } else {
            const advanlist = new AdvanList();
            advanlist.title = v.get('body.title');
            advanlist.type = v.get('body.type');
            advanlist.intro = v.get('body.intro');
            advanlist.icon = v.get('body.icon');
            advanlist.image = v.get('body.image');
            advanlist.json_ext = v.get('body.json_ext');
            advanlist.save();
        }
    }

    // 获取特点列表
    static async viewAdvantageList(type) {
        if(type==='anli'){
            const list = await AdvanList.findAndCountAll({
                where: {
                    type,
                    deleted_at: null
                }
            });
            const r = list.rows;
            r.forEach(list => {
                list.json_ext = JSON.parse(list.json_ext);
            });
            return list;
        }else{
            const list = await AdvanList.scope('bh').findAll({
                where: {
                    type,
                    deleted_at: null
                }
            });
            return list;
        }
    }

    // 删除特点列表
    static async destroyAdvantageList(id) {
        // 查询特点是否存在
        const hasAdvanList = await AdvanList.findOne({
            where: {
                id
            }
        });
        if (!hasAdvanList) {
            throw new global.errs.Existing('特点不存在');
        };
        hasAdvanList.destroy()
    }
    

}

module.exports = {
    WebsiteDao,
    AdvantageDao,
    AdvanListDao
}
