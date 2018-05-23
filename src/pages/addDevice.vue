<style>
</style>
<template>
  <div>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-sm-6">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              设备信息
            </p>
            <v-form :data=addDeviceForm @onSubmit='submitDeviceForm'></v-form>
          </Card>
        </div>
        <div class="col-sm-6">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              安全管理员信息
            </p>
            <v-form :data=addPersonForm @onSubmit='submitSafeInfo'></v-form>
          </Card>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import {Message, Notice}from 'iview';
  import utils from '@/utils/utils.js';
  import vForm from '@/components/vForm.vue';
  import {addDeviceForm, addPersonForm} from '@/services/staticData/dAddDevice.js';
  import VForm from "../components/vForm";
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        addDeviceForm,
        addPersonForm,

      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'getSiteToken',
        // ...
      ])
    },
    components: {
      VForm,

    },
    mounted() {


    },
    methods: {
      async submitDeviceForm(formData){
        let params = {
          "hardwareId": formData.hardwareId,
          "comments": formData.comments,
          "metadata": {
            "locationCity": formData.city,
            "locationDetial": formData.location,
            "centerLatitude": '',
            "centerLongitude": '',
          },
          "siteToken": this.getSiteToken,
          "specificationToken": formData.specificationToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "centerLatitude": '',
          "centerLongitude": '',
        };
        let data = {
          url: '/device/addDevice',
          params: params,
          method: 'post'
        };
        if (formData.location !== '') {
          let myGeo = new BMap.Geocoder();
          // 地址转换成坐标系
          myGeo.getPoint(formData.location, async function (point) {
            if (point) {
              params.metadata.centerLatitude = point.lat + '';
              params.metadata.centerLongitude = point.lng + '';
              let data = {
                url: '/device/addDevice',
                params: params,
                method: 'post'
              };
              let res = await  utils.getData(data);
              if (res) {
                Message.success({
                  content: "新建设备成功",
                  duration: 5,
                  closable: true
                });
              }

            }
          }, formData.city);
        }


      },
      async submitSafeInfo(formData){
        let params = {
          "emailAddress": formData.emailAddress,
          "id": formData.id,
          "imageUrl": "111",
          "name": formData.name,
          "properties": {},
          "userName": formData.name,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "deviceHardwareId": formData.deviceHardwareId
        }

        let data = {
          url: '/device/addSafePerson',
          params: params,
          method: 'post'
        };
        let res = await  utils.getData(data);
        if (res != '') {
          Message.success({
            content: "成功",
            duration: 5,
            closable: true
          });

        }

      }

    }
  };
</script>
