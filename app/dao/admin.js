const {Admin} = require('../models/admin')
const bcrypt = require('bcryptjs')
const { wechatApi } = require('../../core/wechatapi');

// data access object
class AdminDao {
    // 创建用管理员
    static async createAdmin(v) {
        const hasAdmin = await Admin.findOne({
            where: {
                username: v.get('body.username'),
                deleted_at: null
            }
        });

        if (hasAdmin) {
            throw new global.errs.Existing('管理员已存在');
        }

        const admin = new Admin();
        admin.username = v.get('body.username');
        admin.password = v.get('body.password2');
        admin.nickname = v.get('body.nickname');

        admin.save();
    }

    // 验证密码
    static async verifyusernamePassword(username, plainPassword) {
        // 查询用户是否存在
        const admin = await Admin.findOne({
            where: {
                username
            }
        })

        if (!admin) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        // 验证密码是否正确
        const correct = bcrypt.compareSync(plainPassword, admin.password);

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return admin
    }

    // 验证微信验证码
    static async verifyusernameWxPassword(verify) {
        const openid = await wechatApi.getVerifyCode(verify);
        if(openid){
            // 查询用户是否存在
            const admin = await Admin.findOne({
                where: {
                    openid
                }
            })
            if (!admin) {
                throw new global.errs.AuthFailed('用户未授权')
            }
            wechatApi.delVerifyCode(verify)
            return admin
        }else{
            throw new global.errs.AuthFailed('验证码已失效')
        }
    }

    // 查询管理员信息
    static async getAdminInfo(id) {
        const scope = 'bh';
        // 查询管理员是否存在
        const admin = await Admin.scope(scope).findOne({
            where: {
                id
            }
        })

        if (!admin) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        return admin
    }

    // 查询用户openID
    static async getAdminOpenId(openid, number) {
    	const scope = 'bh';
        const admin = await Admin.scope(scope).findOne({
            where: {
                openid
            }
        })
        if(admin){
	        return admin
        }
        
    }
}

module.exports = {
    AdminDao
}