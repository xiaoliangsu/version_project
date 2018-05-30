<style scoped>
  .margin-top-10 {
    margin-top: 10px;
  }

</style>
<template>
  <div class='todo'>
    <Row>
      <Card>
        <Button
          class="add-button"
          type="primary"
          shape="circle"
          icon="plus"
          @click="addUserModal = true"
        >新增管理员
        </Button>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="userColumn.columns" :data="userList"></Table>
          <div style="float: right;">
            <Page
              :total="total"
              show-total
              @on-change="changePage"
              :current="currentPage"
              size="small"
              show-elevator
              :page-size="15">
            </Page>
          </div>
        </Row>
      </Card>
      <Modal
        v-model="addUserModal"
        title="提交管理员信息"
        @on-ok="hideModal"
      >
        <v-Form :data='addUserForm' @onSubmit='submitUserForm'/>

      </Modal>
    </Row>
  </div>
</template>
<script>
  import utils from '../../utils/utils.js';
  import vForm from "@/components/vForm"
  import {userColumn, addUserForm} from '@/services/staticData/dUserList';
  export default {
    data() {
      return {
        userColumn,
        addUserForm,
        userList: [],
        loading: true,
        total: 0,
        currentPage: 1,
        addUserModal: false,
      }
    },
    components: {
      vForm,
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/userList') {
          this.getData();
          this.$store.state["userList"] = this;
        }
      }
    },

    mounted() {
      this.getData();
      this.$store.state["userList"] = this;
    },
    methods: {
      async getData(page){
        this.userList = [];
        let params = {
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        };
        let data = {
          url: 'adminUser/getAdminUsers',
          params: params,
          method: 'get',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        this.total = res.numResults;
        let result = res.data ? res.data : res.results;
        this.userList = result;
        this.loading = false;
      },
      changePage(page){
        this.currentPage = page;
        this.getData(page);
      },
      async submitUserForm(formData){
        let params = {
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "firstName": formData.firstName,
          "lastName": formData.lastName,
          "metadata": {},
          "password": formData.password,
          "status": formData.status,
          "username": formData.username,
          "authorities": ["GRP_ACCESS", "ADMIN_CONSOLE", "REST", "GRP_SCHEDULES", "ADMINISTER_SCHEDULES", "SCHEDULE_COMMANDS", "GRP_SERVER", "VIEW_SERVER_INFO", "GRP_TENANTS", "ADMINISTER_TENANTS", "ADMINISTER_TENANT_SELF", "GRP_USERS", "ADMINISTER_USERS", "ADMINISTER_USER_SELF"]
        };
        let data = {
          url: 'adminUser/addAdminUsers',
          params: params,
          method: 'post',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        if (res) {
          this.addUserModal = false;
          this.$Message.success("添加管理员成功！");
          this.getData();
        }

      },
      hideModal(){
          this.addUserModal = false;
      }

    }
  };
</script>
