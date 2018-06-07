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
          <label>设备id：</label>
          <Input v-model="hardwareId" placeholder="输入设备id" style="width: 300px" ></Input>

          <span @click="getData(1)" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="alertColumn.columns" :data="alertList"></Table>
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
    </Row>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import {alertColumn} from '@/services/staticData/dEthAlert';
  export default {
    data() {
      return {
        alertColumn,
        alertList: [],
        loading: true,
        total: 0,
        currentPage: 1,
        chooseState: '',
        hardwareId: 'hard1',
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/ethAlertList') {
          this.getData();

          this.$store.state["ethAlertList"] = this;
        }
      }
    },

    mounted() {
      this.getData();

      this.$store.state["ethAlertList"] = this;


    },
    methods: {
      async getData(page){
        this.loading = true;
        this.alertList = [];

        let params = {
          "hardwareId": this.hardwareId,
        };

        let data = {
          url: 'products',
          params: params,
          method: 'get',
          baseUrl:'eth'
        };
        let res = await utils.getData(data);
        this.total = parseInt(res.numResults);
        let result = res.results;
        result.forEach((item) => {

          this.alertList.push({
            "hardwareId": item.hardwareId,
            "type": item.type,
            "level": item.request.level,
            "message": item.request.message,
            "eventDate": item.request.eventDate?item.request.eventDate:'报警时间暂无',
          });

        });
        this.loading = false;
      },


      changePage(page){
        this.currentPage = page;
        this.getData(page);
      }

    }
  };
</script>
