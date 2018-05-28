<template>
  <div>
    <div style="width:auto;height:400%;" :id="data.chartId"></div>
  </div>
</template>

<script>
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require("echarts/lib/component/timeline");
  require("echarts/lib/chart/line");
  require("echarts/lib/component/markPoint");
  require("echarts/lib/chart/bar");
  require("echarts/lib/component/legendScroll");
  require("echarts/lib/component/markLine");
  require("echarts/lib/component/toolbox");
  require("echarts/lib/chart/pie");

  export default {
    name: 'vBarChart',
    data () {
      return {
        visiteVolume: '',
        option: {},
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
        this.visiteVolume = echarts.init(document.getElementById(this.data.chartId));
//        this.visiteVolume.showLoading();
        this.option = this.data.option;
//        this.visiteVolume.hideLoading();
        this.visiteVolume.setOption(this.option);
        let that = this;
        window.addEventListener('resize', function () {
          that.visiteVolume.resize();
        });
      },
      getNew(){
        this.visiteVolume.setOption(this.option);
      }

    }
  };
</script>
