const {AdminDao} = require('../dao/admin')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
const redis = require("redis");  
const client = redis.createClient(); 

class LoginManager {
    // 管理员登录
    static async adminLogin(username, password) {
        // 验证账号密码是否正确
        const admin = await AdminDao.verifyusernamePassword(username, password);
        return generateToken(admin.id, Auth.ADMIN)
    }

    // 管理员微信登录
    static async adminWxLogin(code) {
        // 登录验证码验证
        const admin = await AdminDao.verifyusernameWxPassword(code);
        return generateToken(admin.id, Auth.ADMIN)
    }
}

module.exports = {
    LoginManager
}