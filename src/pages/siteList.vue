<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <v-table ref='siteTable' :data='siteTable'/>
      </Card>
    </Row>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vTable from '@/components/vTable.vue';
  import {siteTable} from '@/services/staticData/dDeviceMap.js';
  export default {
    data() {
      return {
        siteTable,
        loading: false,

      }
    },

    components: {
      vTable,

    },
    watch: {
      '$route'(to, from){
        if (to.path == '/siteList') {
          this.init();

        }
      },

    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        let search = {"siteToken": this.$route.query.siteToken};
        this.loading = true;
        this.$refs.siteTable.tableSearch(search);
      },

    }
  };
</script>
