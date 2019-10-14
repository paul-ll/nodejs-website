<template>
  <section>
    <Button type="primary" @click="addSwiper = true" icon="md-add" style="margin-bottom: 16px;">新增轮播海报</Button>
    <Modal v-model="addSwiper" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="广告标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入广告标题"></Input>
        </FormItem>
        <FormItem label="简介文字" prop="intro">
          <Input v-model="formValidate.intro" placeholder="请输入简介文字"></Input>
        </FormItem>
        <FormItem label="按钮文字" prop="button">
          <Input v-model="formValidate.button" placeholder="请输入按钮文字"></Input>
        </FormItem>
        <FormItem label="跳转链接" prop="links">
          <Input v-model="formValidate.links" placeholder="请输入跳转链接"></Input>
        </FormItem>
        <FormItem label="新标签页打开" prop="target">
          <i-switch :value="formValidate.target" size="large" @on-change="targetChange">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="背景蒙版" prop="hover">
          <i-switch :value="formValidate.hover" size="large" @on-change="hoverChange">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="背景图片" prop="bgimg">
          <div class="cover" style="display: flex;">
            <div class="upload" style="flex: 0 0 50%;">
              <Upload
                multiple
                type="drag"
                action="http://up-z2.qiniu.com"
                :show-upload-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :data="{token}">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或者拖拽上传</p>
                </div>
              </Upload>
            </div>
            <div class="article-cover" v-if="formValidate.bgimg" style="flex: 0 0 50%; display: flex; justify-content: center;">
              <img :src="formValidate.bgimg" alt="bgimg" style="width: 150px;">
            </div>
          </div>
        </FormItem>
        <FormItem>
          <Button @click="handleReset('formValidate')">重置</Button>
          <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 10px">保存设置</Button>
        </FormItem>
      </Form>
    </Modal>

    <section>
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="bgimg">
          <img style="height:100px;" :src="row.bgimg" />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>

  </section>
</template>

<script>
  import {mapActions} from 'vuex';
  import getUploadToken from '../../libs/upload-token';

  export default {
    name: "list",
    data() {
      return {
        addSwiper: false,
        editStatus: false,
        title: '新增轮播海报',
        formValidate: {
          title: '',
          intro: '',
          button: '',
          links: '',
          hover: false,
          target: false,
          bgimg: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '广告标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '简介文字不能为空', trigger: 'blur'}
          ],
          bgimg: [
            {required: true, message: '必须上传背景图片', trigger: 'blur'}
          ],
        },
        token: '',
        list: [],
        page: null,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '广告标题',
            key: 'title'
          },
          {
            title: '简介文字',
            key: 'intro'
          },
          {
            title: '背景图片',
            key: 'bgimg',
            slot: 'bgimg',
            align: 'center'
          },
          {
            title: '按钮文字',
            width: 150,
            align: 'center',
            key: 'button'
          },
          {
            title: '跳转链接',
            key: 'links',
            width: 250,
            align: 'center',
          },
          {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getUploadToken();
      this._getSwiperList();
    },
    methods: {
      ...mapActions({
        addSwiperBanner: 'swiper/addSwiperBanner',
        getSwiperList: 'swiper/getSwiperList',
        updateSwiperBanner: 'swiper/updateSwiperBanner',
        destroySwiperBanner: 'swiper/destroySwiperBanner'
      }),
      // 上传图片成功
      uploadSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formValidate.bgimg = url;
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
      // 获取分类
      async _getSwiperList() {
        const res = await this.getSwiperList();
        this.list = res.data.data;
      },
      // 新增轮播海报
      async _addSwiperBanner() {
        try {
          await this.addSwiperBanner(this.formValidate);
          this.$Message.success('新增成功!');
          this._getSwiperList();
          this.addSwiper = false;
          this.formValidate = {
            title: '',
            intro: '',
            button: '',
            links: '',
            hover: false,
            target: false,
            bgimg: ''
          }
        } catch (e) {
          
        }
      },
      // 海报更新
      async _updateSwiperBanner() {
        try {
          await this.updateSwiperBanner(this.formValidate);
          this.$Message.success('更新成功!');
          this._getSwiperList();
          this.addSwiper = false;
          this.formValidate = {
            title: '',
            intro: '',
            button: '',
            links: '',
            hover: false,
            target: false,
            bgimg: ''
          }
        } catch (e) {
          
        }
      },
      // 编辑海报
      update(id) {
        this.title = '修改轮播海报';
        this.formValidate = this.list[id];
        this.editStatus = true;
        this.addSwiper = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.editStatus = false,
        this.title = '新增轮播海报';
        this.formValidate = {
          title: '',
          intro: '',
          button: '',
          links: '',
          hover: false,
          target: false,
          bgimg: ''
        }
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此轮播海报吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroySwiperBanner(id);
              this.$Message.success('删除成功');
              this._getSwiperList();
            } catch (e) {
              this.$Message.error(e);
            } finally {
              this.$Modal.remove();
            }
          }
        });
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.editStatus){
              this._updateSwiperBanner();
            }else{
              this._addSwiperBanner();
            }
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 新标签页开关
      hoverChange() {
        this.formValidate.hover = !this.formValidate.hover;
      },
      targetChange() {
        this.formValidate.target = !this.formValidate.target;
      },
    }
  }
</script>

<style scoped>

</style>
