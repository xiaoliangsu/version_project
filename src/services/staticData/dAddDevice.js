//addsite和addDevice需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';


export const siteTable = {
  name: 'siteTable',
  size: 'small',
  noLoad: true,  // 默认不加载
  columns: [{
    'title': 'ID',
    'key': 'id',
    'width': 70
  }, {
    'title': '名字',
    'key': 'name',
    'minWidth': 100

  }, {
    'title': '创建日期',
    'key': 'createdDate',
    'minWidth': 300
  }, {
    'title': '所在城市',
    'key': 'locationCity',
    'minWidth': 100
  }, {
    'title': '详细地址',
    'key': 'locationDetial',
    'minWidth': 300
  }, {
    'title': '操作',
    'key': 'action',
    'width': 200,
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            loading: false
          },
          on: {
            click: () => {
              store.commit('SET_SITE_TOKEN', {
                siteToken: params.row.token
              })
              localStorage.setItem("siteToken", params.row.token)
              store.commit('SET_SITE_NAME', {
                siteName: params.row.name
              })
              store.commit('SET_SITE_LOCATION', {
                siteLocation: params.row.map.metadata
              })
              if (localStorage.getItem("siteToken")) {
                router.push({
                  path: "addDevice",
                });
              }

            }
          }
        }, '新增设备'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
            loading: false,
          },
          style: {
            marginLeft: '5px'
          },
          on: {
            click: () => {
              // store.commit('SET_SITE_TOKEN', {
              //   siteToken: params.row.token
              // })
              localStorage.setItem("siteToken", params.row.token);
              if (localStorage.getItem("siteToken") == params.row.token) {
                console.log(localStorage.getItem("siteToken"));
                router.push({
                  path: "deviceList",
                  query: {
                    "siteToken": localStorage.getItem("siteToken"),
                  }
                });
              }
              // console.log(localStorage.getItem("siteToken"))
              // store.commit('SET_SITE_NAME', {
              //   siteName: params.row.name
              // })
              // store.commit('SET_SITE_LOCATION', {
              //   siteLocation: params.row.map.metadata
              // })


            }
          }
        }, '设备列表')
      ]);
    }
  }
  ],
  defaultColumns: ['id', 'name', 'createdDate', 'locationCity', 'locationDetial', 'action'],
  data: {
    url: 'device/getSite',
    params: {
      pageSize: 15,
      page: 1,
      "sitewhereToken": localStorage.getItem("sitewhereToken")
    },
    method: "get"
  }
};
export const addSiteForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: 'Input',
    name: 'name',
    label: '站点名称'
  }, {
    type: 'Celector',
    name: 'city',
    label: '站点省市'
  }, {
    type: 'Input',
    name: 'location',
    label: '详细地址'
  }, {
    type: 'Input',
    name: 'description',
    label: '站点描述'
  }]
};

export const addDeviceForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: "Input",
    name: "hardwareId",
    label: "设备id号"
  }, {
    type: "Input",
    name: "comments",
    label: "设备详情",
  }, {
    type: 'Select',
    filterable: true,
    clearable: true,
    label: '设备规格',
    name: 'specificationToken',
    data: {
      url: '/device/getSpecToken',
      params: {"name": localStorage.getItem("username")},
      method: 'get'
    }

  },
    {
      type: "Input",
      name: "city",
      label: "所在省市",
    },
    {
      type: "Input",
      name: "location",
      label: "详细地址",
    },

  ]
}
export const addPersonForm = {
  inline: false,
  submitBtn: true,
  data: [{
    type: "Input",
    name: "name",
    label: "安全管理员姓名",
  },
    {
      type: "Input",
      name: "id",
      label: "安全管理员电话",
    }, {
      type: "Input",
      name: "emailAddress",
      label: "安全管理员邮箱",
    }, {
      type: "Input",
      name: "deviceHardwareId",
      label: "所管辖设备id号",
    },

  ]
}


export const deviceTable = {
  name: 'deviceTable',
  size: 'small',
  noLoad: true,  // 默认不加载
  columns: [{
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
      'title': '安全管理员email',
      'key': 'emailAddress',
      'minWidth': 100
    },
    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small',
              loading: false
            },
            on: {
              click: async () => {
                router.push({
                  path: "deviceDetail",
                  query: {
                    "hardwareId": params.row.hardwareId
                  }
                });
              }
            }
          }, '设备详情'),
          h('Poptip', {
            props: {
              confirm: true,
              title: '您确定要删除这条数据吗?',
              transfer: true
            },
            on: {
              'on-ok': async () => {
                let p1 = {
                  "assignToken": params.row.assignToken,
                  "sitewhereToken": localStorage.getItem("sitewhereToken"),
                  "deviceId": params.row.hardwareId,
                };
                let data = {
                  url: '/device/deleteDevice',
                  params: p1,
                  method: 'get',
                  baseUrl: "device"
                };
                await utils.getData(data)
                store.state.deviceList.init();
              }
            }
          }, [
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
                loading: false,
              },

              style: {
                marginLeft: '5px'
              },
            }, '删除设备')])
        ]);


      }
    }
  ],
  defaultColumns: ['hardwareId', 'assetName', 'comments', 'locationCity', 'locationDetial', 'name', 'id', 'emailAddress', 'action'],
  data: {
    url: 'device/getDeviceList',
    params: {
      pageSize: 15,
      page: 1,
      // "siteToken":localStorage.getItem("siteToken"),
      // "siteToken": router.history.current.query.kind,

      "sitewhereToken": localStorage.getItem("sitewhereToken")
    },
    method: "get"
  }
};


