<template>
  <section>
    <Button type="primary" @click="addCaregory = true" icon="md-add" style="margin-bottom: 16px;">新增菜单项</Button>
    <Modal v-model="addCaregory" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="菜单名称" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入菜单名称"></Input>
        </FormItem>
        <FormItem label="跳转链接" prop="links">
          <Input v-model="formValidate.links" placeholder="支持 #ID名称 滚动到当前页面指定位置"></Input>
        </FormItem>
        <FormItem label="新标签页打开" prop="target">
          <i-switch :value="formValidate.target" size="large" @on-change="modalChange">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
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
        <template slot-scope="{ row, index }" slot="target">
          <i-switch :value="row.target" size="large" @on-change="change(row.id, row.target)">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
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
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        addCaregory: false,
        editStatus: false,
        title: '新增导航菜单',
        targetData: '',
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
            title: '菜单名称',
            key: 'title'
          },
          {
            title: '菜单链接',
            key: 'links'
          },
          {
            title: '新标签页打开',
            slot: 'target',
            width: 200,
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ],
        formValidate: {
          title: '',
          links: '',
          target: false
        },
        ruleValidate: {
          title: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'}
          ],
          links: [
            {required: true, message: '跳转链接不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getCategoryList();
    },
    methods: {
      ...mapActions({
        addCaterory: 'category/addCaterory',
        getCategoryList: 'category/getCategoryList',
        updateCaterory: 'category/updateCaterory',
        updateCateroryTarget: 'category/updateCateroryTarget',
        destroyCategory: 'category/destroyCategory'
      }),
      // 获取分类
      async _getCategoryList() {
        const res = await this.getCategoryList();
        this.list = res.data.data;
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.title = '修改导航菜单';
        this.formValidate = this.list[id];
        this.editStatus = true;
        this.addCaregory = true;
      },
      // 关闭弹窗
      cancel: function() {
        this.editStatus = false,
        this.title = '新增导航菜单';
        this.formValidate = {
          title: '',
          links: '',
          target: false
        }
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除该菜单吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyCategory(id);
              this.$Message.success('删除成功');
              this._getCategoryList();
            } catch (e) {
              this.$Message.error(e);
            } finally {
              this.$Modal.remove();
            }
          }
        });
      },
      // 新增菜单保存
      async _addCaterory() {
        try {
          await this.addCaterory(this.formValidate);
          this.$Message.success('新增成功!');
          this._getCategoryList();
          this.addCaregory = false;
          this.formValidate = {
            title: '',
            links: '',
            target: false
          }
        } catch (e) {
          
        }
      },
      // 新增菜单提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.editStatus){
              this._updateCaterory();
            }else{
              this._addCaterory();
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
      change(id, target) {
        this.targetData = {
          id: id,
          target: !target
        }
        this._updateCateroryTarget();
      },
      modalChange() {
        this.formValidate.target = !this.formValidate.target;
      },
      // 新标签页更新
      async _updateCateroryTarget() {
        try {
          await this.updateCateroryTarget(this.targetData);
          this.$Message.success('更新成功!');
          this._getCategoryList();
        } catch (e) {
          
        }
      },
      // 菜单更新
      async _updateCaterory() {
        try {
          await this.updateCaterory(this.formValidate);
          this.$Message.success('更新成功!');
          this._getCategoryList();
          this.addCaregory = false;
          this.formValidate = {
            title: '',
            links: '',
            target: false
          }
        } catch (e) {
          
        }
      }
    }
  }
</script>

<style scoped>

</style>
