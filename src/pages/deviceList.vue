<style>
</style>
<template>
  <div class='device-list'>
    <Row>
      <Card>
        <v-table ref='deviceTable' :data='deviceTable'/>
      </Card>
    </Row>
  </div>
</template>
<script>
  import vTable from '@/components/vTable.vue';
  import {deviceTable, siteTable} from '@/services/staticData/dAddDevice';
  export default {
    data() {
      return {
        deviceTable,
        siteTable,
        loading: false,
      }
    },
    components: {
      vTable,
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/deviceList') {
          this.init();
          this.$store.state["deviceList"] = this;
        }
      }
    },
    mounted() {
      this.init();
      this.$store.state["deviceList"] = this;
    },
    methods: {
      init(){
        let search = {"siteToken": this.$route.query.siteToken};
        this.loading = true;
        this.$refs.deviceTable.tableSearch(search);

      }

    }
  };
</script>
