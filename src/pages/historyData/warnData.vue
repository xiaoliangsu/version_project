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
          <label class="filter-time">时间：</label>
          <DatePicker type="daterange" :options="options" placeholder="Select date" style="width: 200px;"
                      v-model="time"></DatePicker>
          <span @click="getData(1)" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="deviceColumn.columns" :data="deviceList"></Table>
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
  import utils from '../../utils/utils.js';
  import {deviceColumn} from '@/services/staticData/dAllDeviceList';
  export default {
    data() {
      return {
        deviceColumn,
        deviceList: [],
        siteList: [],
        chooseSite: '',
        loading: true,
        total: 0,
        currentPage: 1,
        time: [],
        options: {
          shortcuts: [
            {
              text: '1 week',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '1 month',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '3 months',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      }
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
        console.log(page);
        this.loading = false;
        this.deviceList = [];
        let params = {
          "pageSize": 15,
          "page": page || 1,
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "startDate": this.time[0] ? this.time[0] : '',
          "endDate": this.time[1] ? this.time[1] : '',
        };
        let data = {
          url: 'history/getStartEndAlert',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        this.total = res.numResults;
        let result = res.data ? res.data : res.results;
        result.forEach((item) => {
          this.deviceList.push({
            "hardwareId": item.hardwareId,
            "assetName": item.specification.assetName,
            "comments": item.comments,
            "locationCity": item.metadata.locationCity,
            "locationDetial": item.metadata.locationDetial,
            "name": item.assignment.assetName,
            "id": item.assignment.assetId,
            "emailAddress": item.assignment.emailAddress,
            "siteToken": item.siteToken,
            "metadata": item.metadata,
            "assignToken": item.assignment.token
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
