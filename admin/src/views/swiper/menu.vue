<template>
  <section>
    <Button type="primary" @click="addMenu = true" icon="md-add" style="margin-bottom: 16px;">新增快捷菜单</Button>
    <Modal v-model="addMenu" :title="title" :mask-closable="false" :footer-hide="true" @on-cancel="cancel" :styles="{top: '100px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="菜单标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入菜单标题"></Input>
        </FormItem>
        <FormItem label="菜单介绍" prop="intro">
          <Input v-model="formValidate.intro" placeholder="请输入菜单介绍"></Input>
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

  export default {
    name: "list",
    data() {
      return {
        addMenu: false,
        editStatus: false,
        title: '新增快捷菜单',
        list: [],
        page: null,
        formValidate: {
          title: '',
          intro: '',
          links: '',
          target: false
        },
        ruleValidate: {
          title: [
            {required: true, message: '菜单标题不能为空', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '菜单介绍不能为空', trigger: 'blur'}
          ],
          links: [
            {required: true, message: '跳转链接不能为空', trigger: 'blur'}
          ],
        },
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '菜单标题',
            key: 'title'
          },
          {
            title: '菜单介绍',
            key: 'intro'
          },
          {
            title: '跳转链接',
            key: 'links'
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
      this._getSwiperMenuList();
    },
    methods: {
      ...mapActions({
        addSwiperMenu: 'swiper/addSwiperMenu',
        updateSwiperMenu: 'swiper/updateSwiperMenu',
        getSwiperMenuList: 'swiper/getSwiperMenuList',
        destroySwiperMenu: 'swiper/destroySwiperMenu'
      }),
      // 获取分类
      async _getSwiperMenuList() {
        const res = await this.getSwiperMenuList();
        this.list = res.data.data;
      },
      // 新增菜单
      async _addSwiperMenu() {
        try {
          await this.addSwiperMenu(this.formValidate);
          this.$Message.success('新增成功!');
          this._getSwiperMenuList();
          this.addMenu = false;
          this.formValidate = {
            title: '',
            intro: '',
            links: '',
            target: false
          }
        } catch (e) {
          
        }
      },
      // 菜单更新
      async _updateSwiperMenu() {
        try {
          await this.updateSwiperMenu(this.formValidate);
          this.$Message.success('更新成功!');
          this._getSwiperMenuList();
          this.addMenu = false;
          this.formValidate = {
            title: '',
            intro: '',
            links: '',
            target: false
          }
        } catch (e) {
          
        }
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 编辑快捷菜单
      update(id) {
        this.title = '修改快捷菜单';
        this.formValidate = this.list[id];
        this.editStatus = true;
        this.addMenu = true;
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此快捷菜单吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroySwiperMenu(id);
              this.$Message.success('删除成功');
              this._getSwiperMenuList();
            } catch (e) {
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          }
        });
      },
      // 关闭弹窗
      cancel: function() {
        this.editStatus = false,
        this.title = '新增快捷菜单';
        this.formValidate = {
          title: '',
          intro: '',
          links: '',
          target: false
        }
      },
      // 新标签页开关
      hoverChange() {
        this.formValidate.hover = !this.formValidate.hover;
      },
      targetChange() {
        this.formValidate.target = !this.formValidate.target;
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.editStatus){
              this._updateSwiperMenu();
            }else{
              this._addSwiperMenu();
            }
          } else {
            this.$Message.error('星号标注的均为必填项！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
