<template>
	<view class="content">
		<view class="headeBox" :class="scrollTop?'lightBox':''">
			<view class="left">
				<image v-if="!scrollTop" mode="widthFix" :src="webSiteInfo.logo1"></image>
				<image v-else mode="widthFix" :src="webSiteInfo.logo2"></image>
			</view>
			<view class="nav">
				<a v-for="(item, index) in category" :key="index" :href="item.links" :target="item.target?'_blank':'_self'">
					<view class="item">{{item.title}}</view>
				</a>
			</view>
			<view class="right">
				<view class="button">注册</view>
				<view class="button active">登录</view>
			</view>
		</view>
		<view class="bannerBox">
			<view class="header"></view>
			<swiper :current="current" interval="10000" @change="swiperChange" autoplay circular>
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<view class="item" :style="'background-image: url('+item.bgimg+');'">
						<view v-if="item.hover" class="mask"></view>
						<view class="title">{{item.title}}</view>
						<view class="intro">{{item.intro}}</view>
						<a :href="item.links" :target="item.target?'_blank':'_self'">
							<view class="btnnm">{{item.button}}</view>
						</a>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item, index) in swiperList" :key="index" @click="selectSwiper(index)" class="dot"><text :class="index==current?'active':''"></text></view>
			</view>
			<view class="menu">
				<a :href="item.links" :target="item.target?'_blank':'_self'" v-for="(item, index) in swiperMenu" :key="index" class="list">
					<view class="title">{{item.title}}</view>
					<view class="button">{{item.intro}}</view>
				</a>
			</view>
		</view>
		<view id="advantage" class="advantage">
			<view class="header">{{advantage.title}}</view>
			<view class="intro">{{advantage.intro}}</view>
			<view class="enumeration">
				<view class="tab">
					<view class="item" :class="index==enumera?'active':''" v-for="(item, index) in advanlist" :key="index" @mouseover="getEnumerationTab(index)">
						<image :src="item.icon"></image>
						<view class="info">
							<view class="title">{{item.title}}</view>
							<view class="text">{{item.intro}}</view>
						</view>
					</view>
				</view>
				<view class="preview">
					<block v-for="(item, index) in advanlist" :key="index">
						<image :class="index==enumera?'active':''" mode="widthFix" :src="item.image"></image>
					</block>
				</view>
			</view>
		</view>
		<view id="ability" class="ability">
			<view class="content">
				<view class="header">{{powerful.title}}</view>
				<view class="items">
					<view class="item" v-for="(item, index) in powerlist" :key="index">
						<view class="info">
							<view class="title">{{item.title}}</view>
							<view class="text">{{item.intro}}</view>
						</view>
						<view class="icon">
							<i class="iconfont" :class="item.icon"></i>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="service" class="service">
			<view class="header">{{ecology.title}}</view>
			<view class="content">
				<view class="map">
					<image :src="ecology.intro" class="service-item"></image>
					<block v-for="(item, index) in ecologylist" :key="index">
						<image :src="item.intro" class="service-item float" :class="index==servnum?'active':''"></image>
					</block>
					<view class="mask">
						<view @mouseover="getServiceTap(index)" class="area" :class="'area-'+(index+1)" v-for="(item, index) in ecologylist" :key="index"></view>
					</view>
				</view>	
				<view class="preview">
					<block v-for="(item, index) in ecologylist" :key="index">
						<view class="preview-item" :class="index==servnum?'active':''" :style="'background-image: url('+item.icon+');'"></view>
					</block>
				</view>
			</view>
		</view>
		<view id="case" v-if="caselist" class="case" :style="'background-image: url('+cases.intro+');'">
			<view class="content">
				<view class="header">{{cases.title}}</view>
				<view class="wrapper">
					<view class="preview">
						<view class="preview-item" :class="index==casenum?'active':''" v-for="(item, index) in caselist" :key="index" :style="'background-image: url('+item.image+');'"></view>
					</view>
					<view class="info">
						<view class="logos">
							<view class="logo" v-for="(item, index) in caselist" :key="index" @mouseover="getCaseTap(index)">
								<image :src="item.intro" class="case-logo-bg"></image>
								<image :src="item.icon" class="case-logo-color" :class="index==casenum?'active':''"></image>
							</view>
						</view>
						<view class="lists">
							<view class="title">{{caselist[casenum].title}}</view>
							<view class="texts">
								<block v-for="(item, index) in caselist[casenum].json_ext" :key="index">
									<view class="text"><text></text>{{item}}</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="content">
				<view class="menuList">
					<view class="menu" v-for="(item, index) in footer.list" :key="index">
						<view class="title">{{item.title}}</view>
						<block v-for="(itm, idx) in item.list" :key="idx">
							<view class="text">{{itm.name}}</view>
						</block>
					</view>
					<view class="brand">
						<image mode="widthFix" :src="webSiteInfo.foo_logo"></image>
						<view class="intro">
							<text>{{webSiteInfo.jiajie}}</text>
						</view>
						<view class="contact">
							<view v-if="webSiteInfo.weibo" class="icon">
								<a :href="webSiteInfo.weibo" target="_blank">
									<i class="iconfont icon-weibo"></i>
								</a>
							</view>
							<view v-if="webSiteInfo.mail" class="icon">
								<a :href="'mailto:'+webSiteInfo.mail">
									<i class="iconfont icon-email"></i>
								</a>
							</view>
						</view>
					</view>
				</view>
				<view class="copy">
					<view class="text">{{webSiteInfo.copys}} {{webSiteInfo.icps}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				current: 0,
				enumera: 0,
				servnum: 0,
				casenum: 0,
				scrollTop: false,
				webSiteInfo: '',
				category: '',
				swiperList: '',
				swiperMenu: '',
				advantage: '',
				advanlist: '',
				powerful: '',
				powerlist: '',
				ecology: '',
				ecologylist: '',
				cases: '',
				caselist: '',
				
				footer: {
					list: [
						{
							title: '资源',
							list: [
								{
									name: '开发文档',
									link: 'https://doc.minapp.com/'
								},
								{
									name: '实战教程',
									link: 'https://minapp.com/article/?page=1&category=cloud'
								},
								{
									name: 'SDK 下载',
									link: 'https://doc.minapp.com/js-sdk/download-sdk.html'
								},
								{
									name: 'Demo 源码',
									link: 'https://github.com/ifanrx/hydrogen-demo'
								}
							]
						},
						{
							title: '服务&支持',
							list: [
								{
									name: '通知公告',
									link: 'http://support.minapp.com/hc/kb/section/1021237/'
								},
								{
									name: '帮助中心',
									link: 'http://support.minapp.com/hc/'
								},
								{
									name: '提交工单',
									link: 'http://support.minapp.com/hc/request/new/'
								},
								{
									name: '健康状态',
									link: 'https://status.minapp.com/'
								}
							]
						},
						{
							title: '关于我们',
							list: [
								{
									name: '关于爱范儿',
									link: 'http://www.ifanr.com/about/our-team'
								},
								{
									name: '加入我们',
									link: 'https://www.lagou.com/gongsi/j25623.html'
								},
								{
									name: '服务条款',
									link: 'https://doc.minapp.com/support/terms.html'
								}
							]
						},
						{
							title: '相关产品',
							list: [
								{
									name: '爱范儿',
									link: 'http://www.ifanr.com/'
								},
								{
									name: '玩物志',
									link: 'https://ifanr.in/'
								},
								{
									name: 'AppSo',
									link: 'http://www.ifanr.com/app'
								},
								{
									name: 'SocialBase',
									link: 'https://socialbase.cn/'
								},
								{
									name: '小电商',
									link: 'https://minshop.com/'
								}
							]
						}
					]
				}
				
			}
		},
		onLoad() {
			let self = this;
			//网站信息 && 导航菜单
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/website/info',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.category = res.data.data.category;
						self.webSiteInfo = res.data.data.webinfo;
					}
			    }
			});
			//网站轮播海报 && 菜单列表
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/banner/list',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.swiperList = res.data.data.swiperList;
						self.swiperMenu = res.data.data.menuList;
					}
			    }
			});
			//网站系统特点介绍
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/advantage/list',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.advantage = res.data.data.advantage;
						self.advanlist = res.data.data.advanlist;
					}
			    }
			});
			//网站系统功能介绍
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/powerful/list',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.powerful = res.data.data.powerful;
						self.powerlist = res.data.data.powerlist;
					}
			    }
			});
			//网站系统生态介绍
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/ecology/list',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.ecology = res.data.data.ecology;
						self.ecologylist = res.data.data.ecologylist;
					}
			    }
			});
			//网站系统案例展示
			uni.request({
			    url: 'http://api.test.maliapi.cn/v2/case/list',
				header: {
					'Cache-Control': 'no-cache'
				},
			    success: (res) => {
					if(res.data.code===200){
						self.cases = res.data.data.cases;
						self.caselist = res.data.data.caselist.rows;
					}
			    }
			});
		},
		onPageScroll: function (e) {
			let scrollTop = e.scrollTop;
			if(scrollTop>=20){
				this.scrollTop = true;
			}else{
				this.scrollTop = false;
			}
		},
		methods: {
			swiperChange: function (e) {
				this.current = e.detail.current;
			},
			selectSwiper: function (e) {
				this.current = e;
			},
			getLinksTap: function () {
				console.log('121321')
			},
			getEnumerationTab: function (e) {
				this.enumera = e;
			},
			getServiceTap: function (e) {
				this.servnum = e;
			},
			getCaseTap: function (e) {
				this.casenum = e;
			}
		}
	}
