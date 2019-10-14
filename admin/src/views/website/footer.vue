<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="网站简介" prop="jiajie">
        <Input v-model="formValidate.jiajie" placeholder="请输入网站简介"></Input>
      </FormItem>
      <FormItem label="版权说明" prop="copys">
        <Input v-model="formValidate.copys" placeholder="请输入版权信息"></Input>
      </FormItem>
      <FormItem label="备案信息" prop="icps">
        <Input v-model="formValidate.icps" placeholder="请输入备案信息"></Input>
      </FormItem>
      <FormItem label="新浪微博" prop="weibo">
        <Input v-model="formValidate.weibo" placeholder="请输入新浪微博链接（如有）"></Input>
      </FormItem>
      <FormItem label="电子邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入邮箱地址（如有）"></Input>
      </FormItem>
      <FormItem label="底部Logo" prop="foo_logo">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadLogoSuccess"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover" v-if="formValidate.foo_logo">
            <img :src="formValidate.foo_logo" alt="foo_logo">
          </div>
        </div>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 10px">保存设置</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';
  import getUploadToken from '../../libs/upload-token'

  export default {
    data() {
      return {
        token: '',
        formValidate: {
          id: 1,
          jiajie: '',
          copys: '',
          icps: '',
          weibo: '',
          mail: '',
          foo_logo: ''
        },
        ruleValidate: {
          jiajie: [
            {required: true, message: '网站简介不能为空', trigger: 'blur'}
          ],
          copys: [
            {required: true, message: '版权说明不能为空', trigger: 'blur'}
          ],
          icps: [
            {required: true, message: '备案信息不能为空', trigger: 'blur'}
          ],
          foo_logo: [
            {required: true, message: '必须上传底部Logo', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getWebFooterInfo();
      this._getUploadToken();
    },
    methods: {
      ...mapActions({
        getWebsiteInfo: 'website/getWebsiteInfo',
        getSaveWebSiteFooter: 'website/getSaveWebSiteFooter'
      }),
      // 上传图片成功
      uploadLogoSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formValidate.foo_logo = url;
        this.$Message.success('上传成功!');
      },
      // 上传图片失败
      uploadError(response) {
        this.$Message.error('上传失败!');
        console.log(response)
      },
      // 获取上传token
      async _getUploadToken() {
        try {
          const res = await getUploadToken();
          this.token = res.token;
        } catch (e) {
          console.log(e)
        }
      },
      // 更新
      async _createArticle() {
        try {
          await this.getSaveWebSiteFooter(this.formValidate);
          this.$Message.success('更新成功!');
          //this.$router.push('/article');
          this._getWebFooterInfo();
        } catch (e) {
          
        }
      },
      // 获取基本信息
      async _getWebFooterInfo() {
        try {
          const res = await this.getWebsiteInfo();
          const info = res.data.data;
          this.formValidate = {
            id: 1,
            jiajie: info.jiajie,
            copys: info.copys,
            icps: info.icps,
            weibo: info.weibo,
            mail: info.mail,
            foo_logo: info.foo_logo,
          }
        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._createArticle();
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style scoped>
  .article-cover {
    width: 120px;
  }

  .article-cover img {
    width: 100%;
  }

  .cover {
    display: flex;
  }

  .cover .upload {
    width: 280px;
    margin-right: 32px;
  }
</style>
