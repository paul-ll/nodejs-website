<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="网站名称" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入网站标题"></Input>
      </FormItem>
      <FormItem label="关键字" prop="keywords">
        <Input v-model="formValidate.keywords" placeholder="请输入网站关键字（keywords）"></Input>
      </FormItem>
      <FormItem label="网站说明" prop="description">
        <Input v-model="formValidate.description" placeholder="请输入网站说明（description）"></Input>
      </FormItem>
      <FormItem label="默认Logo" prop="logo1">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadLogo1Success"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover" v-if="formValidate.logo1">
            <img :src="formValidate.logo1" alt="logo1">
          </div>
        </div>
      </FormItem>
      <FormItem label="浮动Logo" prop="logo2">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadLogo2Success"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover" v-if="formValidate.logo2">
            <img :src="formValidate.logo2" alt="logo2">
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
        //id: this.$route.params.id,
        formValidate: {
          id: 1,
          name: '',
          keywords: '',
          description: '',
          logo1: '',
          logo2: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '网站名称不能为空', trigger: 'blur'}
          ],
          logo1: [
            {required: true, message: '必须上传默认Logo', trigger: 'blur'}
          ],
          logo2: [
            {required: true, message: '必须上传浮动Logo', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getWebHeaderInfo();
      this._getUploadToken();
    },
    methods: {
      ...mapActions({
        getWebsiteInfo: 'website/getWebsiteInfo',
        getSaveWebSiteHeader: 'website/getSaveWebSiteHeader'
      }),
      // 上传图片成功
      uploadLogo1Success(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formValidate.logo1 = url;
        this.$Message.success('上传成功!');
      },
      uploadLogo2Success(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formValidate.logo2 = url;
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
          await this.getSaveWebSiteHeader(this.formValidate);
          this.$Message.success('更新成功!');
          //this.$router.push('/article');
          this._getWebHeaderInfo();
        } catch (e) {
          
        }
      },
      // 获取基本信息
      async _getWebHeaderInfo() {
        try {
          const res = await this.getWebsiteInfo();
          const info = res.data.data;
          this.formValidate = {
            id: 1,
            name: info.name,
            keywords: info.keywords,
            description: info.description,
            logo1: info.logo1,
            logo2: info.logo2
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