</script>

<style lang="less">
	.headeBox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: .7rem;
		z-index: 400;
		width: 100%;
		box-sizing: border-box;
		height: .7rem;
		display: flex;
		align-items: center;
		background: #0d155d;
		color: #fff;
		transition: background-color .5s,box-shadow .5s;
		.left{
			padding-left: 1.5rem;
			image{
				display: block;
				width: 1.1rem;
				height: auto;
				cursor: pointer;
			}
		}
		.nav{
			text-overflow: ellipsis;
			white-space: nowrap;
			word-wrap: normal;
			overflow: unset;
			flex: 1;
			justify-content: center;
			align-items: center;
			display: flex;
			font-size: .14rem;
			height: 100%;
			a{
				padding: 0 0.2rem;
				line-height: 1.5;
				position: relative;
				height: 100%;
				color: #FFFFFF;
				text-decoration: dashed;
			}
			.item{
				padding: 0 .2rem;
				line-height: 1.5;
				position: relative;
				height: 100%;
				display: flex;
				align-items: center;
				cursor: pointer;
			}
		}
		.right{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: .7rem;
			text-align: right;
			.button{
				border: 1px solid hsla(0,0%,100%,.2);
				color: #fff;
				background: none;
				height: .32rem;
				line-height: .32rem;
				margin-right: .08rem;
				padding: 0 .24rem;
				border-radius: .16rem;
				font-size: .14rem;
				transition: all .3s;
				cursor: pointer;
			}
			.active{
				color: #333;
				background-color: #FFFFFF;
			}
		}
	}
	.lightBox{
		background: #fff;
		color: #2c405a;
		.nav{
			a{
				color: #2c405a;
			}
		}
		.right{
			.button{
				background-color: transparent;
				border: 1px solid rgba(141,171,196,.2);
				color: #2c405a;
			}
			.active{
				border: 1px solid rgba(141,171,196,0);
				background-color: #fbb727;
				color: #fff;
			}
		}
	}
	.bannerBox{
		width: 100%;
		overflow: hidden;
		min-height: 7.2rem;
		background-color: #0d155d;
		position: relative;
		.header{
			height: .7rem;
			background-color: #0d155d;
		}
		swiper{
			margin: 0 auto;
			position: relative;
			overflow: hidden;
			list-style: none;
			padding: 0;
			z-index: 1;
			height: 7.2rem;
			.item{
				position: absolute;
				width: 100%;
				z-index: -2;
				top: 0;
				bottom: 0;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 50%;
				transform: scale(1.04);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.mask{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-color: #0d155d;
					opacity: .7;
					z-index: -1;
				}
				.title{
					color: #fff;
					font-size: 62px;
					font-weight: bold;
				}
				.intro{
					color: #fff;
					font-size: 22px;
					padding-top: 30px;
					font-weight: 300;
				}
				a{
					color: #0d155d;
				    text-decoration: dashed;
					margin-top: .6rem;
					margin-bottom: 1.2rem;
				}
				.btnnm{
					height: .54rem;
					padding: 0 .3rem;
					font-size: .2rem;
					line-height: .54rem;
					border: none;
					border-radius: .28rem;
					background: #fbb727;
					color: #0d155d;
					cursor: pointer;
				}
			}
		}
		.dots{
			position: absolute;
			bottom: 1.8rem;
			display: flex;
			z-index: 10;
			align-items: center;
			justify-content: center;
			width: 100%;
			.dot{
				width: 80px;
				height: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 10px;
				cursor: pointer;
				text{
					width: 100%;
					height: 3px;
					background-color: #fff;
					opacity: .3;
				}
				.active{
					opacity: 1;
				}
			}
		}
		.menu{
			position: absolute;
			bottom: 0;
			z-index: 10;
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
			.list{
				box-sizing: border-box;
				border-left: 4px solid transparent;
				padding: .2rem .3rem;
				color: #fff;
				flex: 0 0 350px;
				height: 1.7rem;
				cursor: pointer;
				text-decoration: dashed;
				.title{
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: .3rem;
				}
				.button{
					display: block;
					color: #fbb727;
					margin-top: .2rem;
				}
			}
			.list:hover{
				border-left-color: #fbb727;
				background: hsla(0,0%,100%,.15);
			}
		}
	}
	.advantage{
		width: 980px;
		margin: 0 auto;
		padding-bottom: .6rem;
		color: #2c405a;
		.header{
			margin: .6rem 0 .2rem;
			font-size: .32rem;
			text-align: center;
			font-weight: 500;
			line-height: 1.5;
		}
		.intro{
			font-size: .14rem;
			line-height: 2;
			text-align: center;
		}
		.enumeration{
			display: flex;
			margin-top: .3rem;
			.tab{
				flex: 1;
				overflow: hidden;
				padding: .3rem 0;
				.item{
					display: flex;
					align-items: center;
					height: 1rem;
					padding: 0 .24rem;
					margin-right: .4rem;
					border-left: .04rem solid transparent;
					margin-bottom: .28rem;
					cursor: pointer;
					image{
						width: .4rem;
						height: .4rem;
						margin-right: .28rem;
					}
					.info{
						flex: 1;
						overflow: hidden;
						.title{
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							word-wrap: normal;
							font-size: .2rem;
							font-weight: 500;
							margin: .04rem 0;
						}
						.text{
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							word-wrap: normal;
							font-size: .14rem;
							line-height: 2;
						}
					}
				}
				.active{
					border-radius: .04rem;
					box-shadow: 0 0.02rem 0.28rem 0 #e5ebf0;
					border-left-color: #fbb727;
				}
			}
			.preview{
				position: relative;
				flex: 1;
				padding: .3rem 0;
				height: 4.4rem;
				overflow: hidden;
				image{
					visibility: hidden;
					opacity: 0;
					transition: visibility .3s,opacity .3s ease-out;
					margin-top: .22rem;
					position: absolute;
					width: 100%;
					height: auto;
				}
				.active{
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}
	.ability{
		padding: .6rem 0;
		background-color: #0d155d;
		color: #fff;
		.content{
			width: 980px;
			margin: 0 auto;
			.header{
				font-size: .32rem;
				text-align: center;
				line-height: 1.5;
			}
			.items{
				margin: .6rem 0 .4rem;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.item{
					height: 1.26rem;
					box-sizing: border-box;
					width: 33.33%;
					padding: .32rem;
					display: flex;
					align-items: center;
					border: 1px solid rgba(49,180,249,.18);
					color: #128bf8;
					cursor: pointer;
					.info{
						flex: 1;
						width: .5rem;
						.title{
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							word-wrap: normal;
							font-size: .2rem;
							line-height: 1.5;
							font-weight: 400;
						}
						.text{
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							word-wrap: normal;
							margin-top: .16rem;
							font-size: .14rem;
						}
					}
					.icon{
						margin-left: 0;
						font-size: .44rem;
						i{
							font-size: inherit;
							color: inherit;
						}
					}
				}
				.item:nth-child(3n+1), .item:nth-child(3n+2){
					border-right-width: 0;
				}
				.item:nth-child(n+4){
					border-top-width: 0;
				}
				.item:hover{
					background-color: #2065e6;
					color: #fff;
					.icon{
						color: #fbb727
					}
				}
			}
		}
	}
	.service{
		padding: .6rem 0;
		margin: 0 auto;
		width: 980px;
		.header{
			font-size: .32rem;
			text-align: center;
			line-height: 1.5;
			color: #2c405a;
		}
		.content{
			display: flex;
			height: 5.8rem;
			margin: .7rem auto 0;
			.map{
				width: 5rem;
				flex: 1;
				position: relative;
				.service-item{
					width: 5rem;
					height: 5rem;
				}
				.float{
					visibility: hidden;
					opacity: 0;
					transition: visibility .3s,opacity .3s ease-out;
					position: absolute;
					top: 0;
					left: 0;
				}
				.active{
					visibility: visible;
					opacity: 1;
				}
				.mask{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					.area{
						position: absolute;
						width: 20%;
						height: 20%;
						border-radius: 50%;
						background-color: transparent;
					}
					.area-1{
						top: 30%;
						left: 35.5%;
						width: 28%;
						height: 28%;
					}
					.area-2{
						top: 52%;
						left: 3.1%;
					}
					.area-3{
						top: 0;
						left: 39%;
					}
					.area-4{
						top: 52%;
						left: 75%;
					}
				}
			}
			.preview{
				position: relative;
				display: flex;
				flex: 1;
				padding-left: .5rem;
				box-sizing: border-box;
				height: 5.8rem;
				width: 4.32rem;
				overflow: hidden;
				.preview-item{
					visibility: hidden;
					opacity: 0;
					transition: visibility .3s,opacity .3s ease-out;
					position: absolute;
					height: inherit;
					width: inherit;
					background-size: cover;
					background-repeat: no-repeat;
				}
				.active{
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}
	.case{
		padding: .6rem 0 .4rem;
		background-color: #0d155d;
		background-size: cover;
		background-position: 50%;
		color: #fff;
		.content{
			width: 980px;
			margin: 0 auto;
			.header{
				font-size: .32rem;
				text-align: center;
				line-height: 1.5;
			}
			.wrapper{
				display: flex;
				align-items: flex-start;
				margin-top: .4rem;
				.preview{
					flex: 1;
					height: 5.6rem;
					position: relative;
					margin-right: 1.1rem;
					.preview-item{
						visibility: hidden;
						opacity: 0;
						transition: visibility .3s,opacity .3s ease-out;
						position: absolute;
						width: 4.7rem;
						height: 5.6rem;
						background-size: cover;
					}
					.active{
						visibility: visible;
						opacity: 1;
					}
				}
				.info{
					flex: 1;
					padding: .2rem 0;
					.logos{
						display: flex;
						flex-wrap: wrap;
						height: 1.6rem;
						margin-bottom: .44rem;
						.logo{
							position: relative;
							width: .64rem;
							height: .64rem;
							margin: 0 .34rem .32rem 0;
							.case-logo-bg{
								display: block;
								position: absolute;
								top: 0;
								left: 0;
								width: .64rem;
								height: .64rem;
								border-radius: 50%;
								z-index: 1;
							}
							.case-logo-color{
								display: block;
								position: absolute;
								top: 0;
								left: 0;
								width: .64rem;
								height: .64rem;
								border-radius: 50%;
								visibility: hidden;
								opacity: 0;
								transition: visibility .3s,opacity .3s ease-out;
								z-index: 2;
							}
							.active{
								visibility: visible;
								opacity: 1;
								box-shadow: 0 2px 28px 0 #070e45;
							}
						}
					}
					.lists{
						display: block;
						.title{
							font-size: .2rem;
							font-weight: 700;
						}
						.texts{
							min-height: 1.2rem;
							margin: .32rem 0 .4rem;
							font-size: .14rem;
							line-height: 1.8;
							.text{
								font-size: inherit;
								font-weight: inherit;
								line-height: .4rem;
								display: flex;
								align-items: center;
								text{
									width: 4px;
									height: 4px;
									background-color: #fbb727;
									border-radius: 100%;
									margin-right: 8px;
								}
							}
						}
					}
				}
			}
		}
	}
	.footer{
		padding: .75rem 0 .2rem;
		background-color: #00041d;
		color: #fff;
		.content{
			width: 980px;
			margin: 0 auto;
			.menuList{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				width: 100%;
				.menu{
					text-align: initial;
					color: hsla(0,0%,100%,.5);
					font-size: .14rem;
					vertical-align: top;
					.title{
						color: #fff;
						font-size: .18rem;
						margin-bottom: .3rem;
					}
					.text{
						text-decoration: none;
						color: hsla(0,0%,100%,.5);
						display: block;
						margin-bottom: .2rem;
						cursor: pointer;
					}
				}
				.brand{
					position: relative;
					min-height: 2.1rem;
					margin-left: .8rem;
					margin-right: 0;
					image{
						width: 1.5rem;
						margin-bottom: .2rem;
					}
					.intro{
						line-height: 1.8;
						letter-spacing: .02rem;
						color: hsla(0,0%,100%,.5);
						font-size: .14rem;
					}
					.contact{
						display: flex;
						position: absolute;
						left: 0;
						bottom: 0;
						a{
							color: hsla(0,0%,100%,.5)!important;
							text-decoration: dashed;
						}
						.icon{
							text-decoration: none;
							color: hsla(0,0%,100%,.5)!important;
							display: block;
							margin-bottom: .2rem;
							cursor: pointer;
							margin-right: .45rem;
							font-size: .25rem;
							i{
								font-size: inherit;
							}
						}
					}
				}
			}
			.copy{
				margin-top: .96rem;
				text-align: center;
				font-size: .13rem;
				.text{
					display: inline-block;
					color: hsla(0,0%,100%,.5);
				}
			}
		}
	}
</style>
