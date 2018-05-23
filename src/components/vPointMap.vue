<template>
  <baidu-map class="map" :center="center" :zoom="data.zoom" @ready="handler">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

    <bm-marker
      v-for="(item,key) in data.list"
      :key="key"
      :position=item.loc
      :dragging="true"
      @click="onPushTo"
      >
      <bm-label :content=item.label
                :labelStyle="{color: 'red', fontSize : '12px'}"
                :offset="{width: -35, height: 30}"/>
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
    props: {
      data: Object
    },
    methods: {
      handler ({BMap, map}) {
        this.center.lng = this.data.lng
        this.center.lat = this.data.lat
        this.zoom = this.data.zoom
      },
      onPushTo(){
        this.$emit('onPushTo', this.data);
      }

    }
  }
</script>
<style>
  .map {
    width: 100%;
    height: 600px;
  }
</style>
