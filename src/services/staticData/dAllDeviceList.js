//allDeviceList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const deviceColumn = {
  columns: [{
    'title': '设备ID',
    'key': 'hardwareId',
    'width': 70
  }, {
    'title': '设备类别',
    'key': 'assetName',
    'minWidth': 100
  },  {
    title: '运行状态',
    key: 'deleted',
    'minWidth': 100,
    render: (h, params) => {
      const row = params.row;
      const color = row.deleted !=="已停用" ? 'blue' :  'red';
      const text = row.status !=="已停用" ? '运行中' : "已停用";

      return h('Tag', {
        props: {
          type: 'dot',
          color: color
        }
      }, text);
    }
  }, {
    'title': '所在城市',
    'key': 'locationCity',
    'minWidth': 100
  }, {
    'title': '详细地址',
    'key': 'locationDetial',
    'minWidth': 300
  }, {
    'title': '安全管理员',
    'key': 'name',
    'minWidth': 100
  }, {
    'title': '安全管理员手机号',
    'key': 'id',
    'minWidth': 120
  },

    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch (router.history.current.query.kind) {
          case "1":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "deviceTemper",
                      query: {
                        "token": params.row.assignToken
                      }
                    });
                  }
                }
              }, '温度监控')
            ]);
            break;
          case "2":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "devicePa",
                      query: {
                        "token": params.row.assignToken
                      }
                    });
                  }
                }
              }, '压力监控')
            ]);
            break;
          case "3":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "warnData",
                      query: {
                        "assignToken": params.row.assignToken
                      }
                    });
                  }
                }
              }, '告警统计')
            ]);
            break;
          case "4":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "ErrorData",
                      query: {
                        "assignToken": params.row.assignToken
                      }
                    });
                  }
                }
              }, '停用统计')
            ]);
            break;
          case "5":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "deviceHistoryVersion",
                      query: {
                        "assignToken": params.row.assignToken
                      }
                    });
                  }
                }
              }, '告警可视化')
            ]);
            break;
          case "6":
            if (params.row.deleted == "运行中") {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    loading: false
                  },
                  on: {
                    click: async () => {
                      let params1 = {
                        "specToken": params.row.specToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken")
                      };
                      let data1 = {
                        url: 'device/getSpecCommond',
                        params: params1,
                        method: 'get',
                        baseUrl: "device"
                      };
                      let specComres = await utils.getData(data1);
                      let specStopCommond = specComres.results[0].commands[1].token;

                      let params2 = {
                        "eventDate": new Date(),
                        "updateState": false,
                        "initiator": "REST",
                        "initiatorId": "admin",
                        "target": "Assignment",
                        "commandToken": specStopCommond,
                        "parameterValues": {
                          "p1": "stop"
                        },
                        "assignToken": params.row.assignToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken"),
                        "hardwareId": params.row.hardwareId
                      };
                      let data2 = {
                        url: 'eventSource/postStopCommond',
                        params: params2,
                        method: 'post',
                      };
                      let res = await utils.getData(data2);
                      if (res) {
                        store.state.allDeviceList.getData();

                      }
                    }
                  }
                }, '停用设备')
              ]);
            } else if (params.row.deleted == "已停用") {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    loading: false
                  },
                  on: {
                    click: async () => {
                      let params1 = {
                        "specToken": params.row.specToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken")
                      };
                      let data1 = {
                        url: 'device/getSpecCommond',
                        params: params1,
                        method: 'get',
                        baseUrl: "device"
                      };
                      let specComres = await utils.getData(data1);
                      let specStopCommond = specComres.results[0].commands[0].token;

                      let params2 = {
                        "eventDate": new Date(),
                        "updateState": false,
                        "initiator": "REST",
                        "initiatorId": "admin",
                        "target": "Assignment",
                        "commandToken": specStopCommond,
                        "parameterValues": {
                          "p1": "start"
                        },
                        "assignToken": params.row.assignToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken"),
                        "hardwareId": params.row.hardwareId
                      };
                      let data2 = {
                        url: 'eventSource/postStartCommond',
                        params: params2,
                        method: 'post',
                      };
                      let res = await utils.getData(data2);
                      if (res) {
                        store.state.allDeviceList.getData();
                      }
                    }
                  }
                }, '启动设备')
              ]);
            }

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
                  click: () => {
                    router.push({
                      path: "devicePa",
                      query: {
                        "token": params.row.assignToken
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
