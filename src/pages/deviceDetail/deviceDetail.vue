<style scoped>

</style>
<template>
  <div class="container">
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
