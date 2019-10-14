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
            <FormItem label="板块简介" prop="intro">
              <Input v-model="formValidate.intro" placeholder="请输入板块简介"></Input>
            </FormItem>
            <FormItem>
              <Button @click="handleReset('formValidate')">重置</Button>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 10px">保存设置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="特点列表" icon="ios-keypad-outline">
          <Button type="primary" @click="addModal = true" icon="md-add" style="margin-bottom: 16px;">新增特点</Button>
          <Modal v-model="addModal" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
            <Form ref="formListData" :model="formListData" :rules="ruleListData" :label-width="120">
              <FormItem label="特点标题" prop="title">
                <Input v-model="formListData.title" placeholder="请输入特点标题"></Input>
              </FormItem>
              <FormItem label="特点说明" prop="intro">
                <Input v-model="formListData.intro" placeholder="请输入特点说明"></Input>
              </FormItem>
              <FormItem label="Icon图标" prop="icon">
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
              <FormItem label="特点图片" prop="image">
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
                  <div class="article-cover" v-if="formListData.image" style="flex: 0 0 50%; display: flex; justify-content: center;">
                    <img :src="formListData.image" alt="image" style="width: 150px;">
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
            <template slot-scope="{ row, index }" slot="icon">
              <img style="height:50px;" :src="row.icon" />
            </template>
            <template slot-scope="{ row, index }" slot="image">
              <img style="height:100px;" :src="row.image" />
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
        title: '新增特点介绍',
        token: '',
        formValidate: {
          type: 'advantage',
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
            {required: true, message: '板块简介不能为空', trigger: 'blur'}
          ]
        },
        formListData: {
          id: '',
          type: 'tedian',
          title: '',
          intro: '',
          icon: '',
          image: ''
        },
        ruleListData: {
          title: [
            {required: true, message: '特点标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '特点说明不能为空', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '必须上传Icon图标', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '必须上传特点图片', trigger: 'blur'}
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
            title: '特点标题',
            key: 'title'
          },
          {
            title: '特点说明',
            key: 'intro'
          },
          {
            title: 'Icon图标',
            key: 'icon',
            slot: 'icon',
            align: 'center',
            width: 120,
          },
          {
            title: '特点图片',
            key: 'image',
            slot: 'image',
            align: 'center'
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
      uploadIconSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.icon = url;
        this.$Message.success('上传成功!');
      },
      uploadImageSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.image = url;
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
      // 特点列表
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
            type: 'tedian',
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
        this.title = '修改特点介绍';
        this.formListData = this.list[id];
        this.addModal = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.title = '新增特点介绍';
        this.formListData = {
          id: '',
          type: 'tedian',
          title: '',
          intro: '',
          icon: '',
          image: ''
        };
      },
      // 删除特点
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该特点吗？</p>',
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
      // 添加特点
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
