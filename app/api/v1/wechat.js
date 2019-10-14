const url = require('url');
const crypto = require('crypto');
const Router = require('koa-router');
const getRawBody = require('raw-body');
const parser = require('xml2json');

const { AdminDao } = require('../../dao/admin');
const { wechatApi } = require('../../../core/wechatapi');
const {Resolve} = require('../../lib/helper');
const res = new Resolve();


const router = new Router({
    prefix: '/v1'
})

/**
 * 获取微信二维码
 */
router.get('/wechat/qrcode', async (ctx) => {
    const v = await wechatApi.getWeChatQrcode();
    ctx.response.status = 200;
    ctx.body = res.json(v);
});

/**
 * 微信Token回调
 */
router.get('/wechat/token', async (ctx) => {
    const query = url.parse(ctx.url,true).query;
    const signature = query.signature;
	const timestamp = query.timestamp;
	const nonce = query.nonce;
    const echostr = query.echostr;
    if(check(timestamp,nonce,signature,"RJPpNZMDSHvzcZ2X")){
		ctx.body = echostr;
	}else{
        throw new global.errs.Existing('It is not from weixin');
	}
});

/**
 * 接收微信的回调信息
 */
router.post('/wechat/token', async (ctx) => {
	//const query = url.parse(ctx.url,true).query;
	//ctx.body = query.openid;
	const xml = await getRawBody(ctx.req, {
	 	length: ctx.request.length,
	 	limit: '1mb',
	 	encoding: ctx.request.charset || 'utf-8'
	});
	const json = JSON.parse(parser.toJson(xml))
	if(json.xml.Event==='SCAN') {
		// 如果是登录轻企云的扫码事件
		if(json.xml.EventKey==='658801'){
			const time = new Date().getTime().toString();
			const number = time.substr(9,13);
			const admin = await AdminDao.getAdminOpenId(json.xml.FromUserName, number);
			if(!admin){
				 var xmlContent = "<xml>";
		            xmlContent += "<ToUserName><![CDATA["+ json.xml.FromUserName +"]]></ToUserName>";
		            xmlContent += "<FromUserName><![CDATA[gh_7f4da58b5cf7]]></FromUserName>";
		            xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
		            xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
		            xmlContent += "<Content><![CDATA[用户未授权，请联系管理员]]></Content>";
		            xmlContent += "</xml>";
			}else{
				wechatApi.setVerifyCode(number, json.xml.FromUserName)
				var xmlContent = "<xml>";
		            xmlContent += "<ToUserName><![CDATA["+ json.xml.FromUserName +"]]></ToUserName>";
		            xmlContent += "<FromUserName><![CDATA[gh_7f4da58b5cf7]]></FromUserName>";
		            xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
		            xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
		            xmlContent += "<Content><![CDATA[您的登录验证码是:"+ number +"，5分钟内有效]]></Content>";
		            xmlContent += "</xml>";
			}
			ctx.body = xmlContent;
			ctx.set('Content-Type', 'application/xml');
		    ctx.type = 'application/xml';
		    ctx.response.status = 200;
		}else{
			ctx.body = 'success';
			ctx.response.status = 200;
		}
	}else{
		ctx.body = 'success';
		ctx.response.status = 200;
	}
    
});

function check(timestamp,nonce,signature,token){
	var currSign,tmp;
	tmp = [token,timestamp,nonce].sort().join("");
	currSign = crypto.createHash("sha1").update(tmp).digest("hex");
	return (currSign === signature);  
};

module.exports = router