<style scoped>
  .margin-top-10 {
    margin-top: 10px;
  }

</style>
<template>
  <div class='todo'>
    <Row>
      <Card>
        <Row>
          <Button
            class="add-button"
            type="primary"
            shape="circle"
            icon="plus"
            @click="addEventModal = true"
          >新增协议
          </Button>
        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="eventColumn.columns" :data="eventList"></Table>
          <div style="float: right;">
            <Page
              @on-change="changePage"
              :current="currentPage"
              size="small"
              show-elevator
              :page-size="15">
            </Page>
          </div>
        </Row>

      </Card>
      <Modal
        v-model="addEventModal"
        title="填写协议配置信息"
        @on-ok="hideModal"
      >
        <v-Form :data='addEventForm' @onSubmit='submitEventForm'/>

      </Modal>
    </Row>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import {eventColumn, addEventForm} from '@/services/staticData/dEventSource';
  import vForm from "@/components/vForm"

  export default {
    data() {
      return {
        eventColumn,
        eventList: [],
        loading: true,
        total: 0,
        currentPage: 1,
        addEventModal: false,
        addEventForm,
        jsonRes: '',
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/eventSource') {
          this.getData();
        }
      }
    },

    mounted() {
      this.getData();

    },

    components: {
      vForm,
    },
    methods: {
      async getData(page){
        this.loading = true;
        this.eventList = [];

        let params = {
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        };
        let data = {
          url: 'eventSource/getTenantConfJson',
          params: params,
          method: 'get'
        };
        let res = await utils.getData(data);
        this.jsonRes = res;
        let result = res.children[1].children[1].children[0].children;
        result.forEach((item) => {
          this.eventList.push({
            "name": item.name,
            "host": item.attributes[0].value,
            "port": item.attributes[1].value,
            "sourceId": item.attributes[2].value,
            "topic": item.attributes[3].value,
            "decoder": item.children[0].name,

          });
        });
        this.loading = false;
      },
      changePage(page){
        this.currentPage = page;
        this.getData(page);
      },
      async submitEventForm(formData){
        this.jsonRes.children[1].children[1].children[0].children.push({
          "name": "rabbit-mq-event-source",
          "id": "1111",
          "attributes": [
            {name: "sourceId", value: formData.sourceId},
            {name: "connectionUri", value: formData.connectionUri},
            {name: "queueName", value: formData.queueName},
            {name: "durable", value: true},
            {name: "numConsumers", value: formData.numConsumers}
          ],
          "children": [
            {name: "json-device-request-decoder", id: "2222"}
          ],
        });

        let params1 = {
          "sitewhereToken": localStorage.getItem("sitewhereToken")
        }
        let data1 = {
          url: 'eventSource/getSitewhereToken',
          params: params1,
          method: 'get',
        };
        await utils.getData(data1);

        let params = this.jsonRes;
//        params = {"name":"beans","namespace":"http://www.springframework.org/schema/beans","id":"de106304-6e22-4fed-979a-241d516ec520","children":[{"name":"property-placeholder","namespace":"http://www.springframework.org/schema/context","id":"e4d69340-238a-4081-b93a-e8f7b957977a","attributes":[{"name":"ignore-resource-not-found","value":"true"},{"name":"location","value":"file:${sitewhere.home}/conf/tenants/${tenant.id}/sitewhere-tenant.properties"},{"name":"xmlns","namespace":"http://www.w3.org/2000/xmlns/","value":"http://www.springframework.org/schema/context"}]},{"name":"tenant-configuration","id":"386b4057-770e-4d7f-80d3-cb01976449f8","children":[{"name":"tenant-datastore","id":"26edfa8f-96a9-4070-a389-c648f9da9519","children":[{"name":"mongo-tenant-datastore","id":"3582de73-9aa6-4f47-89fb-06f400eda49c","attributes":[{"name":"bulkInsertMaxChunkSize","value":"1000"},{"name":"useBulkEventInserts","value":"true"}]}]},{"name":"device-communication","id":"92124004-d6c9-4df3-9781-f618a0d74a2f","children":[{"name":"event-sources","id":"1823767f-ac25-4c25-aa86-f09c3b1a418d","children":[{"name":"mqtt-event-source","id":"a1c2d7eb-6fdc-4db9-a686-9735aeb19376","children":[{"name":"protobuf-event-decoder","id":"fa41e563-48a6-45ba-8409-98d5f7c98f9a"}],"attributes":[{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"},{"name":"sourceId","value":"protobuf"},{"name":"topic","value":"SiteWhere/input/protobuf"}]},{"name":"mqtt-event-source","id":"7585ed7b-0a5b-436e-872c-5f3ed147c2a4","children":[{"name":"json-device-request-decoder","id":"09dc84d6-c281-4eea-bc94-12d3a77e6922"}],"attributes":[{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"},{"name":"sourceId","value":"json"},{"name":"topic","value":"SiteWhere/input/json"}]},{"name":"mqtt-event-source","id":"bd01074d-893e-4dd3-b097-08ea73dc574f","children":[{"name":"json-batch-event-decoder","id":"3fd10ad1-ee14-4142-b35e-f79123f450ad"}],"attributes":[{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"},{"name":"sourceId","value":"json-batch"},{"name":"topic","value":"SiteWhere/input/jsonbatch"}]}]},{"name":"device-services","id":"902505d3-dcb9-4fbb-900e-7aded04660de","children":[{"name":"default-registration-manager","id":"17c8b5c2-899c-46fb-a05a-7f231ac2cfa5","attributes":[{"name":"allowNewDevices","value":"true"}]},{"name":"symbol-generator-manager","id":"9de5318a-1d22-4009-a302-27eec0b21ad6","children":[{"name":"qr-code-symbol-generator","id":"9a21f7c4-66a6-4ab1-a578-050dd8729a65","attributes":[{"name":"backgroundColor","value":"FFFFFFFF"},{"name":"foregroundColor","value":"FF111111"},{"name":"height","value":"250"},{"name":"id","value":"qrcode"},{"name":"name","value":"Basic QR Code"},{"name":"width","value":"250"}]}]},{"name":"default-presence-manager","id":"b89d070c-62a4-4bbf-859b-1a03be2ea432","attributes":[{"name":"checkInterval","value":"PT5M"},{"name":"presenceMissingInterval","value":"PT8H"}]}]},{"name":"batch-operations","id":"36c3add8-bf37-44e5-a3ab-1921c336fd3e","children":[{"name":"default-batch-operation-manager","id":"67d8cb9e-eb1c-4c5f-8b86-c398bdb171b8","attributes":[{"name":"throttleDelayMs","value":"1000"}]}]},{"name":"command-routing","id":"a4ba9805-91a3-44ba-839a-a85917d7f08a","children":[{"name":"specification-mapping-router","id":"170c3d4e-2970-487e-8f5f-227d9e599e44","children":[{"name":"mapping","id":"84c0db9d-544c-4874-8445-b9ba7e8bab5c","attributes":[{"name":"destination","value":"hybrid"},{"name":"specification","value":"d2604433-e4eb-419b-97c7-88efe9b2cd41"}]},{"name":"mapping","id":"7310b231-002d-47f7-9df3-7ca727d864d8","attributes":[{"name":"destination","value":"hybrid"},{"name":"specification","value":"7dfd6d63-5e8d-4380-be04-fc5c73801dfb"}]},{"name":"mapping","id":"4ac6d5b0-f5b0-480e-9bf3-798772b2bdfa","attributes":[{"name":"destination","value":"hybrid"},{"name":"specification","value":"5a95f3f2-96f0-47f9-b98d-f5c081d01948"}]},{"name":"mapping","id":"9da70a93-3090-4da0-bcac-c3993a10f890","attributes":[{"name":"destination","value":"json"},{"name":"specification","value":"964e7613-dab3-4fb3-8919-266a91370884"}]}],"attributes":[{"name":"defaultDestination","value":"default"}]}]},{"name":"command-destinations","id":"457a0528-1775-403c-9b21-19f294558118","children":[{"name":"mqtt-command-destination","id":"c615adc1-dff6-48ae-b8c5-d7845c0682db","children":[{"name":"protobuf-command-encoder","id":"0c22af1f-3625-41aa-b9bd-e6b86ca77f66"},{"name":"hardware-id-topic-extractor","id":"b2feaac4-6244-4282-b654-ba7e23de27f7","attributes":[{"name":"commandTopicExpr","value":"SiteWhere/commands/%s"},{"name":"systemTopicExpr","value":"SiteWhere/system/%s"}]}],"attributes":[{"name":"destinationId","value":"default"},{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"}]},{"name":"mqtt-command-destination","id":"9f7788e5-4ec1-4f05-bf4c-3cf69e148f8a","children":[{"name":"java-protobuf-hybrid-encoder","id":"2210d657-f0f9-4060-8092-d25951efb1e8"},{"name":"hardware-id-topic-extractor","id":"7f37aa26-2f95-4ca7-ace1-7f5fd20a878b","attributes":[{"name":"commandTopicExpr","value":"SiteWhere/commands/%s"},{"name":"systemTopicExpr","value":"SiteWhere/system/%s"}]}],"attributes":[{"name":"destinationId","value":"hybrid"},{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"}]},{"name":"mqtt-command-destination","id":"577aae24-f7c0-478f-b09e-1161a5f8b18b","children":[{"name":"json-command-encoder","id":"95a5cafa-5f04-43cc-b99f-3a5492ae1421"},{"name":"hardware-id-topic-extractor","id":"e0783e75-091f-423e-81e5-11786943828b","attributes":[{"name":"commandTopicExpr","value":"SiteWhere/commands/%s"},{"name":"systemTopicExpr","value":"SiteWhere/system/%s"}]}],"attributes":[{"name":"destinationId","value":"json"},{"name":"hostname","value":"${mqtt.host}"},{"name":"port","value":"1883"}]}]}]},{"name":"event-processing","id":"b453e92b-2e5f-4aa8-860b-d23004aefa3d","children":[{"name":"inbound-processing-strategy","id":"dd0f5790-293b-4d8d-9a0a-637197d4c783","children":[{"name":"blocking-queue-inbound-processing-strategy","id":"fcd5f51c-8915-43c1-9480-fc8792f8e8a4","attributes":[{"name":"enableMonitoring","value":"false"},{"name":"maxQueueSize","value":"10000"},{"name":"monitoringIntervalSec","value":"3"},{"name":"numEventProcessorThreads","value":"10"}]}]},{"name":"inbound-processing-chain","id":"bfabd28a-5de3-49ed-bbb1-6fa83541f9ab","children":[{"name":"event-storage-processor","id":"ea231740-acfb-451c-913b-ec30fa7ecae2"},{"name":"registration-processor","id":"789691d6-c0d7-4cb3-98cf-c93481e14650"},{"name":"device-stream-processor","id":"85aaf228-6c29-4b22-9a33-e8d27ef8a0e2"}]},{"name":"outbound-processing-strategy","id":"7d78a240-3202-436c-bd62-ab7b66cb5991","children":[{"name":"blocking-queue-outbound-processing-strategy","id":"0b5e27c4-b5ba-42c0-ba1f-ab1c2b999f20","attributes":[{"name":"maxQueueSize","value":"10000"},{"name":"numEventProcessorThreads","value":"10"}]}]},{"name":"outbound-processing-chain","id":"d72e09f2-3707-4c3f-a32c-ae50878c991b","children":[{"name":"command-delivery-event-processor","id":"8f8435bc-927d-4b94-87c2-dc36666d0031"},{"name":"hazelcast-event-processor","id":"4491e53b-cc97-4a57-8635-16dbc73d10a1"}]}]},{"name":"asset-management","id":"83f84890-45d3-4fd0-81f8-db8ee25c42b2"}],"attributes":[{"name":"sw","namespace":"http://www.w3.org/2000/xmlns/","value":"http://www.sitewhere.com/schema/sitewhere/ce/tenant"}]}],"attributes":[{"name":"xmlns","namespace":"http://www.w3.org/2000/xmlns/","value":"http://www.springframework.org/schema/beans"},{"name":"xsi","namespace":"http://www.w3.org/2000/xmlns/","value":"http://www.w3.org/2001/XMLSchema-instance"},{"name":"schemaLocation","namespace":"http://www.w3.org/2001/XMLSchema-instance","value":"            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd            http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-3.0.xsd            http://www.sitewhere.com/schema/sitewhere/ce http://www.sitewhere.org/schema/sitewhere/ce/current/sitewhere.xsd            http://www.sitewhere.com/schema/sitewhere/ce/tenant http://www.sitewhere.org/schema/sitewhere/ce/current/sitewhere-tenant.xsd"}]};
        let data = {
          url: 'eventSource/postEventSource',
          params: params,
          method: 'post',
        };
        let res = await utils.getData(data);
      },
      hideModal(){
        this.addEventModal = false;
        this.getData(1);
      }

    }
  };
  //         let params = {
  //   "eventDate" : "2016-12-10T13:11:45.122-0500",
  //   "updateState" : false,
  //   "initiator" : "REST",
  //   "initiatorId" : "admin",
  //   "target" : "Assignment",
  //   "commandToken" : "abf39265-b38e-487a-845d-6c6764dab1e4",
  //   "parameterValues" : {
  //     "p1" : "stri",
  //     "p2" : "60"
  //   }
  // };
  //         console.log(params)

</script>
