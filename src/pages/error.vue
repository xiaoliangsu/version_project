<template>
  <!--地图容器-->
  <div id="XSDFXPage" class="XSDFXPage">
    <div id="allmap"></div>
  </div>

</template>
<script>
  export default {
    methods: {
      loadBMapScript () {
        let script = document.createElement('script');
        script.src = 'http://api.map.baidu.com/api?v=3.0&ak=shtdnIPtrUgHv69aXpc3IO1zSoPFQA6O';
        document.body.appendChild(script);
      },
      async qeuryLocation () {

       // let myGeo = new BMap.Geocoder();
       // 地址转换成坐标系
     
     
       // myGeo.getPoint('北京市海淀区上地10街10号', function (point) {
       //     if (point) {
       //       console.log(point);
       //     }
       //   },
       //   '北京市');
        var map = new BMap.Map("allmap");
        map.centerAndZoom("重庆",12);
        //单击获取点击的经纬度
        map.addEventListener("click",function(e){
          alert(e.point.lng + "," + e.point.lat);
        });
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
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
    mounted () {
//      this.loadBMapScript();
//      window['bMapInit'] = () => {
//
//        this.qeuryLocation();
//      };
      this.qeuryLocation();
    }
  }
</script>
<style scoped>
  #allmap {
    width: 500px;
    height: 500px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
