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
          <label>站点：</label>
          <Select v-model="chooseSite" style="width:200px" clearable>
            <Option v-for="item in siteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <label>设备状态：</label>
          <Select v-model="chooseState" style="width:200px" clearable>
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

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
  import utils from '../utils/utils.js';
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
        chooseState:'',
        stateList:[{
            "label":"已停用",
          "value":"true",
        },{
          "label":"运行中",
          "value":"false",
        }]
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/allDeviceList') {
          this.getData();
          this.getFilterData();
          this.$store.state["allDeviceList"] = this;
        }
      }
    },

    mounted() {
      this.getData();
      this.getFilterData();
      this.$store.state["allDeviceList"] = this;


    },
    methods: {
      async getData(page){
        this.loading = true;
        this.deviceList = [];

        let params = {
          "pageSize": 15,
          "page": page || 1,
          "siteToken": this.chooseSite,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "deleted":this.chooseState,

        };
        let data = {
          url: 'device/getAllDeviceList',
          params: params,
          method: 'get'
        };
        if (this.chooseSite !== '') {
          data.url = 'device/getSiteDeviceList'
        }
        let res = await utils.getData(data);
        this.total = res.numResults;
        let result = res.data ? res.data : res.results;
        switch(this.chooseState)
        {
          case "true":
            result.forEach((item) => {
                if(item.comments == "已停用"){
                  this.deviceList.push({
                    "hardwareId": item.hardwareId,
                    "assetName": item.specification.assetName,
                    "locationCity": item.metadata.locationCity,
                    "locationDetial": item.metadata.locationDetial,
                    "name": item.assignment.assetName,
                    "id": item.assignment.assetId,
                    "emailAddress": item.assignment.emailAddress,
                    "siteToken": item.siteToken,
                    "metadata": item.metadata,
                    "assignToken": item.assignment.token,
                    "deleted":item.comments=="已停用"?"已停用":"运行中",
                    "specToken":item.specification.token
                  });
                }
            });
            break;
          case "false":
            result.forEach((item) => {
              if(item.comments !== "已停用"){
                this.deviceList.push({
                  "hardwareId": item.hardwareId,
                  "assetName": item.specification.assetName,
                  "locationCity": item.metadata.locationCity,
                  "locationDetial": item.metadata.locationDetial,
                  "name": item.assignment.assetName,
                  "id": item.assignment.assetId,
                  "emailAddress": item.assignment.emailAddress,
                  "siteToken": item.siteToken,
                  "metadata": item.metadata,
                  "assignToken": item.assignment.token,
                  "deleted":item.comments=="已停用"?"已停用":"运行中",
                  "specToken":item.specification.token
                });
              }
            });
            break;
          default:
            this.makeTabeltable(result);
        }
        this.loading = false;
      },
      makeTabeltable(result){
        result.forEach((item) => {
          this.deviceList.push({
            "hardwareId": item.hardwareId,
            "assetName": item.specification.assetName,
            "locationCity": item.metadata.locationCity,
            "locationDetial": item.metadata.locationDetial,
            "name": item.assignment.assetName,
            "id": item.assignment.assetId,
            "emailAddress": item.assignment.emailAddress,
            "siteToken": item.siteToken,
            "metadata": item.metadata,
            "assignToken": item.assignment.token,
            "deleted":item.comments=="已停用"?"已停用":"运行中",
            "specToken":item.specification.token
          });
        });

      },
      async getFilterData(){
        this.siteList = [];
        this.currentPage = 1;
        let params = {
          "pageSize": 15,
          "page": 1,
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        };
        let data = {
          url: 'device/getSite',
          params: params,
          method: 'get',
        };
        let res = await utils.getData(data);
        res.results.forEach((item) => {
          this.siteList.push({
            "label": item.name,
            "value": item.token,
          });
        })

      },
      changePage(page){
        this.currentPage = page;
        this.getData(page);
      }

    }
  };
</script>
