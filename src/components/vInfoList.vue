<style scoped>
  ul li {
    list-style-type: none;
    margin: 10px;
  }

  li:last-child {
    border-bottom: 1px solid #e9eaec;
  }

  .detail {
    margin-left: 10px;
  }


</style>
<template>
  <Card style="min-width: 350px;">
    <p slot="title" class="card-title">
      <Icon type="android-checkbox-outline"></Icon>
      {{resData.title}}
    </p>
    <ul v-for="item in data">
      <li class="site" v-for="item in item.data">
        {{ item.label }}:
        <span class="detail">{{resData[item.name]}}</span>
      </li>
    </ul>
  </Card>

</template>
<script>
  import utils from '@/utils/utils.js';
  //  import {siteInfo, deviceInfo, safemanInfo} from "../../services/staticData/dDeviceDetail"
  export default {
    data () {
      return {}
    },
    props: {
      data: Array,
      resData: Object
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
        this.deviceResInfo = res;

        this.deviceResInfo.city = res.metadata.locationCity;
        this.deviceResInfo.location = res.metadata.locationDetial;

        this.safeResInfo = res.assignment;
        this.siteResInfo = res.site;
        this.siteResInfo.city = res.site.metadata.locationCity;
        this.siteResInfo.location = res.site.metadata.locationDetial;

      }
    },
    mounted () {

    }
  }
</script>
