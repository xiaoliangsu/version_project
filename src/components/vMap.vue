<style lang='less' scoped>
  #allmap {
    width: 400px;
    height: 400px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
<template>

  <div class="header-right">
    <div id="allmap"></div>
  </div>

</template>
<script>
  import util from '../utils/utils.js';

  export default {
    name: 'vGetSiteMap',
    data() {
      return {

      };
    },
    props: {
      data: Object
    },
    mounted () {
//      this.loadBMapScript();
//      window['bMapInit'] = () => {
//
//        this.qeuryLocation();
//      };
      this.qeuryLocation();
    },
    methods: {
      qeuryLocation () {

//        let myGeo = new BMap.Geocoder();
//        // 地址转换成坐标系
//        myGeo.getPoint('北京市海淀区上地10街10号', function (point) {
//            if (point) {
//              console.log(point);
//            }
//          },
//          '北京市');
        var map = new BMap.Map("allmap");
        map.centerAndZoom("重庆",12);
        //单击获取点击的经纬度
        map.addEventListener("click",function(e){
          alert(e.point.lng + "," + e.point.lat);
        });
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
//        var mp = new BMap.Map("allmap");
//        var point = new BMap.Point(116.404, 39.915);
//        mp.centerAndZoom(point, 14);
//        mp.enableScrollWheelZoom();
//        mp.enableInertialDragging();
//
//        mp.enableContinuousZoom();

        var size = new BMap.Size(10, 20);
        map.addControl(new BMap.CityListControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          offset: size,
          // 切换城市之间事件
          // onChangeBefore: function(){
          //    alert('before');
          // },
          // 切换城市之后事件
          // onChangeAfter:function(){
          //   alert('after');
          // }
        }));

      }


    },

  }
</script>
