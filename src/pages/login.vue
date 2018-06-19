<style lang="less">
  @import './login.less';

  .layout {
    background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
    width: 100%;
    height: 100%;
  }
</style>

<template>

  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Select v-model="form.role" placeholder="选择角色">
                <Option value="tenant">普通用户</Option>
                <Option value="adminUser">管理员</Option>
                <Option value="admin">超级管理员</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip" @click="registNew">注册新用户</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import utils from '@/utils/utils.js';
  import {Message, Notice}from 'iview';
  export default {
    data () {
      return {
        form: {
          userName: localStorage.getItem("username")?localStorage.getItem("username"):'',
          password: localStorage.getItem("password")?localStorage.getItem("password"):'',
          role: 'tenant'
        },
        name: '',
        pwd: '',
        unitName: '',
        unitId: '',
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            let params = {
              "name": this.form.userName,
              "pwd": this.form.password,
              "role": this.form.role,
            };
            let data = {
              url: '/user/login',
              params: params,
              method: 'post',
              baseUrl: 'user'
            };
            let res = await utils.getData(data);
            if (res.status == 1) {
              localStorage.setItem("sitewhereToken", res.userData.tenantToken);
              localStorage.setItem("username", res.userData.name);
              localStorage.setItem("role", "tenant");
              this.$router.push({
                path: '/addSite',
              });
            } else if (res.status == 3) {
              localStorage.setItem("role", "admin");
              localStorage.setItem("username", res.userData.name);
              this.$router.push({
                path: '/tenantList',
              });
            } else if (res.status == 4) {
              localStorage.setItem("role", "adminUser");
              localStorage.setItem("username", res.userData.name);
              this.$router.push({
                path: '/userTenantList',
                query: {
                  "authUserId": res.userData.name,
                }
              });

            } else {
              Message.error({
                content: res.msg,
                duration: 5,
                closable: true
              });
            }


          }
        });
      },
      registNew(){
        this.$Modal.confirm({
          render: (h) => {
            return h('div', [
              h('P', {
                style: {
                  color: "#1c2438",
                  fontSize: "20px",
                  textAlign: 'center'
                }
              }, "注册新用户"),
              h('Span', {
                style: {
                  color: "#495060",
                  fontSize: "14px",
                }
              }, "用户名："),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: 'Please enter your name...',
                },
                on: {
                  input: (val) => {
                    this.name = val;
                  }
                }
              }),
              h('Span', {
                style: {
                  color: "#495060",
                  fontSize: "14px",
                }
              }, "密码："),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: 'Please enter your password...',
                },
                on: {
                  input: (val) => {
                    this.pwd = val;
                  }
                }
              }),
              h('Span', {
                style: {
                  color: "#495060",
                  fontSize: "14px",
                }
              }, "使用单位名称："),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: 'Please enter your unit name...',
                },
                on: {
                  input: (val) => {
                    this.unitName = val;
                  }
                }
              }),
              h('Span', {
                style: {
                  color: "#495060",
                  fontSize: "14px",
                }
              }, "使用单位id："),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: 'Please enter your unit id...',
                },
                on: {
                  input: (val) => {
                    this.unitId = val;
                  }
                }
              }),
            ])

          },
          onOk: async () => {

            let params = {
              "name": this.name,
              "pwd": parseInt(this.pwd),
              "unitName": this.unitName,
              "unitId": this.unitId,
            };
            let data = {
              url: '/user/regist',
              params: params,
              method: 'post',
              baseUrl: 'user'
            };
            let res = await utils.getData(data);
            if (res.statue == 0) {
              this.$Message.error(res.msg);
            } else {
              this.$Message.success(res.msg);
            }
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        })

      }
    }
  };
</script>

<style>

</style>
