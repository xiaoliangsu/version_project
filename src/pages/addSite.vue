<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <Button
          class="add-button"
          type="primary"
          shape="circle"
          icon="plus"
          @click="addSiteModal = true"
        >新增站点
        </Button>
        <v-table ref='siteTable' :data='siteTable'/>
        <Modal
          v-model="addSiteModal"
          title="提交站点信息"
          @on-ok="getNewSite"
        >
          <v-Form :data='addSiteForm' @onSubmit='submitSiteForm'/>

        </Modal>

      </Card>
    </Row>
  </div>
</template>
<script>
  //  import moment from 'moment';
  import utils from '@/utils/utils.js';
  import vTable from '@/components/vTable.vue';
  import vForm from '@/components/vForm.vue';
  import {siteTable, addSiteForm} from '@/services/staticData/dAddDevice.js';
  export default {
    data() {
      return {
        siteTable,
        loading: false,
        addSiteModal: false,
        addSiteForm
      }
    },
    components: {
      vTable,
      vForm
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/addSite') {
          this.init();

        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        let search = {id: this.$route.query.id};
        this.loading = true;
        this.$refs.siteTable.tableSearch(search);
      },
      submitSiteForm(formData){
        let params = {
          "name": formData.name,
          "description": formData.description,
          "map": {
            "type": "mapquest",
            "metadata": {
              "zoomLevel": "15",
              "centerLatitude": "",
              "centerLongitude": ""
            }
          },
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "metadata": {
            "locationCity": formData.city,
            "locationDetial": formData.location
          }
        };
        if (formData.location !== '') {
          let myGeo = new BMap.Geocoder();
          // 地址转换成坐标系
          myGeo.getPoint(formData.location, async function (point) {
            if (point) {
              params.map.metadata.centerLatitude = point.lat + '';
              params.map.metadata.centerLongitude = point.lng + '';
              let data = {
                url: '/device/addSite',
                params: params,
                method: 'post'
              };
              await  utils.getData(data);
              let search = {id: this.$route.query.id};
              this.loading = true;
              this.$refs.siteTable.tableSearch(search);
            }
          }, formData.city);
        }
        this.init();
      },
      getNewSite(){
          this.init();

      }

    }
  };
</script>
