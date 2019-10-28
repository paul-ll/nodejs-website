const redis = require("redis");  
const request = require('request');
const client = redis.createClient(); 
const { wechatKey } = require('../config/config.js');

const AccessTokenUrl = wechatKey.weChatUrl+'token?grant_type=client_credential&appid='+wechatKey.appId+'&secret='+wechatKey.appSecret;


class wechatApi {

    // 获取微信access_token
    static async _updateAccessToken() {
        return new Promise(function(resolve, reject){
            client.get('WeChatAccessToken',function (err,v) {
                if(v){
                    //如果存在token则直接返回
                    resolve(v)
                }else{
                    //如果不存在token则向微信获取在返回
                    request(AccessTokenUrl,function(error, response, body){
                        if (error) {
                            reject(error);
                        }
                        const p = JSON.parse(body);
                        client.set('WeChatAccessToken', p.access_token);//获取成功写入redis
                        client.expire('WeChatAccessToken', 6000);//给token一个有效期，到了这个时间会自动删除
                        resolve(p.access_token);
                    })
                }
            })
        })
    }

    // 创建微信临时二维码
    static async getWeChatQrcode() {
        const token = await this._updateAccessToken();
        const qrcodeUrl = wechatKey.weChatUrl+'qrcode/create?access_token='+token;
        return new Promise(function(resolve, reject){
            request({
                url: qrcodeUrl,
                method: "POST",
                json: true,
                body: {
                    "expire_seconds": 120, 
                    "action_name": "QR_SCENE", 
                    "action_info": {
                        "scene": {
                            "scene_id": 658801
                        }
                    }
                }
            }, function(error, response, body) {
                if (error) {
                    reject(error);
                }
                resolve(body);
                // https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=
            })
        })
    }

    // 写入微信验证码到redis
    static async setVerifyCode(number, openid) {
        client.set(number, openid);
        client.expire(number, 300);//5分钟有效
    }

    // 获取微信验证码
    static async getVerifyCode(verify) {
        return new Promise(function(resolve, reject){
            client.get(verify,function (err,v) {
                if(v){
                    resolve(v)
                }else{
                    resolve()
                }
            })
        })
    }

    // 删除微信验证码
    static async delVerifyCode(verify) {
        client.del(verify)
    }

}



module.exports = {
    wechatApi
}
