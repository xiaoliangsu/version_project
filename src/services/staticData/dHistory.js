import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';

export const warnTable = {
  columns :[{
    'title': '告警时间',
    'key': 'eventDate',
    'width': 70
  }, {
    'title': '告警级别',
    'key': 'level',
    'minWidth': 100
  }, {
    'title': '告警类别',
    'key': 'type',
    'minWidth': 100

  }, {
    'title': '告警信息',
    'key': 'message',
    'minWidth':100
  }, {
    'title': '安全管理员电话',
    'key': 'assetId',
    'minWidth': 300
  },

  ],
}


export const historyfilter = {
  inline: true,
  submitBtn: true,
  data: [{
    type: 'Select',
    name: 'type',
    label: '报警类型',
    defaultValue: "engine.overheat",
    data:[
      {
        label:'机器温度过高',
        value:"engine.overheat"
      },
      {
        label:'出水温度过高',
        value:"outTemp.overheat"
      },
      {
        label:'入水温度过高',
        value:"inTemp.overheat"
      },
      {
        label:'气路运行压力过高',
        value:"gasPa.overPa"
      },
      {
        label:'水路运行压力过高',
        value:"waterPa.overPa"
      },

    ]
  }, {
    type: 'DatePicker',
    name: 'time',
    label: '告警时间',
    defaultValue:[new Date(new Date() - 3600 * 1000 * 24 ), new Date()],


  },]
};

export const historyTable = {
  name: 'siteTable',
  size: 'small',
  noLoad: true,  // 默认不加载
  columns :[{
    'title': '告警时间',
    'key': 'eventDate',
    'width': 70
  }, {
    'title': '告警级别',
    'key': 'level',
    'minWidth': 100
  }, {
    'title': '告警类别',
    'key': 'type',
    'minWidth': 100

  }, {
    'title': '告警信息',
    'key': 'message',
    'minWidth':100
  }, {
    'title': '安全管理员电话',
    'key': 'assetId',
    'minWidth': 300
  },

    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch(router.history.current.query.kind)
        {
          case "1":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click:   () => {
                    router.push({
                      path: "deviceTemper",
                      query:{
                        "token":params.row.assignToken
                      }
                    });
                  }
                }
              }, '温度监控')
            ]);
            break;

          default:
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click:   () => {
                    router.push({
                      path: "devicePa",
                      query:{
                        "token":params.row.assignToken
                      }
                    });
                  }
                }
              }, '压力监控')
            ]);
        }


      }
    }
  ],
  defaultColumns: ['eventDate', 'level', 'type', 'message', 'assetId', 'action'],
  data: {
    url: 'history/getStartEndAlert',
    params: {
      pageSize: 15,
      page: 1,
      "sitewhereToken": localStorage.getItem("sitewhereToken"),

    },
    method: "get"
  }
};


export const errorfilter = {
  inline: true,
  submitBtn: true,
  data: [{
    type: 'Select',
    name: 'type',
    label: '故障类型',
    defaultValue: "engine.overheat",
    data:[
      {
        label:'机器温度过高',
        value:"engine.overheat"
      },
      {
        label:'出水温度过高',
        value:"outTemp.overheat"
      },
      {
        label:'入水温度过高',
        value:"inTemp.overheat"
      },
      {
        label:'气路运行压力过高',
        value:"gasPa.overPa"
      },
      {
        label:'水路运行压力过高',
        value:"waterPa.overPa"
      },

    ]
  }, {
    type: 'DatePicker',
    name: 'time',
    label: '停用时间',
    defaultValue:[new Date(new Date() - 3600 * 1000 * 24 ), new Date()],


  },]
};


export const errorTable = {
  columns :[{
    'title': '停用时间',
    'key': 'eventDate',
    'width': 70
  }, {
    'title': '告警级别',
    'key': 'level',
    'minWidth': 100
  }, {
    'title': '故障类别',
    'key': 'type',
    'minWidth': 100

  }, {
    'title': '故障信息',
    'key': 'message',
    'minWidth':100
  }, {
    'title': '安全管理员电话',
    'key': 'assetId',
    'minWidth': 300
  },

    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch(router.history.current.query.kind)
        {
          case "1":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click:   () => {
                    router.push({
                      path: "deviceTemper",
                      query:{
                        "token":params.row.assignToken
                      }
                    });
                  }
                }
              }, '温度监控')
            ]);
            break;

          default:
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click:   () => {
                    router.push({
                      path: "devicePa",
                      query:{
                        "token":params.row.assignToken
                      }
                    });
                  }
                }
              }, '压力监控')
            ]);
        }


      }
    }
  ],
}

