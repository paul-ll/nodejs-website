/**
 * 管理员菜单
 * @type {*[]}
 */

  // 查看菜单列表
const menus = [
    {
      name: "首页",
      path: "/",
      icon: "ios-navigate"
    },
    /*
    // 系统管理
    {
      name: "系统管理",
      path: "set",
      icon: "ios-cog",
      children: [
        {
          icon: "md-contacts",
          name: "管理员管理",
          path: "/admin"
        }
      ]
    },
    {
      name: "分类管理",
      path: "category",
      icon: "md-move",
      children: [
        {
          name: "分类列表",
          path: "/category",
          icon: "md-list"
        },
        {
          name: "分类创建",
          path: "/category/create",
          icon: "md-add-circle"
        }
      ]
    },
    {
      name: "文章管理",
      path: "article",
      icon: "md-list-box",
      children: [
        {
          name: "文章列表",
          path: "/article",
          icon: "md-list"
        },
        {
          name: "文章创建",
          path: "/article/create",
          icon: "md-add-circle"
        }
      ]
    },
    {
      name: "评论管理",
      path: "comments",
      icon: "md-text",
      children: [
        {
          name: "评论列表",
          path: "/comments",
          icon: "md-list"
        }
      ]
    },
    */
    // 轻企云官网管理菜单
    {
      name: "网站设置",
      path: "website",
      icon: "ios-construct-outline",
      children: [
        {
          name: "基本信息",
          path: "/website/header",
          icon: "ios-share-outline"
        },
        {
          name: "底部信息",
          path: "/website/footer",
          icon: "ios-download-outline"
        },
        {
          name: "导航菜单",
          path: "/website/category",
          icon: "ios-list"
        }
      ]
    },
    {
      name: "轮播设置",
      path: "swiper",
      icon: "ios-aperture-outline",
      children: [
        {
          name: "轮播广告",
          path: "/swiper/list",
          icon: "ios-browsers-outline"
        },
        {
          name: "快捷菜单",
          path: "/swiper/menu",
          icon: "ios-code-working"
        }
      ]
    },
    {
      name: "板块设置",
      path: "plate",
      icon: "ios-grid-outline",
      children: [
        {
          name: "特点介绍",
          path: "/plate/advantage",
          icon: "ios-bulb-outline"
        },
        {
          name: "功能介绍",
          path: "/plate/powerful",
          icon: "ios-infinite-outline"
        },
        {
          name: "生态介绍",
          path: "/plate/ecology",
          icon: "ios-planet-outline"
        },
        {
          name: "案例展示",
          path: "/plate/case",
          icon: "ios-trophy-outline"
        }
      ]
    }

  ];

export {menus};
