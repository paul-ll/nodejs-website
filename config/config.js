module.exports = {
    environment: 'dev',
    database: {
        dbName: 'qinqiyun',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root'
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 1小时
        expiresIn: 60 * 60
    },
    wechatKey: {
        appId: 'wx123456789',
        appSecret: '1234567890',
        weChatUrl: 'https://api.weixin.qq.com/cgi-bin/'
    }
}
