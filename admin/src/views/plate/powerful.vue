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
            <!--
            <FormItem label="板块简介" prop="intro">
              <Input v-model="formValidate.intro" placeholder="请输入板块简介"></Input>
            </FormItem>
            -->
            <FormItem>
              <Button @click="handleReset('formValidate')">重置</Button>
              <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 10px">保存设置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="功能列表" icon="ios-keypad-outline">
          <Button type="primary" @click="addModal = true" icon="md-add" style="margin-bottom: 16px;">新增功能</Button>
          <Modal v-model="addModal" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
            <Form ref="formListData" :model="formListData" :rules="ruleListData" :label-width="120">
              <FormItem label="功能标题" prop="title">
                <Input v-model="formListData.title" placeholder="请输入功能标题"></Input>
              </FormItem>
              <FormItem label="功能说明" prop="intro">
                <Input v-model="formListData.intro" placeholder="请输入功能说明"></Input>
              </FormItem>
              <FormItem label="Icon字体名" prop="icon">
                <Input v-model="formListData.icon" placeholder="请输入Icon字体名"></Input>
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

  export default {
    components: {},
    data() {
      return {
        addModal: false,
        title: '新增功能介绍',
        token: '',
        formValidate: {
          type: 'powerful',
          title: '',
          intro: ''
        },
        ruleValidate: {
          type: [
            {required: true, message: '板块ID不能为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '板块标题不能为空', trigger: 'blur'}
          ]
        },
        formListData: {
          id: '',
          type: 'gonnen',
          title: '',
          intro: '',
          icon: ''
        },
        ruleListData: {
          title: [
            {required: true, message: '功能标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '功能说明不能为空', trigger: 'blur'}
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
            title: '功能标题',
            key: 'title'
          },
          {
            title: '功能说明',
            key: 'intro'
          },
          {
            title: 'Icon字体',
            key: 'icon',
            align: 'center',
            width: 200,
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
      // 功能列表
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
            type: 'gonnen',
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
        this.title = '修改功能介绍';
        this.formListData = this.list[id];
        this.addModal = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.title = '新增功能介绍';
        this.formListData = {
          id: '',
          type: 'gonnen',
          title: '',
          intro: '',
          icon: '',
          image: ''
        };
      },
      // 删除功能
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该功能吗？</p>',
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
      // 添加功能
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
