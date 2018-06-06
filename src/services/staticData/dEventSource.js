//allDeviceList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const eventColumn = {
  columns :[{
    'title': '协议名',
    'key': 'name',
    'width': 70
  }, {
    'title': 'host',
    'key': 'host',
    'minWidth': 100
  }, {
    'title': 'port',
    'key': 'port',
    'minWidth': 100

  }, {
    'title': 'sourceId',
    'key': 'sourceId',
    'minWidth':100
  }, {
    'title': 'topic',
    'key': 'topic',
    'minWidth': 300
  }, {
    'title': 'decoder',
    'key': 'decoder',
    'minWidth': 100
  },

  ],
}

export const addEventForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: 'Input',
    name: 'sourceId',
    label: '源id',
    defaultValue:localStorage.getItem("username")

  }, {
    type: 'Input',
    name: 'queueName',
    label: 'Queue name',
    defaultValue:"sitewhere."+localStorage.getItem("username")
  }, {
    type: 'Input',
    name: 'numConsumers',
    label: 'numConsumers',
    defaultValue:"10"
  }, {
    type: 'Input',
    name: 'decoder',
    label: '解码器',
    defaultValue:"json-device-request-decoder",
    disabled:true
  },{
    type: 'Select',
    name: 'connectionUri',
    label: '链接的uri',
    data:[
      {
        label:'amqp协议',
        value:'amqp://localhost:5672'

      },
      {
        label:'stomp协议',
        value:'tcp://localhost:61613'

      },

    ]
  }]
};
