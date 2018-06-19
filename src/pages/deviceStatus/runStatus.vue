<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <v-city-map :data=this.cityMap v-if="flag" @onPushTo='pushTo' ref="cityMap"></v-city-map>
      </Card>
    </Row>
  </div>
</template>
<script>
  //  import moment from 'moment';
  import utils from '@/utils/utils.js';
  import {cityNameMap} from '@/utils/cityNameMap.js'
  import vCityMap from '@/components/vCityMap.vue';
  import {cityMap} from '@/services/staticData/dRunStatus.js';
  export default {
    data() {
      return {
        data: [],
        flag: false,
        cityNameMap,
        cityMap,
        storeDeviceLoc: new Map(),
        alertData: [],
        warnList: [],
        ErrorList: [],

      }
    },
    components: {
      vCityMap,
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/runStatus') {
          this.init();

        }
      }
    },
    created() {
      this.init();
      this.getRealData();
    },
    methods: {
      async init(){
        let cityName = this.$route.query.city;
        await Promise.all([
          this.getJson(),
          this.getDevices()
        ]);
//        this.cityMap.option.series.forEach((item) => {
//          item.data = this.data;
//        })
        console.log(this.data);
        let runData = [];
        let stopData = [];
        this.data.forEach((item)=>{
            if(item.value[3]!=='已停用'){
                runData.push(item);
            }else{
                stopData.push(item);

            }

        })
        this.cityMap.option.series[0].data = runData;
        this.cityMap.option.series[2].data = stopData;

        this.cityMap.option.series[1].data = this.data;

        this.cityMap.option.series[1].map = cityName;


        this.cityMap.option.geo.map = cityName;
        this.cityMap.cityName = cityName;
        this.flag = true;
      },
      //获取所在城市json
      async getJson(){
        let cityName = this.$route.query.city;
        let params = {
          "cityName": cityNameMap[cityName],
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        };
        let data = {
          url: 'alert/getCityJson',
          params: params,
          method: 'get',
          baseUrl:'alert'
        };
        let res = await utils.getData(data);
        this.cityMap.geoJson = res;

      },
      //获取设备坐标
      async getDevices(){
        let params = {
          "siteToken": localStorage.getItem("siteToken"),
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        };
        let data = {
          url: 'device/getSiteDevices',
          params: params,
          method: 'get'
        };
        let res = await utils.getData(data);
        res.data.forEach((item) => {
          let val = [];
          val.push(item.centerLongitude);
          val.push(item.centerLatitude);
          this.storeDeviceLoc.set(item.assignToken, val);
          val.push(item.hardwareId);
          val.push(item.comments);
          this.data.push({
            "name": "设备id：" + item.hardwareId,
            "value": val,
          })
        });
      },
      async getRealData(){
        if (this.flag == true) {
          let oneMinu = 1000 * 60 * 5;
          let params = {
            "startDate": new Date(new Date() - oneMinu),
            "sitewhereToken": localStorage.getItem("sitewhereToken"),
            "siteToken": this.$route.query.siteToken,
          };
          let data = {
            url: '/alert/getStartAlert',
            params: params,
            method: 'get',
            baseUrl:'alert'
          };
          let res = await utils.getData(data);
          this.pushNewData(res.results);
          this.$refs.cityMap.getNew();
        }
        let self = this;
        if (self && !self._isDestroyed) {
          setTimeout(() => {
            if (self && !self._isDestroyed) {
              self.getRealData();
            }
          }, 10000);
        }
      },
      //动态加入删除数据
      pushNewData(res){
        res.forEach((item) => {
          if (item.level == "Warning") {
            let val = this.storeDeviceLoc.get(item.deviceAssignmentToken);
            val.push(item.eventDate);
            this.warnList.push({
              "name": item.message,
              "value": val,
            })

          } else if (item.level == "Error") {
            let val = this.storeDeviceLoc.get(item.deviceAssignmentToken);
            val.push(item.eventDate);
            this.ErrorList.push({
              "name": item.message,
              "value": val,
            })
          }
        });
        this.cityMap.option.series[3].data = this.warnList;
        this.warnList = [];
        this.cityMap.option.series[4].data = this.ErrorList;
        this.ErrorList = [];
      },
      pushTo(params){
        this.$router.push({
          path: "deviceDetail",
          query:{
            "hardwareId":params.value[2]
          }
        });
      }


    }
  };
</script>
