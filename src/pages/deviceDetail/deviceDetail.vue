<style scoped>


</style>
<template>
  <div class="container">
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        设备运行状态
      </p>
      <p class="device-state">设备运行状态:{{this.state}}</p>
      <Button
        v-if="this.state == '已停用'"
        class="add-button"
        type="primary"
        shape="circle"
        @click="startDev"
      >启用设备
      </Button>
      <Button
        v-if="this.state !== '已停用'"
        class="add-button"
        type="error"
        shape="circle"
        @click="stopDev"
      >停用设备
      </Button>

    </Card>


    <Row>
      <Col span="6">
      <infor-card
        id-name="user_created_count"
        :end-val="10000"
        iconType="android-person-add"
        color="#2d8cf0"
        intro-text="气路设计压力(PA)"
      ></infor-card>
      </Col>
      <Col span="6" class-name="padding-left-5">
      <infor-card
        id-name="visit_count"
        :end-val="60000"
        iconType="ios-eye"
        color="#64d572"
        :iconSize="50"
        intro-text="水路设计压力(PA)"
      ></infor-card>
      </Col>
      <Col span="6" class-name="padding-left-5">
      <infor-card
        id-name="collection_count"
        :end-val="65"
        iconType="upload"
        color="#ffd572"
        intro-text="回水最高温度(℃)"
      ></infor-card>
      </Col>
      <Col span="6" class-name="padding-left-5">
      <infor-card
        id-name="transfer_count"
        :end-val="95"
        iconType="shuffle"
        color="#f25e43"
        intro-text="出水最高温度(℃)"
      ></infor-card>
      </Col>
    </Row>
    <Row>
      <div class="row justify-content-md-center">
        <div class="col col-sm-4">
          <v-info-list :data=this.data :resData=this.resInfo v-if="tag"></v-info-list>
        </div>
        <div class="col-sm-4">
          <v-info-list :data=this.specData :resData=this.specResInfo v-if="tag"></v-info-list>
        </div>
        <div class="col-sm-4">
          <v-info-list :data=this.siteInfo :resData=this.resInfo v-if="tag"></v-info-list>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vInfoList from "../../components/vInfoList"
  import inforCard from "../../components/inforCard.vue"
  import {siteInfo, deviceInfo, safemanInfo, specificationInfo} from "../../services/staticData/dDeviceDetail"
  export default {
    data () {
      return {
        data: [],
        specData: [],
        deviceInfo,
        siteInfo,
        safemanInfo,
        resInfo: {},
        tag: false,
        specificationInfo,
        specResInfo: {},
        siteResInfo: {},
        specToken:'',
        state:'已停用',
      }
    },
    components: {
      vInfoList,
      inforCard
    },

    methods: {
      async getData(){
        let params = {
          "hardwareId": this.$route.query.hardwareId,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: '/deviceInfo/getDetail',
          params: params,
          method: 'get'
        };
        let res = await utils.getData(data);
        this.resInfo = res;
        this.resInfo.city = res.metadata.locationCity;
        this.resInfo.location = res.metadata.locationDetial;
        this.resInfo.siteCity = res.site.metadata.locationCity;
        this.resInfo.siteLocation = res.site.metadata.locationDetial;
        this.resInfo.name = res.site.name;
        this.resInfo.description = res.site.description;
        this.resInfo.assetName = res.assignment.assetName;
        this.resInfo.assetId = res.assignment.assetId;
        this.resInfo.title = "设备基本信息";
        this.specResInfo = res.specification.asset.properties;
        this.specResInfo.name = res.specification.name;
        this.specResInfo.assetCategoryId = res.specification.asset.assetCategoryId;
        this.specResInfo.description = res.specification.asset.description;
        this.specResInfo.title = "设备类别基本信息";
        this.specToken = res.specification.token;
        this.state = res.comments;
      },
      async startDev(){
        let params0 = {
          "hardwareId":this.$route.query.hardwareId,
          "sitewhereToken":localStorage.getItem("sitewhereToken")
        };
        let data0 = {
          url: 'eventSource/getAssignToken',
          params: params0,
          method: 'get',
        };
        let assignRes = await utils.getData(data0);
        let assignToken = assignRes.token;

        let params1 = {
          "specToken": this.specToken,
          "sitewhereToken":localStorage.getItem("sitewhereToken")
        };
        let data1 = {
          url: 'device/getSpecCommond',
          params: params1,
          method: 'get',
          baseUrl:"device"
        };
        let specComres = await utils.getData(data1);
        let specStopCommond = specComres.results[0].commands[0].token;

        let params2 = {
          "eventDate": new Date(),
          "updateState": false,
          "initiator": "REST",
          "initiatorId": "admin",
          "target": "Assignment",
          "commandToken": specStopCommond,
          "parameterValues": {
            "p1": "start"
          },
          "assignToken":assignToken,
          "sitewhereToken":localStorage.getItem("sitewhereToken"),
          "hardwareId":this.$route.query.hardwareId
        };
        let data2 = {
          url: 'eventSource/postStartCommond',
          params: params2,
          method: 'post',
        };
        let res = await utils.getData(data2);
        if(res){
          this.getData();
        }

      },
      async stopDev(){
        let params0 = {
          "hardwareId":this.$route.query.hardwareId,
          "sitewhereToken":localStorage.getItem("sitewhereToken")
        };
        let data0 = {
          url: 'eventSource/getAssignToken',
          params: params0,
          method: 'get',
        };
        let assignRes = await utils.getData(data0);
        let assignToken = assignRes.token;

        let params1 = {
          "specToken": this.specToken,
          "sitewhereToken":localStorage.getItem("sitewhereToken")
        };
        let data1 = {
          url: 'device/getSpecCommond',
          params: params1,
          method: 'get',
          baseUrl:"device"
        };
        let specComres = await utils.getData(data1);
        let specStopCommond = specComres.results[0].commands[0].token;

        let params2 = {
          "eventDate": new Date(),
          "updateState": false,
          "initiator": "REST",
          "initiatorId": "admin",
          "target": "Assignment",
          "commandToken": specStopCommond,
          "parameterValues": {
            "p1": "stop"
          },
          "assignToken":assignToken,
          "sitewhereToken":localStorage.getItem("sitewhereToken"),
          "hardwareId":this.$route.query.hardwareId
        };
        let data2 = {
          url: 'eventSource/postStopCommond',
          params: params2,
          method: 'post',
        };
        let res = await utils.getData(data2);
        if(res){
          this.getData();
        }

      },

    },
    mounted () {

      this.data.push(deviceInfo);
      this.data.push(safemanInfo);
      this.getData();
      this.specData.push(specificationInfo);
//      this.watchResInfo.outTemp =
      this.tag = true;
    }
  }
</script>
