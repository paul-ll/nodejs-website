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
                <div class="article-cover" v-if="formValidate.intro" style="flex: 0 0 600px;display: flex; justify-content: center;">
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
        <TabPane label="案例列表" icon="ios-keypad-outline">
          <Button type="primary" @click="addModal = true" icon="md-add" style="margin-bottom: 16px;">新增案例</Button>
          <Modal width="60%" v-model="addModal" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '50px'}">
            <Form ref="formListData" :model="formListData" :rules="ruleListData" :label-width="120">
              <FormItem label="案例名称" prop="title">
                <Input v-model="formListData.title" placeholder="请输入案例名称"></Input>
              </FormItem>
              <Row>
                <Col span="12">
                  <FormItem label="案例白Logo" prop="intro">
                    <div class="cover" style="display: flex;">
                      <div class="upload" style="flex: 0 0 50%;">
                        <Upload
                          multiple
                          type="drag"
                          action="http://up-z2.qiniu.com"
                          :show-upload-list="false"
                          :on-success="uploadBaiSuccess"
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
                </Col>
                <Col span="12">
                  <FormItem label="案例彩Logo" prop="icon">
                    <div class="cover" style="display: flex;">
                      <div class="upload" style="flex: 0 0 50%;">
                        <Upload
                          multiple
                          type="drag"
                          action="http://up-z2.qiniu.com"
                          :show-upload-list="false"
                          :on-success="uploadHeiSuccess"
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
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="案例图片" prop="image">
                    <div class="cover" style="display: flex;">
                      <div class="upload" style="flex: 0 0 50%;">
                        <Upload
                          multiple
                          type="drag"
                          action="http://up-z2.qiniu.com"
                          :show-upload-list="false"
                          :on-success="uploadTuiSuccess"
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
                </Col>
                <Col span="12">
                  <FormItem
                    v-for="(item, index) in formListData.items"
                    :key="index"
                    :label="'案例特点' + (index+1)"
                    :prop="'items.' + index + '.value'">
                  <Row>
                    <Col span="18">
                      <Input type="text" v-model="item.value" placeholder="请输入案例特点"></Input>
                    </Col>
                    <Col span="4" offset="1">
                      <Button @click="handleRemove(index)">删除</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem v-if="formListData.items.length<=3">
                  <Row>
                    <Col span="12">
                      <Button type="dashed" long @click="handleAdd" icon="md-add">添加案例特点</Button>
                    </Col>
                  </Row>
                </FormItem>
                </Col>
              </Row>

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
        title: '新增案例介绍',
        token: '',
        formValidate: {
          type: 'case',
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
          type: 'anli',
          title: '',
          intro: '',
          icon: '',
          image: '',
          json_ext: '',
          items: [
            {
              value: ''
            }
          ]
        },
        ruleListData: {
          title: [
            {required: true, message: '案例名称不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '必须上传案例白Logo', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: '必须上传案例彩Logo', trigger: 'blur'}
          ],
          image: [
            {required: true, message: '必须上传案例图片', trigger: 'blur'}
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
            title: '案例名称',
            key: 'title'
          },
          {
            title: '案例白Logo',
            key: 'intro',
            slot: 'intro',
            align: 'center',
            width: 250,
          },
          {
            title: '案例彩Logo',
            key: 'icon',
            slot: 'icon',
            align: 'center',
            width: 250,
          },
          {
            title: '案例图片',
            key: 'image',
            slot: 'image',
            align: 'center',
            width: 400,
          },
          {
            title: '操作',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ],
        index: 1
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
      uploadTuiSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.image = url;
        this.$Message.success('上传成功!');
      },
      uploadHeiSuccess(response) {
        const url = `http://cdn.aogonew.com/${response.key}`;
        this.formListData.icon = url;
        this.$Message.success('上传成功!');
      },
      uploadBaiSuccess(response) {
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
      // 案例列表
      async _viewCreateAdList() {
        const res = await this.viewCreateAdList(this.formListData.type);
        this.list = res.data.data.rows;
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
            type: 'anli',
            title: '',
            intro: '',
            icon: '',
            image: '',
            json_ext: '',
            items: [
              {
                value: ''
              }
            ]
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
        this.title = '修改案例介绍';
        let data = this.list[id];
        if(data.json_ext){
          let array = [];
          //let items = JSON.parse(data.json_ext);
          for (let i = 0; i < data.json_ext.length; i++) {
            array.push({value: data.json_ext[i]});
          }
          this.formListData = {
            id: data.id,
            type: data.type,
            title: data.title,
            intro: data.intro,
            icon: data.icon,
            image: data.image,
            json_ext: data.json_ext,
            items: array
          }
        }else{
          this.formListData = {
            id: data.id,
            type: data.type,
            title: data.title,
            intro: data.intro,
            icon: data.icon,
            image: data.image,
            json_ext: '',
            items: [
              {
                value: ''
              }
            ]
          }
        }
        this.addModal = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.title = '新增案例介绍';
        this.formListData = {
          id: '',
          type: 'anli',
          title: '',
          intro: '',
          icon: '',
          image: '',
          json_ext: '',
          items: [
            {
              value: ''
            }
          ]
        };
      },
      // 删除案例
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该案例吗？</p>',
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
      // 添加案例
      handleListSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let array = []
            for (let i = 0; i < this.formListData.items.length; i++) {
              if(this.formListData.items[i].value!=''){
                array.push(this.formListData.items[i].value)
              }
            }
            this.formListData.json_ext = JSON.stringify(array);
            this._getCreateAdList();
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleListReset(name) {
        this.$refs[name].resetFields();
      },
      handleAdd () {
        this.index++;
        this.formListData.items.push({
          value: ''
        });
      },
      handleRemove (index) {
        this.formListData.items.splice(index, 1);
      }
    }
  }
</script>

<style scoped>
  
</style>
