//allDeviceList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const deviceColumn = {
  columns :[{
    'title': '设备ID',
    'key': 'hardwareId',
    'width': 70
  }, {
    'title': '设备类别',
    'key': 'assetName',
    'minWidth': 100
  }, {
    'title': '设备详情',
    'key': 'comments',
    'minWidth': 100

  }, {
    'title': '所在城市',
    'key': 'locationCity',
    'minWidth':100
  }, {
    'title': '详细地址',
    'key': 'locationDetial',
    'minWidth': 300
  }, {
    'title': '安全管理员',
    'key': 'name',
    'minWidth': 100
  },{
    'title': '安全管理员手机号',
    'key': 'id',
    'minWidth': 120
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
          case "2":
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
                  click:   () => {
                    router.push({
                      path: "warnData",
                      query:{
                        "assignToken":params.row.assignToken
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
                  click:   () => {
                    router.push({
                      path: "ErrorData",
                      query:{
                        "assignToken":params.row.assignToken
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
                  click:   () => {
                    router.push({
                      path: "deviceHistoryVersion",
                      query:{
                        "assignToken":params.row.assignToken
                      }
                    });
                  }
                }
              }, '告警可视化')
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
