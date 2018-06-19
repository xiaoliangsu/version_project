<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Spin fix v-if="spinShow"></Spin>
    <div class="row" style="margin-bottom:20px;">

      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=classfyChart v-if="flag" ref="classfyChart"></v-bar-chart>
        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=classfyPie v-if="flag" ref="classfyPie"></v-bar-chart>
        </Card>
      </div>
    </div>


    <div class="row"  style="margin-bottom:20px;">
      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=errorChart v-if="flag" ref="errorChart"></v-bar-chart>
        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=errorPie v-if="flag" ref="errorPie"></v-bar-chart>
        </Card>
      </div>
    </div>


    <div class="row">
      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=warnErrorChart v-if="flag" ref="warnErrorChart"></v-bar-chart>

        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=warnErrorPie v-if="flag" ref="warnErrorPie"></v-bar-chart>
        </Card>
      </div>
    </div>

    <!--<Row>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=classfyChart v-if="flag" ref="classfyChart"></v-bar-chart>-->
      <!--</Card>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=errorChart v-if="flag" ref="errorChart"></v-bar-chart>-->
      <!--</Card>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=warnErrorChart v-if="flag" ref="warnErrorChart"></v-bar-chart>-->
      <!--</Card>-->


    <!--</Row>-->
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vBarChart from '@/components/vBarChart.vue';
  import {classfyChart, warnErrorChart, errorChart, classfyPie,errorPie,warnErrorPie} from '@/services/staticData/dDeviceHistoryVersion.js';
  export default {
    data() {
      return {
        classfyChart,
        errorChart,
        warnErrorChart,
        errorPie,
        classfyPie,
        warnErrorPie,
        flag: false,
        spinShow:true,
      }
    },

    components: {
      vBarChart
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/deviceHistoryVersion') {
          this.init();
//          this.getRealData();
        }
      }
    },
    mounted() {
      this.init();
//      this.getRealData();
    },
    methods: {
      async init(){
        await Promise.all([
          this.getClassfyData(),
          this.getErrorData(),
          this.getWarnErrorData()
        ]);

        this.flag = true;
        this.spinShow = false;
      },
      async getClassfyData(){
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getWarnInfo',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        classfyChart.option.series[0].data = res.results.engineNum;
        classfyChart.option.series[1].data = res.results.outTempNum;
        classfyChart.option.series[2].data = res.results.inTempNum;
        classfyChart.option.series[3].data = res.results.gasPaNum;
        classfyChart.option.series[4].data = res.results.waterPaNum;

        let temp = classfyPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }

      },
      async getErrorData(){
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getErrorInfo',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        errorChart.option.series[0].data = res.results.engineNum;
        errorChart.option.series[1].data = res.results.outTempNum;
        errorChart.option.series[2].data = res.results.inTempNum;
        errorChart.option.series[3].data = res.results.gasPaNum;
        errorChart.option.series[4].data = res.results.waterPaNum;

        let temp = errorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }

      },
      async getWarnErrorData(){
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getAllErrorOrWarn',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        warnErrorChart.option.series[0].data = res.results.warnNum;
        warnErrorChart.option.series[1].data = res.results.errorNum;

        let temp = warnErrorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }



      },


    }
  };
</script>
