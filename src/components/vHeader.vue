<style lang='less'>
  .header-right {
    float: right;
    line-height: 60px;
    width: auto;
    margin-right: 30px;

  }
</style>
<template>

  <div class="header-right">
    <Dropdown class="head_login" trigger="click" @on-click="handleClickUserDropdown">
      <a href="javascript:void(0)">
        <span class="main-user-name">{{username}}</span>
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="ownSpace" v-if="showOwnSpace">个人中心</DropdownItem>
        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

</template>
<script>
  import util from '../utils/utils.js';
  export default {
    name: 'vHeader',
    data() {
      return {
        username: localStorage.getItem("username"),

      };
    },
    props: {
      data: Object
    },
    computed:{
      showOwnSpace () {
        return localStorage.getItem("role")=='tenant';
      }
    },
    mounted() {

    },
    methods: {
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          // util.openNewPage(this, 'ownspace_index');

          this.$router.push("userInfo");
        } else if (name === 'loginout') {
          localStorage.clear();
          this.$router.push('login');

        }
      },

    }
  }
</script>
