const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [
      {
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {module: "/", title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },
      /*
      //todo: 管理员
      {
        path: 'admin',
        name: 'admin',
        meta: {module: "/admin", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },
      */
     
      //轻企云菜单
      {
        path: '/website/header',
        name: '/website/header',
        meta: {module: "/website/header", group: "website", title: '网站 - 基本信息'},
        component: (resolve) => require(['../views/website/header.vue'], resolve),
      },
      {
        path: '/website/footer',
        name: '/website/footer',
        meta: {module: "/website/footer", group: "website", title: '网站 - 底部信息'},
        component: (resolve) => require(['../views/website/footer.vue'], resolve),
      },
      {
        path: '/website/category',
        name: '/website/category',
        meta: {module: "/website/category", group: "website", title: '网站 - 导航菜单'},
        component: (resolve) => require(['../views/website/category.vue'], resolve),
      },
      {
        path: '/swiper/list',
        name: '/swiper/list',
        meta: {module: "/swiper/list", group: "swiper", title: '轮播 - 轮播广告'},
        component: (resolve) => require(['../views/swiper/list.vue'], resolve),
      },
      {
        path: '/swiper/menu',
        name: '/swiper/menu',
        meta: {module: "/swiper/menu", group: "swiper", title: '轮播 - 快捷菜单'},
        component: (resolve) => require(['../views/swiper/menu.vue'], resolve),
      },
      {
        path: '/plate/advantage',
        name: '/plate/advantage',
        meta: {module: "/plate/advantage", group: "plate", title: '板块 - 特点介绍'},
        component: (resolve) => require(['../views/plate/advantage.vue'], resolve),
      },
      {
        path: '/plate/powerful',
        name: '/plate/powerful',
        meta: {module: "/plate/powerful", group: "plate", title: '板块 - 功能介绍'},
        component: (resolve) => require(['../views/plate/powerful.vue'], resolve),
      },
      {
        path: '/plate/ecology',
        name: '/plate/ecology',
        meta: {module: "/plate/ecology", group: "plate", title: '板块 - 生态介绍'},
        component: (resolve) => require(['../views/plate/ecology.vue'], resolve),
      },
      {
        path: '/plate/case',
        name: '/plate/case',
        meta: {module: "/plate/case", group: "plate", title: '板块 - 案例展示'},
        component: (resolve) => require(['../views/plate/case.vue'], resolve),
      },


      {
        //todo: 404
        path: '/403',
        name: '403',
        meta: {module: "/", title: '403 - 权限不足'},
        component(resolve) {
          require(['../views/403.vue'], resolve);
        }
      },
      {
        //todo: 404
        path: '*',
        name: '404',
        meta: {module: "/", title: '404 - 页面不存在'},
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
