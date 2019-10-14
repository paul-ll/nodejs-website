<template>
  <section>
    <Tabs>
        <TabPane label="板块信息" icon="ios-settings-outline">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="板块ID" prop="type">
              <Input v-model="formValidate.type" placeholder="请输入板块ID，ID最好是英文" disabled></Input>
            </FormItem>
            <FormItem label="板块标题" prop="title">
              <Input v-model="formValidate.title" placeholder="请输入板块标题"></Input>
            </FormItem>
            <FormItem label="板块背景" prop="intro">
              <div class="cover" style="display: flex;">
                <div class="upload" style="flex: 0 0 500px;">
                  <Upload
                    multiple
                    type="drag"
                    action="http://up-z2.qiniu.com"
                    :show-upload-list="false"
                    :on-success="uploadIntroSuccess"
                    :on-error="uploadError"
                    :data="{token}">
                    <div style="height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击或者拖拽上传</p>
                    </div>
                  </Upload>
                </div>
                <div class="article-cover" v-if="formValidate.intro" style="flex: 0 0 500px;display: flex; justify-content: center;">
                  <img :src="formValidate.intro" alt="intro" style="height:300px">
                </div>
              </div>
            </FormItem>
            <FormItem>
              <Button @click="handleReset('formValidate')">重置</Button>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 10px">保存设置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="生态列表" icon="ios-keypad-outline">
          <Button type="primary" @click="addModal = true" icon="md-add" style="margin-bottom: 16px;">新增生态</Button>
          <Modal v-model="addModal" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
            <Form ref="formListData" :model="formListData" :rules="ruleListData" :label-width="120">
              <FormItem label="生态标题" prop="title">
                <Input v-model="formListData.title" placeholder="请输入生态标题"></Input>
              </FormItem>
              <FormItem label="生态Icon" prop="intro">
                <div class="cover" style="display: flex;">
                  <div class="upload" style="flex: 0 0 50%;">
                    <Upload
                      multiple
                      type="drag"
                      action="http://up-z2.qiniu.com"
                      :show-upload-list="false"
                      :on-success="uploadImageSuccess"
                      :on-error="uploadError"
                      :data="{token}">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽上传</p>
                      </div>
                    </Upload>
                  </div>
                  <div class="article-cover" v-if="formListData.intro" style="flex: 0 0 50%; display: flex; justify-content: center;">
                    <img :src="formListData.intro" alt="intro" style="width: 150px;">
                  </div>
                </div>
              </FormItem>
              <FormItem label="生态图片" prop="icon">
                <div class="cover" style="display: flex;">
                  <div class="upload" style="flex: 0 0 50%;">
                    <Upload
                      multiple
                      type="drag"
                      action="http://up-z2.qiniu.com"
                      :show-upload-list="false"
                      :on-success="uploadIconSuccess"
                      :on-error="uploadError"
                      :data="{token}">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽上传</p>
                      </div>
                    </Upload>
                  </div>
                  <div class="article-cover" v-if="formListData.icon" style="flex: 0 0 50%; display: flex; justify-content: center;">
                    <img :src="formListData.icon" alt="icon" style="width: 150px;">
                  </div>
                </div>
              </FormItem>

              <FormItem>
                <Button @click="handleReset('formListData')">重置</Button>
                <Button type="primary" @click="handleListSubmit('formListData')" style="margin-left: 10px">保存设置</Button>
              </FormItem>
            </Form>
          </Modal>
          <Table border :columns="columns" :data="list">
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="intro">
              <img style="height:100px;" :src="row.intro" />
            </template>
            <template slot-scope="{ row, index }" slot="icon">
              <img style="height:100px;" :src="row.icon" />
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">编辑</Button>
              <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
            </template>
          </Table>
        </TabPane>
    </Tabs>



  </section>
</template>

<script>
  import {mapActions} from 'vuex';
  import getUploadToken from '../../libs/upload-token';

  export default {
    components: {},
    data() {
      return {
        addModal: false,
        title: '新增生态介绍',
        token: '',
        formValidate: {
          type: 'ecology',
          title: '',
          intro: ''
        },
        ruleValidate: {
          type: [
            {required: true, message: '板块ID不能为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '板块标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '必须上传板块背景图片', trigger: 'blur'}
          ]
        },
        formListData: {
          id: '',
          type: 'shentai',
          title: '',
          intro: '',
          icon: ''
        },
        ruleListData: {
          title: [
            {required: true, message: '生态标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '生态说明不能为空', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: 'Icon字体名不能为空', trigger: 'blur'}
          ]
        },
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
            title: '生态标题',
            key: 'title'
          },
          {
            title: '生态Icon',
            key: 'intro',
            slot: 'intro',
            align: 'center',
            width: 400,
          },
          {
            title: '生态图片',
            key: 'icon',
            slot: 'icon',
            align: 'center',
            width: 400,
          },
          {
            title: '操作',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getUploadToken();
      this._viewCreateAdHeader();
      this._viewCreateAdList();
    },
    methods: {
      ...mapActions({
        getCreateAdHeader: 'website/getCreateAdHeader',
        viewCreateAdHeader: 'website/viewCreateAdHeader',
        getCreateAdList: 'website/getCreateAdList',
        viewCreateAdList: 'website/viewCreateAdList',
        destroyAdList: 'website/destroyAdList'
      }),
      // 上传图片成功
      uploadIntroSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formValidate.intro = url;
        this.$Message.success('上传成功!');
      },
      uploadIconSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.icon = url;
        this.$Message.success('上传成功!');
      },
      uploadImageSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.intro = url;
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
      // 获取基本信息
      async _viewCreateAdHeader() {
        try {
          const res = await this.viewCreateAdHeader(this.formValidate.type);
          const info = res.data.data;
          this.formValidate = {
            type: info.type,
            title: info.title,
            intro: info.intro
          }
        } catch (e) {

        }
      },
      // 生态列表
      async _viewCreateAdList() {
        const res = await this.viewCreateAdList(this.formListData.type);
        this.list = res.data.data;
      },
      // 更新
      async _getCreateAdHeader() {
        try {
          await this.getCreateAdHeader(this.formValidate);
          this.$Message.success('更新成功!');
          this._viewCreateAdHeader();
        } catch (e) {
          
        }
      },
      async _getCreateAdList() {
        try {
          await this.getCreateAdList(this.formListData);
          this.$Message.success('更新成功!');
          this._viewCreateAdList();
          this.addModal = false;
          this.formListData = {
            id: '',
            type: 'shentai',
            title: '',
            intro: '',
            icon: '',
            image: ''
          };
        } catch (e) {
          
        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._getCreateAdHeader();
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 更新
      update(id) {
        this.title = '修改生态介绍';
        this.formListData = this.list[id];
        this.addModal = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.title = '新增生态介绍';
        this.formListData = {
          id: '',
          type: 'shentai',
          title: '',
          intro: '',
          icon: '',
          image: ''
        };
      },
      // 删除生态
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该生态吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyAdList(id);
              this.$Message.success('删除成功');
              this._viewCreateAdList();
            } catch (e) {
              this.$Message.error(e);
            } finally {
              this.$Modal.remove();
            }
          }
        });
      },
      // 添加生态
      handleListSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._getCreateAdList();
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleListReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style scoped>
  
</style>
