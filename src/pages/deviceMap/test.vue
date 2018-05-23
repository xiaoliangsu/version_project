<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-marker :position="{'lng': 116.36419, 'lat': 39.968}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
    <bm-marker :position="{lng: 116.36419, lat: 39.969}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
</template>
<script>
  export default {
    data () {
      return {
        center: {lng: 0, lat: 0},
        zoom: 3
      }
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.36419
        this.center.lat = 39.967884
        this.zoom = 16
      }
    }
  }
</script>
<style>
  .map {
    width: 100%;
    height: 400px;
  }
</style>
