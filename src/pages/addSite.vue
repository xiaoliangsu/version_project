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
          <!--<v-Form :data='addSiteForm' @onSubmit='submitSiteForm'/>-->
          <Form :model="formItem" :label-width="80">
            <FormItem label="站点名称">
              <Input v-model="formItem.name" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="站点省市">
              <al-selector v-model="formItem.city" level="1"/>
            </FormItem>
            <FormItem label="站点详细地址">
              <Input v-model="formItem.location" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="站点描述">
              <Input v-model="formItem.description" placeholder="Enter something..."></Input>
            </FormItem>
            <Button type="primary" @click='submitSiteForm(formItem)'>确认</Button>
          </Form>

        </Modal>

      </Card>
    </Row>
  </div>
</template>
<script>
  //  import moment from 'moment';
  import alSelector from '@/components/al-selector.vue';

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
        addSiteForm,
        showRes: [],
        formItem: {
          name: '',
          city: []

        }
      }
    },
    components: {
      vTable,
      vForm,
      alSelector
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/addSite') {
          this.init();

        }
      },
      city (val) {
        this.showRes = val;

      },
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
      submitSiteForm(formItem){
        let params = {
          "name": formItem.name,
          "description": formItem.description,
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
            "locationCity": formItem.city[0].name + "," + formItem.city[1].name,
            "locationDetial": formItem.location
          }
        };
        if (formItem.location !== '') {
          let myGeo = new BMap.Geocoder();
          // 地址转换成坐标系
          myGeo.getPoint(formItem.location, async function (point) {
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
          }, formItem.city[0].name);
        }
        this.init();
      },
      getNewSite(){
        this.init();

      }

    }
  };
</script>
