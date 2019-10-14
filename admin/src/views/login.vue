<template>
  <div class="login">
    <div class="card" :class="wxLogin?'wxCard':''">
      <div class="qrcode" :class="wxLogin?'passwd':''" @click="wxLogin = !wxLogin"></div>
      <div class="title">轻企云内容管理平台</div>
      <div v-if="wxLogin" class="qrcodeBox">
        <div @click="qrcodeTap" class="qrimg" :style="'background-image: url('+qrcodeUrl+');'"></div>
        <!--<div @click="qrcodeTap" class="text">微信扫码登录</div>-->
        <div class="form">
          <Form ref="wechatlogin" :model="wechatFm" :rules="wechat">
            <FormItem prop="code">
              <i-input v-model="wechatFm.code" placeholder="请输入微信验证码">
                <span slot="prepend">
                  <Icon size="23" type="ios-infinite-outline" />
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button :loading="buttonLoading" @click="handleWxSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div v-else class="form">
        <Form ref="loginForm" :model="form" :rules="rules">
          <FormItem prop="username">
            <i-input v-model="form.username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon size="23" type="ios-person-outline" />
              </span>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon size="23" type="ios-lock-outline" />
              </span>
            </i-input>
          </FormItem>
          <FormItem>
            <Button :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        wxLogin: false,
        qrcodeUrl: '',
        buttonLoading: false,
        // 表单内容，username && 密码
        form: {
          username: '',
          password: ''
        },
        // 表单验证，username && 密码
        rules: {
          username: [
            {required: true,message: '用户名不能为空',trigger: 'blur'}
          ],
          password: [
            {required: true,message: '密码不能为空',trigger: 'blur'}
          ]
        },
        wechatFm: {
          code: ''
        },
        wechat: {
          code: [{required: true,message: '微信验证码不能为空',trigger: 'blur'}]
        }
      };
    },
    created() {
      //this.$Loading.finish();
      this.qrcodeTap();
    },
    methods: {
      ...mapActions({
        login: 'admin/login',
        wxlogin: 'admin/wxlogin',
        qrcode: 'admin/getQrcode'
      }),

      // 提交登录
      handleSubmit() {
        this.buttonLoading = true;
        // 表单验证
        var formLabel = this.$refs.loginForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }
          this.login(this.form).then(ret => {
            this.$ls.set('token', ret.data.token);
            // 跳转
            this.$Message.success("登录成功！");
            window.location.href = '/'
          }).catch(err => {
            this.buttonLoading = false;
          })
        })
      },
      handleWxSubmit () {
        this.buttonLoading = true;
        // 表单验证
        var formLabel = this.$refs.wechatlogin;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }
          this.wxlogin(this.wechatFm).then(ret => {
            this.$ls.set('token', ret.data.token);
            // 跳转
            this.$Message.success("登录成功！");
            window.location.href = '/'
          }).catch(err => {
            this.buttonLoading = false;
          })
        })
      },
      // 登录二维码
      async _qrcode() {
        const res = await this.qrcode();
        this.qrcodeUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+res.data.data.ticket;
      },
      qrcodeTap(){
        this._qrcode();
      }
    }
  };
</script>

<style lang="less">
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .login{
      width: 100%;
      height: 100%;
      display: flex;
      background: #f5f7f9;
      .card{
        width: 350px;
        height: 360px;
        margin: 150px auto;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.02);
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        .qrcode{
          background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' version='1' xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M966 965v-70h-70zM301 125v175l70 70V55H56l70 70zM896 615H651v35l70 70v-35h70v70h-35l140 140v-70h70V685h-70z' fill='%232c3e50'/%3E%3Cpath d='M266 265V160H161zM441 55h70v70h-70V55zM651 55v315h315V55H651zm245 245H721V125h175v175z' fill='%232c3e50'/%3E%3Cpath d='M756 160h105v105H756V160zM581 440V335h-70v105h-70l70 70h70v70h105v-70h70v-70zM581 265V125h-70v70h-70v140h70v-70zM896 440h-70v70h-70v70h210v-70h-70z' fill='%232c3e50'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
        }
        .passwd{
          background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' version='1' xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M79 378l-67-70V103s0-71 70-71h851s72 0 71 71v625s0 70-71 70H644l2 145-217-215h504V103H79v275z' fill='%232c3e50'/%3E%3Cpath d='M212 504V212h583v406H320L212 504zm434 439h196s52 34 0 67H714l-68-67z' fill='%232c3e50'/%3E%3C/svg%3E");
          width: 25px;
          height: 25px;
        }
        .title{
          font-size: 24px;
          width: 100%;
          display: flex;
          height: 80px;
          align-items: flex-end;
          justify-content: center;
        }
        .qrcodeBox{
          width: 60%;
          margin: 0 auto;
          margin-top: 15px;
          position: relative;
          .qrimg{
            width: 210px;
            height: 210px;
            background-size: 100% 100%;
          }
          .text{
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 88px;
            background-color: rgba(44,62,80,.15);
            color: #2c3e50;
            border-radius: 100px;
            padding: 2px 0;
            text-align: center;
            cursor: pointer;
          }
        }
        .form{
          width: 75%;
          margin: 40px auto;
          .ivu-input-wrapper{
            border: 1px solid #eeeeee;
          }
          .ivu-form-item-error-tip{
            left: 45px;
          }
          .ivu-input-group-prepend{
            border: none;
            background-color: #eee;
            padding: 5px 10px;
          }
          .ivu-input{
            border: none !important;
            height: 40px;
            font-size: 15px;
            padding-left: 12px;
          }
          .ivu-btn{
            height: 40px;
            border-radius: 0;
            font-size: 15px;
            margin-top: 10px;
          }
        }
      }
      .wxCard{
        height: 450px;
        .form{
          width: 100%;
          margin: 0;
          .ivu-form-item{
            margin-bottom: 0;
            margin-top: 10px;
          }
        }
      }
    }
  }
  input:focus{
    border: none;
  }
  input:-webkit-autofill, 
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active { 
    border: none;
    box-shadow: none;
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
</style>

