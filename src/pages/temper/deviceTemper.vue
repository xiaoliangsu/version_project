<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <v-visite-volume :data=inOutTempChart v-if="flag" ref="inOutTempChart"></v-visite-volume>
      </Card>
      <Card>
        <v-visite-volume :data=deviceTempChart v-if="flag" ref="deviceTempChart"></v-visite-volume>
      </Card>

    </Row>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vVisiteVolume from '@/components/vVisiteVolume.vue';
  import {inOutTempChart, deviceTempChart} from '@/services/staticData/dTempChart.js';
  export default {
    data() {
      return {
        inOutTempChart,
        deviceTempChart,
        flag: false,
      }
    },

    components: {
      vVisiteVolume
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/deviceTemper') {
          this.init();
          this.getRealData();
        }
      }
    },
    mounted() {
      this.init();
      this.getRealData();
    },
    methods: {
      async init(){
        let oneHour = 3600 * 1000;
        let startDate = new Date(new Date() - oneHour);
        let params = {
          "startDate": startDate,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "assignToken": this.$route.query.token,
        };
        let data = {
          url: '/measure/getStartMeasures',
          params: params,
          method: 'get',
          baseUrl:'realTime'
        };
        let res = await utils.getData(data);
        let result = this.changeData(res);
        inOutTempChart.option.series[0].data = result.resultIn;
        inOutTempChart.option.series[1].data = result.resultOut;
        deviceTempChart.option.series[0].data = result.resultDevice;

        this.flag = true;

      },

      async getRealData(){
        if (this.flag == true) {
          let oneMinu = 10000;
          let params = {
            "startDate": new Date(new Date() - oneMinu),
            "sitewhereToken": localStorage.getItem("sitewhereToken"),
            "assignToken": this.$route.query.token,
          };
          let data = {
            url: '/measure/getStartMeasures',
            params: params,
            method: 'get',
            baseUrl:'realTime'
          };
          let res = await utils.getData(data);
          this.pushNewData(res);
          this.$refs.inOutTempChart.getNew();
          this.$refs.deviceTempChart.getNew();
        }
        let self = this;
        if (self && !self._isDestroyed) {
          setTimeout(() => {
            if (self && !self._isDestroyed) {
              self.getRealData();
            }
          }, 20000);
        }
      },
      //改变数据格式
      changeData(res){
        let result = {};
        let resultIn = [];
        let resultOut = [];
        let resultDevice = [];
        res.forEach((item) => {
          if (item.measurementId == "water.inTemper") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              resultIn.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              })
            })
          } else if (item.measurementId == "water.outTemper") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              resultOut.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              })
            })
          } else if (item.measurementId == "device.Temper") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              resultDevice.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              })
            })

          }
        });
        result = {
          "resultIn": resultIn,
          "resultOut": resultOut,
          "resultDevice":resultDevice
        }
        return result;

      },
      //动态加入删除数据
      pushNewData(res){
        res.forEach((item) => {
          if (item.measurementId == "water.inTemper") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              inOutTempChart.option.series[0].data.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              });
              inOutTempChart.option.series[0].data.shift();
            });
          } else if (item.measurementId == "water.outTemper") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              inOutTempChart.option.series[1].data.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              });
              inOutTempChart.option.series[1].data.shift();
            });
          }else if(item.measurementId == "device.Temper"){
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              deviceTempChart.option.series[0].data.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              });
              deviceTempChart.option.series[0].data.shift();
            });
          }
        });

      },


    }
  };
</script>
