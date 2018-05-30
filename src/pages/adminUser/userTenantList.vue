<style scoped>
  .margin-top-10 {
    margin-top: 10px;
  }

</style>
<template>
  <div class='todo'>
    <Row>
      <Card>
        <Row>
          <label>用户id：</label>
          <Input v-model="tenantId" placeholder="Enter user id..." style="width: 300px"></Input>
          <span @click="getExactData(1)" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
          <span @click="getData(1)" style="margin: 0 10px;"><Button type="primary" icon="search">清空</Button></span>

        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="tenantColumn.columns" :data="tenantList"></Table>
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
      <div v-if="editTenantModal==true">
        <Modal
          v-model="editTenantModal"
          title="修改用户基本信息"
          @on-ok="hideModal"
        >
          <v-Form :data='editTenantForm' @onSubmit='submitTenantForm'/>

        </Modal>
      </div>
    </Row>
  </div>
</template>
<script>
  import utils from '../../utils/utils.js';
  import vForm from "@/components/vForm"
  import {tenantColumn, editTenantForm} from '@/services/staticData/dTenantList';
  export default {
    data() {
      return {
        tenantColumn,
        tenantList: [],
        loading: true,
        total: 0,
        currentPage: 1,
        tenantId: '',
        editTenantModal: false,
        editTenantForm,
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/tenantList') {
          this.getData();
          this.$store.state["tenantList"] = this;
        }
      },
    },
    components: {
      vForm
    },
    mounted() {
      this.getData();
      this.$store.state["tenantList"] = this;
    },
    methods: {
      async getData(page){
        this.loading = true;
        this.tenantId = '';
        this.tenantList = [];
        let params = {
          "pageSize": 15,
          "page": page || 1,
          "authUserId": this.$route.query.authUserId,
        };
        let data = {
          url: 'adminUser/getUserTenants',
          params: params,
          method: 'get',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        this.total = res.numResults;
        let result = res.data ? res.data : res.results;
        result.forEach((item) => {
          item.status = item.engineState.lifecycleStatus;

        });
        this.tenantList = result;
        this.loading = false;
      },
      changePage(page){
        this.currentPage = page;
        this.getData(page);
      },
      async getExactData(page){
        this.loading = true;
        this.tenantList = [];
        let params = {
          "tenantId": this.tenantId
        };
        let data = {
          url: 'admin/getExactTenant',
          params: params,
          method: 'get',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        if (res != '') {
          this.total = 1;
          let result = [];
          result.push(res);
          this.tenantList = result;

        }
        this.loading = false;

      },
      async submitTenantForm(formData){
        let params = {
          "authenticationToken": formData.authenticationToken,
          "id": formData.id,
          "logoUrl": formData.logoUrl,
          "metadata": {},
          "name": formData.name,
          "tenantTemplateId": "empty",
          "authorizedUserIds": formData.authorizedUserIds,
        };
        let data = {
          url: 'admin/editTenant',
          params: params,
          method: 'post',
          baseUrl: 'user'
        };
        let res = await utils.getData(data);
        if (res) {
          this.editTenantModal = false;
          this.$Message.success("更新用户信息成功！");
          this.getData();
        }

      },
      hideModal(){
        this.editTenantModal = false;

      }

    }
  };
</script>
