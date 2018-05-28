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
          <v-Form :data='errorfilter' @onSubmit='submitForm'/>
        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="errorTable.columns" :data="alertList"></Table>
          <div style="float: right;">
            <Page
              :total="total"
              @on-change="changePage"
              :current="currentPage"
              size="small"
              show-elevator
              :page-size="15">
            </Page>
          </div>
        </Row>

      </Card>
    </Row>
  </div>
</template>
<script>

  import utils from '../../utils/utils.js';
  import vForm from '@/components/vForm.vue';
  import {errorTable,errorfilter} from '@/services/staticData/dHistory.js';
  export default {
    data() {
      return {
        errorfilter,
        errorTable,
        alertList: [],
        siteList: [],
        chooseSite: '',
        loading: true,
        total: 0,
        currentPage: 1,
      }
    },
    components:{
      vForm,
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/warnData') {
          this.getData();
        }
      }
    },

    mounted() {
      this.getData();
    },
    methods: {
      async getData(page){
        this.loading = false;
        this.alertList = [];
        let params = {
          "pageSize": 15,
          "pageIndex": page || 1,
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "startDate": new Date(new Date() - 3600 * 1000 * 24 ),
          "endDate": new Date(),
          "type":'engine.overheat'
        };
        let data = {
          url: 'history/getStartEndError',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        this.total = res.numResults;
        this.alertList = res;
//        console.log( this.alertList)
        this.loading = false;
      },

      async submitForm(formData){
        let params = {
          "pageSize": 15,
          "pageIndex": 1,
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "startDate": formData.time[0] ? formData.time[0] : '',
          "endDate":  formData.time[1] ?  formData.time[1] : '',
          "type":formData.type,
        };
        let data = {
          url: 'history/getStartEndError',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        this.alertList = res;
      },

      changePage(page){
        this.currentPage = page;
        this.getData(page);
      }

    }
  };
</script>
