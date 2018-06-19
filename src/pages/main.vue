<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    margin-left: 200px;

  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;

  }

  .menu-icon {
    transition: all .3s;
    text-align: center;

  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 90px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .content {
    margin: 10px 10px 10px 210px;
  }

  .content-small {
    transition: font-size .2s ease, transform .2s ease;
    margin: 10px;
  }

  .bread {
    padding-top: 1%;
    margin-left: 220px;

  }

  .bread-small {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    padding-top: 1%;
    margin-left: 10px;
  }

  .head-small {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    margin-left: 0px;
  }


</style>
<template>
  <div class="layout">
    <Layout>
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" ref="side1" hide-trigger
             collapsible :collapsed-width="0" v-model="isCollapsed">
        <div class="layout-logo-left">
        </div>
        <Menu v-if="role=='tenant'" active-name="addSite" theme="dark" width="auto" :class="menuitemClasses"
              @on-select="routeTo">
          <MenuItem name="addSite">
            <Icon type="ios-navigate"></Icon>
            <span>注册新设备</span>
          </MenuItem>
          <MenuItem name="siteList-1">
            <Icon type="search"></Icon>
            <span>地理位置监控</span>
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              实时监控
            </template>
            <MenuItem name="allDeviceList-1">
              <Icon type="settings"></Icon>
              温度监控
            </MenuItem>
            <MenuItem name="allDeviceList-2">
              <Icon type="settings"></Icon>
              压力监控
            </MenuItem>
            <MenuItem name="siteList-2">
              <Icon type="settings"></Icon>
              运行状态监控
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              历史告警数据
            </template>
            <MenuItem name="allDeviceList-3">
              <Icon type="settings"></Icon>
              告警统计
            </MenuItem>
            <MenuItem name="allDeviceList-4">
              <Icon type="settings"></Icon>
              故障统计
            </MenuItem>
            <MenuItem name="allDeviceList-5">
              <Icon type="ios-navigate"></Icon>
              设备告警可视化
            </MenuItem>
            <MenuItem name="allHistoryVersion">
              <Icon type="settings"></Icon>
              历史告警可视化
            </MenuItem>
            <MenuItem name="ethAlertList">
              <Icon type="settings"></Icon>
              区块链存储
            </MenuItem>


          </Submenu>
          <MenuItem name="eventSource">
            <Icon type="settings"></Icon>
            <span>传输协议配置</span>
          </MenuItem>
          <MenuItem name="allDeviceList-6">
            <Icon type="settings"></Icon>
            <span>控制设备运行</span>
          </MenuItem>
        </Menu>
        <Menu v-if="role=='admin'" active-name="addSite" theme="dark" width="auto" :class="menuitemClasses"
              @on-select="routeTo">
          <MenuItem name="tenantList">
            <Icon type="ios-navigate"></Icon>
            <span>成员管理</span>
          </MenuItem>
          <MenuItem name="userList">
            <Icon type="ios-navigate"></Icon>
            <span>管理员管理</span>
          </MenuItem>
        </Menu>
        <Menu v-if="role=='adminUser'" active-name="addSite" theme="dark" width="auto" :class="menuitemClasses"
              @on-select="routeTo">
          <MenuItem name="userTenantList">
            <Icon type="ios-navigate"></Icon>
            <span>成员管理</span>
          </MenuItem>

        </Menu>

      </Sider>
      <Layout>
        <Header :style="{padding: 0}" :class="headClasses">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round"
                size="24"></Icon>
          <v-header></v-header>
        </Header>


        <v-breadcrumb :class="breadClasses" :homeRoute='homeRoute'/>


        <Content :style="{background:'#fff'}" :class="contentClasses">
          <!--<Button @click='test'>get</Button>-->
          <!--<Button @click='loginUser'>login</Button>-->
          <!--<Button @click='regist'>regist</Button>-->
          <!--<Button @click='getSite'>getSite</Button>-->

          <router-view></router-view>
        </Content>


      </Layout>
    </Layout>
  </div>
</template>
<script>
  import vHeader from '@/components/vHeader.vue';
  import vBreadcrumb from '@/components/vBreadcrumb.vue';
  import utils from '@/utils/utils.js';
  export default {
    data () {
      return {
        isCollapsed: false,
        homeRoute: '/',
        role: ''
      }
    },
    components: {
      vHeader,
      vBreadcrumb
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      contentClasses(){
        return [
          'content',
          this.isCollapsed ? 'content-small' : ''

        ]
      },
      breadClasses(){
        return [
          'bread',
          this.isCollapsed ? 'bread-small' : ''

        ]
      },
      headClasses(){
        return [
          'layout-header-bar',
          this.isCollapsed ? 'head-small' : ''

        ]
      }

    },
    mounted(){
      this.role = localStorage.getItem("role");
    },

    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      },
      async test(){
        let params = {
          "hardwareId": "hard1"
        };

        let data = {
          url: 'products',
          params: params,
          method: 'get',
          baseUrl:'eth'
        };

        await utils.getData(data)

      },

      async loginUser(){
        let params = {
          "name": "admin",
          "pwd": 12345,
        };
        let data = {
          url: '/user/login',
          params: params,
          method: 'post',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        console.log(res);
//        if (res.userData) {
//          localStorage.setItem("sitewhereToken", res.userData.tenantToken);
//          localStorage.setItem("username", res.userData.name);
//
//        }


      },
      async regist(){
        let params = {
          "name": "loutong7",
          "pwd": 123,
          "unitName": "使用单位7",
          "unitId": "12345678917",

        };
        let data = {
          url: '/user/regist',
          params: params,
          method: 'post',
          baseUrl: 'user'
        };
        await utils.getData(data)

      },
      async getSite(){
        let token = localStorage.getItem("sitewhereToken");
        let params = {
          "page": 1,
          "pageSize": 10,
          "sitewhereToken": token

        };
        let data = {
          url: '/device/getSite',
          params: params,
          method: 'get'
        };
        await utils.getData(data)

      },
      routeTo(e) {

        let routerPath = e.split("-");
        this.$router.push({
          path: routerPath[0],
          query: {
            "kind": routerPath[1],
          }
        });
      },
    }
  }
</script>
