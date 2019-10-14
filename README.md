# 第一个Node.js实战项目
前台仿知晓云官网，后台服务端用Lin-Koa-CMS，后台前端用iView。涉及到的技术栈有：

 - Node.js【服务端】
 - MySQL【服务端】
 - Koa2【服务端】
 - Sequelize【服务端】
 - redis【服务端】
 - Vue.js【后台前端】
 - UNIAPP【前台网站】

> 临时演示(指不定哪天就关了）
> 
> 前台：http://test.maliapi.cn/
>
> 后台(账号密码暂不提供）：http://api.aogonew.maliapi.cn/login
 
## 为什么用Node.js
 - 门槛低(至少我觉得比PHP简单不少）
 - 性能高(支持非阻塞I/O模型，能够处理大量的服务器请求)
 - 部署简单(使用npm安装node模块就可以轻松集成到程序中)
 - 后端的“JavaScript”(假如你和我一样是前端，那么开发Node基本就不会有什么问题)
 
## 项目包含的功能
 - Koa2服务端
    - 网站信息管理
    - 轮播海报管理
    - 板块案例管理
    - 微信公众号扫码登录
 - iView管理后台
 - UNIAPP企业官网

## 使用和学习
 - 服务端部分【根目录】
    - 先登录MySQL创建 qinqiyun 数据库；
    - 修改 config/config.js 配置信息，在里面填写你的数据库连接信息；
    - 如果需要微信扫码登录后台还需要填写 微信appid/appSecret；
    - npm install
    - npm run dev（URL：http://localhost:8080/）
    - 服务器部署用PM2（建议用宝塔，傻瓜式操作）

 - 后台前端部分【admin目录】
    - 修改 admin/src/libs/util.js 域名连接信息和标题信息；
    - 修改 admin/src/libs/upload-token.js 七牛存储密钥信息；
    - npm install 
    - npm run dev（URL：http://localhost:8083/）
    - npm run build

 - 前台官网部分【website目录】
    - 下载 [HBuilderX][1] IDE；
    - 导入官网部分目录；
    - 修改里面的request URL地址；
    - 运行或者发布到H5网站手机版；

## 项目参考的资料

 - [Lin CMS][2]
 - [BO BLOG][3]
 - [iView][4]
 - [uni-app][5]

 


  [1]: https://www.dcloud.io/hbuilderx.html
  [2]: http://doc.cms.7yue.pro/
  [3]: https://github.com/liangfengbo/nodejs-koa-blog
  [4]: https://www.iviewui.com/
  [5]: https://uniapp.dcloud.io/