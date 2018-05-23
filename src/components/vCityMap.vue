<template>
  <div>
    <div style="width:auto;height:700%;" :id="data.chartId"></div>
  </div>
</template>

<script>
  // const echarts = require('echarts');
  import router from '../main.js';

  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/chart/map");
require("echarts/lib/component/geo");
  export default {
    name: 'vCityMap',
    data () {
      return {
        vCityMap:'',
        option:{},
        //
      };
    },
    props: {
      data: Object,
    },
    mounted () {

      this.$nextTick(() => {
        this.init();
      });
    },


    methods: {
      init(){
        echarts.registerMap(this.data.cityName, this.data.geoJson);
        this.vCityMap = echarts.init(document.getElementById(this.data.chartId));
        this.option = this.data.option;
        this.vCityMap.setOption(this.option);
        let that = this;
        window.addEventListener('resize', function () {
          that.vCityMap.resize();
        });
        that.vCityMap.on('click', function (params) {
          that.$emit('onPushTo', params);

//          window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
        });

      },
      getNew(){
        this.vCityMap.setOption(this.option);
      },


    }
  };
</script>
